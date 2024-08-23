import { useDispatch } from "react-redux";
import {
  Update,
  Submit,
  IsModal,
  IsRefresh,
  fillData,
} from "../Store/LoginSlice";
import Modal from "./Modal";
import axiosInstance from "../axiosInstance";

const NotesPage = (props) => {
  const dispatch = useDispatch();
  const color = props.pin ? "#FFFFFF" : "#FAC546";
  return (
    <div>
      <div className="bg-violet-950 drop-shadow-2xl rounded-md h-[13rem]">
        <h1 className="text-yellow-300 font-bold text-4xl p-3 text-center">
          {props.name}
        </h1>
        <p className="text-white p-2 h-[4rem] overflow-hidden">{props.des}</p>
        <p className="text-white p-2">{props.date}</p>
        <div className="flex flex-row-reverse">
          <button
            onClick={() => {
              const deletenotes = async () => {
                try {
                  const notes = await axiosInstance.delete(
                    `/deleteNotes/${props.noteId}`,
                    {
                      headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                          "jwttoken"
                        )}`,
                        "Content-Type": "application/json",
                      },
                    }
                  );
                  dispatch(IsRefresh());
                  console.log("try", notes);
                } catch (err) {
                  console.log("catch", err);
                }
              };
              deletenotes();
            }}
            className="mx-2"
          >
            <svg
              width="35px"
              height="35px"
              viewBox="0 0 1024 1024"
              class="icon"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M750.1 879.2l16.6-16.7v-77.1l-93.8 93.8zM751.7 384.8H272.3c-8.3 0-15 6.7-15 15v464.4c0 8.3 6.7 15 15 15h238.6l255.8-255.8V399.8c0-8.3-6.7-15-15-15zM333.1 501.2c-23.2 0-42-18.8-42-42s18.8-42 42-42 42 18.8 42 42-18.8 42-42 42zM630.5 879.2l136.2-136.3v-77.1L553.3 879.2z"
                fill="#FFBC00"
              />
              <path
                d="M751.7 354.8H272.3c-24.8 0-45 20.2-45 45v464.4c0 24.8 20.2 45 45 45h479.5c24.8 0 45-20.2 45-45V399.8c-0.1-24.8-20.3-45-45.1-45z m15 507.7l-16.6 16.6h-77.2l93.8-93.8v77.2z m0-119.6L630.5 879.2h-77.2l213.4-213.4v77.1z m0-119.6L510.9 879.2H272.3c-8.3 0-15-6.7-15-15V399.8c0-8.3 6.7-15 15-15h479.5c8.3 0 15 6.7 15 15v223.5z"
                fill="#46287C"
              />
              <path
                d="M287.7 287.2h446.6c11.3 0 20.6-9.2 20.6-20.6v-32.4c0-11.3-9.2-20.6-20.6-20.6H287.7c-11.3 0-20.6 9.2-20.6 20.6v32.4c0 11.4 9.3 20.6 20.6 20.6z"
                fill="#FFBC00"
              />
              <path
                d="M287.7 317.2h446.6c27.9 0 50.6-22.7 50.6-50.6v-32.4c0-27.9-22.7-50.6-50.6-50.6H585.4v-24.4c0-14.9-12.1-27-27-27h-92.7c-14.9 0-27 12.1-27 27v24.4h-151c-27.9 0-50.6 22.7-50.6 50.6v32.4c0 27.9 22.7 50.6 50.6 50.6z m-20.6-83c0-11.3 9.2-20.6 20.6-20.6h446.5c11.3 0 20.6 9.2 20.6 20.6v32.4c0 11.3-9.2 20.6-20.6 20.6H287.7c-11.3 0-20.6-9.2-20.6-20.6v-32.4z m288.3-71.9v21.4h-86.7v-21.4h86.7z"
                fill="#46287C"
              />
              <path d="M468.6 162.3h86.7v21.4h-86.7z" fill="#FFBC00" />
              <path
                d="M333.1 459.2m-42 0a42 42 0 1 0 84 0 42 42 0 1 0-84 0Z"
                fill="#FFFFFF"
              />
            </svg>
          </button>
          <button
            onClick={() => {
              dispatch(Update());
              dispatch(IsModal());
              dispatch(
                fillData({
                  title: props.name,
                  description: props.des,
                  noteId: props.noteId,
                })
              );
            }}
            className="mx-2"
          >
            <svg
              width="35px"
              height="35px"
              viewBox="0 0 1024 1024"
              class="icon"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M705.3 177.1c-13.2-7.6-27.8-11.5-42.7-11.5-7.4 0-14.9 1-22.3 3-21.7 5.8-39.9 19.6-51.4 39 1 0.5 2 1 3 1.6l142.5 82.3c1 0.6 1.9 1.2 2.8 1.8 22.9-40.9 8.7-92.7-31.9-116.2z"
                fill="#FFBC00"
              />
              <path
                d="M774.2 221.4c-8-29.8-27.1-54.8-53.9-70.2-26.8-15.4-57.9-19.5-87.8-11.6-29.8 8-54.8 27.1-70.2 53.9-2.2 3.8-4.1 7.6-5.8 11.5-11.1 3.3-20.3 10.6-26.1 20.6L309.6 608.1c-4.8 8.4-6.6 17.6-5.8 26.6-4.9 5.9-7.6 14-7.6 23.4v171.8c0 13.3 5.5 24.1 15 29.7l0.1 0.1s0.1 0 0.1 0.1c4.3 2.4 9.1 3.7 14.1 3.7 6.2 0 12.7-1.9 19.1-5.5l148.8-85.9c8.1-4.7 13.8-11.1 16.5-18.3 8.4-3.9 15.4-10.2 20.1-18.3L750.8 353c6-10.4 7.3-22.1 4.8-32.9 2.5-3.4 4.9-7 7-10.8 15.5-26.9 19.6-58.1 11.6-87.9z m-37 71.8c-0.9-0.6-1.9-1.2-2.8-1.8l-142.5-82.3c-1-0.6-2-1.1-3-1.6 11.5-19.3 29.7-33.1 51.4-39 7.4-2 14.9-3 22.3-3 14.8 0 29.5 3.9 42.7 11.5 40.6 23.6 54.8 75.4 31.9 116.2z m-180.8-52.6c2-3.4 5.2-5.9 9.1-7 1.3-0.4 2.6-0.5 4-0.5 2.6 0 5.1 0.7 7.4 2l142.5 82.3c5 2.9 7.7 8.2 7.5 13.6l-263.4 70.6 92.9-161z m-78 505.4l-148.8 85.9c-1.3 0.8-2.4 1.2-3.1 1.4-0.2-0.7-0.4-1.8-0.4-3.4V658c0-1.6 0.2-2.7 0.4-3.4 0.7 0.2 1.8 0.6 3.1 1.4l148.8 85.9c1.3 0.8 2.2 1.5 2.7 2-0.4 0.6-1.3 1.3-2.7 2.1z m-167-117.8s-0.1 0-0.1 0.1l-0.1 0.1v-0.4l0.2 0.2z m200.3 115.9v-0.2-0.2l0.3 0.2-0.3 0.2z m-7.7-23.8c-0.5 0.9-1.1 1.7-1.7 2.4-2.5-2.5-5.5-4.8-8.9-6.8L446.8 689l89-23.8-31.8 55.1z m53.1-91.8l-147 39.4-62.7-36.2 245.8-65.9-36.1 62.7z m57.4-99.4l-265.7 71.2 36.2-62.7 265.7-71.2-36.2 62.7z m57.3-99.4l-265.7 71.2 36.2-62.7L708 367l-36.2 62.7z"
                fill="#46287C"
              />
              <path
                d="M406.1 500.9l265.7-71.2L708 367l-265.7 71.2zM726.9 330.9c0.2-5.4-2.5-10.7-7.5-13.6L576.9 235c-2.3-1.3-4.8-2-7.4-2-1.3 0-2.6 0.2-4 0.5-3.9 1-7.1 3.5-9.1 7l-92.9 160.9 263.4-70.5z m-174.3-53.3c9.1-15.7 29.2-21.1 44.9-12 15.7 9.1 21.1 29.2 12 44.9-9.1 15.7-29.2 21.1-44.9 12-15.7-9.1-21.1-29.2-12-44.9zM348.7 600.3l265.8-71.2 36.1-62.7-265.7 71.2zM493.4 716c3.4 2 6.4 4.2 8.9 6.8 0.6-0.7 1.2-1.5 1.7-2.4l31.8-55.1-89 23.8 46.6 26.9zM410.1 667.8l147-39.3 36.1-62.7-245.7 65.9zM311.3 859.6c-0.1 0-0.1 0 0 0-0.1 0.2 0 0.2 0 0.2 0.1-0.1 0.1-0.1 0-0.2zM311.3 628.3c0-0.1 0-0.1 0 0 0.1-0.1 0.1-0.1 0-0.2-0.1 0-0.1 0-0.1 0.1s0 0.1 0.1 0.1zM355.6 671c-14.3-8.2-26.5-15.3-27.2-15.6-0.7-0.3-2-0.4-2.1 0.1-0.1 0.5-0.2 16-0.2 32.5v111.8c0 16.5 0 30.6 0.1 31.3 0.1 0.7 0.7 1.9 1.2 1.7 0.5-0.2 13.9-7.8 28.2-16.1l96.8-55.9c14.3-8.2 26.5-15.3 27.1-15.7 0.6-0.4 1.3-1.5 0.9-1.9-0.4-0.3-13.7-8.1-28-16.4L355.6 671zM511.7 743.9c0 0.1 0 0.1 0 0 0 0.1 0.1 0.1 0.1 0.1 0.1 0 0.1-0.1 0-0.2-0.1 0-0.1 0-0.1 0.1z"
                fill="#FFBC00"
              />
              <path
                d="M564.589235 322.494987a32.9 32.9 0 1 0 32.9-56.984471 32.9 32.9 0 1 0-32.9 56.984471Z"
                fill="#FFFFFF"
              />
            </svg>
          </button>
          <button
            onClick={() => {
              const pin = async () => {
                try {
                  console.log(localStorage.getItem("jwttoken"));
                  const no = await axiosInstance.patch(
                    `/pinned/${props.noteId}`,
                    {},
                    {
                      headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                          "jwttoken"
                        )}`,
                        "Content-Type": "application/json",
                      },
                    }
                  );
                  dispatch(IsRefresh());
                } catch (err) {
                  console.log("try", err);
                }
              };
              pin();
            }}
          >
            <svg
              width="35px"
              height="35px"
              viewBox="0 0 1024 1024"
              class="icon"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M874.24 806.4c11.52 11.52 14.08 25.6 6.4 33.28l12.8 47.36-47.36-12.8c-7.68 7.68-23.04 3.84-33.28-6.4L561.92 615.68c-11.52-11.52-14.08-25.6-6.4-33.28l33.28-33.28c7.68-7.68 23.04-3.84 33.28 6.4L874.24 806.4z"
                fill="#E64C45"
              />
              <path
                d="M894.72 899.84h-3.84l-40.96-11.52c-6.4 2.56-12.8 3.84-20.48 2.56-8.96-1.28-17.92-6.4-24.32-14.08L552.96 624.64c-7.68-7.68-11.52-15.36-14.08-24.32-2.56-10.24 0-20.48 7.68-26.88l33.28-33.28c6.4-6.4 16.64-8.96 26.88-7.68 8.96 1.28 17.92 6.4 24.32 14.08L883.2 797.44c14.08 14.08 17.92 32 11.52 44.8l11.52 40.96c1.28 3.84 0 8.96-3.84 12.8-1.28 2.56-5.12 3.84-7.68 3.84z m-47.36-38.4h3.84l24.32 7.68-7.68-24.32c-1.28-3.84 0-8.96 3.84-12.8 1.28-1.28 1.28-7.68-6.4-15.36L613.12 564.48c-3.84-3.84-7.68-6.4-11.52-6.4h-3.84l-33.28 33.28v3.84c1.28 3.84 3.84 7.68 6.4 11.52L823.04 857.6c3.84 3.84 7.68 6.4 11.52 6.4h3.84c2.56-1.28 5.12-2.56 8.96-2.56z"
                fill="#231C1C"
              />
              <path
                d="M431.36 162.56L371.2 102.4c-11.52-11.52-29.44-11.52-39.68 0L108.8 323.84c-11.52 11.52-11.52 29.44 0 39.68l60.16 60.16c11.52 11.52 29.44 11.52 39.68 0l12.8-12.8c1.28 5.12 3.84 8.96 7.68 12.8L410.88 665.6c3.84 3.84 7.68 6.4 12.8 7.68-3.84 37.12 5.12 70.4 28.16 93.44l322.56-322.56c-23.04-23.04-56.32-32-93.44-28.16-1.28-5.12-3.84-8.96-7.68-12.8L431.36 222.72c-3.84-3.84-7.68-6.4-12.8-7.68l12.8-12.8c11.52-10.24 11.52-28.16 0-39.68z"
                fill={color}
              />
              <path
                d="M451.84 779.52c-3.84 0-6.4-1.28-8.96-3.84-23.04-23.04-34.56-55.04-32-94.72-2.56-1.28-5.12-3.84-7.68-6.4l-1.28-1.28-181.76-240.64-1.28 1.28c-7.68 7.68-17.92 11.52-29.44 11.52-11.52 0-21.76-3.84-29.44-11.52l-60.16-60.16c-16.64-16.64-16.64-42.24 0-58.88L321.28 93.44c16.64-16.64 42.24-16.64 58.88 0l60.16 60.16c7.68 7.68 11.52 17.92 11.52 29.44 0 11.52-3.84 21.76-11.52 29.44l-1.28 1.28 240.64 180.48 1.28 1.28c2.56 2.56 3.84 5.12 6.4 7.68 38.4-1.28 71.68 8.96 94.72 32 2.56 2.56 3.84 5.12 3.84 8.96 0 3.84-1.28 6.4-3.84 8.96L460.8 775.68c-2.56 2.56-6.4 3.84-8.96 3.84z m-30.72-122.88c1.28 1.28 3.84 2.56 6.4 3.84 6.4 1.28 10.24 7.68 8.96 14.08-2.56 21.76 0 49.92 15.36 72.96L755.2 445.44c-23.04-16.64-52.48-17.92-72.96-15.36-6.4 1.28-11.52-3.84-14.08-8.96-1.28-2.56-1.28-5.12-3.84-6.4L423.68 232.96l-1.28-1.28c-1.28-1.28-3.84-2.56-6.4-3.84-3.84-1.28-7.68-5.12-8.96-8.96-1.28-3.84 0-8.96 3.84-12.8l12.8-12.8c2.56-2.56 5.12-6.4 5.12-11.52 0-3.84-1.28-7.68-5.12-11.52l-60.16-60.16c-6.4-6.4-16.64-6.4-21.76 0L117.76 332.8c-6.4 6.4-6.4 16.64 0 21.76l60.16 60.16c2.56 2.56 6.4 5.12 11.52 5.12 3.84 0 7.68-1.28 11.52-5.12l12.8-12.8c3.84-3.84 7.68-5.12 12.8-3.84 3.84 1.28 7.68 5.12 8.96 8.96 1.28 2.56 2.56 5.12 3.84 6.4l1.28 1.28 180.48 241.92z"
                fill="#231C1C"
              />
              <path
                d="M214.016 402.2528L412.2112 204.032l18.0992 18.112L232.1152 420.352z"
                fill="#231C1C"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};
export default NotesPage;
