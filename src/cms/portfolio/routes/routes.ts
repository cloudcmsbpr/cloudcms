import {getAllProjects} from "../controllers/projects";
import SingleRoute from "../../util/SingleRoute";
import AuthController from "../../shared/controllers/authController";
import { checkJwt } from "../../shared/middleware/authMiddleware";
import UserController from "../../shared/controllers/userController";


// the authenticated field is from passport, we may either remove it or replace it
// but for now all non-passport request should have it as false
export const routes: SingleRoute[] = [
    // {type: 'get', path: 'projects', controller: getAllProjects, authenticated: true},
    new SingleRoute("get", "/projects", getAllProjects, false),
    new SingleRoute("post", "/users/login", AuthController.login, false), // login
    new SingleRoute("post", "/users/signup", UserController.newUser, false), // signup
    new SingleRoute("post", "/users/getall", UserController.listAll, false, [checkJwt]), // sample get with jwt
];
