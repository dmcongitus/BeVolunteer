import React from 'react';
import MoreVerticalButton from '../../components/Layout/MoreVerticalButton/MoreVerticalButton';
import './PageLayout.css'
const pageLayout = ({ title, children, hasMoreButton, onPostTypeChanged }) => (
    <div className="side-body" style={{ position: 'relative' , minHeight: '84vh'}}>
        <div className="title-side-body" style={{ textTransform: 'uppercase' }}>
        <div className= "title-text">
        <i class="fas fa-cube"></i> {title}
            </div></div>
        <div style={{ position: "absolute", right: '1.25rem', top: '1rem', zIndex: 1000 }}>
            {hasMoreButton && <MoreVerticalButton onPostTypeChanged={onPostTypeChanged} />}
        </div>
        {children}
    </div>
);

export default pageLayout;

