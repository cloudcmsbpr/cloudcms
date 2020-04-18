import {
    getAllBlogs,
    getBlogById,
    addBlog,
    editBlog,
    deleteBlog,
} from "../controllers/blogController";
import SingleRoute from "../../util/SingleRoute";
import {checkJwt} from "../../shared/middleware/authMiddleware";

export const routes: SingleRoute[] = [
    new SingleRoute("get", "/blog/blogs", getAllBlogs, []),
    new SingleRoute("get", "/blog/get_blog_by_id", getBlogById, []),
    new SingleRoute("post", "/blog/add_blog", addBlog, [checkJwt]),
    new SingleRoute("post", "/blog/edit_blog", editBlog, [checkJwt]),
    new SingleRoute("post", "/blog/delete_blog", deleteBlog, [checkJwt]),
];
