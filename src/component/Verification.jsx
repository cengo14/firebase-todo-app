import React from "react";

const Verification = ({ user, handleVerification, handleLogout }) => {
  return (
    <div className="text-center ">
      <h1>Hoşgeldin</h1>
      <p className=" mt-5 mb-5">
        Sayın {user.displayName ? user.displayName : user.email}
      </p>
      <button onClick={handleVerification}>
        Lütfen email adresinizi onaylayın
      </button>
      <button onClick={handleLogout}>Çıkış Yap</button>
    </div>
  );
};

export default Verification;
