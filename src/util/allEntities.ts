import {User as StageUser} from "../cms/shared/models/User";
import {Board} from "../cms/board/models/Board";
import {Post} from "../cms/board/models/Post";
import {Tech} from "../cms/portfolio/models/Tech";
import {Project} from "../cms/portfolio/models/Project";
import {Blog} from "../cms/blog/models/Blog";
import {BlogPost} from "../cms/blog/models/BlogPost";

export const allEntities = [StageUser, Board, Post, Tech, Project, Blog, BlogPost];
