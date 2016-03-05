/*
 * button.js
 * Copyright (C) 2016 tristan <tristan@tristan-VirtualBox>
 *
 * Distributed under terms of the MIT license.
 */

/*import React from 'react';
import styleApp from '../styles/app.scss';
import styleButton from './button.scss';

export default class Button extends React.Component {
    render() {
        return <button type="button">{this.props.text}</button>
    }
}*/

var React = require('react');
var styleApp = require('../styles/app.scss');
var styleButton = require('./button.scss');

module.exports = React.createClass({
    displayName: 'Button',
    render: function() {
        return <button type="button">{this.props.text}</button>
    }
});

