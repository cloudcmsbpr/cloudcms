import axios from "axios";
import * as jwt from "jsonwebtoken";
import {SESSION_SECRET} from "../../src/util/secrets";


const path = "http://localhost:5000";
const username = "user2";
const userId = 0;

let tech: any = {};
const project: any = {};

// generate valid token for this test session
const token = jwt.sign(
    { userId: userId, username: username }, SESSION_SECRET,
    { expiresIn: "1h" }
);

test("add tech", () => {
    expect.assertions(2);
    const data = {
        "name": "t1", "description": "some_tech", "image_url": "http://some_image"
    };
    return axios.post(path + "/portfolio/add_tech", data, {headers: {auth: token}}).then((res: any) => {
        tech = res.data;
        expect(res.status).toEqual(200);
        expect(res.data.name).toEqual(data.name);
    }).catch(err => console.log(err));
});

test("get tech by id", () => {
    expect.assertions(2);
    return axios.get(path + "/portfolio/get_tech_by_id", {
        params: {id: tech.id}
    }).then((res: any) => {
        expect(res.status).toEqual(200);
        expect(res.data.id).toEqual(tech.id);
    }).catch(err => console.log(err));
});

test("get all techs", () => {
    expect.assertions(3);
    return axios.get(path + "/portfolio/techs", {}).then((res: any) => {
        expect(res.status).toEqual(200);
        expect(res.data.length).toBeGreaterThan(0);
        expect(res.data.filter((e: any) =>
            e.id === tech.id).length).toEqual(1);
    }).catch(err => console.log(err));
});

test("edit tech", () => {
    expect.assertions(2);
    const data = {
        ...tech
    };
    data.name = Math.random().toString(36).substring(7);
    return axios.post(path + "/portfolio/edit_tech", data, {headers: {auth: token}}).then((res: any) => {
        expect(res.status).toEqual(200);
        expect(res.data.name).toEqual(data.name);
    }).catch(err => console.log(err));
});

// test("add project", () => {
//     expect.assertions(4);
//     const data = {
//         name: "BFP",
//         image_url: "some_image_url",
//         description: "some description",
//         start_date: new Date().toString(),
//         end_date: new Date().toString(),
//         git_link: "some git link",
//         web_link: "some_web_link",
//         other: "other data",
//         // @ts-ignore
//         techs: []
//     };
//     return axios.post(path + "/portfolio/add_project", data, {headers: {auth: token}}).then((res: any) => {
//         project = res.data;
//         expect(res.status).toEqual(200);
//         expect(res.data.name).toEqual(data.name);
//         expect(res.data.start_date).toEqual(data.start_date);
//         expect(res.data.web_link).toEqual(data.web_link);
//     }).catch(err => console.log(err));
// });

test("get project by id", () => {
    expect.assertions(2);
    return axios.get(path + "/portfolio/get_project_by_id", {
        params: {id: project.id}
    }).then((res: any) => {
        expect(res.status).toEqual(200);
        expect(res.data.id).toEqual(project.id);
    }).catch(err => console.log(err));
});

test("get project by name", () => {
    expect.assertions(3);
    return axios.get(path + "/portfolio/get_project_by_name", {
        params: {name: project.name}
    }).then((res: any) => {
        expect(res.status).toEqual(200);
        expect(res.data.name).toEqual(project.name);
        expect(res.data.id).toEqual(project.id);
    }).catch(err => console.log(err));
});

test("get all projects", () => {
    expect.assertions(3);
    return axios.get(path + "/portfolio/projects").then((res: any) => {
        expect(res.status).toEqual(200);
        expect(res.data.length).toBeGreaterThan(0);
        expect(res.data.filter((e: any) =>
            e.id === project.id).length).toEqual(1);
    }).catch(err => console.log(err));
});

test("edit project", () => {
    expect.assertions(3);
    const data = {
        id: 13,
        name: Math.random().toString(36).substring(7)
    };
    return axios.post(path + "/portfolio/edit_project", data, {headers: {auth: token}}).then((res: any) => {
        expect(res.status).toEqual(200);
        expect(res.data.name).toEqual(data.name);
        expect(res.data.id).toEqual(data.id);
    }).catch(err => console.log(err));
});

test("delete tech", () => {
    expect.assertions(2);
    const data = {
        id: tech.id
    };
    return axios.post(path + "/portfolio/delete_tech", data, {headers: {auth: token}}).then((res: any) => {
        expect(res.status).toEqual(200);
        expect(res.data.id).toEqual(data.id);
    }).catch(err => console.log(err));
});

test("delete project", () => {
    expect.assertions(3);
    const data = {
        ...project
    };
    return axios.post(path + "/portfolio/delete_project", data, {headers: {auth: token}}).then((res: any) => {
        expect(res.status).toEqual(200);
        expect(res.data.name).toEqual(data.name);
        expect(res.data.id).toEqual(data.id);
    }).catch(err => console.log(err));
});
