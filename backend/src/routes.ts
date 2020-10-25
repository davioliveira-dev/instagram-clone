import express from 'express';
import multer from 'multer';
import storage from './config/upload';
import CommentController from './controllers/CommentController';
import LikeController from './controllers/LikeController';
import PostController from './controllers/PostController';

const routes = express.Router();
const upload = multer({storage});

routes.get('/posts', PostController.index);
routes.get('/posts/:id', PostController.show);
routes.post('/posts', upload.single('image'), PostController.store);
routes.post('/posts/:id/like', LikeController.store);
routes.get('/posts/:id/comments', CommentController.index);
routes.get('/posts/:id/comments/:commentId', CommentController.show);
routes.post('/posts/:id/comments', CommentController.store);

export default routes;
