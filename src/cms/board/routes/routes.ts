import SingleRoute from "../../util/SingleRoute";

import {checkJwt} from "../../shared/middleware/authMiddleware";
import AuthController from "../../shared/controllers/authController";
import UserController from "../../shared/controllers/userController";
import {createNewBoard, deleteBoard, editBoard, getAllBoards, getBoardById} from "../controllers/boardController";
import {createNewPost, deletePost, editPost, getAllPosts, getPostById} from "../controllers/postController";

export const routes: SingleRoute[] = [
    // User
    new SingleRoute("post", "/users/login", AuthController.login, []), // login
    new SingleRoute("post", "/users/signup", UserController.newUser, []), // signup
    new SingleRoute("get", "/users/getall", UserController.listAll,  []), // sample get with jwt
    new SingleRoute("post", "/users/delete", UserController.deleteUser,  [checkJwt]), // sample get with jwt

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
