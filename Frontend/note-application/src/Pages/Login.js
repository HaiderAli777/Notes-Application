import { Link } from "react-router-dom";
import NavBar from "./NavBar";
import { useState } from "react";
import logo from "./Assests/spin.gif";
import { useSelector, useDispatch } from "react-redux";
import { IsLogin, IsLogout } from "../Store/LoginSlice";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../axiosInstance";

const Login = () => {
  const [LoginStates, setLoginStates] = useState({
    email: false,
    vemail: false,
    password: false,
    form: false,
  });
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [Submit, setSubmit] = useState(false);
  const navigate = useNavigate();
  const [exist, setExist] = useState("");

  const checklogin = (e) => {
    e.preventDefault();
    if (email !== " " && password !== " ") {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!regex.test(email)) {
        setLoginStates((pre) => ({
          ...pre,
          email: false,
          vemail: true,
        }));
      } else {
        setLoginStates((pre) => ({
          ...pre,
          vemail: false,
        }));
        //empty the fields
        setEmail("");
        setPassword("");
        //Here we make an api called
        const makingAccount = async () => {
          try {
            setSubmit(true);

            const res = await axiosInstance.post("/Login", {
              Email: email,
              Password: password,
            });
            console.log("try", res);
            localStorage.setItem("jwttoken", res.data.jwttoken);
            localStorage.setItem("userId", res.data.userId);
            localStorage.setItem("email", res.data.data.email);
            localStorage.setItem("name", res.data.data.name);

            setTimeout(() => {
              setSubmit(false);
              dispatch(IsLogin());
              navigate("/Main");
            }, 3000);
          } catch (err) {
            setSubmit(false);
            console.log("catch", err.response.data.message);
            setExist(err.response.data.message);
            setTimeout(() => {
              setExist("");
            }, 3000);
          }
        };
        makingAccount();

        //so here we do a protection of route

        console.log("Validating");
      }
    } else {
      setLoginStates((pre) => ({
        ...pre,
        form: true,
      }));
      setTimeout(() => {
        setLoginStates((pre) => ({
          ...pre,
          form: false,
        }));
      }, 4000);
      return;
    }
  };

  return (
    <div>
      <NavBar></NavBar>
      {Submit && (
        <div className="bg-orange-900 w-[10rem] text-center top-20 left-3 absolute z-10 text-white font-bold rounded px-3 py-2 flex items-center">
          <img className="w-10" src={logo}></img>
          <p>Authorizing</p>
        </div>
      )}
      {exist !== "" && (
        <div className="bg-orange-900 w-[10rem] text-center top-20 left-3 absolute z-10 text-white font-bold rounded px-3 py-2 flex items-center">
          <p>{exist}</p>
        </div>
      )}
      <div className="bg-yellow-800 rounded-md drop-shadow-xl p-4 mt-[10rem] md:mx-[30rem] mt-[10rem]">
        <div className="pt-4">
          <h1 className="font-bold text-center text-2xl text-white">LOGIN</h1>
        </div>
        {LoginStates.form && (
          <div className="text-center font-bold text-white">
            Plz Fill All The Fields
          </div>
        )}
        <div className="flex flex-col">
          <div className="flex flex-col items-center py-2">
            <div>
              <div className="p-2">
                <label className="text-white font-bold">EMAIL:</label>
              </div>
              <input
                className="rounded border-2 h-10 w-64  border-slate-400 p-2 focus:border-transparent"
                type="text"
                value={email}
                onChange={(e) => {
                  console.log(e.target.value);
                  setEmail(e.target.value);
                }}
                onBlur={(e) => {
                  if (email.trim() == "") {
                    console.log(LoginStates.email, "empty");
                    setLoginStates((pre) => ({
                      ...pre,
                      email: true,
                      vemail: false,
                    }));
                  } else {
                    console.log(LoginStates.email, "full");
                    setLoginStates((pre) => ({
                      ...pre,
                      email: false,
                    }));
                  }
                }}
                placeholder="Enter The Email"
              ></input>
              {LoginStates.email && (
                <div className="text-white font-bold">Plz Fill the field</div>
              )}
              {LoginStates.vemail && (
                <div className="text-white font-bold">
                  Plz Enter The Valid Mail
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-col items-center py-2">
            <div>
              <div className="p-2">
                <label className="text-white font-bold">PASSWORD:</label>
              </div>
              <input
                className="rounded border-2 h-10 w-64 border-slate-400 p-2 focus:border-transparent"
                type="password"
                placeholder="Enter The Password"
                value={password}
                onChange={(e) => {
                  console.log(e.target.value);
                  setPassword(e.target.value);
                }}
                onBlur={(e) => {
                  if (password.trim() == "") {
                    setLoginStates((pre) => ({
                      ...pre,
                      password: true,
                    }));
                  } else {
                    setLoginStates((pre) => ({
                      ...pre,
                      password: false,
                    }));
                  }
                }}
              ></input>
              {LoginStates.password && (
                <div className="text-white font-bold">
                  Plz Fill the Password Field
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col items-center py-2">
            <button
              onClick={checklogin}
              className="rounded bg-amber-400 px-8 py-3"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
