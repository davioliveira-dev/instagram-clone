import React, { useState, useMemo } from 'react';

import api from '../services/api';

import './New.css';

export default function New({ history }) {

  const [image, setImage] = useState(null);
  const [author, setAuthor] = useState('');
  const [place, setPlace] = useState('');
  const [description, setDescription] = useState('');
  const [hashtags, setHashtags] = useState('');
  
  const preview = useMemo(
    () => {
        return image ? URL.createObjectURL(image) : null
    },
    [image]
  );

  async function handleSubmit(e) {
    e.preventDefault();

    const data = new FormData();

    data.append('image', image);
    data.append('author', author);
    data.append('place', place);
    data.append('description', description);
    data.append('hashtags', hashtags);

    await api.post('posts', data);

    history.push('/');

  }

  return (
    <form id="new-post" onSubmit={handleSubmit}>
      <p>Imagem do Post</p>
      <label id="thumbnail" 
             style={image ? {backgroundImage: `url(${preview})`} : { display: 'none' }}
             className={image ? 'has-thumbnail' : ''} 
      />
      <input type="file" onChange={ e => setImage(e.target.files[0])} />

      <input type="text" 
             name="author" 
             placeholder="Autor do post"
             onChange={ e => setAuthor(e.target.value)}
      />

      <input type="text" 
             name="place" 
             placeholder="Lugar do post"
             onChange={ e => setPlace(e.target.value)}
      />

      <textarea name="description" 
                className="desc" 
                placeholder="Descrição do post"
                onChange={ e => setDescription(e.target.value)}
      />

      <input type="text" 
             name="hashtags" 
             placeholder="Hashtags do post"
             onChange={ e => setHashtags(e.target.value)}
      />

      <button type="submit"> Enviar </button>

    </form>
  );
}
