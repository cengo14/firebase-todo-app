import React from "react";

const Verification = ({ user, handleVerification, handleLogout }) => {
  return (
    <div className="flex flex-col justify-center items-center">
      <img
        className="w-24 md:w-40"
        src="/verification-user.png"
        alt="verification"
      />
      <h1>Hoşgeldiniz</h1>
      <p className=" mt-5 mb-5">
        Sayın {user.displayName ? user.displayName : user.email}
      </p>
      <p className="mb-5 text-center">
        ToDo uygulama özelliklerine erişebilmek için hesabınızı doğrulamanız
        gereklidir!
      </p>
      <button className="mb-2" onClick={handleVerification}>
        Lütfen email adresinizi onaylayın
      </button>
      <button className="bg-red-500 hover:bg-red-600" onClick={handleLogout}>
        Çıkış Yap
      </button>
    </div>
  );
};

export default Verification;
