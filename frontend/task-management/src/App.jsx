import React, { useEffect, useState } from 'react'
import api from './api'
import BoardView from './components/BoardView'

export default function App(){
  const [boards, setBoards] = useState([])
  const [active, setActive] = useState(null)
  useEffect(()=>{ load() }, [])
  const load = async ()=> { const r = await api.get('/boards'); setBoards(r.data); if(r.data[0] && !active) setActive(r.data[0]._id) }
  const createBoard = async ()=>{ const r = await api.post('/boards', { title: 'New Board' }); load(); setActive(r.data._id) }
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex gap-4 mb-6">
          <div className="flex gap-2 items-center">
            <select value={active||''} onChange={e=>setActive(e.target.value)} className="border p-2 rounded">
              {boards.map(b => <option key={b._id} value={b._id}>{b.title}</option>)}
            </select>
            <button onClick={createBoard} className="bg-blue-600 text-white px-3 py-2 rounded">New Board</button>
          </div>
        </div>
        {active ? <BoardView key={active} boardId={active} /> : <div>No board</div>}
      </div>
    </div>
  )
}
