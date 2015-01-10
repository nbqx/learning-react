/** @jsx React.DOM */

var React = require('react/addons'),
    markdown = require('markdown').markdown;

var console = require('console-browserify');

// DnDのためのmixin
var DnDMixin= require('./dnd-mixin');

var Fusen = React.createClass({
  
  mixins: [DnDMixin],
  
  getInitialState: function(){
    var state = this.defaultInitialState();
    state.editMode = false;
    return state;
  },

  onChangeHandler: function(name,e){
    this.setState({
      content: e.target.value
    });
  },
  
  onClose: function(){
    this.setState({
      editMode: false
    });
    this.props.whenUpdate(this.state);
  },
  
  onEdit: function(){
    this.setState({
      editMode: true
    });
  },
  
  render: function(){
    
    var htmlContent = <div className='box-content'
      dangerouslySetInnerHTML={{__html: markdown.toHTML(this.state.content) }}>
    </div>

    var viewElm = <div className={(this.state.boxType==undefined)? 'box no-cursor' : this.state.boxType+' box no-curosor'}>
        <div className='handle cursor'>&nbsp;</div>
        { htmlContent }
        <div className='box-ctrl'>
             <a href='javascript:;' onClick={this.onEdit}>Edit</a>
             &nbsp;
             <a href='javascript:;' onClick={this.onDelete}>Del</a>
        </div>
    </div>;
    
    var editElm = <div className={(this.state.boxType==undefined)? 'box no-cursor' : this.state.boxType+' box no-curosor'}>
          <div className='handle cursor'>&nbsp;</div>
          { htmlContent }
          <div className='box-content-form'>
          <textarea onChange={ this.onChangeHandler.bind(this,'content') }
                    defaultValue={ this.state.content }></textarea>
          </div>
          <div className='box-ctrl'>
          <a href='javascript:;' onClick={this.onClose}>Close</a>
          </div>
      </div>;
    
    var elm = (this.state.editMode)? editElm : viewElm;
    return this.dndRender(elm);
      
  }
});

module.exports = Fusen;
