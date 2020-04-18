import "reflect-metadata";
import {Connection, createConnection, getConnectionManager} from "typeorm";
import {AttachedDatabaseModel} from "../models/AttachedDatabase";
import {decrypt} from "../util/cryptoHelper";
import {User as StageUser} from "./shared/models/User";
import {Board} from "./board/models/Board";
import {Post} from "./board/models/Post";
import {Tech} from "./portfolio/models/Tech";
import {Project} from "./portfolio/models/Project";
import {Blog} from "./blog/models/Blog";
import {BlogPost} from "./blog/models/BlogPost";

export default class DatabaseHandler {

    private static connection: Promise<Connection> = null;

    static getConnection() {
        if (!this.connection) {
            throw new Error("getConnection called before creating a connection, use createConnection first");
        }
        return this.connection;
    }

    static createConnection(type: string, host: string, port: number, username: string,
                            password: string, database: string, entities: any[]) {

        if (type === "postgres" || type === "mongodb") {
            this.connection = createConnection({
                type: type,
                host: host,
                port: port,
                username: username,
                password: password,
                database: database,
                entities: entities,
                synchronize: true,
                logging: false
            });
        } else {
            throw new Error("Connection type must be postgres | mongodb");
        }
    }

    static getExternalDbConnectionWithParams(userEmail: string): Promise<any> {
        return new Promise((resolve, reject) => {
            try {
                if (this.connection) {
                    resolve(this.connection);
                } else {
                    resolve(getConnectionManager().get("default"));
                }
            } catch {
                AttachedDatabaseModel.findOne({"userEmail": userEmail}, (err, attachedDbInfo) => {
                    if (err) {
                        console.log("-----------------------------");
                        console.log(err);
                        reject(err);
                    }
                    if (attachedDbInfo && (attachedDbInfo.type === "postgres" || attachedDbInfo.type === "mongodb")) {
                        try {
                            const con = createConnection({
                                type: attachedDbInfo.type, host: attachedDbInfo.host, port: attachedDbInfo.port,
                                username: attachedDbInfo.username, password: decrypt(attachedDbInfo.password),
                                database: attachedDbInfo.database,
                                entities: [StageUser, Board, Post, Tech, Project, Blog, BlogPost],
                                synchronize: true, logging: false
                            });
                            if (con) {
                                this.connection = con;
                                resolve(con);
                            }
                        } catch (e) {
                            console.log(e);
                            reject(e);
                        }
                    } else {
                        reject("Either no db attached or the connection type is wrong");
                    }
                });
            }
        });
    }
}
