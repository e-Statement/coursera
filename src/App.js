import StudentCard from './Components/StudentCard';
import Main from './Components/Main'
import React from 'react';
import { BrowserRouter as Router, Switch, Route, withRouter } from "react-router-dom";
import {
  TransitionGroup,
  CSSTransition
} from "react-transition-group";

import "./styles/fade.css";

const AnimatedSwitch = withRouter(({ location }) => (
    <TransitionGroup>
        <CSSTransition
          classNames="fade"
          timeout={10} 
          key={location.key}>
      <Switch location={location}>
        <Route exact path="/" component={Main} />
        <Route path="/students/:id" component={StudentCard} />
      </Switch>
      </CSSTransition>
    </TransitionGroup>  
));


function App() {
  return (
    <Router>
      <AnimatedSwitch />
    </Router>
  );
}

export default App;
