import CommentStore from '../stores/CommentStore';
import PostStore from '../stores/PostStore';
import {NextFunction, Request, Response} from 'express';
import io from '../server';

class CommentController {
  static async index(req: Request, res: Response) {
    const postId = req.params.id;
    const postComments = await CommentStore.getAll(postId);

    if (postComments.length <= 0) {
      return res.status(404).json({message: 'No any comments on this post'});
    }

    return res.json(postComments);
  }

  static async show(req: Request, res: Response) {
    const {id: postId, commentId} = req.params;

    const post = await PostStore.getOne(postId);

    if (post === [] && post.length <= 0) {
      return res.status(404).json({message: 'Post not founded'});
    }

    const comment = await CommentStore.getOne(commentId);

    if (comment === [] && comment.length <= 0) {
      return res.status(404).json({message: 'Comment not founded'});
    }

    return res.json(comment);
  }

  static async store(req: Request, res: Response, next: NextFunction) {
    const {author, description} = req.body;
    const postId = req.params.id;

    const comment = await CommentStore.create(author, description);
    const post = await PostStore.getOneAndUpdateComment(
        postId, comment.commentId,
    );

    if (post === [] && post.length <= 0) {
      return res.status(404).json({message: 'Post not founded'});
    }

    io.emit('comment', post);
    next();

    return res.json(comment);
  }
}

export default CommentController;
