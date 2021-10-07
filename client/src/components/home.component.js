import React, { Component } from "react";
// import './App.css';
import "bulma/css/bulma.css";
import TasksService from "../services/task.service";
import AuthService from "../services/auth.service";
import { useToasts } from "react-toast-notifications";
import moment from "moment";

function withToast(Component) {
  return function WrappedComponent(props) {
    const toastFuncs = useToasts();
    return <Component {...props} {...toastFuncs} />;
  };
}
class Home extends Component {
  constructor() {
    super();
    this.state = {
      redirect: "/register",
      tasks: [],
      doneTasks: [],
      favTasks: [],

      todaysTasks: [],
      upcomingTasks: [],
      overdueTasks: [],
      modalTaskForm: false,
      modalTaskForm_Toggle: "",
      message: "",
      title: "",
      description: "",
      deadline: "",
      priority: "5",
      fav: false,
      filter: "all",
      act: 0,
      index: 0,
      renderTasks: 1,
      navActive: "tasks",
    };
  }

  handleError = (error) => {
    const resMessage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    this.props.addToast(resMessage);

    if (error.response && error.response.status === 403) {
      setTimeout(() => {
        AuthService.logout();
        this.props.history.push("/login");
      }, 4000);
    }
  };

  fetchingTasks = () => {
    TasksService.getTask().then(
      (tasks) => {
        const upcoming = [],
          todays = [],
          overdue = [];
        if (tasks.success) {
          const tasksData = tasks.data.filter((task) => task.isActive === true);
          tasksData.map((value) => {
            console.log(value.deadline);
            if (value.deadline) {
              let dt = value.deadline.split("T");
              const dd = new Date(dt[0]);
              let todaysDate = moment();
              todaysDate.set({ hour: 0, minute: 0, second: 0, millisecond: 0 });
              var givenDate = moment(dd);
              givenDate.set({ hour: 0, minute: 0, second: 0, millisecond: 0 });

              const dateDiff = givenDate.diff(todaysDate, "day");
              const taskSetup = dateDiff < 0 ? "overdue" : dateDiff === 0 ? "todays" : "upcoming";
              console.dir(taskSetup, { depth: "full" });
              if (taskSetup === "upcoming") {
                upcoming.push(value);
              } else if (taskSetup === "overdue") {
                overdue.push(value);
              } else {
                todays.push(value);
              }
            }
          });
          const doneTasksData = tasks.data.filter((task) => task.isDone === true);
          this.setState({
            tasks: tasksData,
            doneTasks: doneTasksData,
            todaysTasks: todays,
            overdueTasks: overdue,
            upcomingTasks: upcoming,
          });
        } else {
          this.setState({
            message: tasks.message || "Something went wrong",
          });
        }
      },
      (error) => {
        this.handleError(error);
      }
    );
  };
  componentDidMount() {
    const token = localStorage.getItem("user");

    if (!token) {
      this.props.history.push("/login");
    } else {
      this.fetchingTasks();
    }
  }

  modalTaskForm = (modal) => {
    if (modal) {
      this.setState({ modalTaskForm_Toggle: "is-active", modalTaskForm: modal });
    } else {
      this.setState({ modalTaskForm_Toggle: "", modalTaskForm: modal });
    }
  };

  submitTask = (e) => {
    e.preventDefault();
    // console.log('tes');
    let { tasks, title, description, deadline, act, index, priority } = this.state;
    if (title.trim() === "" || description.trim() === "") {
      this.props.addToast("Please fill all values", { autoDismiss: true });

      return false;
    }
    if (act === 0) {
      //NEW
      TasksService.createTask(title, description, deadline, priority).then(
        (res) => {
          if (res.success === true) {
            this.fetchingTasks();
            this.props.addToast(res.message, { autoDismiss: true });
          } else {
            this.handleError(res.message);
          }
        },
        (error) => {
          this.handleError(error);
        }
      );
    } else {
      //UPDATE
      tasks[index].title = title;
      tasks[index].description = description;
      tasks[index].deadline = deadline;
      tasks[index].priority = priority;
      TasksService.updateTask(tasks[index]["_id"], tasks[index]).then(
        (res) => {
          if (res.success) {
            this.fetchingTasks();
            this.props.addToast(res.message, { autoDismiss: true });
          } else {
            this.handleError(res.message);
          }
        },
        (error) => {
          this.handleError(error);
        }
      );
    }
    this.setState({
      modalTaskForm_Toggle: "",
      modalTaskForm: false,
      act: 0,
      title: "",
      description: "",
      deadline: "",
    });
  };

