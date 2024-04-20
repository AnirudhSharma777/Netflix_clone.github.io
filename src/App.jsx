import "./App.css";
import Navbar from "./components/Navbar";
import { AuthContextProvider } from "./context/AuthContext";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import Account from "./pages/Account";
import ProtectedProvider from "./components/ProtectedProvider";

function App() {
  return (
    <>
      <AuthContextProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/account-profile"
            element={
              <ProtectedProvider>
                <Account />
              </ProtectedProvider>
            }
          />
        </Routes>
      </AuthContextProvider>
    </>
  );
}

export default App;
