const SearchFilter = ({filter, setFilter}) =>{

    const handleFilter = (e) =>{
        setFilter(e.target.value)
    }
    
    return (
        <div>
            name: <input type="text" onChange={handleFilter} value={filter} />
        </div>
    )
}

export default SearchFilter