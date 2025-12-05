import React, { useState } from 'react'
import { Droppable } from '@hello-pangea/dnd'
import CardComp from './CardComp'
import api from '../api'

export default function Column({ column, refresh }) {
  const [title, setTitle] = useState(column.title)
  const [editing, setEditing] = useState(false)
  const addCard = async (t) => {
    await api.post(`/boards/columns/${column._id}/cards`, { title: t })
    refresh()
  }
  const saveTitle = async () => { await api.put(`/boards/columns/${column._id}`, { title }); setEditing(false); refresh() }
  const deleteColumn = async () => { await api.delete(`/boards/columns/${column._id}`); refresh() }

  return (
    <div className="w-80 bg-white rounded-lg shadow p-4 flex-shrink-0">
      <div className="flex justify-between items-center mb-3">
        {editing ? (
          <div className="flex gap-2 w-full">
            <input className="border p-1 flex-1" value={title} onChange={e=>setTitle(e.target.value)} />
            <button onClick={saveTitle} className="bg-blue-500 text-white px-2 rounded">Save</button>
          </div>
        ) : (
          <>
            <h3 className="font-medium">{column.title}</h3>
            <div className="flex gap-2 text-sm">
              <button onClick={()=>setEditing(true)} className="text-blue-500">Edit</button>
              <button onClick={deleteColumn} className="text-red-500">Delete</button>
            </div>
          </>
        )}
      </div>

      <Droppable droppableId={column._id}>
        {(provided)=> (
          <div ref={provided.innerRef} {...provided.droppableProps} className="min-h-[50px]">
            {column.cards && column.cards
              .slice()
              .sort((a,b)=> (a.order||0)-(b.order||0))
              .map((c, idx) => <CardComp key={c._id} card={c} index={idx} refresh={refresh} />)}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

      <AddCard onAdd={addCard} />
    </div>
  )
}

function AddCard({ onAdd }){
  const [text, setText] = useState('')
  return (
    <div className="mt-3">
      <input className="border p-2 w-full" value={text} onChange={e=>setText(e.target.value)} placeholder="Add task" />
      <button onClick={()=>{ if(text.trim()){ onAdd(text); setText('') } }} className="mt-2 bg-blue-500 text-white px-3 py-1 rounded">Add</button>
    </div>
  )
}
