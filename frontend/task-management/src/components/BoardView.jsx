import React, { useEffect, useState } from 'react'
import api from '../api'
import Column from './Column'
import { DragDropContext } from '@hello-pangea/dnd'

export default function BoardView({ boardId }){
  const [board, setBoard] = useState(null)
  useEffect(()=>{ load() }, [boardId])
  const load = async ()=>{ const r = await api.get('/boards'); setBoard(r.data.find(b => b._id === boardId) || null) }

  const onDragEnd = async (result) => {
    const { source, destination, draggableId } = result
    if (!destination) return
    await api.put('/boards/move', {
      sourceColumnId: source.droppableId,
      destColumnId: destination.droppableId,
      cardId: draggableId,
      sourceIndex: source.index,
      destIndex: destination.index
    })
    load()
  }

  const refresh = () => load()

  const addColumn = async (title) => {
    await api.post(`/boards/${boardId}/columns`, { title })
    load()
  }

  const reorderColumns = async (orderedIds) => {
    await api.post(`/boards/${boardId}/columns/order`, { orderedColumnIds: orderedIds })
    load()
  }

  if(!board) return <div>Loading...</div>

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">{board.title}</h2>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex space-x-4 overflow-auto pb-6">
          {board.columns
            .slice()
            .sort((a,b) => (a.order||0)-(b.order||0))
            .map(col => <Column key={col._id} column={col} refresh={refresh} boardId={boardId} />)}
          <div className="w-80 flex-shrink-0">
            <AddColumn onAdd={addColumn} />
          </div>
        </div>
      </DragDropContext>
    </div>
  )
}

function AddColumn({ onAdd }){
  const [title, setTitle] = useState('')
  return (
    <div className="bg-white p-4 rounded shadow">
      <input className="border p-2 w-full" value={title} onChange={e=>setTitle(e.target.value)} placeholder="New column" />
      <button onClick={()=>{ if(title.trim()){ onAdd(title); setTitle('') } }} className="mt-2 bg-green-500 text-white px-3 py-2 rounded">Add</button>
    </div>
  )
}
