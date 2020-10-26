import React, {useEffect, useState} from 'react';
import api from '../../services/api';
import {toast} from 'react-toastify';
import {socket} from '../../services/socket';
import CommentsList, {IComment} from '../../components/Comments';
import {
  Article,
  ArticleActions,
  ArticleFooterDescription,
  ArticleFooterHashtags,
  LikeIcon,
  ArticleImage,
  LikeButton,
  FeedList,
  PostHeader,
  UserInfo,
  LoadingProgress,
  LoadingContainer,
  CommentsButton,
  CommentIcon,
} from './styles';
import like from '../../assets/like.svg';
import comments from '../../assets/comment.svg';

interface Post {
  postId: string,
  author: string,
  place: string,
  description: string,
  hashtags: string,
  image: string,
  likes: number,
  showComment: boolean,
  comments: [IComment]
}

export default function Feed() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [blocked, setBlocked] = useState(false);
  const filesUrl = 'http://localhost:3333/files';

  useEffect(() => {
    socket.on('post', (data: Post) => {
      setPosts([data, ...posts]);
    });
  }, [posts, socket]);

  useEffect(() => {
    socket.on('like', (data: any) => {
      const likedPost = posts.map((post) =>
        post.postId === data.postId ? data : post,
      );
      if (Array.isArray(likedPost) && likedPost.length >= 1) {
        setPosts(likedPost);
      }
    });
  }, [posts, socket]);

  useEffect(() => {
    socket.on('comment', (data: Post) => {
      const commentedPost: Post[] = posts.map((post) => {
        if (post.comments !== data.comments) {
          return data;
        }
        return post;
      });

      if (Array.isArray(commentedPost) && commentedPost.length >= 1) {
        setPosts(commentedPost);
      }
    });
  }, [posts, socket]);

  useEffect(() => {
    async function loadPosts() {
      api.get('/posts').catch((error) => {
        toast.error('Não foi possível conectar ao servidor!');
        console.log(error.message);
      }).then((response) => {
        if (response) {
          setPosts(response.data);
        }
      });
    }
    loadPosts();
  }, []);

  async function handleLike(id: string, blocked: boolean) {
    if (blocked) {
      setBlocked(true);
    }
    await api.post(`/posts/${id}/like`);
    setBlocked(false);
  }

  function handleListComments(clickedPost: Post) {
    const changedPost = posts.map((post) => {
      if (post.postId === clickedPost.postId) {
        clickedPost.showComment = !post.showComment;
        return clickedPost;
      }
      return post;
    });
    if (Array.isArray(changedPost) && changedPost.length >= 1) {
      setPosts(changedPost);
    }
  }

  if (posts.length <= 0) {
    return (
      <LoadingContainer>
        <LoadingProgress />
      </LoadingContainer>
    );
  }

  return (
    <>
      <FeedList>
        {posts.map((post: Post) => (
          <Article key={post.postId}>
            <PostHeader>
              <UserInfo>
                <span>{post.author}</span>
                <span className="place">{post.place}</span>
              </UserInfo>
            </PostHeader>
            <ArticleImage src={`${filesUrl}/${post.image}`} alt="Post image" />
            <footer>
              <ArticleActions>
                <ArticleFooterDescription>
                  <b>Descrição: </b>{post.description}
                </ArticleFooterDescription>
                <LikeButton
                  blocked={blocked}
                  onClick={()=> handleLike(post.postId, true)}
                >
                  <LikeIcon src={like} alt="Like"/>
                </LikeButton>
                <strong>{post.likes}</strong>
                <br/>
                <CommentsButton onClick={() => handleListComments(post)}>
                  <CommentIcon src={comments} alt="Comment"/>
                  <strong>Listar comentários</strong>
                </CommentsButton>
              </ArticleActions>
              {post.showComment ? (
                <CommentsList post={post.postId} props={post.postId} />
              ): null}
              <ArticleFooterHashtags>
                {post.hashtags}
              </ArticleFooterHashtags>
            </footer>
          </Article>
        ))}
      </FeedList>
    </>
  );
}
