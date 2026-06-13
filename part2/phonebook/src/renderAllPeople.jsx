import {Deleting} from './services/persons'

const RenderAllPeople = ({ persons, filtered, setPersons, setEror }) =>{
  
  const delElement = (id) => {
    if(window.confirm("Are you sure you want to delete this person?")){
    Deleting(id).then(response => {
      if(response.status === 200 || response.status === 204){
        setPersons(persons.filter(item => item.id !== id))
        setEror({message: 'The phonebook entry has been deleted.', type: 'notification'})}
    }).catch(error => {setEror({message: error.message, type: 'errorr'})})}}
  
  return (<div>
        <h2>Numbers</h2>
      {filtered.map(person => (
          <p key={person.id}>
            {person.name} {person.number}
            <button style={{ marginLeft: '5px'}} onClick={() => delElement(person.id)}>X</button>
          </p>
        ))}
    </div>
    )}

export default RenderAllPeople