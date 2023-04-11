const getUserFromLocalStorage = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;
// const getUserFromStore =
export const config = {
  headers: {
    Authorization: `Bearer ${getUserFromLocalStorage.token}`,
    Accept: "application/json",
  },
};
