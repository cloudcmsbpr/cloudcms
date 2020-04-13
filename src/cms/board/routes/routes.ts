import SingleRoute from "../../util/SingleRoute";

import {checkJwt} from "../../shared/middleware/authMiddleware";
import AuthController from "../../shared/controllers/authController";
import UserController from "../../shared/controllers/userController";
import {createNewBoard, deleteBoard, editBoard, getAllBoards, getBoardById} from "../controllers/boardController";
import {createNewPost, deletePost, editPost, getAllPosts, getPostById} from "../controllers/postController";

export const routes: SingleRoute[] = [
    // Board
    new SingleRoute("get", "/board/getAllBoards", getAllBoards, []),
    new SingleRoute("get", "/board/getBoardById", getBoardById, []),
    new SingleRoute("post", "/board/createNewBoard", createNewBoard, []),
    new SingleRoute("post", "/board/editBoard", editBoard, []),
    new SingleRoute("post", "/board/deleteBoard", deleteBoard, []),

    // Post
    new SingleRoute("get", "/post/getAllPosts", getAllPosts, []),
    new SingleRoute("get", "/post/getPostById", getPostById, []),
    new SingleRoute("post", "/post/createNewPost", createNewPost, []),
    new SingleRoute("post", "/post/editPost", editPost, []),
    new SingleRoute("post", "/post/deletePost", deletePost, []),
];
