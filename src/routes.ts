import express from "express";
import * as homeController from "./controllers/home";
import * as contactController from "./controllers/contact";
import * as passportConfig from "./config/passport";
import * as userController from "./controllers/user";
import {routes as portfolioRoutes} from "./cms/portfolio/routes/routes";
import {routes as blogRoutes} from "./cms/blog/routes/routes";
import {routes as boardRoutes} from "./cms/board/routes/routes";
import SingleRoute from "./cms/util/SingleRoute";
import externalDbController from "./controllers/externalDbController";
import selectTemplateController from "./controllers/selectTemplateController";
import externalDbManagementController from "./controllers/externalDbManagementController";
import databaseDataController from "./controllers/databaseDataController";
import editEntityController from "./controllers/editEntityController";
import AuthController from "./cms/shared/controllers/authController";
import UserController from "./cms/shared/controllers/userController";
import {checkJwt} from "./cms/shared/middleware/authMiddleware";
import cors from "cors";

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
        // this.app.get("/signup", userController.getSignup);
        // this.app.post("/signup", userController.postSignup);
        this.app.get("/contact", contactController.getContact);
        this.app.post("/contact", contactController.postContact);
        this.app.get("/account", passportConfig.isAuthenticated, userController.getAccount);
        this.app.post("/account/profile", passportConfig.isAuthenticated, userController.postUpdateProfile);
        this.app.post("/account/password", passportConfig.isAuthenticated, userController.postUpdatePassword);
        this.app.post("/account/delete", passportConfig.isAuthenticated, userController.postDeleteAccount);
        this.app.get("/account/unlink/:provider", passportConfig.isAuthenticated, userController.getOauthUnlink);

        // external db crud
        this.app.post("/externaldb/create", passportConfig.isAuthenticated, externalDbController.create);
        this.app.post("/externaldb/delete", passportConfig.isAuthenticated, externalDbController.delete);
        this.app.get("/externaldb", passportConfig.isAuthenticated, externalDbController.getCreatePage);
        this.app.get("/externaldb/mydatabases", passportConfig.isAuthenticated, externalDbController.getAll);

        // select template
        this.app.get("/template", passportConfig.isAuthenticated, selectTemplateController.getSelectTemplatePage);
        this.app.post("/template/select", passportConfig.isAuthenticated, selectTemplateController.setTemplate);

        // database management
        this.app.get("/dbManagement", passportConfig.isAuthenticated, externalDbManagementController.getMainPage);

        // database data
        this.app.get("/dbdata", passportConfig.isAuthenticated, databaseDataController.getDatabaseDataPage);

        // edit entity data
        this.app.post("/saveEntity", passportConfig.isAuthenticated, editEntityController.save);
        this.app.post("/deleteEntity", passportConfig.isAuthenticated, editEntityController.delete);
        this.app.get("/editEntity", passportConfig.isAuthenticated, editEntityController.getEditPage);
        
        // user routes
        this.app.post("/users/login", [cors()], AuthController.login); // login
        this.app.post("/users/signup", [cors()], UserController.newUser); // signup
        this.app.get("/users/getall", [cors(), checkJwt], UserController.listAll); // sample get with jwt
        this.app.post("/users/delete", [cors(), checkJwt], UserController.deleteUser); // sample get with jwt

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
        if (e.type === "get") {
            this.app.get(e.path, e.middleware, e.controller);
        } else {
            this.app.post(e.path, e.middleware, e.controller);
        }
    }
}
