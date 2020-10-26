import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import {v4 as uuidv4} from 'uuid';
import Post from '../models/Post';

class PostStore {
  static async getAll() {
    const posts = await Post.find().sort('-createdAt');
    return posts;
  }

  static async getOne(postId) {
    const post = await Post.find({
      postId,
    });

    if (post === null) {
      return [];
    }

    return post;
  }

  static async create(
      author,
      place,
      description,
      hashtags,
      image,
      imagePath,
      destination,
  ) {
    const postId = uuidv4();
    const [name] = image.split('.');
    const fileName = `${name}.jpg`;

    await sharp(imagePath)
        .resize(500)
        .jpeg({quality: 80})
        .toFile(path.resolve(destination, 'resized', fileName));

    fs.unlinkSync(imagePath);

    const post = await Post.create({
      postId,
      author,
      place,
      description,
      hashtags,
      image,
    });

    return post;
  }

  static async getOneAndUpdateComment(postId, commentId) {
    const post = await Post.findOne({
      postId,
    });

    if (post === null) {
      return [];
    }

    post.comments.push(commentId);

    await post.save();

    return post;
  }
}

export default PostStore;
