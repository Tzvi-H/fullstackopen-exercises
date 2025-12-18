const Persons = ({ personsToDisplay, handleDelete }) => (
  <div>
    {personsToDisplay.map((person) => (
      <span key={person.name}>
        {person.name} {person.number}{" "}
        <button onClick={() => handleDelete(person.id)}>delete</button>
        <br />
      </span>
    ))}
  </div>
);

export default Persons;
