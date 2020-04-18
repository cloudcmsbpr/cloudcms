import {Request, Response} from "express";
import {IsAnyUndefined} from "../util/helpers";
import {AttachedDatabaseModel} from "../models/AttachedDatabase";
import {decrypt, encrypt} from "../util/cryptoHelper";
import DatabaseHandler from "../cms/databaseHandler";
import {User as StageUser} from "../cms/shared/models/User";
import {Board} from "../cms/board/models/Board";
import {Post} from "../cms/board/models/Post";
import {Tech} from "../cms/portfolio/models/Tech";
import {Project} from "../cms/portfolio/models/Project";
import {createConnection} from "typeorm";

export default class ExternalDbController {

    static create = async (req: Request, res: Response) => {

        const required = ["type", "host", "port", "username", "password", "database", "name"];
        const {type, host, port, username, password, database, name} = req.body;

        const u = IsAnyUndefined(req.body, required);
        if (u) {
            req.flash("errors", {msg: `${u} is mandatory and was not provided`});
            return res.redirect("/externaldb");
        }

        if(isNaN(port)) {
            req.flash("errors", {msg: "port must be a number"});
            return res.redirect("/externaldb");
        }

        if(type.toLowerCase() !== "postgres") {
            req.flash("errors", {msg: "Only postgres is supported"});
            return res.redirect("/externaldb");
        }

        const attachedDbInfo = new AttachedDatabaseModel();
        attachedDbInfo.type = type;
        attachedDbInfo.host = host;
        attachedDbInfo.port = Number(port);
        attachedDbInfo.username = username;
        attachedDbInfo.password = encrypt(password);
        attachedDbInfo.database = database;
        attachedDbInfo.name = name;
        // @ts-ignore
        attachedDbInfo.userEmail = req.user.email;

        // test the database

        createConnection({
            type: "postgres", host: attachedDbInfo.host, port: attachedDbInfo.port,
            username: attachedDbInfo.username, password: password,
            database: attachedDbInfo.database,
            entities: [StageUser, Board, Post, Tech, Project], // todo: move entities to a global var
            synchronize: true, logging: false
        })
            .then(() => { // connection successfully tested
                attachedDbInfo.save(err => {
                    if(err) {
                        req.flash("errors", {msg: err});
                        return res.redirect("/externaldb/mydatabases");
                    }
                    req.flash("info", {msg: "Database added successfully"});
                    return res.redirect("/externaldb/mydatabases");
                });
            })
            .catch(err => {
                req.flash("errors", {msg: "Database connection failed -> " + JSON.stringify(err)});
                return res.redirect("/externaldb/mydatabases");
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
