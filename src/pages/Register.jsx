import React, { useState } from "react";
import { register } from "../firebase";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = await register(email, password);

    navigate("/login");
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <form
        className="w-[800px] h-[600px] py-32 px-60 shadow-md shadow-slate-300 border rounded-xl"
        onSubmit={handleSubmit}
      >
        <h1 className="mb-10">Üyelik Oluştur</h1>
        <input
          placeholder="Email giriniz"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          placeholder="Şifre giriniz"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="disabled:opacity-25"
          disabled={!email || !password}
          type="submit"
        >
          Kayıt Ol
        </button>
        <p>
          Zaten bir hesabınız varsa{" "}
          <Link
            to="/login"
            className="text-red-500 font-semibold cursor-pointer hover:underline"
          >
            giriş yapın
          </Link>
        </p>
        <p>
          Anasayfaya dönmek için{" "}
          <Link
            to="/"
            className="text-red-500 hover:underline font-semibold cursor-pointer"
          >
            buraya
          </Link>{" "}
          tıklayın
        </p>
      </form>
    </div>
  );
};

export default Register;
