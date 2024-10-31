import React, { useState } from "react";
import { forgetPassword } from "../firebase";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    await forgetPassword(email);
  };
  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
      <p>Şifresini sıfırlamak istediğiniz email adresini giriniz</p>
      <input
        className=""
        placeholder="you@xyz.com"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button type="submit">Gönder</button>
    </form>
  );
};

export default ForgetPassword;
