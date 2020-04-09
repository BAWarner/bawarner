import React, { Component } from 'react';
import './App.scss';
import routes from './routes';
import Nav from './Components/Nav/Nav';
import { Provider } from 'react-redux';
import store from './redux/store';
import { HashRouter } from 'react-router-dom';

class App extends Component {
  constructor(){
    super();
    this.state = {
    }
  }
  render(){
    return (
      <Provider store={store}>
        <HashRouter>
          <div className="App">
            <Nav />
            {routes}
          </div>
        </HashRouter>
      </Provider>
    );
  }
}

export default App;
