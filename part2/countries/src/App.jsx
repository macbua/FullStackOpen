import { useState, useMemo, useEffect } from 'react'
import RenderAllCountries from './components/RenderAllCountries'
import SearchFilter from './components/SearchFilter'
import {GetAll} from './services/Countries'

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState('');
  

  useEffect(() => {
    GetAll().then(data => {setCountries(data)
    }).catch(error => {console.error(error)})
  }, []);

  const filtered = useMemo(() => {
    return countries.filter(c => c?.name?.common?.toLowerCase().includes(filter.trim().toLowerCase()))
  }, [countries, filter])

  return (
    <div>
      <SearchFilter  filter={filter} setFilter={setFilter} />
      <RenderAllCountries filter={filter} filtered={filtered} setFilter={setFilter} />
    </div>
  )
}

export default App