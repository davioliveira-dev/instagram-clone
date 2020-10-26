import mongoose from 'mongoose';
import {v4 as uuidv4} from 'uuid';

export interface IComment extends mongoose.Document {
  author: string,
  description: string,
}

const CommentSchema = new mongoose.Schema({
  id: {
    type: String,
    default: uuidv4(),
    unique: true,
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
