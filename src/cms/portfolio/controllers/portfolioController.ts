import {Request, Response} from "express";
import {getRepository, ObjectType} from "typeorm";
import {Tech} from "../models/Tech";
import {Project} from "../models/Project";


export const getAllTech = async (req: Request, res: Response) => {
    const repo = getRepository(Tech);
    try {
        const all = await repo.find({cache: true});
        return res.send(all);
    } catch (e) {
        return res.status(404).send("No techs found");
    }
};

export const getTechById = async (req: Request, res: Response) => {
    if (!req.body.id || !req.params.id)
        return res.status(404).send("No id provided");
    return await foof(req.body.id || req.params.id, Tech, res)
};

export const getProjectById = async (req: Request, res: Response) => {
    if (!req.body.id || !req.params.id)
        return res.status(404).send("No id provided");
    return await foof<Project>(req.body.id || req.params.id, Project, res)
};

export const getAllProjects = async (req: Request, res: Response) => {
    const repo = getRepository(Project);
    try {
        const all = await repo.find({cache: true});
        return res.send(all);
    } catch (e) {
        return res.status(404).send("No projects found");
    }
};

export const getProjectByName = async (req: Request, res: Response) => {
    if (!req.body.name || !req.params.name)
        return res.status(404).send("No name provided");
    return await foof<Project>({name: req.body.name || !req.params.name}, Project, res)
};

export const addTech = async (req: Request, res: Response) => {
    const required_fields = ['name', 'description', 'image_url'];

    const parsed = create<Tech>(req, required_fields);
    if (!parsed[0]) return res.status(500).send(parsed[1] + ' is missing in the request body');
    return await save<Tech>(parsed, res, Tech);
};

export const addProject = async (req: Request, res: Response) => {
    const required_fields = ['name', 'description', 'image_url', 'start_date', 'end_date', 'techs',
        'git_link', 'web_link', 'other'];
    const parsed = create<Project>(req, required_fields);
    await save<Project>(parsed, res, Project)
};

export const editTech = async (req: Request, res: Response) => {
    return await edit<Tech>(req.body.id || req.body.name, res, Tech, req.body);
};

export const deleteTech = async (req: Request, res: Response) => {
    return await remove<Tech>(req.body.id || req.body.name, res, Tech);
};

export const editProject = async (req: Request, res: Response) => {
    return await edit<Project>(req.body.id || req.body.name, res, Project, req.body);
};

export const deleteProject = async (req: Request, res: Response) => {
    return await remove<Project>(req.body.id || req.body.name, res, Project);
};

async function save<T>(data: [boolean, any], res: Response, type: ObjectType<T>) {
    if (!data[0]) return res.status(500).send(data[1] + ' is missing in the request body');
    const repo = getRepository(type);
    try {
        await repo.save(data[1]);
    } catch (e) {
        return res.status(500).send('Something went wrong while saving')
    }
    return res.send(data[1]);
}

async function remove<T>(param: any, res: Response, type: ObjectType<T>) {
    const repo = getRepository(type);
    try {
        const dbResult: any = await repo.findOneOrFail(param);
        await repo.delete(dbResult['id']).then(() =>
            res.send(dbResult))
            .catch(err => res.status(500).send(err))
    } catch (e) {
        return res.status(404).send("Nothing found for " + type);
    }
}

async function edit<T>(param: any, res: Response, type: ObjectType<T>, editData: {}) {
    const repo = getRepository(type);
    try {
        let dbResult: any = await repo.findOneOrFail(param);
        dbResult = {...editData};
        await repo.save(dbResult).then(() =>
            res.send(dbResult))
            .catch(err => res.status(500).send(err))
    } catch (e) {
        return res.status(404).send("Nothing found for " + type);
    }
}

async function foof<T>(param: any, type: ObjectType<T>, res: Response) {
    const repo = getRepository(type);
    try {
        const project = await repo.findOneOrFail(param);
        return res.send(project);
    } catch (e) {
        return res.status(404).send("Nothing found for " + type);
    }
}

function create<T>(req: Request, params: string[]): any {
    let p_dic: any = {};
    for (let i of params) {
        if (!req.body[i]) {
            return [false, i];
        } else {
            p_dic[i] = req.body[i];
        }
    }
    return [true, <T>(p_dic)];
}


