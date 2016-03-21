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
import Page from 'file?name=../views/index.html!template-html?engine=handlebars&raw&title=代理商&name=index!../views/template.release.html';

Accordion.registerEvents();
Tabs.registerEvents();

function setNavbarStatus() {
    function makeCb(callbackId) {
        return 'bridge.callback(' + callbackId + ')';
    }
    window.bridge.setTitle('代理商');
    var functionId =
    window.bridge.addRightButtons([{
        name: 'status',
        label: '状态',
        action: makeCb(bridge.attach(function() {
            bridge.pushStack({
                title: '状态',
                url: 'dealer-status.html'
            });
        }))
    }]);
}

function init() {
    setNavbarStatus();

    //TODO: get login id from native
    var loginId = '123';
    SalesUtil.get('/api/sales/bd/'+ loginId + '/dealer-list/', function(result) {
        var list = result.data;
        var roles = ['D3', 'D2', 'D1'];
        function filter(list, cb) {
            var res = [];
            for (var i = 0; i < list.length; i++) {
                if (cb(list[i])) res.push(list[i]);
            }
            return res;
        }
        var group = {};
        for (var i = 0; i < roles.length; i++) {
            group[roles[i]] = filter(list, l => l.role == roles[i]);
        }
        ReactDOM.render(
            <div className="container-placeholder">
                <div className='statusbar-overlay'></div>
                <Tabs>
                    <TabPanel id='view-1' isActive={true}>
                        <Accordion list={group} />
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
            Accordion.open($('.accordion-item'));
        }, 0);
    });
}

$(document).on('bridgeReady', function() {
    console.log('bridge ready');
    init();
});
