import styled from 'styled-components';

interface ButtonProps {
  blocked: boolean,
  onClick: () => {},
}

export const FeedList = styled.section`
  width: 100%;
  max-width: 580px;
  margin: 30px auto;
  padding: 0 30px;
`;

export const Article = styled.article`
  background: #fff;
  border: 1px solid #ddd;
  margin-top: 30px;
`;

export const PostHeader = styled.header`
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;

  span {
    font-size: 15px;
  }

  span.place {
    font-size: 13px;
    color: #666;
    margin-top: 3px;
  }
`;

export const ArticleImage = styled.img`
  width: 100%;
`;

export const ArticleActions = styled.div`
  margin-top: 10px;
  padding: 10px;
`;

export const LikeIcon = styled.img`
  height: 20px;
  margin: 0 10px;
  margin-bottom: -5px;
`;

export const ArticleFooterDescription = styled.p`
  font-size: 16px;
  margin: 10px;
  line-height: 18px;
`;

export const ArticleFooterHashtags = styled.span`
  color: #7159c1;
  display: block;
  margin: 15px 20px;
`;

export const LikeButton = styled.button`
  background: none;
  border: 0;
  cursor: ${(props: ButtonProps) => props.blocked ? 'none' : 'pointer'}
`;

export const CommentsButton = styled.button`
  background: none;
  border: 0;
  cursor: pointer;
`;

export const CommentIcon = styled.img`
  height: 20px;
  margin: 15px 10px -10px 10px;
`;

export const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 30vh 0;
`;

export const LoadingProgress = styled.div`
  border: 16px solid #f3f3f3;
  border-top: 16px solid #3498db;
  border-radius: 50%;
  width: 120px;
  height: 120px;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

