import {Request, Response} from "express";
import DatabaseHandler from "../cms/databaseHandler";
import ExternalDbManagementController from "./externalDbManagementController";
import {getRepository} from "typeorm";

export default class EditEntityController {

    static save = async (req: Request, res: Response) => {
        EditEntityController.saveEntry(req.body, req.body.dataFor)
            .then(e => {
                if(e.id) {
                    req.flash("info", { msg: `id: ${e.id} saved` });
                } else {
                    req.flash("info", { msg: `id: ${req.body.id} saved` });
                }
                res.redirect("/dbdata");
            });
    };

    static delete = async (req: Request, res: Response) => {
        if(!req.body.entityId) {
            req.flash("errors", { msg: "no entity id provided" });
            res.redirect("/dbdata");
        }
        if(!req.body.entity) {
            req.flash("errors", { msg: "no entity provided" });
            res.redirect("/dbdata");
        }
        // @ts-ignore
        const repo = getRepository(req.body.entity.charAt(0).toUpperCase() + req.body.entity.slice(1));
        repo.delete(req.body.entityId)
            .then(_ => {
                req.flash("info", { msg: `${req.body.entity}: ${req.body.entityId} deleted.` });
                res.redirect("/dbdata");
            })
            .catch(e => {
                req.flash("errors", { msg: `${e}` });
                res.redirect("/dbdata");
            });
    };

    static getEditPage = async (req: Request, res: Response) => {
        if(req.query.entity) {
            if(req.query.id) {
                const entityCap = req.query.entity.charAt(0).toUpperCase() + req.query.entity.slice(1);
                // @ts-ignore
                DatabaseHandler.getExternalDbConnectionWithParams(req.user.email)
                    .then(r => r.getRepository(entityCap))
                    .then(r => r.findOneOrFail({id: req.query.id}))
                    .then(r => {
                        res.render("cmsManagement/editEntity", {data: r, dataFor: entityCap});
                    })
                    .catch(e => {
                        res.send({notFound: `${entityCap}: ${req.query.id}`});
                    });
            } else {
                // @ts-ignore
                const x = await ExternalDbManagementController.getMetadataFromList([req.query.entity.charAt(0).toUpperCase() + req.query.entity.slice(1)], req.user.email);
                return res.render("cmsManagement/editEntity", {data: x, dataFor: req.query.entity.charAt(0).toUpperCase() + req.query.entity.slice(1)});
            }
        }
    };

    private static saveEntry = async (entry: any, type: string) => {
        const repo = getRepository(type);
        delete entry.dataFor;
        try {
            if(entry.id && entry.id.trim().length > 0 && entry.id * 1 > -1) {
                return await repo.update(entry.id, entry);
            }
            delete entry.id;
            return await repo.save(entry);
        } catch (e) {
            console.log(e);
            return e;
        }
    }
}
