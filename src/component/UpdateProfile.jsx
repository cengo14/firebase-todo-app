import React, { useState } from "react";
import { auth, storage, update } from "../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

import { FaRegCircleUser } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { logIn } from "../redux/authSlice";

const UpdateProfile = () => {
  const [displayName, setDisplayName] = useState("");
  const [avatar, setAvatar] = useState("");
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!displayName && !avatar) return;
    if (avatar) {
      const avatarRef = ref(storage, avatar[0]?.name);
      await uploadBytes(avatarRef, avatar[0]);
      const avatarURL = await getDownloadURL(ref(avatarRef));
      await update({ photoURL: avatarURL });
    }

    await update({ displayName });
    dispatch(
      logIn({
        uid: auth.currentUser.uid,
        email: auth.currentUser.email,
        displayName: auth.currentUser.displayName,
        photo: auth.currentUser.photoURL,
        verified: auth.currentUser.emailVerified,
      })
    );
  };

  return (
    <div className="flex flex-col gap-3">
      <form onSubmit={handleSubmit} className="text-start mt-10">
        <h3>Profili güncelle</h3>
        <div className="flex flex-col">
          <input
            placeholder="İsminiz"
            type="text"
            onChange={(e) => setDisplayName(e.target.value)}
          />
        </div>
        <div className="flex flex-col mt-5">
          <label
            className="bg-blue-900 py-2 flex items-center gap-2 justify-center rounded hover:bg-blue-950 cursor-pointer transition"
            htmlFor="image"
          >
            Fotoğraf Seç <FaRegCircleUser size={20} />
          </label>
          <input
            className="hidden"
            id="image"
            type="file"
            accept="image/*"
            onChange={(e) => setAvatar(e.target.files)}
          />
        </div>
        <button type="submit">Güncelle</button>
      </form>
    </div>
  );
};

export default UpdateProfile;
