import "reflect-metadata";
import {Connection, createConnection} from "typeorm";

export default class DatabaseHandler {

    private static connection: Promise<Connection> = null;

    static getConnection() {
        if(!this.connection) {
            throw new Error("getConnection called before creating a connection, use createConnection first")
        }
        return this.connection;
    }
    
   static createConnection(type: string, host: string, port: number, username: string,
                            password: string, database: string, entities: any[]) {

        if(type === 'postgres' || type === 'mongodb') {
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
            })
        } else {
            throw new Error('Connection type must be postgres | mongodb')
        }

    }
}
