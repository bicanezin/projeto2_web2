import Cookies from "universal-cookie";
const cookies = new Cookies();

// return the user data from the session storage
export const getUser = async () => {
  const userStr = await cookies.get("userEmail");
  if (userStr) return userStr;
  else return null;
};

// return the token from the session storage
export const getToken = async () => {
  return (await cookies.get("loginToken")) || null;
};

// remove the token and user from the session storage
export const removeUserSession = async () => {
  cookies.remove("loginToken");
  cookies.remove("userEmail");
};

// set the token and user from the session storage
export const setUserSession = async (token, user) => {
  cookies.set("loginToken", token, { path: "/", httpOnly: false });
  cookies.set("userEmail", user, { path: "/", httpOnly: false });
  // console.log('set session')
};
