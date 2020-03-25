import SingleRoute from "../../util/SingleRoute";

import {checkJwt} from "../../shared/middleware/authMiddleware";
import AuthController from "../../shared/controllers/authController";
import UserController from "../../shared/controllers/userController";
import {createNewBoard, deleteBoard, editBoard, getAllBoards, getBoardById} from "../controllers/boardController";
import {createNewPost, deletePost, editPost, getAllPosts, getPostById} from "../controllers/posts";

export const routes: SingleRoute[] = [
    // User
    new SingleRoute("post", "/users/login", AuthController.login, []), // login
    new SingleRoute("post", "/users/signup", UserController.newUser, []), // signup
    new SingleRoute("get", "/users/getall", UserController.listAll,  []), // sample get with jwt
    new SingleRoute("post", "/users/delete", UserController.deleteUser,  [checkJwt]), // sample get with jwt
    // Post
    new SingleRoute("get", "/board/getAllBoards", getAllBoards, []),
    new SingleRoute("get", "/board/getBoardById", getBoardById, []),
    new SingleRoute("post", "/board/createNewBoard", createNewBoard, [checkJwt]),
    new SingleRoute("post", "/board/edit_Post", editBoard, [checkJwt]),
    new SingleRoute("post", "/board/delete_Post", deleteBoard, [checkJwt]),
    // Board
    new SingleRoute("get", "/board/getAllPosts", getAllPosts, []),
    new SingleRoute("get", "/board/getPostById", getPostById, []),
    new SingleRoute("post", "/board/addPost", createNewPost, [checkJwt]),
    new SingleRoute("post", "/board/editPost", editPost, [checkJwt]),
    new SingleRoute("post", "/board/deletePost", deletePost, [checkJwt]),
];
