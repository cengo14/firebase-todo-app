import React, { useState } from "react";
import { useSelector } from "react-redux";
import { editTodo } from "../firebase";

const UpdateTodos = ({ todo, close }) => {
  const [isEditTodo, setIsEditTodo] = useState("");
  const [visible, setVisible] = useState("public");
  const { user } = useSelector((store) => store.auth);
  const handleChange = (e) => {
    setVisible(e.target.value);
  };
  const handleUpdateTodo = async (e) => {
    e.preventDefault();
    await editTodo(isEditTodo, visible, todo.id);
    close();
  };
  return (
    <form
      onSubmit={handleUpdateTodo}
      className="flex gap-2 w-[500px] h-[200px] mx-auto"
    >
      <input
        className="w-4/5"
        type="text"
        onChange={(e) => setIsEditTodo(e.target.value)}
        defaultValue={todo.todo}
      />
      <select
        onChange={handleChange}
        className="rounded-lg w-2/5 py-2"
        name=""
        id=""
        defaultValue={todo.publish}
      >
        <option value="public">Herkes</option>
        <option value="private">Kişisel</option>
      </select>
      <button className="w-1/6" type="submit ">
        Ekle
      </button>
    </form>
  );
};

export default UpdateTodos;
