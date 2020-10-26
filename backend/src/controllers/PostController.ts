import PostStore from '../stores/PostStore';
import {NextFunction, Request, Response} from 'express';
import io from '../server';

class PostController {
  static async index(req: Request, res: Response) {
    const posts = await PostStore.getAll();

    if (posts.length <= 0) {
      return res.status(404).json({message: 'No one posts finded!'});
    }

    return res.json(posts);
  }

  static async show(req: Request, res: Response) {
    const postId = req.params.id;
    const post = await PostStore.getOne(postId);

    if (post === [] && post.length <= 0) {
      return res.status(404).json({message: 'No one posts finded!'});
    }

    return res.json(post);
  }

  static async store(req: Request, res: Response, next: NextFunction) {
    const {author, place, description, hashtags} = req.body;
    const {filename: image} = req.file;

    const imagePath = req.file.path;
    const destination = req.file.destination;

    const post = await PostStore.create(
        author, place, description, hashtags, image, imagePath, destination,
    );

    io.emit('post', post);
    next();

    return res.json(post);
  }
}

export default PostController;
