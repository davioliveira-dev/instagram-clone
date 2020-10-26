import React, {FormEvent, useEffect, useState} from 'react';
import {toast} from 'react-toastify';
import api from '../../services/api';
import {socket} from '../../services/socket';
import {Button, Content, Form, Input, NoneTitle, Title} from './styles';

interface ICommentsList extends JSX.ElementAttributesProperty {
  post: string,
}

export interface IComment {
  commentId: string,
  author: string,
  description: string,
}

export default function CommentsList(
    {post}: ICommentsList): JSX.Element {
  const [comments, setComments] = useState<IComment[]>([]);
  const [formData, setFormData] = useState({
    author: '', description: '',
  });
  useEffect(() => {
    async function loadComments() {
      api.get(`/posts/${post}/comments`).catch((error) => {
        toast.info('Nenhum comentário encontrado!');
        console.log(error.message);
      }).then((response) => {
        if (response) {
          setComments(response.data);
        }
      });
    }

    loadComments();
  }, []);

  useEffect(() => {
    socket.on('comment', (data: any) => {
      const commentedPost = comments.map((comment) =>
        comment.commentId === data.comments[0].commentId ? data : post,
      );
      if (Array.isArray(commentedPost) && commentedPost.length >= 1) {
        setComments(commentedPost);
      }
    });
  }, [comments, socket]);

  const handleChange = (e: React.ChangeEvent<any>) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  async function handeSubmit(event: FormEvent) {
    event.preventDefault();
    if (!formData.author || !formData.description) {
      return toast.error('Preencha todos os dados!');
    }
    await api.post(`posts/${post}/comments/`, formData).catch((error) => {
      toast.error('Não foi possível conectar ao servidor!');
      console.log(error.message);
    });
    setFormData({author: '', description: ''});
  }

  return (
    <>
      <Title>Comentários</Title>
      {comments.length <= 0 ? (
        <NoneTitle>Nenhum comentário encontrado!</NoneTitle>
      ) : (
        comments.map((comment: IComment) => (
          <Content key={comment.commentId}>
            <strong>Autor: {comment.author}</strong>
            <p>{comment.description}</p>
          </Content>
        ))
      )}
      <Form onSubmit={(e:FormEvent) => handeSubmit(e)}>
        <p>Criar Comentário</p>
        <Input
          type="text"
          name="author"
          placeholder="Autor"
          onChange={handleChange}
          required
        />
        <Input
          type="text"
          name="description"
          placeholder="Descrição"
          onChange={handleChange}
          required
        />
        <Button type="submit">Enviar</Button>
      </Form>
    </>
  );
}
