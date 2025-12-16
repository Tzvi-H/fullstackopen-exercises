const Persons = ({ personsToDisplay }) => (
  <div>
    {personsToDisplay.map((person) => (
      <span key={person.name}>
        {person.name} {person.number}
        <br />
      </span>
    ))}
  </div>
);

export default Persons;
