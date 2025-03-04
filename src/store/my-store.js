import { create } from "zustand";
import api from "../api/Api";

const useMyStore = create((set) => {
  const ls_string = localStorage.getItem("tokenn");
  if (!ls_string) {
    return {
      token: "",
      users: null,
    };
  }
  const ls = JSON.parse(ls_string);
  console.log(ls);
  api.defaults.headers.Authorization = `Bearer ${ls.token}`

  return {
    token: ls.token,
    users: ls.user,
    logOut: () => {
      localStorage.removeItem("tokenn")
      return set({
        token: "",
        users: null,
      });
    },
  };
});

export default useMyStore;
