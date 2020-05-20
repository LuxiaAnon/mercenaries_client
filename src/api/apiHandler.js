import axios from "axios";

const service = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  withCredentials: true, // Cookie is sent to client when using this service. (used for session)
});

function errorHandler(error) {
  if (error.response.data) {
    console.log(error.response && error.response.data);
    throw error;
  }
  throw error;
}

export default {
  service,

  signup(userInfo) {
    return service
      .post("/api/auth/signup", userInfo)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  signin(userInfo) {
    return service
      .post("/api/auth/signin", userInfo)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  isLoggedIn() {
    return service
      .get("/api/auth/isLoggedIn")
      .then((res) => res.data)
      .catch(errorHandler);
  },

  logout() {
    return service
      .get("/api/auth/logout")
      .then((res) => res.data)
      .catch(errorHandler);
  },

  getAllMissions() {
    return service
      .get("/api/missions")
      .then((res) => res.data)
      .catch(errorHandler);
  },

  getAllTrainings() {
    return service
      .get("/api/trainings")
      .then((res) => res.data)
      .catch(errorHandler)
  },

  getOneMission(id) {
    return service
      .get("/api/missions/" + id)
      .then((res) => res.data)
      .catch(errorHandler)
  },

  getOneTraining(id) {
    return service
      .get("/api/trainings/" + id)
      .then((res) => res.data)
      .catch(errorHandler)
  },

  updateAMission(idMission, data) {
    return service
      .patch("/api/missions/edit/" + idMission, data)
      .then((res) => res.data)
      .catch(errorHandler)
  },

  updateAUser(idUser, data) {
    return service
      .patch("/api/users/edit/" + idUser, data)
      .then((res) => res.data)
      .catch(errorHandler)
  },

  updateUserCash(idUser, data) {
    return service
      .patch("api/users/add-cash/" + idUser, data)
      .then((res) => res.data)
      .catch(errorHandler)
  },

  updateATraining(idTraining, data) {
    return service
      .patch("/api/trainings/edit/" + idTraining, data)
      .then((res) => res.data)
      .catch(errorHandler)
  }


};