/*===============================================================================
************   Accordion   ************
===============================================================================*/
// var $ = require('./dom7');
import React from 'react';
import {Dom7 as $} from './dom7';
import StyleAccordion from './accordion.less';

// ui render
// event registration
export default class Accordion extends React.Component {
    render() {
        return <div className="list-block accordion-list">
				<ul id="list">
					<li className="accordion-item">
						<a href="#" className="item-link item-content">
							<div className="item-inner">
								<div className="item-title">
									<div className="left">
                                        江苏省_苏州
									</div>
									<div className="right">
                                        <img src="../assets/img/placeholder.png" className="photo" />
                                        <span>张三儿</span>
									</div>
								</div>
							</div>
						</a>
						<div className="accordion-item-content">
							<div className="content-block">
								<ul>
									<li className="info">
                                        <img src="../assets/img/placeholder.png" className="photo" />
                                        <p>
                                        王二儿 <br/>
										江苏省_苏州_昆山
										</p>
									</li>
									<li className="info">
                                        <img src="../assets/img/placeholder.png" className="photo" />
                                        <p>
                                        王二儿 <br/>
										江苏省_苏州_昆山
										</p>
									</li>
								</ul>
							</div>
						</div>
					</li>
					<li className="accordion-item">
						<a href="#" className="item-link item-content">
							<div className="item-inner">
								<div className="item-title">
									<div className="left">
                                        江苏省_苏州
									</div>
									<div className="right">
                                        <img src="../assets/img/placeholder.png" className="photo" />
                                        <span>张三儿</span>
									</div>
								</div>
							</div>
						</a>
						<div className="accordion-item-content">
							<div className="content-block">
								<ul>
									<li className="info">
                                        <img src="../assets/img/placeholder.png" className="photo" />
                                        <p>
                                        王二儿 <br/>
										江苏省_苏州_昆山
										</p>
									</li>
									<li className="info">
                                        <img src="../assets/img/placeholder.png" className="photo" />
                                        <p>
                                        王二儿 <br/>
										江苏省_苏州_昆山
										</p>
									</li>
								</ul>
							</div>
						</div>
					</li>
				</ul>
            </div>
    }

    static registerEvents() {
        $(document).on('click', '.accordion-item-toggle, .item-link', function(e) {
            var clicked = $(this);
            if (clicked.hasClass('accordion-item-toggle') ||
                (clicked.hasClass('item-link') && clicked.parent().hasClass('accordion-item'))) {
                var accordionItem = clicked.parent('.accordion-item');
                if (accordionItem.length === 0) accordionItem = clicked.parents('.accordion-item');
                if (accordionItem.length === 0) accordionItem = clicked.parents('li');
                Accordion.toggle(accordionItem);
            }
        });
    }

    static toggle(item) {
        item = $(item);
        if (item.length === 0) return;
        if (item.hasClass('accordion-item-expanded')) Accordion.close(item);
        else Accordion.open(item);
    }
    static open(item) {
        item = $(item);
        var list = item.parents('.accordion-list').eq(0);
        var content = item.children('.accordion-item-content');
        if (content.length === 0) content = item.find('.accordion-item-content');
        var expandedItem = list.length > 0 && item.parent().children('.accordion-item-expanded');
        if (expandedItem.length > 0) {
            Accordion.close(expandedItem);
        }
        content.css('height', content[0].scrollHeight + 'px').transitionEnd(function () {
            if (item.hasClass('accordion-item-expanded')) {
                content.transition(0);
                content.css('height', 'auto');
                var clientLeft = content[0].clientLeft;
                content.transition('');
                item.trigger('opened');
            }
            else {
                content.css('height', '');
                item.trigger('closed');
            }
        });
        item.trigger('open');
        item.addClass('accordion-item-expanded');
    }
    static close(item) {
        item = $(item);
        var content = item.children('.accordion-item-content');
        if (content.length === 0) content = item.find('.accordion-item-content');
        item.removeClass('accordion-item-expanded');
        content.transition(0);
        content.css('height', content[0].scrollHeight + 'px');
        // Relayout
        var clientLeft = content[0].clientLeft;
        // Close
        content.transition('');
        content.css('height', '').transitionEnd(function () {
            if (item.hasClass('accordion-item-expanded')) {
                content.transition(0);
                content.css('height', 'auto');
                var clientLeft = content[0].clientLeft;
                content.transition('');
                item.trigger('opened');
            }
            else {
                content.css('height', '');
                item.trigger('closed');
            }
        });
        item.trigger('close');
    }
}
