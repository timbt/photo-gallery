import React from 'react';
import { BrowserRouter as Router, Switch, Route, useParams } from 'react-router-dom';
import Upload from './Upload';
import DisplayPicture from './DisplayPicture';

function App() {
  return (
    <Router>

      <Switch>
        <Route exact path="/">
          <Upload />
        </Route>
        <Route path = "/:pictureID">
          <DisplayPicture />
        </Route>
      </Switch>

    </Router>
  );
}

export default App;
