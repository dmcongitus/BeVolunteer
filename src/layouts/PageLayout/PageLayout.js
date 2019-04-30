import React from 'react';
import MoreVerticalButton from '../../components/MoreVerticalButton/MoreVerticalButton';
import './PageLayout.css'
const pageLayout = ({ title, children, hasMoreButton, onPostTypeChanged }) => (
    <div className="side-body" style={{ position: 'relative' }}>
        <h2 className="title-side-body" style={{ textTransform: 'uppercase' }}>
        <div className= "title-text">
        # {title}
            </div></h2>
        <div style={{ position: "absolute", right: '1.25rem', top: '1rem', zIndex: 1000 }}>
            {hasMoreButton && <MoreVerticalButton onPostTypeChanged={onPostTypeChanged} />}
        </div>
        {children}
    </div>
);

export default pageLayout;
