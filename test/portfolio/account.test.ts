import axios from "axios";

import * as jwt from "jsonwebtoken";
import {SESSION_SECRET} from "../../src/util/secrets";

const username = "user1@mail.com";
const password = "password123";
const path = "http://localhost:5000";
let userId = 0;


// generate valid token for this test session
const token = jwt.sign(
    { userId: userId, username: username }, SESSION_SECRET,
    { expiresIn: "1h" }
);

test("create user account", () => {
    expect.assertions(1);
    return axios.post(path + "/users/signup",
        {username: username, password: password}).then((res: any) => {
        expect(res.status).toEqual(201);
    });
});

test("login", () => {
    expect.assertions(1);
    return axios.post(path + "/users/login", {username: username, password: password}).then((res: any) => {
        expect(res.status).toEqual(200);
    });
});

test("get all users and user created", () => {
    expect.assertions(3);
    return axios.get(path + "/users/getall", {headers: {auth: token}}).then((res: any) => {
        const d: [] = res.data;
        expect(d.filter(e => e["username"] === "user1").length).toEqual(1);
        userId = d.filter(e => e["username"] === "user1")[0]["id"];
        expect(res.status).toEqual(200);
        expect(userId).toBeGreaterThan(-1);
    });
});

test("delete user account", () => {
    expect.assertions(1);
    return axios.post(path + "/users/delete",
        {userId: userId}, {headers: {auth: token}}).then((res: any) => {
        expect(res.status).toEqual(204);
    });
});
