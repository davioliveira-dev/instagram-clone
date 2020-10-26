import {NextFunction, Request, Response} from 'express';
import path from 'path';

const filetypes = /jpeg|jpg|png|svg/;

function verifyFile(file: any) {
  const extname = filetypes.test(
      path.extname(file.originalname).toLocaleLowerCase(),
  );

  const mimetype = filetypes.test(file.mimetype);

  if (!mimetype && !extname) {
    return false;
  }

  return true;
}

export const createPostValidation = (
    req: Request, res: Response, next: NextFunction,
) => {
  if (!req.body || Object.keys(req.body).length <= 0) {
    return res.status(400).json({message: 'No data'});
  }

  if (!req.body.place || typeof req.body.place !== 'string') {
    return res.status(400).json({
      message: 'Bad Request: place is required and must be an string',
    });
  }

  if (!req.body.description || typeof req.body.description !== 'string') {
    return res.status(400).json({
      message: 'Bad Request: description is required and must be an string',
    });
  }

  if (!req.body.hashtags || typeof req.body.hashtags !== 'string') {
    return res.status(400).json({
      message: 'Bad Request: hashtags is required and must be an string',
    });
  }

  if (req.file === undefined || verifyFile(req.file) === false) {
    return res.status(400).json({
      message: 'Bad Request: please,' +
      ' upload an IMAGE with extensions JPEG, JPG, PNG or GIF',
    });
  }

  next();
};

export const showPostValidation = (
    req: Request, res: Response, next: NextFunction,
)=> {
  if (!req.params || Object.keys(req.params).length <= 0) {
    return res.status(400).json({message: 'No param'});
  }

  if (!req.params.id || typeof req.params.id !== 'string') {
    return res.status(400).json({message: 'Bad Request: Invalid Param'});
  }

  next();
};

export const likePostValidation = (
    req: Request, res: Response, next: NextFunction,
) => {
  if (!req.params || Object.keys(req.params).length <= 0) {
    return res.status(400).json({message: 'No param'});
  }

  if (!req.params.id || typeof req.params.id !== 'string') {
    return res.status(400).json({message: 'Bad Request: Invalid Param'});
  }

  next();
};

export const getPostCommentValidation = (
    req: Request, res: Response, next: NextFunction,
) => {
  if (!req.params || Object.keys(req.params).length <= 0) {
    return res.status(400).json({message: 'No param'});
  }

  if (!req.params.id || typeof req.params.id !== 'string') {
    return res.status(400).json({message: 'Bad Request: Invalid Param'});
  }

  if (!req.params.commentId || typeof req.params.commentId !== 'string') {
    return res.status(400).json({message: 'Bad Request: Invalid Param'});
  }

  next();
};

export const createCommentValidation = (
    req: Request, res: Response, next: NextFunction,
) => {
  if (!req.params || Object.keys(req.params).length <= 0) {
    return res.status(400).json({message: 'No param'});
  }

  if (!req.params.id || typeof req.params.id !== 'string') {
    return res.status(400).json({message: 'Bad Request: Invalid Param'});
  }


  if (!req.body || Object.keys(req.body).length <= 0) {
    return res.status(400).json({message: 'No data'});
  }

  if (!req.body.author || typeof req.body.author !== 'string') {
    return res.status(400).json({
      message: 'Bad Request: author is required and must be an string',
    });
  }

  if (!req.body.description || typeof req.body.description !== 'string') {
    return res.status(400).json({
      message: 'Bad Request: description is required and must be an string',
    });
  }

  next();
};
