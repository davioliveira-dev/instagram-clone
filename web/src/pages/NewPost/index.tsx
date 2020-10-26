import React, {FormEvent, useMemo, useState} from 'react';
import {Redirect} from 'react-router-dom';
import {toast} from 'react-toastify';
import api from '../../services/api';
import {Button, Form, FormInputs, FormTextArea, Thumbnail} from './styles';

export default function NewPost() {
  const [image, setImage] = useState<File>();
  const [formData, setFormData] = useState({
    author: '', place: '', description: '', hashtags: '',
  });

  const preview = useMemo(
      () => {
        return image ? URL.createObjectURL(image) : null;
      },
      [image],
  );

  function setThumbnail(event: FormEvent) {
    const target = event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    setImage(file);
  }

  async function handeSubmit(event: FormEvent) {
    event.preventDefault();
    if (
      !formData.author ||
      !formData.description ||
      !formData.hashtags ||
      !formData.description ||
      !image
    ) {
      return toast.error('Preencha todos os dados!');
    }
    const data = new FormData();
    data.append('image', image);
    data.append('author', formData.author);
    data.append('place', formData.place);
    data.append('description', formData.description);
    data.append('hashtags', formData.hashtags);

    await api.post('/posts', data).catch((error) => {
      toast.error('Ocorreu um erro, tente novamente!');
      console.log(error.message);
    });
    toast.success('Post Criado!');

    return <Redirect to='/' />;
  }

  const handleChange = (e: React.ChangeEvent<any>) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  return (
    <Form onSubmit={(e:FormEvent) => handeSubmit(e)}>
      <p>Imagem do Post</p>
      <Thumbnail image={image} preview={preview} />
      <input
        type="file"
        onChange={(e: FormEvent) => setThumbnail(e)}
        accept="image/png, image/jpeg, image/jpg"
        required
      />
      <FormInputs type="text"
        name="author"
        placeholder="Autor do post"
        onChange={handleChange}
        required
      />
      <FormInputs type="text"
        name="place"
        placeholder="Lugar ou Momento"
        onChange={handleChange}
        required
      />
      <FormTextArea
        name="description"
        placeholder="Descrição do post"
        onChange={handleChange}
        required
      />

      <FormInputs type="text"
        name="hashtags"
        placeholder="Hashtags do post"
        onChange={handleChange}
        maxLength={150}
        required
      />
      <Button type="submit">Enviar</Button>
    </Form>
  );
}
