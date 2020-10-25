import {v4 as uuidv4} from 'uuid';
import Comment from '../models/Comment';
import Post from '../models/Post';

class CommentStore {
  static async getAll(postId: string) {
    const post = await Post.findById(postId);

    if (post === null) {
      return [];
    }

    const postComments = await Comment.find({
      _id: {
        $in: post.comments,
      },
    });

    return postComments;
  }

  static async getOne(commentId: string) {
    const comment = await Comment.findById(commentId);

    if (comment === null) {
      return [];
    }

    return comment;
  }

  static async create(author: string, description: string) {
    const commentId = uuidv4();
    const comment = await Comment.create({
      _id: commentId,
      author,
      description,
    });

    return comment;
  }
}

export default CommentStore;
