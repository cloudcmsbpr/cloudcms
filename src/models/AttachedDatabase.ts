import * as mongoose from "mongoose";
import {encrypt} from "../util/cryptoHelper";

export type AttachedDatabase = mongoose.Document & {
    type: string;
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
    name: string;
    userEmail: string;
}

const attachedDbSchema = new mongoose.Schema({
    type: String,
    host: String,
    port: Number,
    username: String,
    password: String,
    database: String,
    name: String,
    userEmail: String,
}, {timestamps: true});

// attachedDbSchema.pre("save", (next) => {
//     const db = this as unknown as AttachedDatabase;
//     db.password = encrypt(db.password);
//     return next();
// });

export const AttachedDatabaseModel = mongoose.model<AttachedDatabase>("AttachedDatabaseModel", attachedDbSchema);

