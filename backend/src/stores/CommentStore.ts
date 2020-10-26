import Comment from '../models/Comment';
import Post from '../models/Post';

class CommentStore {
  static async getAll(postId: string) {
    const post = await Post.findOne({
      id: postId,
    });

    if (post === null) {
      return [];
    }

    const postComments = await Comment.find({
      id: {
        $in: post.comments,
      },
    });

    return postComments;
  }

  static async getOne(commentId: string) {
    const comment = await Comment.findOne({
      id: commentId,
    });

    if (comment === null) {
      return [];
    }

    return comment;
  }

  static async create(author: string, description: string) {
    const comment = await Comment.create({
      author,
      description,
    });

    return comment;
  }
}

export default CommentStore;
