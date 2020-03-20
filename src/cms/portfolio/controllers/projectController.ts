import { Request, Response } from "express";
import {projects} from "../models/Project";

/**
 * GET /projects
 * GET all projects example
 */
export const getAllProjects = (req: Request, res: Response) => {
    return res.json(projects);
};


