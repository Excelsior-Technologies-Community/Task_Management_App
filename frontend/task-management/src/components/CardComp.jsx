import React, { useState } from 'react'
import { Draggable } from '@hello-pangea/dnd'
import api from '../api'

export default function CardComp({ card, index, refresh }){
  const [editing, setEditing] = useState(false)
  const [title, setTitle] = useState(card.title)
  const [description, setDescription] = useState(card.description || '')

  const save = async () => {
    await api.put(`/boards/cards/${card._id}`, { title, description })
    setEditing(false)
    refresh()
  }

  const remove = async () => {
    await api.delete(`/boards/cards/${card._id}`)
    refresh()
  }

  return (
    <Draggable draggableId={card._id} index={index}>
      {(provided)=>(
        <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className="mb-3 bg-gray-50 p-3 rounded">
          {editing ? (
            <div className="space-y-2">
              <input className="border p-1 w-full" value={title} onChange={e=>setTitle(e.target.value)} />
              <textarea className="border p-1 w-full" value={description} onChange={e=>setDescription(e.target.value)} />
              <div className="flex gap-2 justify-end">
                <button onClick={()=>setEditing(false)} className="px-2 py-1 border">Cancel</button>
                <button onClick={save} className="px-2 py-1 bg-green-500 text-white">Save</button>
              </div>
            </div>
          ) : (
            <div>
              <div className="font-medium">{card.title}</div>
              <div className="text-sm text-gray-600">{card.description}</div>
              <div className="mt-2 flex gap-3 text-sm">
                <button onClick={()=>setEditing(true)} className="text-blue-500">Edit</button>
                <button onClick={remove} className="text-red-500">Delete</button>
              </div>
            </div>
          )}
        </div>
      )}
    </Draggable>
  )
}
