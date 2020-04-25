import SingleRoute from "../../util/SingleRoute";

import {checkJwt} from "../../shared/middleware/authMiddleware";
import AuthController from "../../shared/controllers/authController";
import UserController from "../../shared/controllers/userController";
import {createNewBoard, deleteBoard, editBoard, getAllBoards, getBoardById} from "../controllers/boardController";
import {createNewPost, deletePost, editPost, getAllPosts, getPostById} from "../controllers/postController";
import cors from "cors";

export const routes: SingleRoute[] = [
    // Board
    new SingleRoute("get", "/board/getAllBoards", getAllBoards, [cors()]),
    new SingleRoute("get", "/board/getBoardById", getBoardById, [cors()]),
    new SingleRoute("post", "/board/createNewBoard", createNewBoard, [cors()]),
    new SingleRoute("post", "/board/editBoard", editBoard, [cors()]),
    new SingleRoute("post", "/board/deleteBoard", deleteBoard, [cors()]),

    // Post
    new SingleRoute("get", "/post/getAllPosts", getAllPosts, [cors()]),
    new SingleRoute("get", "/post/getPostById", getPostById, [cors()]),
    new SingleRoute("post", "/post/createNewPost", createNewPost, [cors()]),
    new SingleRoute("post", "/post/editPost", editPost, [cors()]),
    new SingleRoute("post", "/post/deletePost", deletePost, [cors()]),
];
