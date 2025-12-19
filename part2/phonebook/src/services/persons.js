import axios from "axios";

const getAll = () => {
  return axios
    .get("http://localhost:3001/persons")
    .then((response) => response.data);
};

const create = (newPerson) => {
  return axios
    .post("http://localhost:3001/persons", newPerson)
    .then((response) => response.data);
};

const remove = (id) => {
  return axios.delete(`http://localhost:3001/persons/${id}`);
};

const update = (updatedPerson) => {
  return axios
    .put(`http://localhost:3001/persons/${updatedPerson.id}`, updatedPerson)
    .then((response) => response.data);
};

export default { getAll, create, remove, update };
