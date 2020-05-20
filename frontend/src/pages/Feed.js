import React, { useEffect, useState } from 'react';
import socketio from 'socket.io-client';

import api from '../services/api';

import './Feed.css';
import like from '../assets/like.svg';


export default function Feed() {

  const [feed, setFeed] = useState([]);
  const socket = socketio('http://localhost:3333');

  const [blocked, setBlocked] = useState(false);

  useEffect(() => {
    socket.on('post', data => {
      setFeed([data, ...feed]);
    });

  }, [feed, socket]);

  useEffect(() => {
    socket.on('like', likedPost => {
      setFeed(feed.map(post => 
        post._id === likedPost._id ? likedPost : post
      ));
    });
  }, [feed, socket]);
  
  useEffect(() => {
    async function loadFeed() {
      const response = await api.get('posts');
      setFeed(response.data);
    }

    loadFeed();

  }, [])

  async function handleLike(id, blocked) {
    if(blocked) {
      setBlocked(true);
      console.log('foi');
    }
    await api.post(`/posts/${id}/like`);
    setBlocked(false);
  }

  return (
    <section id="post-list">
      {feed.map(post => (
        <article key={post._id}>
          <header>
            <div className="user-info">
              <span>{post.author}</span>
              <span className="place">{post.place}</span>
            </div>
          </header>
          <img src={`http://localhost:3333/files/${post.image}`} alt="Post"/>
          <footer>
            <div className="actions">
              <button type="button" disabled={blocked} style={{cursor: `${blocked ? 'none' : 'pointer'}`}} onClick={() => handleLike(post._id, true)}>
                <img src={like} alt="Like"/>
              </button>
            </div>
              <strong>{post.likes} curtidas</strong>
              <p>{post.description}</p>
              <span>{post.hashtags}</span>
          </footer>
      </article>
      ))}
    </section>
  );
}
