import React from 'react';
import { BrowserRouter as Router, Switch, Route, useParams } from 'react-router-dom';
import Upload from './Upload';

function Photo () {

  let { photoID } = useParams<{ photoID : string }>();

  return <div>Rendering photo with ID {photoID}</div>;

}

function App() {
  return (
    <Router>

      <Switch>
        <Route exact path="/">
          <Upload />
        </Route>
        <Route path = "/:photoID">
          <Photo />
        </Route>
      </Switch>

    </Router>
  );
}

export default App;
