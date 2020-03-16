import { Request, Response, NextFunction } from "express";
import "../config/passport";

/**
 * GET /login
 * Login page.
 */
export const getLogin = (req: Request, res: Response) => {
    if (req.user) {
        return res.redirect("/");
    }
    res.render("account/stage_login");
};

export const getSignUp = (req: Request, res: Response) => {
    if (req.user) {
        return res.redirect("/");
    }
    res.render("account/stage_signup");
};
