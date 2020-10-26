import express from 'express';
import multer from 'multer';
import storage from './config/upload';
import CommentController from './controllers/CommentController';
import LikeController from './controllers/LikeController';
import PostController from './controllers/PostController';
import {
  createCommentValidation,
  createPostValidation,
  getPostCommentValidation,
  likePostValidation,
  showPostValidation,
} from './middlewares/postValidate';

const routes = express.Router();
const upload = multer({storage});

routes.get('/posts', PostController.index);

routes.get('/posts/:id', showPostValidation, PostController.show);

routes.post('/posts',
    upload.single('image'),
    createPostValidation,
    PostController.store,
);

routes.post('/posts/:id/like', likePostValidation, LikeController.store);

routes.get('/posts/:id/comments', CommentController.index);

routes.get('/posts/:id/comments/:commentId',
    getPostCommentValidation,
    CommentController.show,
);

routes.post('/posts/:id/comments',
    createCommentValidation,
    CommentController.store,
);

export default routes;
