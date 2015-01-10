/** @jsx React.DOM */

var React = require('react/addons');

var Control = React.createClass({

  getInitialState: function(){
    return {
      searchKey: this.props.searchKey
    }
  },
  
  onSearch: function(e){
    this.props.searchAction(e.target.value);
  },
  
  render: function(){
    
    return (
        <div id='menu'>
        <div>
        <a href='javascript:;' onClick={this.props.createAction}>Add</a>
        </div>
        <div>
        <a href='javascript:;' onClick={this.props.loadAction}>Load</a>
        </div>
        <div>
        <a href='javascript:;' onClick={this.props.saveAction}>Save</a>
        </div>
        <div>
        <input type='text'
               className='search-box'
               onChange={this.onSearch}
               defaultValue={this.state.searchKey}
               placeholder='Search' />
        </div>
        </div>
    )
    
  }
});

module.exports = Control;
