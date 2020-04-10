import crypto from "crypto";
import {SESSION_SECRET} from "./secrets";

const algorithm = "aes-192-cbc";
const password = SESSION_SECRET;
const key = crypto.scryptSync(password, "salt", 24);
const iv = "asdasdasdasdasda"; // this should be stored in env



export const encrypt = (text: string): string => {
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    let encrypted = cipher.update(text, "utf8", "hex");
    encrypted += cipher.final("hex");
    return encrypted;
};

export const decrypt = (text: string): string => {
    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    let decrypted = decipher.update(text, "hex", "utf8");
    decrypted += decipher.final("utf8");
    return decrypted;
};
