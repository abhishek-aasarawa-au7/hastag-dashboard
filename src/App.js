import React, { Fragment } from "react";

// components
import List from "./client/components/Dashboard";
import Buttons from "./client/components/Buttons";

function App() {
  return (
    <Fragment>
      <Buttons />
      <List />
    </Fragment>
  );
}

export default App;
