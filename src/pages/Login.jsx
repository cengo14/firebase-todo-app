import React, { useState } from "react";
import { auth, login } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import Modal from "../component/Modal";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isForgetPassword, setIsForgetPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    await login(email, password);

    navigate("/");
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <form
        className=" w-[800px] h-[600px] max-md:h-full max-md:w-full md:py-32 md:px-60 py-24 px-24 shadow-md shadow-slate-300 border rounded-xl"
        onSubmit={handleLogin}
      >
        <h1 className="mb-10 max-md:text-4xl whitespace-nowrap text-center">
          Giriş yapın
        </h1>

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
        <div onClick={() => setIsForgetPassword(true)}>Şifremi unuttum</div>
        <button
          className="disabled:opacity-25"
          disabled={!email || !password}
          type="submit"
        >
          Giriş yap
        </button>

        <p>
          Bir hesabınız yok mu?{" "}
          <Link
            to="/register"
            className="text-red-500 font-semibold cursor-pointer hover:underline"
          >
            Hesap oluşturun
          </Link>
        </p>
        <p>
          Anasayfaya dönmek için{" "}
          <Link
            to="/"
            className="text-red-500 font-semibold cursor-pointer hover:underline"
          >
            buraya
          </Link>{" "}
          tıklayın
        </p>
      </form>
      {isForgetPassword && (
        <Modal
          isForgetPassword={isForgetPassword}
          close={() => setIsForgetPassword(false)}
        />
      )}
    </div>
  );
};

export default Login;
