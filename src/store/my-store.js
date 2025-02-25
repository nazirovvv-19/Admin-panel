import { create } from "zustand";

const useMyStore = create((set) => {
  return {
    token: "",
    users: null,
    logOut: () => {
      return set({
        token: "",
        users: null,
      });
    },
  };
});

export default useMyStore;
