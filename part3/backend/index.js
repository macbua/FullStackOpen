const express = require('express')
require('dotenv').config()
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')
const config = require('./config.json')

const app = express()

app.use(express.static('dist'))
app.use(cors())
app.use(express.json())
morgan.token('body', (req) => JSON.stringify(req.body))
app.use(morgan(config.loggingFormat))

app.get('/api/persons', (req, res, next) => {
  Person.find({}).then(people => {res.json(people)}).catch(err => next(err))})

app.get('/info', (req, res, next) => {
  Person.find({}).then(people => {res.send(`<p>Phonebook has info for ${people.length} people</p>
    <p>${new Date().toString()}</p>`)}).catch(err => next(err))})

app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id).then(person => {
    if(!person) return res.status(404).end()
    res.json(person)}).catch(err => next(err))
})

app.post('/api/persons', (req, res, next) => {
  const newPerson = new Person({ name: req.body.name?.trim(), number: req.body.number?.trim() })
  newPerson.save().then(saved => res.json(saved)).catch(err => next(err))})

app.put('/api/persons/:id', async (req, res, next) => {
  try{
    const { number } = req.body
    const findPerson = await Person.findById(req.params.id)
    if(!findPerson) return res.status(404).json({ err: 'User not found' })
    findPerson.number = number?.trim()
    const updatedPerson = await findPerson.save()
    res.json(updatedPerson)}
  catch(err){next(err)}})

app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndDelete(req.params.id)
    .then(_ => {res.status(204).end()}).catch(err => next(err))})

app.use((err, req, res, _next) => {
  console.error(err.message)
  console.error(err.stack)
  if(err.name === 'CastError') {
    return res.status(400).json({ err: 'malformatted id' })
  }else if(err.name === 'ValidationError'){
    return res.status(400).json({ err: 'incorrect data ' + err.message })
  }
  else if(err.code === 11000){
    return res.status(409).json({ err: 'duplicate key' })
  }else if(err.name === 'SyntaxError'){
    return res.status(400).json({ err: 'incorrect syntax' })
  }
  return res.status(500).json({ err: err.message })
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})