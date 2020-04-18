import {Request, Response} from "express";
import {getRepository} from "typeorm";
import {Tech} from "../models/Tech";
import {Project} from "../models/Project";
import {edit, foof, remove, save} from "../../shared/helpers/databaseHelpers";




export function create<T>(req: Request, params: string[]): any {
    const pDic: any = {};
    for (const i of params) {
        if (!req.body[i]) {
            return [false, i];
        } else {
            pDic[i] = req.body[i];
        }
    }
    return [true, (pDic) as T];
}

export const addTech = async (req: Request, res: Response) => {
    const requiredFields = ["name", "description", "image_url"];

    const parsed = create<Tech>(req, requiredFields);
    if (!parsed[0]) return res.status(500).send(parsed[1] + " is missing in the request body");
    return await save<Tech>(parsed, res, Tech);
};

export const getTechById = async (req: Request, res: Response) => {
    if (!(req.body.id || req.query.id))
        return res.status(404).send("No id provided");
    return await foof(req.body.id || req.params.id, Tech, res);
};

export const getAllTech = async (req: Request, res: Response) => {
    const repo = getRepository(Tech);
    try {
        const all = await repo.find({cache: true});
        return res.send(all);
    } catch (e) {
        return res.status(404).send("No techs found");
    }
};

export const editTech = async (req: Request, res: Response) => {
    return await edit<Tech>(req.body.id || req.body.name, res, Tech, req.body);
};

export const addProject = async (req: Request, res: Response) => {
    const requiredFields = ["name", "description", "image_url", "start_date", "end_date", "techs",
        "git_link", "web_link", "other"];
    const parsed = create<Project>(req, requiredFields);
    await save<Project>(parsed, res, Project);
};

export const getProjectById = async (req: Request, res: Response) => {
    if (!(req.body.id || req.query.id))
        return res.status(404).send("No id provided");
    return await foof<Project>(req.body.id || req.params.id, Project, res);
};

export const getProjectByName = async (req: Request, res: Response) => {
    if (!(req.body.name || req.query.name))
        return res.status(404).send("No name provided");
    return await foof<Project>({name: req.body.name ? req.body.name : req.query.name}, Project, res);
};

export const getAllProjects = async (req: Request, res: Response) => {
    const repo = getRepository(Project);
    try {
        const all = await repo.find({
            order: {
                name: "ASC",
            }
        });
        return res.send(all);
    } catch (e) {
        return res.status(404).send("No projects found");
    }
};

export const editProject = async (req: Request, res: Response) => {
    return await edit<Project>(req.body.id || req.body.name, res, Project, req.body);
};

export const deleteTech = async (req: Request, res: Response) => {
    return await remove<Tech>(req.body.id || req.body.name, res, Tech);
};

export const deleteProject = async (req: Request, res: Response) => {
    return await remove<Project>(req.body.id || req.body.name, res, Project);
};






