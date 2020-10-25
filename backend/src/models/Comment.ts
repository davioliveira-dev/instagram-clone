import mongoose from 'mongoose';

export interface IComment extends mongoose.Document {
  _id: string,
  author: string,
  description: string,
}

const CommentSchema = new mongoose.Schema({
  _id: {
    type: String,
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
