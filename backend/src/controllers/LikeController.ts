import LikeStore from '../stores/LikeStore';
import {NextFunction, Request, Response} from 'express';
import io from '../server';

class LikeController {
  static async store(req: Request, res: Response, next: NextFunction) {
    const postId = req.params.id;
    const post = await LikeStore.create(postId);

    if (post === [] && post.length <= 0) {
      return res.status(404).json({message: 'No post founded to like'});
    }

    io.emit('like', post);
    next();

    return res.json(post);
  }
}

export default LikeController;
