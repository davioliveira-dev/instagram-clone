import mongoose from 'mongoose';

export interface IComment extends mongoose.Document {
  commentId: string,
  author: string,
  description: string,
}

const CommentSchema = new mongoose.Schema({
  commentId: {
    type: String,
    unique: true,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

export default mongoose.model<IComment>('Comment', CommentSchema);
