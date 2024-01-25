import { signOut } from "firebase/auth";
import { auth } from "../firebase";

export const logoutAction = async () => {
  await signOut(auth);
};
