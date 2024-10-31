import React, { useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { deleteTodo, emailVerification, logout } from "../firebase";

import { useSelector } from "react-redux";

import Modal from "../component/Modal";
import { IoSettingsOutline } from "react-icons/io5";
import UserProfile from "../component/UserProfile";
import TodoForm from "../component/TodoForm";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { MdDeleteForever } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { DateTime } from "luxon";
import Welcome from "../component/Welcome";
import Verification from "../component/Verification";

const Home = () => {
  const navigate = useNavigate();
  const [isUpdate, setIsUpdate] = useState(false);
  const [isEditingTodo, setIsEditingTodo] = useState(false);
  const [isOpenSettings, setIsOpenSettings] = useState(false);
  const [isUpdatePassword, setIsUpdatePassword] = useState(false);
  const { user } = useSelector((store) => store.auth);
  const { publicTodos } = useSelector((store) => store.publicTodos);
  const { privateTodos } = useSelector((store) => store.privateTodos);

  const firstTodos = [...publicTodos, ...privateTodos];
  const todos = firstTodos.sort(() => Math.random() - 0.5);
  todos.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const [animationParent] = useAutoAnimate();
  const handleLogout = async () => {
    await logout();

    navigate("/login");
  };

  const handleVerification = async () => {
    await emailVerification();
  };

  const handleClose = () => {
    setIsUpdate(false);
    setIsUpdatePassword(false);
    setIsEditingTodo(false);
  };
  const handleDelete = async (id) => {
    await deleteTodo(id);
  };

  if (user)
    return (
      <div className="w-full h-screen">
        {user.verified ? (
          <>
            <div className="flex items-center justify-between px-3">
              <div className="flex items-center gap-2">
                <img
                  className="size-12  rounded-full my-5"
                  src={
                    user.photo
                      ? user.photo
                      : "https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png"
                  }
                  alt="user"
                />
                <div>
                  <p>Hoş Geldiniz </p>
                  <span className="text-amber-500">
                    {user.displayName
                      ? user.displayName
                      : user.email.split("@")[0]}
                  </span>
                </div>
              </div>
              <div>
                <div className=" flex gap-2 relative">
                  <button
                    onClick={() => setIsOpenSettings(!isOpenSettings)}
                    className="button"
                  >
                    <IoSettingsOutline className="svg-icon" />
                    <span className="lable">Hesap</span>
                  </button>
                  <button onClick={handleLogout}>Çıkış Yap</button>
                  {isOpenSettings && (
                    <UserProfile
                      isUpdate={() => {
                        setIsUpdate(true);
                      }}
                      isUpdatePassword={() => {
                        setIsUpdatePassword(true);
                      }}
                    />
                  )}
                </div>
              </div>

              {isUpdate && <Modal isUpdate={isUpdate} close={handleClose} />}
              {isUpdatePassword && (
                <Modal
                  isUpdatePassword={isUpdatePassword}
                  close={handleClose}
                />
              )}
            </div>
            <TodoForm />
            <div className="flex w-4/6 mx-auto justify-center mt-5">
              <ul
                ref={animationParent}
                className="w-full flex flex-col gap-y-2"
              >
                <li className="bg-neutral-900 flex  items-center justify-center rounded w-full py-2 px-2">
                  <p className="w-6/12 text-green-500">Konu</p>
                  <p className="flex justify-around w-3/12">
                    <span className=" text-blue-400">Tarih</span>
                    <span className=" text-white">Durum</span>
                  </p>
                  <p className="text-yellow-600 w-3/12">Detay</p>
                </li>
                {todos?.map((todo) => (
                  <li
                    className=" flex items-center   w-full  bg-neutral-600 p-2"
                    key={todo.id}
                  >
                    <p className=" w-6/12 py-4 px-2 bg-neutral-700 rounded-2xl">
                      {" "}
                      {todo.todo}
                    </p>
                    <p className=" w-3/12 py-4 ps-2 bg-neutral-700 rounded-2xl flex items-center justify-evenly">
                      <span className="">{todo.createdAt?.split("T")[0]}</span>
                      <span
                        className={
                          todo.publish === "public"
                            ? "text-green-500"
                            : "text-red-500"
                        }
                      >
                        {todo.publish === "public" ? "Genel" : "Özel"}
                      </span>
                    </p>
                    <div className="bg-neutral-700 rounded-2xl w-3/12 py-[6px]">
                      {todo.uid === user.uid ? (
                        <div className="flex w-full px-2">
                          <button
                            className=" md:me-2 w-1/2 bg-blue-600 hover:bg-blue-700 transition flex justify-center  items-center"
                            onClick={() => setIsEditingTodo(todo)}
                          >
                            <span>
                              <FaRegEdit className="max-md:text-2xl" />
                            </span>
                            <span className="max-md:hidden">Düzenle</span>
                          </button>
                          <button
                            className=" w-1/2 bg-red-600 hover:bg-red-700 transition flex justify-center  items-center"
                            onClick={() => handleDelete(todo.id)}
                          >
                            <span>
                              <MdDeleteForever className="max-md:text-2xl" />
                            </span>
                            <span className="max-md:hidden">Sil</span>
                          </button>
                          {isEditingTodo.id === todo.id && (
                            <Modal
                              todo={todo}
                              isUpdateTodos={isEditingTodo}
                              close={handleClose}
                            />
                          )}
                        </div>
                      ) : (
                        <p className="py-[10px] text-center w-full">
                          {todo.name.split("@")[0]}
                        </p>
                      )}
                    </div>
                  </li>
                ))}
                {todos.length === 0 && (
                  <li className="bg-neutral-700 flex justify-center items-center rounded w-full border p-4 ">
                    Henüz bir todo eklemediniz
                  </li>
                )}
              </ul>
            </div>
          </>
        ) : (
          <div className="w-full h-screen flex justify-center items-center">
            <Verification
              user={user}
              handleVerification={handleVerification}
              handleLogout={handleLogout}
            />
          </div>
        )}
      </div>
    );
  return <Welcome />;
};

export default Home;
