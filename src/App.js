import './App.css';
import { Component } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./login"
import Items from './items';
import Summary from "./summary";

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: "",
      isAuthenticated: false
    };
    this.handleUserChange = this.handleUserChange.bind(this)
    this.handleAuthChange = this.handleAuthChange.bind(this)
  }

  handleUserChange(username) {
    this.setState({username: username, isAuthenticated: false})
  }

  handleAuthChange(isAuthenticated) {
    this.setState((prevState) => ({username: prevState.username, isAuthenticated: isAuthenticated}))
  }

  render() {
    return(
      <BrowserRouter>
        <Routes>
          <Route index element={<Login handleUserChange={this.handleUserChange} handleAuthChange={this.handleAuthChange}/>} />
          <Route path="login" element={<Login handleUserChange={this.handleUserChange} handleAuthChange={this.handleAuthChange}/>} />
          <Route path="items" element={<Items user={this.state.user} isAuthenticated={this.state.isAuthenticated}/>} />
          <Route path="summary" element={<Summary user={this.state.user} isAuthenticated={this.state.isAuthenticated}/>} />
          <Route path="*" element={<Login handleUserChange={this.handleUserChange} handleAuthChange={this.handleAuthChange}/>} />
      </Routes>
      </BrowserRouter>
    );
  }
}

export default App;
