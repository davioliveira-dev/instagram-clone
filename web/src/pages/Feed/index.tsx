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
  _id: string,
  author: string,
  description: string,
  place: string,
  hashtags: string,
  likes: number,
  image: string,
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
        post._id === data._id ? data : post,
      );
      if (Array.isArray(likedPost) && likedPost.length >= 1) {
        setPosts(likedPost);
      }
    });
  }, [posts, socket]);

  useEffect(() => {
    socket.on('comment', (data: any) => {
      console.log(data);
    });
  });

  // }
  // //   const commentedPost = posts.map((post) => {
  // //   //   post.comments.map((comment) => {
  // //   //     comment._id === data.comments.find(comment._id) ?
  // console.log(data) :
  // //   //     null;
  // //   //   });
  // //   // });
  // //   // return commentedPost;
  // //   console.log(post);
  // // });

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
      if (post._id === clickedPost._id) {
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
          <Article key={post._id}>
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
                  onClick={()=> handleLike(post._id, true)}
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
                <CommentsList post={post._id} props={post._id} />
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
