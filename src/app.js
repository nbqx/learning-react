/** @jsx React.DOM */

var $ = require('jquery'),
    React = require('react/addons'),
    _ = require('lodash');

var console = require('console-browserify');

var Control = require('./control'),
    Fusen = require('./fusen');

var App = React.createClass({
  
  getInitialState: function(){
    var state = {};
    state.data = (this.props.data!==undefined)? this.props.data : [];
    state.searchKey = (this.props.searchKey===undefined)? '' : this.props.searchKey;
    return state
  },

  onUpdate: function(dt){
    // [memo] - さいごにDnDしたものをarrayの末尾にいれる -> z-indexこれでやる
    
    var nextData = _.chain(this.state.data).reduce(function(m,o){
      if(o.id===dt.id){
        var ret = {
          id: dt.id,
          x: dt.position.left,
          y: dt.position.top,
          content: dt.content
        };
        if(dt.boxType!==undefined) ret.boxType = dt.boxType
        m[1].push(ret);
      }else{
        m[0].push(o);
      }
      return m;
    },[[],[]]).flatten().value();
    
    this.setState({data: nextData});
  },
  
  onCreate: function(){
    var uid = Date.now();
    var d = {
      id:uid,
      x:50,
      y:50,
      content:'# No Title'
    };
    var nextData = this.state.data.concat([d]);
    this.setState({
      data: nextData
    });
  },

  // Access-Control-Allow-Origin
  // [todo] - jsonpに?
  onLoad: function(){
    // xhrをなげるまえにthis.state.dataをリセットしてあげないとダメぽい

    // [todo] - e.target.valueでもらう
    var url = prompt('Enter URL');
    var prevData = this.state.data;

    if(url!==null && url!==''){
      $.ajax({
        url: url,
        dataType:'json',
        beforeSend: function(){
          this.setState({
            data: []
          });
        }.bind(this),
      }).then(function(nextData){
        this.setState({
          data: nextData
        });
      }.bind(this)).fail(function(xhr,st,err){
        var ebox = {
          id: Date.now(),
          x: 100,
          y: 100,
          boxType: 'error-box',
          content: "# Error" + ((xhr.responseText===undefined)? "" : ": \n\n"+xhr.responseText)
        };

        this.setState({
          data: prevData.concat([ebox])
        });
      }.bind(this));
    }
    
  },
  
  // Access-Control-Allow-Origin
  // [todo] - いいかんじにする
  onSave: function(){
    var url = prompt('Enter URL');
    var prevData = this.state.data;
    
    if(url!==null && url!==''){
      $.ajax({
        url: url,
        method: 'post',
        dataType: 'json',
        data: {data: this.state.data}
      }).then(function(req){
        
        console.log(req);
        
      }.bind(this)).fail(function(xhr,st,err){
        
        var ebox = {
          id: Date.now(),
          x: 100,
          y: 100,
          boxType: 'error-box',
          content: "# Error: "+err+"\n\n"+xhr.responseText
        };
        
        this.setState({
          data: prevData.concat([ebox])
        });
        
      }.bind(this));
    }
    
  },

  onDelete: function(id){
    var nextData = this.state.data.filter(function(o){ return o.id !== id });
    this.setState({
      data: nextData
    });
  },

  onSearch: function(q){
    this.setState({
      searchKey: q
    });
  },

  componentDidMount: function() {
    // dataUrlが指定されていればxhrでゲト
    if(this.props.dataUrl!==undefined){
      $.ajax({
        url: ths.props.dataUrl,
        dataType:'json'
      })
        .then(function(data){
          this.setState({
            data: data
          });
        }.bind(this));
    }
  },
  
  render: function(){
    var data = []; // 表示用

    // [todo] - schema check
    
    if(this.state.searchKey!==''){
      var reg = new RegExp(this.state.searchKey,'i');
      data = this.state.data.filter(function(o){ return reg.test(o.content) });
    }else{
      data = this.state.data;
    }
    
    return (
        <div id='memos-wrapper'>
          <div id='memos'>
          {data.map(function(dt){
            return <Fusen key={dt.id}
                          id={dt.id}
                          x={dt.x}
                          y={dt.y}
                          boxType={dt.boxType}
                          content={dt.content}
                          whenUpdate={this.onUpdate}
                          whenDelete={this.onDelete}
                />
          }.bind(this))}
          </div>
        <Control createAction={this.onCreate}
                 loadAction={this.onLoad}
                 saveAction={this.onSave}
                 searchAction={this.onSearch}
                 searchKey={this.state.searchKey} />
        </div>
    )
  }
});

module.exports = App;
