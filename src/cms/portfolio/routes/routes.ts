import {getAllProjects} from "../controllers/projects";
import SingleRoute from "../../util/SingleRoute";

export const routes: SingleRoute[] = [
    // {type: 'get', path: 'projects', controller: getAllProjects, authenticated: true},
    new SingleRoute('get', '/projects', getAllProjects, true)
];
