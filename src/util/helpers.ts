export const IsAnyUndefined = (body: any, args: string[]) => {
    for(const p of args) {
        if(!body[p]) return p;
    }
    return false;
};
