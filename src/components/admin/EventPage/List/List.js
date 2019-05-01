import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import EventCard from '../EventCard/EventCard'


import './List.css';

const List = ({ events }) => (
    <div>
        {
            events.map((post) => 
                <EventCard key={post.id} {...post}>
                </EventCard>)
            }
    </div>
);

export default List;