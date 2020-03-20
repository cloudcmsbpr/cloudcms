import {
    addProject,
    addTech, deleteProject, deleteTech, editProject, editTech,
    getAllProjects,
    getAllTech,
    getProjectById,
    getProjectByName,
    getTechById
} from "../controllers/portfolioController";
import SingleRoute from "../../util/SingleRoute";
import AuthController from "../../shared/controllers/authController";
import { checkJwt } from "../../shared/middleware/authMiddleware";
import UserController from "../../shared/controllers/userController";


// the authenticated field is from passport, we may either remove it or replace it
// but for now all non-passport request should have it as false
export const routes: SingleRoute[] = [
    // todo add auth for posts after some test tomorrow
    new SingleRoute("get", "/portfolio/projects", getAllProjects, [checkJwt]),
    new SingleRoute("get", "/portfolio/projects", getAllProjects, []),
    new SingleRoute("get", "/portfolio/techs", getAllTech, []),
    new SingleRoute("get", "/portfolio/get_tech_by_id", getTechById, []),
    new SingleRoute("get", "/portfolio/get_project_by_id", getProjectById, []),
    new SingleRoute("get", "/portfolio/get_project_by_name", getProjectByName, []),
    new SingleRoute("post", "/portfolio/add_tech", addTech, []),
    new SingleRoute("post", "/portfolio/add_project", addProject, []),
    new SingleRoute("post", "/portfolio/edit_tech", editTech, []),
    new SingleRoute("post", "/portfolio/edit_project", editProject, []),
    new SingleRoute("post", "/portfolio/delete_tech", deleteTech, []),
    new SingleRoute("post", "/portfolio/delete_project", deleteProject, []),
    new SingleRoute("post", "/users/login", AuthController.login, []), // login
    new SingleRoute("post", "/users/signup", UserController.newUser, []), // signup
    new SingleRoute("get", "/users/getall", UserController.listAll,  [checkJwt]), // sample get with jwt
    new SingleRoute("post", "/users/delete", UserController.deleteUser,  [checkJwt]), // sample get with jwt
];
