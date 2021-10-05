import axios from "axios";

const API_URL = "http://localhost:3000/v1/";

class AuthService {
  login(username, password) {
    return axios
      .post(API_URL + "auth/login", {
        email: username,
        password
      })
      .then(response => {
        console.dir(response, {depth: 'full'});
        if (response.data.data.accessToken) {
          console.log("entered");
          localStorage.setItem("user", JSON.stringify(response.data.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(name, email, password) {
    return axios.post(API_URL + "auth/signup", {
      name,
      email,
      password
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }
}

export default new AuthService();
