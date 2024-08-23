import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import img from "./Assests/spin.gif";
import { IsLogout } from "../Store/LoginSlice";
const NavBar = (props) => {
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const login = useSelector((state) => state.LoginState.login);
  return (
    <div className="flex flex-row font-bold justify-between py-2 px-5 bg-yellow-400 items-center fixed top-0 left-0 right-0 mb-8 z-10">
      <div>
        <h2 className="text-xl">Notes Application</h2>
      </div>
      {!login && (
        <div>
          <button
            className="m-2 p-2 text-white bg-purple-900 rounded-md"
            onClick={() => {
              Navigate("/signup");
            }}
          >
            SignUp
          </button>
          <button
            className="m-2 p-2 text-white bg-purple-900 rounded-md"
            onClick={() => {
              Navigate("/login");
            }}
          >
            Login
          </button>
        </div>
      )}

      {login && (
        <div>
          <div className="flex flex-row items-center">
            <button
              className="m-2 p-2 text-white bg-purple-900 rounded-md"
              onClick={() => {
                dispatch(IsLogout());
                localStorage.clear();
                Navigate("/login");
              }}
            >
              LOGOUT
            </button>
            <div>
              <div className="rounded-2xl text-white bg-purple-700 p-3">
                {localStorage.getItem("name")[0]}
              </div>
            </div>
            <div className="text-center px-3">
              <p className="text-left">{localStorage.getItem("name")}</p>
              <p className="text-left">{localStorage.getItem("email")}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default NavBar;
