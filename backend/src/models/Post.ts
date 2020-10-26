import mongoose, {Document, Schema} from 'mongoose';

export interface IPost extends Document {
  postId: string,
  author: string,
  place: string,
  description: string,
  hashtags: string,
  image: string,
  likes: number,
  comments: []
}

const PostSchema: Schema = new Schema({
  postId: {
    type: String,
    unique: true,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  place: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  hashtags: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    default: 0,
  },
  comments: [{type: mongoose.Schema.Types.String, ref: 'Comment'}],
}, {
  timestamps: true,
});

export default mongoose.model<IPost>('Post', PostSchema);
