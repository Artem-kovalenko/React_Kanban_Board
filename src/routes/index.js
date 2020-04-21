import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import TrelloBoardContainer from "../containers/TrelloBoardContainer";
import HomeContainer from "../containers/HomeContainer";


const AppRouter = () => {
  return (
    <Router>
      <Switch>
          <Route path="/" exact component={HomeContainer} />
          <Route path="/board/:boardId" component={TrelloBoardContainer} />
      </Switch>
      
    </Router>
  );
};
// <Route path="/board/:boardID/card/:cardID" component={Modal} />
export default AppRouter;
