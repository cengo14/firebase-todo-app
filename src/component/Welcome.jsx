import React from "react";
import { Link } from "react-router-dom";

const Welcome = () => {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center gap-5">
      <div className="flex flex-col justify-center items-center gap-5 w-[800px] h-[600px] py-24 px-48 shadow-md shadow-slate-300 border rounded-xl">
        <img src="/todo.webp" alt="" />

        <div className="flex flex-col  items-center mt-10">
          <p>Uygulamayı kullanabilmek için giriş yapmanız gereklidir</p>

          <div className="flex gap-2 mt-5">
            <Link
              className="bg-[#1a1a1a] text-white text-xl py-2 px-6 rounded-lg border border-transparent hover:border-gray-500"
              to="/login"
            >
              Giriş Yap
            </Link>
            <Link
              className="bg-[#1a1a1a] text-white text-xl py-2 px-6 rounded-lg border border-transparent hover:border-gray-500"
              to="/register"
            >
              Kayıt ol
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
