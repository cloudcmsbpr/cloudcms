import {Request, Response, NextFunction} from "express";
import {Blog} from "../models/Blog";
import {getRepository} from "typeorm";
import {check, sanitize} from "express-validator";
import {edit, foof, remove, save} from "../../shared/helpers/databaseHelpers";
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

export const addBlog = async (req: Request, res: Response) => {
    const requiredFields = ["name", "author", "blogPosts"];
    const parsed = create<Blog>(req, requiredFields);
    await save<Blog>(parsed, res, Blog);
};

export const getBlogById = async (req: Request, res: Response) => {
    if (!req.body.id || req.query.id) {
        return res.status(404).send("No id provided");
    }
    return await foof<Blog>({name: req.body.id ? req.body.id : req.query.id}, Blog, res);
};

export const editBlog = async (req: Request, res: Response) => {
    return await edit<Blog>(req.body.id || req.body.name, res, Blog, req.body);
};

export const deleteBlog = async (req: Request, res: Response) => {
    return await remove<Blog>(req.body.id || req.body.name, res, Blog);
};
