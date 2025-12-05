const express = require('express')
const router = express.Router()
const Board = require('../models/Board')
const Column = require('../models/Column')
const Card = require('../models/Card')

router.get('/', async (req, res) => {
  const boards = await Board.find().populate({ path: 'columns', populate: { path: 'cards' } })
  res.json(boards)
})

router.post('/', async (req, res) => {
  const b = await Board.create({ title: req.body.title || 'Untitled Board', columns: [] })
  res.json(b)
})

router.post('/:boardId/columns', async (req, res) => {
  const col = await Column.create({ title: req.body.title || 'New Column', order: req.body.order || 0, board: req.params.boardId, cards: [] })
  await Board.findByIdAndUpdate(req.params.boardId, { $push: { columns: col._id } })
  const populated = await Column.findById(col._id).populate('cards')
  res.json(populated)
})

router.put('/columns/:columnId', async (req, res) => {
  const updated = await Column.findByIdAndUpdate(req.params.columnId, { title: req.body.title }, { new: true }).populate('cards')
  res.json(updated)
})

router.delete('/columns/:columnId', async (req, res) => {
  const col = await Column.findById(req.params.columnId)
  if (!col) return res.json({ ok: false })
  await Card.deleteMany({ column: col._id })
  await Board.findByIdAndUpdate(col.board, { $pull: { columns: col._id } })
  await Column.findByIdAndDelete(col._id)
  res.json({ ok: true })
})

router.post('/:boardId/columns/order', async (req, res) => {
  const { orderedColumnIds } = req.body
  for (let i = 0; i < orderedColumnIds.length; i++) {
    await Column.findByIdAndUpdate(orderedColumnIds[i], { order: i })
  }
  res.json({ ok: true })
})

router.post('/columns/:columnId/cards', async (req, res) => {
  const card = await Card.create({ title: req.body.title || 'New Card', description: req.body.description || '', order: req.body.order || 0, column: req.params.columnId })
  await Column.findByIdAndUpdate(req.params.columnId, { $push: { cards: card._id } })
  const populated = await Card.findById(card._id)
  res.json(populated)
})

router.put('/cards/:id', async (req, res) => {
  const updated = await Card.findByIdAndUpdate(req.params.id, req.body, { new: true })
  res.json(updated)
})

router.delete('/cards/:id', async (req, res) => {
  const card = await Card.findById(req.params.id)
  if (!card) return res.json({ ok: false })
  await Column.findByIdAndUpdate(card.column, { $pull: { cards: card._id } })
  await Card.findByIdAndDelete(req.params.id)
  res.json({ ok: true })
})

router.put('/move', async (req, res) => {
  const { sourceColumnId, destColumnId, cardId, sourceIndex, destIndex } = req.body
  if (sourceColumnId === destColumnId) {
    const col = await Column.findById(sourceColumnId)
    const cid = cardId.toString()
    const idx = col.cards.findIndex(c => c.toString() === cid)
    if (idx > -1) col.cards.splice(idx, 1)
    col.cards.splice(destIndex, 0, cardId)
    await col.save()
    for (let i = 0; i < col.cards.length; i++) {
      await Card.findByIdAndUpdate(col.cards[i], { order: i })
    }
  } else {
    await Column.findByIdAndUpdate(sourceColumnId, { $pull: { cards: cardId } })
    await Column.findByIdAndUpdate(destColumnId, { $push: { cards: { $each: [cardId], $position: destIndex } } })
    await Card.findByIdAndUpdate(cardId, { column: destColumnId, order: destIndex })
    const sourceCol = await Column.findById(sourceColumnId)
    for (let i = 0; i < sourceCol.cards.length; i++) {
      await Card.findByIdAndUpdate(sourceCol.cards[i], { order: i })
    }
    const destCol = await Column.findById(destColumnId)
    for (let i = 0; i < destCol.cards.length; i++) {
      await Card.findByIdAndUpdate(destCol.cards[i], { order: i })
    }
  }
  res.json({ ok: true })
})

module.exports = router
