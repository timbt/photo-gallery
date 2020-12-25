import React from 'react';
import { BrowserRouter as Router, Switch, Route, useParams } from 'react-router-dom';
import Upload from './Upload';

function Photo () {

  let { photoID } = useParams<{ photoID : string }>();

  return <div>Rendering photo with ID {photoID}</div>;

}

const API_URL = 'https://serene-spire-68454.herokuapp.com';

function App() {
  return (
    <Router>

      <Switch>
        <Route exact path="/">
          <Upload api={API_URL} />
        </Route>
        <Route path = "/:photoID">
          <Photo />
        </Route>
      </Switch>

    </Router>
  );
}

export default App;
