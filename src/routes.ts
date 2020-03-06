import express from "express";
import * as homeController from "./controllers/home";
import * as contactController from "./controllers/contact";
import * as passportConfig from "./config/passport";
import * as userController from "./controllers/user";
import {routes as portfolioRoutes} from "./cms/portfolio/routes/routes";
import {routes as blogRoutes} from "./cms/blog/routes/routes";
import {routes as boardRoutes} from "./cms/board/routes/routes";
import SingleRoute from "./cms/util/SingleRoute";

export default class Routes {
    
    app: express.Application;
    
    constructor(app: express.Application) {
        this.app = app;
    }
    
    setRoutes() {
        this.app.get("/", homeController.index);
        this.app.get("/login", userController.getLogin);
        this.app.post("/login", userController.postLogin);
        this.app.get("/logout", userController.logout);
        this.app.get("/forgot", userController.getForgot);
        this.app.post("/forgot", userController.postForgot);
        this.app.get("/reset/:token", userController.getReset);
        this.app.post("/reset/:token", userController.postReset);
        this.app.get("/signup", userController.getSignup);
        this.app.post("/signup", userController.postSignup);
        this.app.get("/contact", contactController.getContact);
        this.app.post("/contact", contactController.postContact);
        this.app.get("/account", passportConfig.isAuthenticated, userController.getAccount);
        this.app.post("/account/profile", passportConfig.isAuthenticated, userController.postUpdateProfile);
        this.app.post("/account/password", passportConfig.isAuthenticated, userController.postUpdatePassword);
        this.app.post("/account/delete", passportConfig.isAuthenticated, userController.postDeleteAccount);
        this.app.get("/account/unlink/:provider", passportConfig.isAuthenticated, userController.getOauthUnlink);
        this.setPortfolioRoutes();
        this.setBlogRoutes();
        this.setBoardRoutes();
    }

    setPortfolioRoutes() {
        portfolioRoutes.forEach(e => this.parseRoutes(e));
    }

    setBlogRoutes() {
        blogRoutes.forEach(e => this.parseRoutes(e));
    }

    setBoardRoutes() {
        boardRoutes.forEach(e => this.parseRoutes(e));
    }

    private parseRoutes(e: SingleRoute) {
        if(e.type === 'get') {
            if(e.authenticated) {
                this.app.get(e.path, passportConfig.isAuthenticated, e.controller);
            } else {
                this.app.get(e.path, e.controller);
            }
        } else {
            if(e.authenticated) {
                this.app.post(e.path, passportConfig.isAuthenticated, e.controller);
            } else {
                this.app.post(e.path, e.controller);
            }
        }
    }
}
