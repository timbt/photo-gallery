import React from 'react';
import { BrowserRouter as Router, Switch, Route, useParams } from 'react-router-dom';

function Photo () {

  let { photoID } = useParams<{ photoID : string }>();

  return <div>Rendering photo with ID {photoID}</div>;

}

function App() {
  return (
    <Router>

      <Switch>
        <Route exact path="/">
          Hello world!
        </Route>
        <Route path = "/:photoID">
          <Photo />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
