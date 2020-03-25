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

export const editBoard = async (req: Request, res: Response) => {
    return await edit<Board>(req.body.id || req.body.name, res, Board, req.body);
};

export const deleteBoard = async (req: Request, res: Response) => {
    return await remove<Board>(req.body.id || req.body.name, res, Board);
};

// Maybe not needed because all users is consumed by users frontend.
// export const addSubscriber =  async (req: Request, res: Response) => {
//     const requiredFields = ["boardId", "userId"];
//
//     const repo = getRepository<Board>("Board");
//     const userRepository = getRepository<User>("User");
//     const parsed = create<Board>(req, requiredFields);
//     if (!parsed[0]) return res.status(500).send(parsed[1] + " is missing in the request body");
//     try {
//         const user:  User = await userRepository.findOne(req.body.userId);
//         const board: Board = await repo.findOne(req.body.boardId);
//         board.subscribers.push(user);
//         return await edit(req.body.id, res, Board, board);
//     }
//     catch(e){
//         return res.status(500).send(e);
//     }
// };




