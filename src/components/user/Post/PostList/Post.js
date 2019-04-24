import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import PostCard from '../PostCard/PostCard'


import './Post.css';

const Post = ({ posts }) => (
  <div>
    {posts.map((post) => <PostCard key={post.id} {...post}></PostCard>)}
  </div>
);

export default Post;