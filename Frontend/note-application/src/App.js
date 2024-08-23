import logo from "./logo.svg";
import "./App.css";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import SignUp from "./Pages/Signup";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import MainScreen from "./Pages/MainScreen";
import { useSelector } from "react-redux";
import NoPage from "./Pages/NoPage";
import Modal from "./Pages/Modal";
function App() {
  const login = useSelector((state) => state.LoginState.login);
  const modal = useSelector((state) => state.LoginState.modal);
  console.log(login, "ITS STATE OF Login Variable");
  return (
    <div>
      {modal && <Modal></Modal>}
      <BrowserRouter>
        <Routes>
          {!login && <Route path="/" element={<Home></Home>}></Route>}
          {!login && <Route path="signup" element={<SignUp></SignUp>}></Route>}
          {!login && <Route path="Login" element={<Login></Login>}></Route>}
          {login && (
            <Route path="/Main" element={<MainScreen></MainScreen>}></Route>
          )}

          <Route path="*" element={<NoPage></NoPage>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
