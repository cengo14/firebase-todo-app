import React from "react";
import { FaUserCog } from "react-icons/fa";
import { RiLockPasswordLine } from "react-icons/ri";

const UserProfile = ({ isUpdate, isUpdatePassword }) => {
  return (
    <div className="card absolute top-12">
      <ul className="list">
        <li onClick={isUpdate} className="element">
          <FaUserCog />
          <p className="label">Profil Güncelleme</p>
        </li>
        <li onClick={isUpdatePassword} className="element">
          <RiLockPasswordLine />
          <p className="label">Şifre Güncelleme</p>
        </li>
      </ul>
    </div>
  );
};

export default UserProfile;
