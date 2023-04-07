const getUserFromLocalStorage = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;
export const config = {
  header: {
    Authorization: `Bearer ${getUserFromLocalStorage}`,
    Accept: "application/json",
  },
};
