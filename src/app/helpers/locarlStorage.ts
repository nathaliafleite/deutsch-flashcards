export const clearLocalStorageItem = (...args: string[]) => {
    args.forEach(key => {
        localStorage.removeItem(key);
    });
};

export const setLocalStorageItem = (...args: { key: string; value: any }[]) => {
    args.forEach(arg => {
        localStorage.setItem(arg.key, JSON.stringify(arg.value));
    });
};

export const getLocalStorageItem = (key: string) => {
    const value = localStorage.getItem(key);
    if (value) {
        return JSON.parse(value);
    } else {
        return null;
    }
};
