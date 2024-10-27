const getApiFromGlobal = (globalApi: string | string[]): string => {
    if (typeof globalApi === "string") {
        return globalApi;
    } else {
        return globalApi[0];
    }
};

export { getApiFromGlobal };
