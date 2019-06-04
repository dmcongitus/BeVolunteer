import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import PostCard from '../PostCard/PostCard'


import './Post.css';

const PostList = ({ posts }) => (
  <div>
    {posts.map((post) => <PostCard key={post.id} {...post}></PostCard>)}
  </div>
);

export default PostList;