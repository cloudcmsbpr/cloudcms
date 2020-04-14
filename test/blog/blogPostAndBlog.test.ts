import axios from "axios";
import * as jwt from "jsonwebtoken";
import {SESSION_SECRET} from "../../src/util/secrets";


const username = "user16";
const password = "password123";
const path = "http://localhost:5000";
const userId = 0;

const blogs: any = {};
const blogPosts: any = {};

// generate valid token for this test session
const token = jwt.sign(
    {userId: userId, username: username}, SESSION_SECRET,
    {expiresIn: "1h"}
);

test("get all blogs", () => {
    return axios.get(path + "/blog/blogs")
        .then(res => console.log(res))
        .catch(err => console.error(err));
});

test("add blog", () => {
    const data = {
        name: "b1",
        author: "radu"
    };
    return axios.post(path + "/blog/add_blog",
        data,{headers: {auth: token}})
        .then((res: any) => {
            console.log(res)
        });
});
