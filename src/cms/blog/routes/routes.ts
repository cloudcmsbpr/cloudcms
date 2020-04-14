import SingleRoute from "../../util/SingleRoute";
import {
    getAllBlogs,
    ,
    addBlog} from "../controllers/blogController";
import { checkJwt } from "../../shared/middleware/authMiddleware";

export const routes: SingleRoute[] = [
    new SingleRoute("get", "/blog/blogs", getAllBlogs, []),
    new SingleRoute("get", "/blog/posts", getAllPosts, []),
    new SingleRoute("post", "/blog/add_blog", addBlog, [checkJwt]),
];
