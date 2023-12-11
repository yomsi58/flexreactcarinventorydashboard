import React from "react";
import ReactDOM from "react-dom/client";
import { Home, Dashboard, SignIn, SignUp, SignUsOut } from "./components";
import "./styles.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { theme } from "./Theme/themes";
import { ThemeProvider } from "@mui/material/styles";
import { Provider } from "react-redux";
import { store } from "./redux/store";
// import { FirebaseAppProvider } from 'reactfire';
// import 'firebase/auth';
import { firebaseConfig } from './firebaseConfig';
import App from "./App";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    {/* <FirebaseAppProvider firebaseConfig={firebaseConfig}> */}
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Router>
          <App />
          <Routes>
            <Route path="/" element={<Home title={"Hot Diggity Dogs"} />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signout" element={<SignUsOut />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </Provider>
    {/* </FirebaseAppProvider> */}
  </React.StrictMode>
);
