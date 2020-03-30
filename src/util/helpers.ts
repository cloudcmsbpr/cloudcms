export const IsAnyUndefined = (...args: any) => {
    for(const p of args) {
        if(p === undefined) return true;
    }
    return false;
};
