// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  sendEmailVerification,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
  sendPasswordResetEmail,
} from "firebase/auth";
import toast from "react-hot-toast";
import store from "../redux/store";
import { logIn, logOut } from "../redux/authSlice";
import { getStorage, ref } from "firebase/storage";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getFirestore,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { setPublicTodos } from "../redux/publicTodosSlice";
import { DateTime } from "luxon";
import { setPrivateTodos } from "../redux/privateTodosSlice";
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAHING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

export const register = async (email, password) => {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    toast.success("Kayıt işlemi başarılı");

    return true;
  } catch (err) {
    toast.error(err.message);
  }
};
export const login = async (email, password) => {
  if (!email || !password) {
    toast.error("Email veya şifre boş olamaz");
    return;
  }

  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password);

    toast.success("Giriş işlemi başarılı");
    return user;
  } catch (err) {
    toast.error(err.message);
  }
};

export const reAuth = async (password) => {
  const user = auth.currentUser;

  if (!user) {
    toast.error("Kullanıcı oturum açmamış.");
    throw new Error("Kullanıcı oturum açmamış.");
  }

  try {
    const credential = EmailAuthProvider.credential(user.email, password);
    await reauthenticateWithCredential(user, credential);
    toast.success("Yeniden doğrulama başarılı.");
    return true;
  } catch (err) {
    toast.error(`Yeniden doğrulama hatası: ${err.message}`);
    throw err;
  }
};
export const logout = async () => {
  try {
    await signOut(auth);
    toast.success("Çıkış İşlemi başarılı");
    return true;
  } catch (err) {
    toast.error(err.message);
  }
};
export const update = async (data) => {
  try {
    await updateProfile(auth.currentUser, data);
    toast.success("Güncelleme başarılı");
    return true;
  } catch (err) {
    toast.error("Bir hata oluştu " + err.message);
  }
};
export const resetPassword = async (currentPassword, newPassword) => {
  const user = auth.currentUser;

  if (!user) {
    toast.error("Kullanıcı oturum açmamış.");
    throw new Error("Kullanıcı oturum açmamış.");
  }

  try {
    // Önce yeniden doğrulama yapın
    await reAuth(currentPassword);

    // Şifreyi güncelleyin
    await updatePassword(user, newPassword);
    toast.success("Şifre başarıyla güncellendi.");

    return true;
  } catch (err) {
    toast.error(`Şifre güncelleme hatası: ${err.message}`);
    throw err;
  }
};
export const forgetPassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    toast.success("Şifre sıfırlama bağlantısı gönderildi");
  } catch (err) {
    toast.error("Bir hata oluştu " + err.message);
  }
};
export const emailVerification = async () => {
  try {
    await sendEmailVerification(auth.currentUser);
    toast.success("Doğrulama bağlantısı email adresinize gönderildi");
    return true;
  } catch (err) {
    toast.error("Bir hata oluştu");
  }
};
export const addTodo = async (data) => {
  try {
    const todosRef = await addDoc(collection(db, "todos"), {
      ...data,
      createdAt: serverTimestamp(),
    });
    toast.success("To Do ekleme başarılı");
  } catch (err) {
    toast.error("Bir Hata oluştu " + err.message);
  }
};
export const deleteTodo = async (id) => {
  try {
    return await deleteDoc(doc(db, "todos", id));
    toast.success("Silme işlemi başarılı");
  } catch (err) {
    toast.error("Silme işlemi başarısız " + err);
  }
};
export const editTodo = async (todo, visible, id) => {
  try {
    const editTodoRef = doc(db, "todos", id);
    await updateDoc(editTodoRef, {
      todo: todo,
      publish: visible,
      createdAt: serverTimestamp(),
    });
    toast.success("Todo güncelendi");
  } catch (err) {
    toast.error("Güncelleme işlemi başarısız " + err);
    console.log(err);
  }
};
onAuthStateChanged(auth, (user) => {
  if (user) {
    store.dispatch(
      logIn({
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photo: user.photoURL,
        verified: user.emailVerified,
      })
    );
    const publicTodosQuery = query(
      collection(db, "todos"),
      where("publish", "==", "public"),
      orderBy("createdAt", "desc")
    );
    const privateTodosQuery = query(
      collection(db, "todos"),
      where("publish", "==", "private"),
      where("uid", "==", user.uid),
      orderBy("createdAt", "desc")
    );

    onSnapshot(publicTodosQuery, (snapshot) => {
      const publicTodos = snapshot.docs.map((doc) => {
        const data = doc.data();

        // createdAt tarihini Firestore'dan alın ve JavaScript Date nesnesine dönüştür
        const createdAt = data.createdAt?.toDate();
        // ISO formatına dönüştür
        const formattedCreatedAt = DateTime.fromJSDate(createdAt).toISO();

        return {
          id: doc.id,
          ...data,
          createdAt: formattedCreatedAt, // Formatlanmış tarihi ekleyin
        };
      });

      store.dispatch(setPublicTodos(publicTodos)); // Redux'a dispatch işlemi
    });
    onSnapshot(privateTodosQuery, (snapshot) => {
      const privateTodos = snapshot.docs.map((doc) => {
        const data = doc.data();

        // createdAt tarihini Luxon ile formatla
        // createdAt tarihini Firestore'dan alın ve JavaScript Date nesnesine dönüştür
        const createdAt = data.createdAt?.toDate();
        // ISO formatına dönüştür
        const formattedCreatedAt = DateTime.fromJSDate(createdAt).toISO();

        return {
          id: doc.id,
          ...data,
          createdAt: formattedCreatedAt, // Formatlanmış tarihi ekleyin
        };
      });

      store.dispatch(setPrivateTodos(privateTodos)); // Redux'a dispatch işlemi
    });
  } else {
    store.dispatch(logOut());
  }
});
