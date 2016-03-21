/*===============================================================================
************   Accordion   ************
===============================================================================*/
// var $ = require('./dom7');
import React from 'react';
import {Dom7 as $} from './dom7';
import StyleAccordion from './accordion.less';

class AccordionItem extends React.Component {
    render() {
        return <li className="accordion-item">
            <a href="#" className="item-link item-content">
                <div className="item-inner">
                    <div className="item-title">
                        {this.props.item.key}
                    </div>
                </div>
            </a>
            <div className="accordion-item-content">
                <div className="content-block">
                    <ul>
                        {
                            (this.props.item.value || []).map(function(child) {
                                return <li className="info" key={child.id}>
                                    <a class="item-link item-content external" href="status.html">
                                        <img src={child.headUrl || "../assets/img/placeholder.png"} className="photo" />
                                        <p>
                                            {child.name}<br/>
                                            {(child.tag == 1) ?  <span>所属{child.superiorRole} &nbsp; {child.superiorName}</span> : ''}
                                        </p>
                                    </a>
                                </li>
                            })
                        }
                    </ul>
                </div>
            </div>
        </li>
    }
}

// ui render
// event registration
export default class Accordion extends React.Component {
    render() {
        var items = [];
        var item;
        for (var key in this.props.list) {
            if (!this.props.list.hasOwnProperty(key)) continue;
            item = {key: key, value: this.props.list[key]};
            items.push(<AccordionItem key={item.key} item={item} />);
        }
        return <div className="list-block accordion-list">
				<ul id="list">
                    {items}
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
        // if (expandedItem.length > 0) {
        //     Accordion.close(expandedItem);
        // }
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
