import { useState, useEffect } from 'react'
import AddPerson from './addPerson'
import RenderAllPeople from './renderAllPeople'
import SearchFilter from './searchFilter'
import {Getting} from './services/persons'
import Notification from './services/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [filter, setFilter] = useState('')
  const [eror, setEror] = useState({})

  useEffect(() => {
    Getting().then(data => {setPersons(data)
    }).catch(error => {setEror({message: error.message, type: 'errorr'})
    })}, [])

  const filtered = filter.trim().toLowerCase() ? persons.filter(person => (person.name).toLowerCase().includes(filter.trim().toLowerCase())) : persons

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification {...eror} setEror={setEror} />
      <SearchFilter filter={filter} setFilter={setFilter} />
      <AddPerson persons={persons} setPersons={setPersons} setEror={setEror} />
      <RenderAllPeople persons={persons} filtered={filtered} setPersons={setPersons} setEror={setEror} />
    </div>
  )
}

export default App