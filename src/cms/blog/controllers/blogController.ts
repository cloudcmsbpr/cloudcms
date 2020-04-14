import {Request, Response, NextFunction} from "express";
import {Blog} from "../models/Blog";
import {BlogPost} from "../models/BlogPost";
import {getRepository} from "typeorm";
import {check, sanitize} from "express-validator";
import {save} from "../../shared/helpers/databaseHelpers";
import {create} from "../../portfolio/controllers/portfolioController";

export const getAllBlogs = async (req: Request, res: Response) => {
    const repo = getRepository(Blog);
    try {
        const all = await repo.find({});
        return res.send(all);
    } catch (e) {
        return res.status(404).send("No blogs found");
    }
};

export const getAllPosts = async (req: Request, res: Response) => {
    const repo = getRepository(BlogPost);
    try {
        const all = await repo.find({});
        return res.send(all);
    } catch (e) {
        return res.status(404).send("No posts found");
    }
};

export const addBlog = async (req: Request, res: Response) => {
    const requiredFields = ["name", "author"];
    const parsed = create<Blog>(req, requiredFields);
    if (!parsed[0]) {
        return res.status(500).send(parsed[1] + " is missing in the request body");
    }
    return save<Blog>(parsed, res, Blog)
        .then(_ => {
            res.send(parsed[1]);
        })
        .catch(e => {
            return res.send(e);
        });
};
