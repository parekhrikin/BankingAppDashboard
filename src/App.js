import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import RequiredAuth from "./components/RequiredAuth";
import RegistrationForm from "./components/RegistrationForm";
import Dashboard from "./scenes/dashboard";
import Rates from "./scenes/rates";
import ConfirmedRates from "./scenes/confirmedRates";
import Customers from "./scenes/customers";
import AddRate from "./scenes/addRate";
import Sidebar from "./scenes/global/Sidebar";
import Topbar from "./scenes/global/Topbar";
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";

function App() {
  const [theme, colorMode] = useMode();
  // const [authenticated, setAuthenticated] = useState(false);
  const authenticated = useSelector((state) => state.auth.authenticated);
  const userType = useSelector((state) => state.auth.userType);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {/* <Router> */}
        <Routes>
          <Route
            path="/"
            element={
              authenticated ? (
                userType === "customer" ? (
                  <AuthenticatedContentForCustomer />
                ) : (
                  <AuthenticatedContentForStaff />
                )
              ) : (
                <RequiredAuth />
              )
            }
          />
        </Routes>
        {/* </Router> */}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

function AuthenticatedContentForCustomer() {
  return (
    <div className="app">
      <Sidebar />
      <main className="content">
        <Topbar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/rates" element={<Rates />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/confirmedRates" element={<ConfirmedRates />} />
          <Route path="/add" element={<AddRate />} />
        </Routes>
      </main>
    </div>
  );
}

function AuthenticatedContentForStaff() {
  return (
    <div className="app">
      <Sidebar />
      <main className="content">
        <Topbar />
        {/* Add routes specific to staff */}
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/rates" element={<Rates />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/confirmedRates" element={<ConfirmedRates />} />
          <Route path="/add" element={<AddRate />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
