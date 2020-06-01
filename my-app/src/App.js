import React, { Component } from 'react';
// import logo from './logo.svg';
import Form from './components/form'
import './App.css';

class App extends Component {

  constructor(props){
    super(props)
    this.state = {
      submited:false,
      data:{},
    }
  }

setSubmited = val=>{
  this.setState({submited:val})
}

setData = val=>{
  this.setState({data:val})
}

  render() {
    return (
      <div className="App">
        {this.state.submited ?(
          
            <div className="details">
              <div className="feild">
                <label>Search Query :</label>
                {this.state.data.searchQuery}
              </div>
              <div className="feild">
                <label>User Name :</label>
                {this.state.data.username}
              </div>
              <div className="feild">
                <label>Password:</label>
                {this.state.data.password}
              </div>
              <div className="feild">
                <label>Server Ip:</label>
                {this.state.data.ip}
              </div>
              <div className="feild">
                <label>Send Email:</label>
                {this.state.data.email}
              </div>
            <div className="feild">
                <label>Time Range:</label>
                {this.state.data.time}
              </div>
            </div>
        
        ):(
          
            <div className="form">
              <Form setSubmited={this.setSubmited} setData={this.setData}/>
            </div>
         
        )}
        
      </div>
    );
  }
}

export default App;
