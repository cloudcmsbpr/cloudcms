import {Request } from "express";

export function parseRequiredFields<T>(req: Request, params: string[]): any {
    const pDic: any = {};
    for (const i of params) {
        if (!req.body[i]) {
            return [false, i];
        } else {
            pDic[i] = req.body[i];
        }
    }
    return [true, (pDic) as T];
}