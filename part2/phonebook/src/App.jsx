import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Notification from "./components/Notification";
import personService from "./services/persons";

import "./index.css";

import { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [notificationMessage, setNotificationMessage] = useState(null);

  useEffect(() => {
    personService.getAll().then((persons) => {
      setPersons(persons);
    });
  }, []);

  const handleNameChange = (e) => setNewName(e.target.value);
  const handleNumberChange = (e) => setNewNumber(e.target.value);
  const handleFilterChange = (e) => setFilter(e.target.value);

  const personsToDisplay = filter
    ? persons.filter((person) =>
        person.name.toLowerCase().startsWith(filter.toLowerCase())
      )
    : persons;

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (persons.some((person) => person.name === newName)) {
      if (
        !window.confirm(
          `${newName} is already added to the phonebook, replace the old number with a new one?`
        )
      ) {
        return;
      } else {
        const existingPerson = persons.find(
          (person) => person.name === newName
        );
        existingPerson.number = newNumber;
        personService.update(existingPerson).then((returnedPerson) => {
          setPersons(
            persons.map((person) =>
              person.id !== returnedPerson.id ? person : returnedPerson
            )
          );
          setNewName("");
          setNewNumber("");
          setNotificationMessage({
            message: `updated ${returnedPerson.name}`,
            className: "success",
          });
          setTimeout(() => setNotificationMessage(null), 1500);
        });
        return;
      }
    }

    const newPerson = {
      name: newName,
      number: newNumber,
    };

    personService
      .create(newPerson)
      .then((returnedPerson) => {
        setPersons([...persons, returnedPerson]);
        setNewName("");
        setNewNumber("");
        setNotificationMessage({
          message: `Added ${returnedPerson.name}`,
          className: "success",
        });
        setTimeout(() => setNotificationMessage(null), 1500);
      })
      .catch((error) => {
        console.log(error.response.data.error);
        setNotificationMessage({
          message: error.response.data.error,
          className: "error",
        });
        setTimeout(() => setNotificationMessage(null), 4000);
      });
  };

  const handleDelete = (id) => {
    const personToDelete = persons.find((person) => person.id === id);
    if (!window.confirm(`Delete ${personToDelete.name} ?`)) {
      return;
    }
    personService
      .remove(id)
      .then(() => {
        setPersons(persons.filter((person) => person.id !== id));
        setNotificationMessage({
          message: `Removed ${personToDelete.name}`,
          className: "success",
        });
        setTimeout(() => setNotificationMessage(null), 1500);
      })
      .catch((e) => {
        setNotificationMessage({
          message: `Information of ${personToDelete.name} has already been removed from the server`,
          className: "error",
        });
        setTimeout(() => setNotificationMessage(null), 1500);
      });
  };

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification notification={notificationMessage} />

      <Filter filter={filter} handleFilterChange={handleFilterChange} />

      <h3>add a new</h3>

      <PersonForm
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        newName={newName}
        newNumber={newNumber}
        handleFormSubmit={handleFormSubmit}
      />

      <h3>Numbers</h3>

      <Persons
        personsToDisplay={personsToDisplay}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default App;
