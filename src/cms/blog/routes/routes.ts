import {
    getAllBlogs,
    getBlogById,
    addBlog,
    editBlog,
    deleteBlog, getAllBlogPosts, getBlogPostById, addBlogPost, editBlogPost, deleteBlogPost,
} from "../controllers/blogController";
import SingleRoute from "../../util/SingleRoute";
import {checkJwt} from "../../shared/middleware/authMiddleware";

export const routes: SingleRoute[] = [
    new SingleRoute("get", "/blog/blogs", getAllBlogs, []),
    new SingleRoute("get", "/blog/get_blog_by_id", getBlogById, []),
    new SingleRoute("post", "/blog/add_blog", addBlog, [checkJwt]),
    new SingleRoute("post", "/blog/edit_blog", editBlog, [checkJwt]),
    new SingleRoute("post", "/blog/delete_blog", deleteBlog, [checkJwt]),
    new SingleRoute("get", "/blog/blog_posts", getAllBlogPosts, []),
    new SingleRoute("get", "/blog/get_blog_post_by_id", getBlogPostById, []),
    new SingleRoute("post", "/blog/add_blog_post", addBlogPost, [checkJwt]),
    new SingleRoute("post", "/blog/edit_blog_post", editBlogPost, [checkJwt]),
    new SingleRoute("post", "/blog/delete_blog_post", deleteBlogPost, [checkJwt]),

];
