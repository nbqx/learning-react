/** @jsx React.DOM */

var React = require('react/addons'),
    Draggable = require('react-draggable');

var DnDMixin = {
  
  defaultInitialState: function(){
    var content;
    
    if(this.props.content==null || this.props.content==undefined){
      content = "";
    }else{
      content = this.props.content;
    }
    
    var defaults = {
      id: this.props.id,
      content: content.toString(),
      position: {
        top: ((this.props.y!==undefined)? this.props.y : 0),
        left: ((this.props.x!==undefined)? this.props.x : 0)
      },
      boxType: ((this.props.boxType!==undefined)? this.props.boxType : undefined)
    };

    return defaults
  },

  handleDrag: function(ev,ui){
    this.setState({
      position: ui.position
    });
  },

  handleStop: function(ev,ui){
    this.props.whenUpdate(this.state);
  },

  onDelete: function(){
    this.props.whenDelete(this.props.id);
  },

  dndRender: function(inner){
    return (
      <Draggable
             start={{x: this.props.x, y: this.props.y}}
             handle="div.handle"
             onDrag={this.handleDrag}
             onStop={this.handleStop}
             zIndex={100}>
      { inner }
      </Draggable>
    )
  }
};

module.exports = DnDMixin;
