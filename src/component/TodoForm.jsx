import React, { useState } from "react";
import { addTodo, auth } from "../firebase";
import { useSelector } from "react-redux";

const TodoForm = () => {
  const [todo, setTodo] = useState("");
  const [visible, setVisible] = useState("public");
  const { user } = useSelector((store) => store.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addTodo({
      todo,
      photo: user.photo ? user.photo : auth.currentUser.photoURL,
      uid: user.uid,
      name: user.displayName ? user.displayName : user.email,
      publish: visible,
    });
    setTodo("");
  };
  const handleChange = (e) => {
    setVisible(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className="!flex-row w-3/6 mx-auto">
      <input
        className="w-5/6 max-md:w-4/6 max-md:text-[12px]"
        value={todo}
        type="text"
        placeholder="Todo ekle"
        onChange={(e) => setTodo(e.target.value)}
      />
      <select
        onChange={handleChange}
        className="rounded-lg max-md:text-[12px]"
        name=""
        id=""
      >
        <option value="public">Herkes</option>
        <option value="private">Kişisel</option>
      </select>
      <button className="w-1/6 max-md:px-1 max-md:text-[12px]" type="submit ">
        Ekle
      </button>
    </form>
  );
};

export default TodoForm;
