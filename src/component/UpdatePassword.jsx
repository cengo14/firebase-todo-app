import React, { useState } from "react";
import { resetPassword } from "../firebase";

const UpdatePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const handleResetSubmit = async (e) => {
    e.preventDefault();

    // Şifrelerin eşleştiğinden emin olun
    if (newPassword !== confirmPassword) {
      toast.error("Yeni şifreler eşleşmiyor.");
      return;
    }

    try {
      await resetPassword(currentPassword, newPassword);
      // Gerekirse formu temizleyin veya kullanıcıyı yönlendirin
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      // Hatalar zaten toast ile gösteriliyor, ekstra işlem gerekmez
    }
  };
  return (
    <form onSubmit={handleResetSubmit} className="text-start  mt-10">
      <h3>Şifreyi güncelle</h3>
      <div className="flex flex-col gap-y-2">
        <div className="flex justify-between items-center">
          <label>Mevcut Şifre:</label>
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
          />
        </div>
        <div className="flex justify-between items-center">
          <label>Yeni Şifre:</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <div className="flex justify-between items-center">
          <label>Yeni Şifreyi Onayla:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
      </div>

      <button
        className="cursor-pointer"
        disabled={!confirmPassword}
        type="submit"
      >
        Değiştir
      </button>
    </form>
  );
};

export default UpdatePassword;
