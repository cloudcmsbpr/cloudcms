import {Request, Response} from "express";
import {getRepository} from "typeorm";
import {edit, foof, remove, save} from "../../shared/helpers/databaseHelpers";
import {Board} from "../models/Board";
import {parseRequiredFields} from "../../shared/helpers/controllerHelpers";

export const createNewBoard = async (req: Request, res: Response) => {
    const requiredFields = ["name", "description", "board_image"];

    const parsed = parseRequiredFields<Board>(req, requiredFields);
    if (!parsed[0]) return res.status(500).send(parsed[1] + " is missing in the request body");
    return await save<Board>(parsed, res, Board);
};

export const getBoardById = async (req: Request, res: Response) => {
    if (!(req.body.id || req.query.id))
        return res.status(404).send("No id provided");
    return await foof(req.body.id || req.params.id, Board, res);
};

export const getAllBoards = async (req: Request, res: Response) => {
    const repo = getRepository(Board);
    try {
        const all = await repo.find({cache: true});
        return res.send(all);
    } catch (e) {
        return res.status(404).send("No techs found");
    }
};

// todo - Does not edit - creates new instance with different data
export const editBoard = async (req: Request, res: Response) => {
    return await edit<Board>(req.body.id || req.body.name, res, Board, req.body);
};

    export const deleteBoard = async (req: Request, res: Response) => {
    return await remove<Board>(req.body.id || req.body.name, res, Board);
};

