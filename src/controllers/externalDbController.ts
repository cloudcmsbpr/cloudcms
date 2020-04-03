import {Request, Response} from "express";
import {IsAnyUndefined} from "../util/helpers";
import {AttachedDatabaseModel} from "../models/AttachedDatabase";
import {encrypt} from "../util/cryptoHelper";

export default class ExternalDbController {

    static create = async (req: Request, res: Response) => {
        const {type, host, port, username, password, database, name} = req.body;

        if (IsAnyUndefined(type, host, port, username, password, database, name,))
            return res.status(500).send({error: req.body, reason: "some were undefined"});

        if(type.toLowerCase() !== "postgres")
            return res.status(500).send({error: "Only postgres is supported"});

        const attachedDb = new AttachedDatabaseModel();
        attachedDb.type = type;
        attachedDb.host = host;
        attachedDb.port = Number(port);
        attachedDb.username = username;
        attachedDb.password = encrypt(password);
        attachedDb.database = database;
        attachedDb.name = name;
        // @ts-ignore
        attachedDb.userEmail = req.user.email;

        console.log(attachedDb);

        await attachedDb.save(err => {
            if(err) {
                // res.status(501).send({data: err})
                return res.status(200).redirect("/externaldb/mydatabases");
            }
            return res.status(200).redirect("/externaldb/mydatabases");
        });
    };

    static getAll = async (req: Request, res: Response) => {

        // @ts-ignore
        const email = req.user.email;

        AttachedDatabaseModel.find({userEmail: email}, (err, data) => {
            if(err) return res.render("cmsManagement/allExternalDbs.pug",
                {data: [], error: err});
            return res.render("cmsManagement/allExternalDbs.pug",
                {data: data, error: null});
        });
    };

    static delete = async (req: Request, res: Response) => {
        AttachedDatabaseModel.deleteOne({_id: req.body._id}, () => {
            return res.redirect("/externaldb/mydatabases");
        });
    };

    static getCreatePage = async (req: Request, res: Response) => {
        return res.render("cmsManagement/attachExternalDb", {});
    };
}
