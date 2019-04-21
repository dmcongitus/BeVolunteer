import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import PostCard from '../PostCard/PostCard'


import './Post.css';

const Post = (props) => (
   
    <div>
     
      <PostCard></PostCard>
      <PostCard></PostCard>
      <PostCard></PostCard>
      
  </div>       
              
);

export default Post;