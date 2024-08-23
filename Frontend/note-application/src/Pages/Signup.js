import NavBar from "./NavBar";
import { useRef, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import logo from "./Assests/spin.gif";
import axiosInstance from "../axiosInstance";
const SignUp = () => {
  const [LoginStates, setLoginStates] = useState({
    email: false,
    vemail: false,
    password: false,
    name: false,
    pic: false,
    form: false,
  });
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [Submit, setSubmit] = useState(false);
  const [exist, setExist] = useState("");

  const checkSignUp = (e) => {
    e.preventDefault();
    if (email !== "" && password !== "" && name !== "") {
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
        //Here we make an api called
        const makingAccount = async () => {
          try {
            setSubmit(true);

            const res = await axiosInstance.post("/Signup", {
              Email: email,
              Password: password,
              Name: name,
            });
            console.log("hey message hh", res);
            setTimeout(() => {
              setSubmit(false);
              navigate("/login");
            }, 3000);
          } catch (err) {
            setSubmit(false);
            console.log("hey i am here", err.response.data.message);
            setExist(err.response.data.message);
            setTimeout(() => {
              setExist("");
            }, 3000);
          }
        };
        makingAccount();
        console.log("Validating");
        setEmail("");
        setName("");
        setPassword("");
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
          <img className="w-10 " src={logo}></img>
          <p>Authorizing</p>
        </div>
      )}
      {exist !== "" && (
        <div className="bg-orange-900 w-[10rem] text-center top-20 left-3 absolute z-10 text-white font-bold rounded px-3 py-2 flex items-center">
          <p>{exist}</p>
        </div>
      )}
      <div className="bg-yellow-800 rounded-md drop-shadow-xl p-4 mt-[10rem] md:mx-[30rem] md:mt-[7rem] ">
        <div className="pt-4">
          <h1 className="font-bold text-center text-2xl text-white">
            SIGNUP PAGE
          </h1>
        </div>
        {LoginStates.form && (
          <div className="text-center font-bold text-white pt-2">
            Plz Fill All The Fields
          </div>
        )}
        <form onSubmit={checkSignUp} className="flex flex-col">
          <div className="flex flex-col items-center py-2">
            <div>
              <div className="p-2">
                <label className="mr-14 text-left text-white">NAME:</label>
              </div>
              <input
                className="rounded border-2 h-10 w-64 border-slate-400 p-2 focus:border-transparent"
                type="text"
                placeholder="Enter The Name"
                value={name}
                onChange={(e) => {
                  console.log(e.target.value);
                  setName(e.target.value);
                }}
                onBlur={(e) => {
                  if (name.trim() == "") {
                    console.log(LoginStates.name, "empty");
                    setLoginStates((pre) => ({
                      ...pre,
                      name: true,
                    }));
                  } else {
                    console.log(LoginStates.name, "full");
                    setLoginStates((pre) => ({
                      ...pre,
                      name: false,
                    }));
                  }
                }}
              ></input>
              {LoginStates.name && (
                <div className="text-white">Plz Fill the Name Field</div>
              )}
            </div>
          </div>
          <div className="flex flex-col items-center py-2">
            <div>
              <div className="p-2">
                <label className="text-white">EMAIL:</label>
              </div>
              <input
                className="rounded border-2 h-10 w-64  border-slate-400 p-2 focus:border-transparent"
                type="text"
                placeholder="Enter The Email"
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
              ></input>
              {LoginStates.email && (
                <div className="text-white">Plz Fill the Email Field</div>
              )}
              {LoginStates.vemail && (
                <div className="text-white">Plz Enter the valid Email</div>
              )}
            </div>
          </div>
          <div className="flex flex-col items-center py-2">
            <div>
              <div className="p-2">
                <label className="text-white">PASSWORD:</label>
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
                    console.log(LoginStates.password, "empty");
                    setLoginStates((pre) => ({
                      ...pre,
                      password: true,
                    }));
                  } else {
                    console.log(LoginStates.email, "full");
                    setLoginStates((pre) => ({
                      ...pre,
                      password: false,
                    }));
                  }
                }}
              ></input>
              {LoginStates.password && (
                <div className="text-white">Plz Fill the Password Field</div>
              )}
            </div>
          </div>

          <div className="flex flex-col items-center py-2">
            <button className="rounded bg-amber-400 px-8 py-3">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
