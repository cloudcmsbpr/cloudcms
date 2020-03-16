import {RequestHandler} from "express";

export default class SingleRoute {
    type: string;
    path: string;
    middleware: any[];
    controller: RequestHandler;

    constructor(type: string, path: string, controller: RequestHandler, middleware: any[] = []) {
        if(type.trim().length === 0) throw new Error("type is empty");
        if(path.trim().length === 0) throw new Error("path is empty");
        if(path.charAt(0) !== "/") throw new Error("path must start with /");
        this.middleware = middleware;
        this.type = type;
        this.path = path;
        this.controller = controller;
    }
}
