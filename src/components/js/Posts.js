import React from 'react';
import n8nPostImage from '../../assets/images/n8n.jpg';
import '../css/Posts.css';

const posts = [
  {
    id: 1,
    title: 'Automating Processes with n8n',
    description: 'Learn how to automate your workflows using n8n, a powerful open-source automation tool.',
    link: 'https://www.chakray.com/automating-processes-n8n/',
    image: n8nPostImage,
    tags: ['Automation', 'n8n', 'Workflow']
  }
];

const Posts = () => {
  return (
    <div className="posts-container">
      <div className="content">
        <div className="intro">
          <h2><span style={{ color: '#E4A34E' }}>Explore my Posts!</span></h2>
        </div>
        <div className="posts-grid">
          {posts.map(post => (
            <div key={post.id} className="post-box" onClick={() => window.open(post.link, '_blank')}>
              {post.image && <img src={post.image} alt={post.title} className="post-image" />}
              <h3 style={{ color: 'black' }}>{post.title}</h3> {}
              <p style={{ color: 'black' }}>{post.description}</p> {}
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
