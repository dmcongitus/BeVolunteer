import React from 'react';
import { NavLink, Link } from 'react-router-dom';



import './RightSide.css';

const RightSide = (props) => (
          
                  <div className="widget-sidebar">
                    <h2 className="title-widget-sidebar">// Sự kiện xắp diễn ra</h2>
                    <div className="content-widget-sidebar">
                      <ul>
                        <li className="recent-post">
                          <div className="post-img">
                            <img src="https://lh3.googleusercontent.com/-ndZJOGgvYQ4/WM1ZI8dH86I/AAAAAAAADeo/l67ZqZnRUO8QXIQi38bEXuxqHfVX0TV2gCJoC/w424-h318-n-rw/thumbnail8.jpg" className="img-responsive" />
                          </div>
                          <a href="#"><h6>Hiến máu nhân đạo DH KHTN</h6></a>
                          <p><small><i className="fa fa-calendar" data-original-title title /> 30 Juni 2014</small></p>
                        </li>
                        <hr />
                        <li className="recent-post">
                          <div className="post-img">
                            <img src="https://lh3.googleusercontent.com/-ojLI116-Mxk/WM1ZIwdnuwI/AAAAAAAADeo/4K6VpwIPSfgsmlXJB5o0N8scuI3iW4OpwCJoC/w424-h318-n-rw/thumbnail6.jpg" className="img-responsive" />
                          </div>
                          <a href="#"><h6>Giúp đỡ cũ già tại ngã 6 lý thái tổ</h6></a>
                          <p><small><i className="fa fa-calendar" data-original-title title /> 30 Juni 2014</small></p>
                        </li>
                        <hr />
                        <li className="recent-post">
                          <div className="post-img">
                            <img src="https://lh3.googleusercontent.com/-TrK1csbtHRs/WM1ZI1SIUNI/AAAAAAAADeo/OkiUjuad6skWl9ugxbiIA_436OwsWKBNgCJoC/w424-h318-n-rw/thumbnail3.jpg" className="img-responsive" />
                          </div>
                          <a href="#"><h6>Mái ấm tình thương tại Tân Ấp Củ Chi</h6></a>
                          <p><small><i className="fa fa-calendar" data-original-title title /> 30 Juni 2014</small></p>
                        </li>
                        <hr />
                      
                        
                      </ul>
                    </div>
                  </div>          
);

export default RightSide;