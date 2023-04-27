// import logo from './logo.svg';
import "./App.css";
import { Routes, Route } from 'react-router-dom'
import User from "./components/User/User";
import Bar from "./components/Navbar/Bar";
import Usercreate from "./components/User/Usercreate";
import Loginpage from "./components/User/login";
// import Testpage from "./components/User/test";

function App() {
  return (
    <div>
      <header>
        <Bar />
        <Routes>
          <Route path="/" element={ <User /> } />
          <Route path="/create" element={ <Usercreate /> } />
          <Route path="/login" element={ <Loginpage /> } />
          {/* <Route path="/test" element={ <Testpage /> } /> */}
        </Routes>
      </header>
    </div>
  );
}

export default App;
