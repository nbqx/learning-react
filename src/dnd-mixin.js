/** @jsx React.DOM */

var React = require('react/addons'),
    Draggable = require('react-draggable');

var DnDMixin = {
  
  defaultInitialState: function(){
    var defaults = {
      id: this.props.id,
      content: this.props.content,
      position: {
        top: this.props.y,
        left: this.props.x
      },
      boxType: this.props.boxType
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
