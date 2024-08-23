import NavBar from "./NavBar";
import NotesPage from "./NotesPage";
import { IsModal, IsRefresh, Submit } from "../Store/LoginSlice";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import axiosInstance from "../axiosInstance";
import { useEffect } from "react";
const MainScreen = () => {
  const [allData, setallData] = useState([]);
  const dispatch = useDispatch();
  const refresh = useSelector((state) => state.LoginState.refresh);
  let [pagen, setPage] = useState(1);
  let [count, setCount] = useState(0);
  useEffect(() => {
    const getData = async () => {
      const token = localStorage.getItem("jwttoken");
      console.log(token);
      try {
        const data = await axiosInstance.get("/getNotes", {
          headers: {
            Authorization: `Bearer ${token} `,
            "Content-Type": "application/json",
          },
        });
        setallData(data.data.data);
        setCount(data.data.count);
      } catch (err) {
        console.log("catch", err);
      }
    };
    getData();
  }, [refresh]);

  return (
    <div>
      <NavBar></NavBar>
      <button
        onClick={() => {
          dispatch(Submit());
          dispatch(IsModal());
        }}
        className="fixed z-20 bottom-4 bg-yellow-500 rounded-xl right-7"
      >
        <svg
          width="70px"
          height="70px"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4 12H20M12 4V20"
            stroke="#000000"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>

      <div className="grid md:grid-cols-3 mt-[6rem] mb-3 gap-3 mx-3">
        {allData.length > 0 &&
          allData.map((cur) => {
            return (
              <NotesPage
                key={cur._id}
                noteId={cur._id}
                name={cur.title}
                des={cur.description}
                date={cur.date}
                pin={cur.pin}
              ></NotesPage>
            );
          })}
      </div>
      <div className="mt-[6rem] mb-3 mx-3">
        {allData.length == 0 && (
          <div>
            <p className="text-3xl font-bold text-center">NO NOTES FOUND</p>
            <div className="flex flex-row justify-center py-4">
              <svg
                fill="#000000"
                width="100px"
                height="100px"
                viewBox="0 0 32 32"
                id="Outlined"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title />

                <g id="Fill">
                  <path d="M25,26a1,1,0,0,1-1,1H8a1,1,0,0,1-1-1V5H17V3H5V26a3,3,0,0,0,3,3H24a3,3,0,0,0,3-3V13H25Z" />

                  <path d="M27.12,2.88a3.08,3.08,0,0,0-4.24,0L17,8.75,16,14.05,21.25,13l5.87-5.87A3,3,0,0,0,27.12,2.88Zm-6.86,8.27-1.76.35.35-1.76,3.32-3.33,1.42,1.42Zm5.45-5.44-.71.7L23.59,5l.7-.71h0a1,1,0,0,1,1.42,0A1,1,0,0,1,25.71,5.71Z" />
                </g>
              </svg>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default MainScreen;
