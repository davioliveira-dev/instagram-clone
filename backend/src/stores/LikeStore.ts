import Post from '../models/Post';

class LikeStore {
  static async create(postId: string) {
    const post = await Post.findById(postId);

    if (post === null) {
      return [];
    }

    post.likes += 1;
    await post.save();

    return post;
  }
}

export default LikeStore;
