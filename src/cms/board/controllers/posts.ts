import { Request, Response } from "express";
import {Post} from "../models/Post";
import {edit, foof, remove, save} from "../../shared/helpers/databaseHelpers";
import {getRepository} from "typeorm";

function create<T>(req: Request, params: string[]): any {
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

export const createNewPost = async (req: Request, res: Response) => {
    const requiredFields = ["name", "description", "Post_image"];

    const parsed = create<Post>(req, requiredFields);
    if (!parsed[0]) return res.status(500).send(parsed[1] + " is missing in the request body");
    return await save<Post>(parsed, res, Post);
};

export const getPostById = async (req: Request, res: Response) => {
    if (!(req.body.id || req.query.id))
        return res.status(404).send("No id provided");
    return await foof(req.body.id || req.params.id, Post, res);
};

export const getAllPosts = async (req: Request, res: Response) => {
    const repo = getRepository(Post);
    try {
        const all = await repo.find({cache: true});
        return res.send(all);
    } catch (e) {
        return res.status(404).send("No techs found");
    }
};

export const editPost = async (req: Request, res: Response) => {
    return await edit<Post>(req.body.id || req.body.name, res, Post, req.body);
};

export const deletePost = async (req: Request, res: Response) => {
    return await remove<Post>(req.body.id || req.body.name, res, Post);
};

