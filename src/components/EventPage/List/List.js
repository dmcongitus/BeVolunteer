import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import EventCard from '../EventCard/EventCard'

const List = ({ events }) => (
    <div>
        {
            events.map((event) => 
                <EventCard key={event.id} {...event}>
                </EventCard>)
            }
    </div>
);

export default List;