import {
    addProject,
    addTech, deleteProject, deleteTech, editProject, editTech,
    getAllProjects,
    getAllTech,
    getProjectById,
    getProjectByName,
    getTechById
} from "../controllers/portfolioController";
import cors from "cors";
import SingleRoute from "../../util/SingleRoute";
import {checkJwt} from "../../shared/middleware/authMiddleware";


// the authenticated field is from passport, we may either remove it or replace it
// but for now all non-passport request should have it as false
export const routes: SingleRoute[] = [
    // todo add auth for posts after some test tomorrow
    new SingleRoute("get", "/portfolio/projects", getAllProjects, [cors()]),
    new SingleRoute("get", "/portfolio/techs", getAllTech, [cors()]),
    new SingleRoute("get", "/portfolio/get_tech_by_id", getTechById, [cors()]),
    new SingleRoute("get", "/portfolio/get_project_by_id", getProjectById, [cors()]),
    new SingleRoute("get", "/portfolio/get_project_by_name", getProjectByName, [cors()]),
    new SingleRoute("post", "/portfolio/add_tech", addTech, [cors(), checkJwt]),
    new SingleRoute("post", "/portfolio/add_project", addProject, [cors(), checkJwt]),
    new SingleRoute("post", "/portfolio/edit_tech", editTech, [cors(), checkJwt]),
    new SingleRoute("post", "/portfolio/edit_project", editProject, [cors(), checkJwt]),
    new SingleRoute("post", "/portfolio/delete_tech", deleteTech, [cors(), checkJwt]),
    new SingleRoute("post", "/portfolio/delete_project", deleteProject, [cors(), checkJwt]),
];
