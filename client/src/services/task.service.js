import axios from "axios";
import AuthService from "./auth.service";

const API_URL = "http://localhost:3000/v1/";

class TasksService {
  createTask(title, description, deadline, priority = "") {
    const token = AuthService.getCurrentUser().accessToken;
    let config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    return axios
      .post(
        API_URL + "tasks/createtasks",
        {
          title,
          description,
          deadline,
          isActive: true,
          isDone: false,
          priority
        },
        config
      )
      .then((response) => {
        if (response.data && response.data.success) return response.data;
        else return response.data;
      });
  }

  updateTask(id, data) {
    const token = AuthService.getCurrentUser().accessToken;
    let config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    let dataToBeSent = {
      _id: id,
      ...data,
    };
    return axios.post(API_URL + "tasks/updatetasks", dataToBeSent, config).then((response) => {
      return response.data;
    });
  }

  deleteTask(id) {
    const token = AuthService.getCurrentUser().accessToken;
    console.dir(token, { depth: "full" });
    let config = {
      data: {
        _id: id,
      },
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    return axios.delete(API_URL + "tasks/deletetasks", config).then((response) => {
      return response.data;
    });
  }

  getTask() {
    const token = AuthService.getCurrentUser().accessToken;
    let config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    return axios.get(API_URL + "tasks/gettasks", config).then((response) => {
      if (response.data && response.data.success) return response.data;
      else return response.data;
    });
  }
}

export default new TasksService();
