import {
    getAllBlogs,
    getBlogById,
    addBlog,
    editBlog,
    deleteBlog, getAllBlogPosts, getBlogPostById, addBlogPost, editBlogPost, deleteBlogPost,
} from "../controllers/blogController";
import SingleRoute from "../../util/SingleRoute";
import {checkJwt} from "../../shared/middleware/authMiddleware";
import cors from "cors";


export const routes: SingleRoute[] = [
    new SingleRoute("get", "/blog/blogs", getAllBlogs, [cors()]),
    new SingleRoute("get", "/blog/get_blog_by_id", getBlogById, [cors()]),
    new SingleRoute("post", "/blog/add_blog", addBlog, [cors(), checkJwt]),
    new SingleRoute("post", "/blog/edit_blog", editBlog, [cors(), checkJwt]),
    new SingleRoute("post", "/blog/delete_blog", deleteBlog, [cors(), checkJwt]),
    new SingleRoute("get", "/blog/blog_posts", getAllBlogPosts, [cors()]),
    new SingleRoute("get", "/blog/get_blog_post_by_id", getBlogPostById, [cors()]),
    new SingleRoute("post", "/blog/add_blog_post", addBlogPost, [cors(), checkJwt]),
    new SingleRoute("post", "/blog/edit_blog_post", editBlogPost, [cors(), checkJwt]),
    new SingleRoute("post", "/blog/delete_blog_post", deleteBlogPost, [cors(), checkJwt]),

];