  inputChange = (e) => {
    let { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  fRemove = (i, id) => {
    let { tasks } = this.state;
    tasks.splice(i, 1);
    const confirmMessage = window.confirm("Are you sure you want to delete !!!");
    if (confirmMessage)
      TasksService.deleteTask(id).then(
        (res) => {
          if (res && res.success) {
            this.setState({
              tasks,
            });
            this.props.addToast(res.message, { autoDismiss: true });
            this.fetchingTasks();
          } else {
            this.handleError(res.message);
          }
        },
        (error) => {
          this.handleError(error);
        }
      );
  };

  fEdit = (i, id) => {
    let task = this.state.tasks[i];

    this.setState({
      title: task.title,
      description: task.description,
      deadline: task.deadline,
      priority: task.priority,

      modalTaskForm_Toggle: "is-active",
      modalTaskForm: true,

      act: 1,
      index: i,
    });
  };

  // setting for dateTime view
  viewDateTime = (dt, whichPanel) => {
    if (dt) {
      dt = dt.split("T");
      const d = new Date(dt[0]);
      let todaysDate = moment();
      todaysDate.set({ hour: 0, minute: 0, second: 0, millisecond: 0 });
      var givenDate = moment(d);
      givenDate.set({ hour: 0, minute: 0, second: 0, millisecond: 0 });

      const dateDiff = givenDate.diff(todaysDate, "day");
      const taskSetup = dateDiff < 0 ? "Overdue" : dateDiff === 0 ? "Todays" : "Upcoming";
      const tasksCategory = whichPanel === "tasks" ? `--- [${taskSetup}]` : "";
      return `${dt[0]} @${dt[1]} ${tasksCategory}`;
    } else {
      return "";
    }
  };

  //   TASKS DONE
  taskDone = (i, id) => {
    let { doneTasks, tasks } = this.state;
    tasks[i].isActive = false;
    tasks[i].isDone = true;

    TasksService.updateTask(id, tasks[i]).then(
      (res) => {
        if (res.success === true) {
          doneTasks.push(tasks[i]);
          tasks.splice(i, 1);
          this.setState({
            doneTasks,
            tasks,
          });
          this.props.addToast(res.message, { autoDismiss: true });
          this.fetchingTasks();
        } else {
          this.handleError(res.message);
        }
      },
      (error) => {
        this.handleError(error);
      }
    );
  };

  removeDone = (i) => {
    let { doneTasks } = this.state;
    // delete doneTasks
    doneTasks.splice(i, 1);
    this.setState({
      doneTasks,
    });
  };

  unDone = (i, id) => {
    let { doneTasks, tasks } = this.state;
    doneTasks[i].isActive = true;
    doneTasks[i].isDone = false;
    TasksService.updateTask(id, doneTasks[i]).then(
      (res) => {
        if (res.success === true) {
          tasks.push(doneTasks[i]);
          this.removeDone(i);
          this.props.addToast(res.message, { autoDismiss: true });
        } else {
          this.handleError(res.message);
        }
      },
      (error) => {
        this.handleError(error);
      }
    );
  };

  render() {
    let { message, modalTaskForm, modalTaskForm_Toggle, tasks, title, description, deadline, doneTasks, renderTasks, navActive, priority, filter, todaysTasks, upcomingTasks, overdueTasks } = this.state;
    let dataToShow = [];
    if (filter === "all") {
      dataToShow = tasks;
    } else if (filter === "upcoming") {
      dataToShow = upcomingTasks;
    } else if (filter === "todays") {
      dataToShow = todaysTasks;
    } else if (filter === "overdue") {
      dataToShow = overdueTasks;
    }

    return (
      <div className="App" style={{ paddingTop: 20 }}>
        {/* container */}
        <span style={{ color: "brown" }}>{message}</span>

        <div className="container">
          {/* Top Button */}

          <div className="columns" style={{ position: "fixed" }}>
            <div className="column is-12">
              <div className="field has-addons">
                <p className="control">
                  <a href={() => false} className="button is-link" onClick={() => this.modalTaskForm(!modalTaskForm)}>
                    <span className="icon">
                      <i className="fa fa-plus" />
                    </span>
                    <span>New</span>
                  </a>
                </p>
                <p className="control">
                  <a
                    href={() => false}
                    className={`button is-link ${navActive === "tasks" ? "is-outlined" : ""}`}
                    onClick={() => {
                      this.setState({
                        renderTasks: 1,
                        navActive: "tasks",
                      });
                    }}
                  >
                    <span className="icon">
                      <i className="fa fa-tasks" />
                    </span>
                    <span>Tasks ( {tasks.length} )</span>
                  </a>
                </p>
                <p className="control">
                  <a
                    href={() => false}
                    className={`button is-link ${navActive === "done" ? "is-outlined" : ""}`}
                    onClick={() => {
                      this.setState({
                        renderTasks: 2,
                        navActive: "done",
                      });
                    }}
                  >
                    <span className="icon">
                      <i className="fa fa-check" />
                    </span>
                    <span>Complete ( {doneTasks.length} )</span>
                  </a>
                </p>
              </div>
            </div>
          </div>

          {/* TODO LIST */}
          <div style={{ paddingTop: 60 }}>
            {renderTasks === 1 && (
              <div className="field">
                <div className="control">
                  <label className="label">Filter</label>
                  <select value={this.state.filter} onChange={(e) => this.inputChange(e)} name="filter">
                    <option value="all">All</option>
                    <option value="todays">Todays</option>
                    <option value="upcoming">Upcoming</option>
                    <option value="overdue">Overdue</option>
                  </select>
                </div>
              </div>
            )}
            <hr />
            {renderTasks === 1 &&
              dataToShow.map((data, i) => (
                <div className="columns" key={i}>
                  <div className="column is-12">
                    <article className="media">
                      <div className="media-content">
                        <div className="content">
                          <p>
                            <strong>{data.title}</strong>
                            <br />
                            {data.description}
                            <br />
                            <small>{this.viewDateTime(data.deadline, "tasks")}</small>
                            <br />
                            <span>{data.priority ? "Priority- P" + data.priority : ""}</span>
                          </p>
                        </div>
                        <nav className="level is-mobile">
                          <div className="level-left">
                            <a href={() => false} className="level-item" onClick={() => this.taskDone(i, data._id)}>
                              <span className="icon">
                                <i className="fa fa-lg fa-check"></i>
                              </span>
                            </a>
                            <a href={() => false} className="level-item" onClick={() => this.fEdit(i, data._id)}>
                              <span className="icon">
                                <i className="fa fa-lg fa-pencil-alt"></i>
                              </span>
                            </a>
                            <a href={() => false} className="level-item" onClick={() => this.fRemove(i, data._id)}>
                              <span className="icon">
                                <i className="fa fa-lg fa-trash-alt"></i>
                              </span>
                            </a>
                          </div>
                        </nav>
                      </div>
                    </article>
                  </div>
                </div>
              ))}

            {renderTasks === 2 &&
              doneTasks.map((data, i) => (
                <div className="columns" key={i}>
                  <div className="column is-12">
                    <article className="media">
                      <div className="media-content">
                        <div className="content">
                          <strong>{data.title}</strong>
                          <br />
                          {data.description}
                          <br />
                          <small>{this.viewDateTime(data.deadline, "done")}</small>
                          <br />
                          <span>{data.priority ? "Priority- P" + data.priority : ""}</span>
                        </div>
                        <nav className="level is-mobile">
                          <div className="level-left">
                            <a href={() => false} className="level-item" onClick={() => this.unDone(i, data._id)}>
                              <span className="icon">
                                <i className="fa fa-lg fa-undo"></i>
                              </span>
                            </a>
                          </div>
                        </nav>
                      </div>
                    </article>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* MODAL - TASK FORM */}
        <div className={`modal ${modalTaskForm_Toggle}`}>
          <div className="modal-background" onClick={() => this.modalTaskForm(!modalTaskForm)}></div>
          <div className="modal-content">
            <form ref="myForm" className="myForm" style={{ margin: "10px 10px 10px 10px" }}>
              <div className="field">
                <div className="control">
                  <label className="label">Title</label>
                  <input required className="input is-info" type="text" name="title" value={title} onChange={(e) => this.inputChange(e)} />
                </div>
              </div>
              <div className="field">
                <div className="control">
                  <label className="label">Detail</label>
                  <textarea className="textarea is-info" type="text" placeholder="Info textarea" name="description" value={description} onChange={(e) => this.inputChange(e)}></textarea>
                </div>
              </div>
              <div className="field">
                <div className="control">
                  <label className="label">Deadline</label>
                  <input className="input is-info" type="datetime-local" name="deadline" value={deadline} onChange={(e) => this.inputChange(e)} />
                </div>
              </div>
              <div className="field">
                <div className="control">
                  <label className="label">Priority</label>
                  <select value={priority} onChange={(e) => this.inputChange(e)} name="priority">
                    <option value="5">P5</option>
                    <option value="4">P4</option>
                    <option value="3">P3</option>
                    <option value="2">P2</option>
                    <option value="1">P1</option>
                  </select>
                </div>
              </div>
              <button className="button is-info" onClick={(e) => this.submitTask(e)}>
                Save
              </button>
            </form>
          </div>
          <button className="modal-close is-large" aria-label="close" onClick={() => this.modalTaskForm(!modalTaskForm)}></button>
        </div>
      </div>
    );
  }
}

export default withToast(Home);
