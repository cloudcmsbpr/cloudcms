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
import { checkJwt } from "../../shared/middleware/authMiddleware";


// the authenticated field is from passport, we may either remove it or replace it
// but for now all non-passport request should have it as false
export const routes: SingleRoute[] = [
    // todo add auth for posts after some test tomorrow
    new SingleRoute("get", "/portfolio/projects", getAllProjects, []),
    new SingleRoute("get", "/portfolio/techs", getAllTech, []),
    new SingleRoute("get", "/portfolio/get_tech_by_id", getTechById, []),
    new SingleRoute("get", "/portfolio/get_project_by_id", getProjectById, []),
    new SingleRoute("get", "/portfolio/get_project_by_name", getProjectByName, []),
    new SingleRoute("post", "/portfolio/add_tech", addTech, [checkJwt]),
    new SingleRoute("post", "/portfolio/add_project", addProject, [checkJwt]),
    new SingleRoute("post", "/portfolio/edit_tech", editTech, [checkJwt]),
    new SingleRoute("post", "/portfolio/edit_project", editProject, [checkJwt]),
    new SingleRoute("post", "/portfolio/delete_tech", deleteTech, [checkJwt]),
    new SingleRoute("post", "/portfolio/delete_project", deleteProject, [checkJwt]),
];
