import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import ForgotPassword from "./pages/ForgotPassword";
import Offers from "./pages/Offers";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Header from "./components/Header";
import YouTubeForm from "./components/YouTubeForm";

// import { Sandpack } from "@codesandbox/sandpack-react";

// function App() {
//   return (
//     <Sandpack
//       template="react"
//       // options={{
//       //   bundlerURL: "http://localhost:8080",
//       // }}
//     />
//   );
//   // return <Sandpack template="nextjs" />;
// }

function App() {
  return (
    // <div className='font-bold'>Hello
    // </div>
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<YouTubeForm />}></Route>

          <Route path="/home" element={<Home />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/forgot-password" element={<ForgotPassword />}></Route>
          <Route path="/offers" element={<Offers />}></Route>
          <Route path="/sign-in" element={<SignIn />}></Route>
          <Route path="/sign-up" element={<SignUp />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;

// <div className="App">
// <header className="App-header">
//   <img src={logo} className="App-logo" alt="logo" />
//   <p>
//     Edit <code>src/App.tsx</code> and save to reload.
//   </p>
//   <a
//     className="App-link"
//     href="https://reactjs.org"
//     target="_blank"
//     rel="noopener noreferrer"
//   >
//     Learn React
//   </a>
// </header>
// </div>
