import React, {Component} from 'react';
import TOC from "./components/TOC";
import Content from "./components/Content";
import Subject from "./components/Subject";
import './App.css';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mode:"Welcome",
      subject:{title:'WEB', sub:'World Wide Web!'},
      Welcome:{title:"Welcome", desc:'Hello, React!'},
      contents:[
        {id:1, title:"HTML", desc:"HTML is for information"},
        {id:2, title:"CSS", desc:"CSS is for design"},
        {id:3, title:"JavaScript", desc:"JavaScript is for interactive"}
      ]
      }
    }
  

  render() {
    var _title, _desc = null;
    if(this.state.mode === 'Welcome') {
      _title = this.state.Welcome.title;
      _desc = this.state.Welcome.desc;
    } else if (this.state.mode === "read"){
      _title = this.state.contents[0].title;
      _desc = this.state.contents[0].desc;
    }
    return (
      <div className="App">
        <Subject 
          title={this.state.subject.title} 
          sub={this.state.subject.sub}>
        </Subject>
        <TOC data={this.state.contents}></TOC>
        <Content title={_title} desc={_desc}></Content>
      </div>
    );
  }
}

export default App;
