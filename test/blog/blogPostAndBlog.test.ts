import axios from "axios";
import * as jwt from "jsonwebtoken";
import {SESSION_SECRET} from "../../src/util/secrets";


const username = "user16";
const password = "password123";
const path = "http://localhost:5000";
const userId = 0;

let blog: any = {};
let blogPost: any = {};

// generate valid token for this test session
const token = jwt.sign(
    {userId: userId, username: username}, SESSION_SECRET,
    {expiresIn: "1h"}
);

test("add blog", () => {
    expect.assertions(3);
    const data = {
        name: "b1",
        author: "radu",
        // @ts-ignore
        blogPosts: []
    };
    return axios.post(path + "/blog/add_blog", data, {headers: {auth: token}}).then((res: any) => {
        blog = res.data;
        expect(res.status).toEqual(200);
        expect(res.data.name).toEqual(data.name);
        expect(res.data.author).toEqual(data.author);
    }).catch(err => console.log(err));
});

test("get all blogs", () => {
    expect.assertions(3);
    return axios.get(path + "/blog/blogs")
        .then(res => {
            blog = res.data;
            expect(res.status).toEqual(200);
            expect(res.data.length).toBeGreaterThan(0);
            expect(res.data.filter((e: any) =>
                e.id === blog.id).length).toEqual(0);
        }).catch(err => console.error(err));
});

test("edit blog", () => {
    expect.assertions(3);
    const data = {
        id: 21,
        name: Math.random().toString(36).substring(7)
    };
    return axios.post(path + "/blog/edit_blog", data, {headers: {auth: token}}).then((res: any) => {
        blog = res.data;
        expect(res.status).toEqual(200);
        expect(res.data.name).toEqual(data.name);
        expect(res.data.id).toEqual(data.id);
    }).catch(err => console.log(err));
});

test("delete blog", () => {
    expect.assertions(2);
    const data = {
        ...blog
    };
    return axios.post(path + "/blog/delete_blog", data, {headers: {auth: token}}).then((res: any) => {
        blog = res.data;
        expect(res.status).toEqual(200);
        expect(res.data.id).toEqual(data.id);
    }).catch(err => console.log(err));
});

test("add blog post", () => {
    expect.assertions(3);
    const data = {
        name: "p1",
        description: "first blog post",
    };
    return axios.post(path + "/blog/add_blog_post", data, {headers: {auth: token}}).then((res: any) => {
        blog = res.data;
        expect(res.status).toEqual(200);
        expect(res.data.name).toEqual(data.name);
        expect(res.data.description).toEqual(data.description);
    }).catch(err => console.log(err));
});

test("get all blog posts", () => {
    expect.assertions(3);
    return axios.get(path + "/blog/blog_posts")
        .then(res => {
            blogPost = res.data;
            expect(res.status).toEqual(200);
            expect(res.data.length).toBeGreaterThan(0);
            expect(res.data.filter((e: any) =>
                e.id === blogPost.id).length).toEqual(0);
        }).catch(err => console.error(err));
});

test("edit blog post", () => {
    expect.assertions(3);
    const data = {
        id: 5,
        name: Math.random().toString(36).substring(7)
    };
    return axios.post(path + "/blog/edit_blog_post", data, {headers: {auth: token}}).then((res: any) => {
        blogPost = res.data;
        expect(res.status).toEqual(200);
        expect(res.data.name).toEqual(data.name);
        expect(res.data.id).toEqual(data.id);
    }).catch(err => console.log(err));
});

test("delete blog post", () => {
    expect.assertions(2);
    const data = {
        ...blogPost
    };
    return axios.post(path + "/blog/delete_blog_post", data, {headers: {auth: token}}).then((res: any) => {
        blog = res.data;
        expect(res.status).toEqual(200);
        expect(res.data.id).toEqual(data.id);
    }).catch(err => console.log(err));
});
