import Settings from '../components/settings';
import StyleIntro from '../styles/intro.less';
import styleApp from '../styles/app.scss';
import Accordion from '../components/accordion.js';
import {Tabs, TabPanel} from '../components/tabs.js';
import Button from '../components/button.js';
import styleContentBlock from '../components/content-block.less';
import styleIndex from '../styles/index.scss';
import ReactDOM from 'react-dom';
import React from 'react';
import {Dom7 as $} from '../components/dom7.js';
import SalesUtil from '../components/sales-util.js';
import Page from 'file?name=../views/index.html!template-html?engine=handlebars&raw&title=index&name=index!../views/template.html';

Accordion.registerEvents();
Tabs.registerEvents();

SalesUtil.get('/api/sales/agent/list/', function(result) {
    var list = result.data;
    ReactDOM.render(
        <div className="container-placeholder">
            <div className='statusbar-overlay'></div>
            <Tabs>
                <TabPanel id='view-1' isActive={true}>
                    <Accordion list={list} />
                </TabPanel>
                <TabPanel id='view-2'>
                    <div className="content-block">
                    about me
                    </div>
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
        window.setTimeout(function() {
            if (list.length == 1) {
                Accordion.open($('.accordion-item')[0]);
            }
        }, 0);
});
