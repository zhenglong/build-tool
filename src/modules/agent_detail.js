import Settings from '../components/settings';
import StyleIntro from '../styles/intro.less';
import styleApp from '../styles/app.scss';
import Accordion from '../components/accordion.js';
import {Tabs, TabPanel} from '../components/tabs.js';
import Button from '../components/button.js';
import styleContentBlock from '../components/content-block.less';
import styleAgentDetail from '../styles/agent_detail.scss';
import ReactDOM from 'react-dom';
import React from 'react';
import {Dom7 as $} from '../components/dom7.js';
import SalesUtil from '../components/sales-util.js';
import Page from 'file?name=../views/agent_detail.html!template-html?engine=handlebars&raw&title=D3体系&name=agent_detail!../views/template.release.html';

Accordion.registerEvents();
Tabs.registerEvents();

SalesUtil.get('/api/sales/agent/info/', function(result) {
    var detail = result.data;
    detail.agentName = '张三儿'; // TODO: fetch from url
    ReactDOM.render(
        <div className="container-placeholder">
            <div className='statusbar-overlay'></div>
            <div className="views">
                <div id="view-1" className="view view-main">
                    <div className="pages">
                        <div data-page="index-1" className="page ">
                            <div className="page-content">
                                <div className="info">
                                    <div>
                                        <img src={detail.headUrl || "img/placeholder.png"} className="photo" />
                                        <p>
                                            {detail.salesArea}<br />
                                            所属{detail.managerRole} {detail.managerName}
                                        </p>
                                    </div>
                                    <span>
                                        {detail.agentName}
                                    </span>
                                </div>
                                <div className="content-block-title">
                                    下属{detail.managedRole}
                                </div>
                                <div className="list-block">
                                    <ul>
                                    {
                                        (detail.managedAreas || []).map(function(item) {
                                            return <li className="item-content">
                                                <div className="item-inner">
                                                    <div className="item-title">
                                                        <img src={item.headUrl || "img/placeholder.png"} className="photo" />
                                                        <span>{item.agentName}</span>
                                                    </div>
                                                </div>
                                            </li>
                                        })
                                    }
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>, document.getElementsByClassName('body')[0]);
});
