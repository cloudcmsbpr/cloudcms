import "reflect-metadata";
import {Connection, createConnection, getConnectionManager} from "typeorm";
import {AttachedDatabaseModel} from "../models/AttachedDatabase";
import {decrypt} from "../util/cryptoHelper";
import {allEntities} from "../util/allEntities";

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
                                entities: allEntities,
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
