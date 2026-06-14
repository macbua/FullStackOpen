const SearchFilter = ({filter, setFilter}) => {
    
    const handleChange = (e) => {
        setFilter(e.target.value)
    }

    return (
        <div>
            find countres <input value={filter} onChange={handleChange} />
        </div>
    )
}

export default SearchFilter