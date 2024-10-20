// src/components/js/Posts.js

import React from 'react';
import CanvasBackground from './CanvasBackground'; // Adjust the import if the path is different
import n8nPostImage from '../../assets/images/n8n.jpg'; // Import the n8n post image
import '../css/Posts.css'; // You can reuse this for custom styling

const posts = [
  {
    id: 1,
    title: 'Automating Processes with n8n',
    description: 'Learn how to automate your workflows using n8n, a powerful open-source automation tool.',
    link: 'https://www.chakray.com/automating-processes-n8n/',
    image: n8nPostImage,
    tags: ['Automation', 'n8n', 'Workflow'] // Add tags here
  }
];

const Posts = () => {
  return (
    <div className="home-container">
      <CanvasBackground />
      <div className="content">
        <div style={{
          position: 'relative',
          padding: '20px',
          backgroundColor: 'rgba(0, 0, 0, 0.7)', // Increased opacity for better visibility
          borderRadius: '8px',
          marginTop: '-20px', // Adjusted for better positioning
          zIndex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          color: '#F0F0F0',
          marginBottom: '2.5px',
        }}>
          <h2><span style={{ color: '#e6b678' }}>Explore my Posts!</span></h2>
          <p>Here you'll find posts about various topics, including automation, coding, and more.</p>
        </div>
        <div className="posts-grid">
          {posts.map(post => (
            <div key={post.id} className="post-box" onClick={() => window.open(post.link, '_blank')}> {}
              {post.image && <img src={post.image} alt={`${post.title}`} className="post-image" />} {}
              <h3>{post.title}</h3>
              <p>{post.description}</p>
              <div className="tags">
                {post.tags.map((tag, index) => (
                  <span key={index} className="tag">{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Posts;
