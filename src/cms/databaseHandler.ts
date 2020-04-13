import "reflect-metadata";
import {Connection, createConnection, getConnectionManager} from "typeorm";
import {AttachedDatabaseModel} from "../models/AttachedDatabase";
import {decrypt} from "../util/cryptoHelper";
import {User as StageUser} from "./shared/models/User";
import {Board} from "./board/models/Board";
import {Post} from "./board/models/Post";
import {Tech} from "./portfolio/models/Tech";
import {Project} from "./portfolio/models/Project";

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
                resolve(getConnectionManager().get("default"));
            }
            catch {
                AttachedDatabaseModel.findOne({"userEmail": userEmail}, (err, attachedDb) => {
                    if (err) {
                        console.log(err);
                    }
                    if (attachedDb.type === "postgres" || attachedDb.type === "mongodb") {
                        resolve(createConnection({
                            type: attachedDb.type, host: attachedDb.host, port: attachedDb.port,
                            username: attachedDb.username, password: decrypt(attachedDb.password),
                            database: attachedDb.database,
                            entities: [StageUser, Board, Post, Tech, Project],
                            synchronize: true, logging: false
                        })); // todo: this have to be imported based on the selected template
                    } else {
                        reject("Connection type must be postgres | mongodb");
                    }
                });
            }
        });
    }
}
