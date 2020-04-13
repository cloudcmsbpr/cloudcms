import {Request, Response} from "express";
import {Board} from "../cms/board/models/Board";
import {Post} from "../cms/board/models/Post";
import DatabaseHandler from "../cms/databaseHandler";
import {UserDocument} from "../models/User";
import {Tech} from "../cms/portfolio/models/Tech";
import {Project} from "../cms/portfolio/models/Project";

export default class DatabaseDataController {

    static getDatabaseDataPage = async (req: Request, res: Response) => {
        return await DatabaseDataController.getDatabaseData(req)
            // .then(res => DatabaseDataController.objectToArray(res))
            .then(data => {
                res.render("cmsManagement/dbData", {dbdata: data});
            })
            .catch(err => {
                req.flash("errors", err);
                res.render("cmsManagement/dbData");
            });
    };

    private static getDatabaseData = async (req: Request) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const data: any = {};
        // @ts-ignore
        switch (req.user.selected * 1) {
            case 1:
                return {};
            case 2:
                try {
                    // @ts-ignore
                    data.boards = await DatabaseDataController.getAllDataFromDatabase(Board, req.user);
                    // @ts-ignore
                    data.posts = await DatabaseDataController.getAllDataFromDatabase(Post, req.user);
                } catch (e) {
                    console.log(e);
                }
                return await data;
            case 3:
                try {
                    // @ts-ignore
                    data.techs = await DatabaseDataController.getAllDataFromDatabase(Tech, req.user);
                    // @ts-ignore
                    data.projects = await DatabaseDataController.getAllDataFromDatabase(Project, req.user);
                } catch (e) {
                    console.log(e);
                }
                return await data;
            default:
                return {};
        }
    };

    private static getAllDataFromDatabase = async (req: string, user: UserDocument) => {
        return await DatabaseHandler.getExternalDbConnectionWithParams(user.email)
            .then(res => res.getRepository(req))
            .then(res => res.find({cache: true})).then(r => {
                return r;
            });
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static objectToArray = (e: any) => {
        return Object.keys(e).map(function (index) {
            return e[index];
        });
    }

}
