// import { EthProvider } from "./contexts/EthContext";

import React from "react";

// import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserMainScreen } from "./components/User-Screens/UserMainScreen";
import { UserLoginComponent } from "./components/User-Login/UserLogin";
import { EthContext } from "./contexts/EthContext";

function App() {
  // eslint-disable-next-line
  const [state, dispatch] = React.useContext(EthContext);

  React.useEffect(() => {
    window.badges = require('./DemoData/userData.json');
  }, []);

  return (
    <React.Fragment>
      {
        !state.isLoggedIn &&
        <UserLoginComponent/>
      }
      {
        state.isLoggedIn &&
        <UserMainScreen />
      }
    </React.Fragment>
  );
}

export default App;
