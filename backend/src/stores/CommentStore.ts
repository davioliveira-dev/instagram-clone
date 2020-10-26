import Comment from '../models/Comment';
import Post from '../models/Post';
import {v4 as uuidv4} from 'uuid';

class CommentStore {
  static async getAll(postId: string) {
    const post = await Post.findOne({
      id: postId,
    });

    if (post === null) {
      return [];
    }

    const postComments = await Comment.find({
      commentId: {
        $in: post.comments,
      },
    });

    return postComments;
  }

  static async getOne(commentId: string) {
    const comment = await Comment.findOne({
      commentId,
    });

    if (comment === null) {
      return [];
    }

    return comment;
  }

  static async create(author: string, description: string) {
    const id = uuidv4();
    const comment = await Comment.create({
      commentId: id,
      author,
      description,
    });

    return comment;
  }
}

export default CommentStore;
