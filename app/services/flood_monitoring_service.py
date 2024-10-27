import tensorflow as tf
from sqlalchemy.orm import Session
from app.services.user_service import get_users_with_addresses
from app.services.repeating_service import send_push_notification
import numpy as np
import ee
import time
import threading
import keras


def preprocess_image(latitude: float, longitude: float) -> np.ndarray:
    # Define the region of interest
    point = ee.Geometry.Point([longitude, latitude])
    region = point.buffer(1000).bounds()

    s2 = ee.ImageCollection('COPERNICUS/S2_SR') \
        .filterBounds(region) \
        .sort('system:time_start', False) \
        .first()

    bands = ['B2', 'B3', 'B4', 'B8']
    image = s2.select(bands)

    clipped = image.clip(region)

    def normalize(image):
        return image.divide(10000)

    normalized = normalize(clipped)

    array = normalized.getRegion(region, 30).getInfo() 

    data = np.array(array[1:])
    image_data = data[:, 4:].astype(float)
    image_data = image_data.reshape((512, 512, 4))

    image_data = np.clip(image_data, 0, 1)

    return image_data

def is_address_at_risk(latitude: float, longitude: float, model: keras.models.Model) -> bool:
    image = preprocess_image(latitude, longitude)
    image = np.expand_dims(image, axis=0)
    prediction = model.predict(image)
    risk_score = prediction[0][1]
    return risk_score > 0.5

def check_flood_risk_for_users(db: Session, model: keras.models.Model):
    users = get_users_with_addresses(db)
    for user in users:
        for address in user.addresses:
            if is_address_at_risk(address.latitude, address.longitude, model):
                message = f"Warning: Your address at ({address.latitude}, {address.longitude}) is at risk of flooding."
                send_push_notification(user.fcm_token, message)

def run_flood_monitoring(db: Session):
    model = tf.keras.models.load_model("app/ml_model/megathonkeras.keras")
    while True:
        check_flood_risk_for_users(db, model)
        time.sleep(300)  # Sleep for 5 minutes

def start_flood_monitoring_service(db: Session):
    monitoring_thread = threading.Thread(target=run_flood_monitoring, args=(db,))
    monitoring_thread.daemon = True
    monitoring_thread.start()
