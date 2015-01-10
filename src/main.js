/** @jsx React.DOM */

var $ = require('jquery'),
    React = require('react/addons'),
    Draggable = require('react-draggable'),
    markdown = require('markdown').markdown;

var App = require('./app');

var DATA = [
  {id: 1, x: 30, y: 90, content: "# Test01"},
  {id: 2, x: 450, y: 40, content: "# Test02\n\n![http://40.media.tumblr.com/10542a3c4dafbb13e2044e82424af572/tumblr_ncv57htTpP1tnyx3bo1_1280.jpg](http://40.media.tumblr.com/10542a3c4dafbb13e2044e82424af572/tumblr_ncv57htTpP1tnyx3bo1_1280.jpg)"}
];

// var app = <App name='main' data={[]} />;
var app = <App name='main' data={DATA} />;
// var app = <App name='main' dataUrl='/data.json' />;
// var app = <App name='main' data={DATA} searchKey='01' />;

React.render(app, document.querySelector('#main'));

