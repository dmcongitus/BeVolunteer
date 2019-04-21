import React from 'react';

const pageLayout = ({ title, children }) => (
    <div className="widget-sidebar">
        <h2 className="title-widget-sidebar" style={{textTransform: 'uppercase'}}># {title}</h2>
        {children}
    </div>
);

export default pageLayout;