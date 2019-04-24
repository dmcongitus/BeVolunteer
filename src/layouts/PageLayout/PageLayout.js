import React from 'react';
import MoreVerticalButton from '../../components/MoreVerticalButton/MoreVerticalButton';

const pageLayout = ({ title, children, hasMoreButton, onPostTypeChanged }) => (
    <div className="widget-sidebar" style={{ position: 'relative' }}>
        <h2 className="title-widget-sidebar" style={{ textTransform: 'uppercase' }}># {title}</h2>
        <div style={{ position: "absolute", right: '1.25rem', top: '1rem', zIndex: 1000 }}>
            {hasMoreButton && <MoreVerticalButton onPostTypeChanged={onPostTypeChanged} />}
        </div>
        {children}
    </div>
);

export default pageLayout;

