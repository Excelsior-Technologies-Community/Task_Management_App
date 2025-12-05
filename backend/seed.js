const connect = require('./db')
const Board = require('./models/Board')
const Column = require('./models/Column')
const Card = require('./models/Card')
require('dotenv').config()

async function run(){
  await connect(process.env.MONGO_URI)
  await Board.deleteMany({})
  await Column.deleteMany({})
  await Card.deleteMany({})
  const b = await Board.create({ title: 'Demo Board', columns: [] })
  const todo = await Column.create({ title: 'To Do', order: 0, board: b._id, cards: [] })
  const doing = await Column.create({ title: 'Doing', order: 1, board: b._id, cards: [] })
  const done = await Column.create({ title: 'Done', order: 2, board: b._id, cards: [] })
  await Board.findByIdAndUpdate(b._id, { $set: { columns: [todo._id, doing._id, done._id] } })
  const cs = [
    { title: 'Task 1', description: '', order: 0, column: todo._id },
    { title: 'Task 2', description: '', order: 1, column: todo._id },
    { title: 'Task 3', description: '', order: 0, column: doing._id }
  ]
  const created = await Card.insertMany(cs)
  for(const c of created) await Column.findByIdAndUpdate(c.column, { $push: { cards: c._id } })
  console.log('seed done')
  process.exit()
}
run()
