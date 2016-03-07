import StyleIntro from '../styles/intro.less';
import styleApp from '../styles/app.scss';
import Accordion from '../components/accordion.js';
import {Tabs, TabPanel} from '../components/tabs.js';
import Button from '../components/button.js';
import styleIndex from '../styles/index.scss';
import ReactDOM from 'react-dom';
import React from 'react';

ReactDOM.render(
    <div className="container-placeholder">
        <div className='statusbar-overlay'></div>
        <Tabs>
            <TabPanel id='view-1' isActive={true}>
                <Accordion />
            </TabPanel>
            <TabPanel id='view-2'>
                about me
            </TabPanel>
            <div className="toolbar tabbar tabbar-labels">
                <div className="toolbar-inner">
                    <a href="#view-1" className="tab-link active">
                        <i className="icon manage"></i>
                        <span className="tabbar-label">管理</span>
                    </a>
                    <a href="#view-2" className="tab-link">
                        <i className="icon about-me"></i>
                        <span className="tabbar-label">我</span>
                    </a>
                </div>
            </div>
        </Tabs>
    </div>, document.getElementsByClassName('body')[0]);
