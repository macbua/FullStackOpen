import { useState } from 'react'
import {Creating, Addinger} from './services/persons'

const AddPerson = ({ persons, setPersons, setEror }) =>{
    const [name, setNewName] = useState('');
    const [number, setNewNumber] = useState('');
const addPerson = (e) => {
    e.preventDefault();
    const person = name.trim();
    const num = number.trim();

    if(!person) {alert("You have not entered a value") 
        return}
    if(!num) {alert("You have not entered a number")
        return};

    const somePerson = persons.find(item => item.name.toLowerCase() === person.toLowerCase())
    const someNum = persons.find(item => item.number === num)

    if(somePerson){ 
        if(someNum)alert(`${person} is already added to phonebook`)
        else if(window.confirm(`${person} is already added to phonebook, replace the old number with a new one?`)){
            Addinger(somePerson.id, {name: person, number: num}).then(response => {
                setPersons(persons.map(item => item.id === response.id ? response : item));
                setEror({message: 'The entry in phonebook has been changed.', type: 'notification'});
                setNewName('');
                setNewNumber('');
            }).catch(error => {setEror({message: error.message, type: 'errorr'})
            setPersons(persons.filter(item => item.id !== somePerson.id))
        })}
        return;
        }
    else if(someNum) {alert(`${num} is already added to phonebook`)
    return}
    else{
        Creating({name: person, number: num})
        .then(response => {setPersons([...persons, response]);
        setEror({message: 'Phonebook entry added.', type: 'notification'});
        setNewName('');
        setNewNumber('');})
        .catch(error => {setEror({message: error.message, type: 'errorr'});});
  }}
    
    const handleName = (e) =>setNewName(e.target.value)
    const handleNumber = (e) =>setNewNumber(e.target.value.replace(/[^0-9+()-]/g, ''))

return (
    <div>
    <h2>Add a new</h2>
    <form onSubmit={addPerson}>
        <div>
            name: <input type="text" onChange={handleName} value={name} />
        </div>
        <div>
            number: <input type="tel" onChange={handleNumber} value={number} />
        </div>
        <div>
            <button type="submit">
            add
            </button>
        </div>
    </form>
    </div>
)}

export default AddPerson