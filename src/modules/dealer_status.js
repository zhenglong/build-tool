import Settings from '../components/settings';
import StyleIntro from '../styles/intro.less';
import styleApp from '../styles/app.scss';
import styleDealerDetail from '../styles/dealer_status.scss';
import ReactDOM from 'react-dom';
import React from 'react';
import {Dom7 as $} from '../components/dom7.js';
import SalesUtil from '../components/sales-util.js';
import Page from 'file?name=../views/dealer_status.html!template-html?engine=handlebars&raw&title=状态&name=dealer_status!../views/template.release.html';

var DealerStatus = {
    100: '需修改', // modificationNeeded
    200: '审核中', // inProgress
    300: '已拒绝' // refused
};

//TODO: get login id from native
var loginId = '123';
SalesUtil.get('/api/sales/bd' + loginId + '/dealer-status-list/', function(result) {
    var list = result.data;
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

                                    </div>
                                    <span>
                                        {detail.name} {detail.role} {detail.submitDate} {DealerStatus[detail.status]}
                                    </span>
                                </div>
                                <div className="content-block-title">
                                    下属{detail.managedRole}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>, document.getElementsByClassName('body')[0]);
});
