const express = require('express')
const path = require('path');
const fs = require('fs')
const morgan = require('morgan')
const cors = require('cors')
const config = require('./config.json');
const app = express()

app.use(express.static('dist'))
app.use(cors())
app.use(express.json())
morgan.token('body', (req, res) => JSON.stringify(req.body))
app.use(morgan(config.loggingFormat))
let persons = require('./db.json');

app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.get('/info', (req, res) => {
        res.send(`<p>Phonebook has info for ${persons.length} people</p>
        <p>${new Date().toString()}</p>`)
})

app.get('/api/persons/:id', (req, res) => {
    const id = req.params.id
    const pers = persons.find(item => item.id === id);
    if (pers) res.send(pers)
        else res.status(404).end()
})

app.put('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)    
    const { name, number } = req.body
    if (!name || !number) {
        return res.status(400).json({ error: 'Name and number are required' })
    }
    const updatedPerson = {
        id,
        name: name.trim(),
        number: number.trim()
    }
    persons = persons.map(item => item.id === id ? updatedPerson : item)
    res.json(updatedPerson)
})

app.delete('/api/persons/:id', (req, res) => { 
    const id = req.params.id
    persons = persons.filter(item => item.id !== id)
    res.status(204).end()
})

app.post('/api/persons', (req, res) => {
    const { name, number } = req.body
    if (!name || !number) {
        return res.status(400).json({ error: 'Name and number are required' })
    }
    if(persons.some(item => item.name === name.trim())) {
        return res.status(400).json({ error: 'Name must be unique' })
    }
    const newPerson = {
        id: Math.floor(Math.random() * 1000000).toString(),
        name: name.trim(),
        number: number.trim()
    }
    persons = [...persons, newPerson]
    res.status(201).json(newPerson)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})