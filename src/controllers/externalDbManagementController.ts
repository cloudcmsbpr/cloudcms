import {Request, Response} from "express";
import {Tech} from "../cms/portfolio/models/Tech";
import {Project} from "../cms/portfolio/models/Project";
import DatabaseHandler from "../cms/databaseHandler";
import {EntitySchema} from "typeorm";


export default class ExternalDbManagementController {
    static getMainPage = async (req: Request, res: Response) => {
        return await ExternalDbManagementController.handleSelectedSchema(req)
            .then(data => {res.render("cmsManagement/databaseManagement", {schema: data});})
            .catch(() => {
                return res.render("cmsManagement/databaseManagement", {schema: null});
            });
    };

    private static handleSelectedSchema = async (req: Request) => {
        // @ts-ignore
        switch (req.user.selected * 1) {
            case 1:
                return {};
            case 2:
                // @ts-ignore
                return await ExternalDbManagementController.getMetadataFromList(["Board", "Post"], req.user.email);
            case 3:
                // @ts-ignore
                return await ExternalDbManagementController.getMetadataFromList(["Tech", "Project"], req.user.email);
            default:
                return {};
        }
    };

    public static getMetadataFromList = async (list: string[], userEmail: string) => {
        return await Promise.all(list.map(e => {
            return ExternalDbManagementController.getEntityMetadata(e, userEmail);
        })).then((res) => {
            const ass = {};
            for(let i = 0; i < list.length; i++) {
                // @ts-ignore
                ass[list[i]] = res[i];
            }
            return ass;
        });
    };

    private static getEntityMetadata = async (e: string, userEmail: string) => {
        return await DatabaseHandler.getExternalDbConnectionWithParams(userEmail)
            .then(res => res.getMetadata(e))
            .then(res => res.propertiesMap);
    }
}
