async function LoginUser() {}


async function checkToken() {
  const token = localStorage.getItem("token");
  if (token) {
    const request = await fetch("/api/users/me", {
      method: "GET",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const result = await request;

    if (result.status === 200) {
      return true;
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      return false;
    }
  } else {
    return false;
  }
}

function getCurrentUser() {
  const user = localStorage.getItem("user");
  return user;
}

export default {
  LoginUser,
  checkToken,
  getCurrentUser,
};
