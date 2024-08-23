import { useDispatch, useSelector } from "react-redux";
import {
  IsModal,
  Submit,
  Update,
  IsRefresh,
  fillData,
} from "../Store/LoginSlice";
import axiosInstance from "../axiosInstance";
import { useState } from "react";
const Modal = () => {
  const modal = useSelector((state) => state.LoginState.modal);
  const Submitbtn = useSelector((state) => state.LoginState.submitbtn);
  const Updatebtn = useSelector((state) => state.LoginState.updatebtn);
  const name = useSelector((state) => state.LoginState.data.title);
  const des = useSelector((state) => state.LoginState.data.description);
  const noteId = useSelector((state) => state.LoginState.data.id);
  const [title, setTitle] = useState(name);
  const [description, setDescription] = useState(des);
  const dispatch = useDispatch();
  return (
    <div>
      <div className="absolute left-0 right-0 top-0 bottom-0 z-30">
        <div className="flex flex-col bg-yellow-800 mx-3 mt-[5rem] md:mx-[21rem] rounded-2xl">
          <div className="flex flex-col mt-[1rem] items-center">
            <div>
              <div className="p-2">
                <label className="text-white font-bold">Title</label>
              </div>
              <input
                onChange={(e) => {
                  console.log(e.target.value);
                  setTitle(e.target.value);
                }}
                value={title}
                className="rounded border-2 w-[21rem] h-[4rem] md:w-[32rem] outline-none  border-slate-400 p-2 focus:border-transparent "
                type="text"
                placeholder="GO TO GYM"
              ></input>
            </div>
          </div>
          <div className="flex flex-col items-center py-2">
            <div>
              <div className="p-2">
                <label className="text-white font-bold">Descrption</label>
              </div>
              <textarea
                onChange={(e) => {
                  console.log(e.target.value);
                  setDescription(e.target.value);
                }}
                value={description}
                rows="10"
                cols="65"
                className="rounded outline-none border-slate-400 p-2 w-[21rem] md:w-[32rem] focus:border-transparent"
                rounded-md
              ></textarea>
            </div>
          </div>

          <div className="flex flex-col items-center py-2">
            {Submitbtn && (
              <button
                onClick={() => {
                  const addNotes = async () => {
                    try {
                      const res = await axiosInstance.post(
                        "/createNotes",
                        {
                          Title: title,
                          Description: description,
                        },
                        {
                          headers: {
                            Authorization: `Bearer ${localStorage.getItem(
                              "jwttoken"
                            )}`,
                            "Content-Type": "application/json",
                          },
                        }
                      );

                      console.log("try", res);
                      dispatch(IsModal());
                      dispatch(Submit());
                      dispatch(IsRefresh());
                    } catch (err) {
                      console.log("catch", err);
                    }
                  };
                  addNotes();
                }}
                className="rounded bg-amber-400 px-8 py-3 block mb-2"
              >
                ADD
              </button>
            )}
            {Updatebtn && (
              <button
                onClick={() => {
                  const updateNotes = async () => {
                    try {
                      const res = await axiosInstance.put(
                        `/updateNotes/${noteId}`,
                        {
                          Name: title,
                          Description: description,
                        },
                        {
                          headers: {
                            Authorization: `Bearer ${localStorage.getItem(
                              "jwttoken"
                            )}`,
                            "Content-Type": "application/json",
                          },
                        }
                      );

                      console.log("try", res);
                      dispatch(IsModal());
                      dispatch(Update());
                      dispatch(IsRefresh());
                      dispatch(
                        fillData({
                          title: "",
                          description: "",
                          noteId: "",
                        })
                      );
                    } catch (err) {
                      console.log("catch", err);
                    }
                  };
                  updateNotes();
                }}
                className="rounded bg-amber-400 px-8 py-3 block mb-2"
              >
                Update
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Modal;
