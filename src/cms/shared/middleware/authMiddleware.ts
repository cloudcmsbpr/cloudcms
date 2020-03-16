import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import { SESSION_SECRET } from "../../../util/secrets";

export const checkJwt = (req: Request, res: Response, next: NextFunction) => {
    //Get the jwt token from the head
    const token = req.headers["auth"] as string;
    console.log('->' + token);
    let jwtPayload;

    //Try to validate the token and get data
    try {
        jwtPayload = jwt.verify(token, SESSION_SECRET) as any;
        res.locals.jwtPayload = jwtPayload;
    } catch (error) {
        //If token is not valid, respond with 401 (unauthorized)
        res.status(401).send();
        return;
    }

    //The token is valid for 1 hour
    //We want to send a new token on every request
    const { userId, username } = jwtPayload;
    const newToken = jwt.sign({ userId, username }, SESSION_SECRET, {
        expiresIn: "1h"
    });
    res.setHeader("token", newToken);

    //Call the next middleware or controller
    next();
};
