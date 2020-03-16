import axios from "axios";

const username = "test";
const password = "test";
const path = "http://localhost:5000";
let token = "123";

test("get projects without token", () => {
    expect.assertions(1);
    return axios.get(path + "/projects").catch((err: any) => {
        expect(err.response.status).toEqual(401);
    });
});

test("login", () => {
    expect.assertions(2);
    return axios.post(path + "/users/login", {username, password}).then((res: any) => {
        expect(res.status).toEqual(200);
        expect(res.data.length).toEqual(167);
        token = res.data;
    });
});

test("get projects with token", () => {
    expect.assertions(1);
    return axios.get(path + "/projects", {headers: {auth: token}}).then((res: any) => {
        expect(res.status).toEqual(200);
    });
});
