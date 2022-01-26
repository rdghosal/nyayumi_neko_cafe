import React from 'react';
import './css/App.css';
import { BrowserRouter, Route, RouterProps, Switch } from 'react-router-dom';
import Landing from './Landing';
import { Menu } from './Menu';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/" exact render={(props: RouterProps) => <Landing {...props}/>} />
          <Route path="/app" exact render={(props: RouterProps) => <Menu {...props}/>} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
