import {RequestHandler} from "express";

export default class SingleRoute {
    type: string;
    path: string;
    controller: RequestHandler;
    authenticated: boolean;

    constructor(type: string, path: string, controller: RequestHandler, authenticated: boolean) {
        if(type.trim().length === 0) throw new Error('type is empty');
        if(path.trim().length === 0) throw new Error('path is empty');
        if(path.charAt(0) !== '/') throw new Error('path must start with /');
        this.type = type;
        this.path = path;
        this.controller = controller;
        this.authenticated = authenticated;
    }
}
