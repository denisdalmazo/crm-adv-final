'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'
import { DndContext, closestCenter } from '@dnd-kit/core'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

const columns = [
  { title: 'Novo', status: 'novo' },
  { title: 'Triagem', status: 'triagem' },
  { title: 'Proposta', status: 'proposta' },
  { title: 'Negociação', status: 'negociacao' },
  { title: 'Convertido', status: 'convertido' },
]

export default function Pipeline() {
  const [leads, setLeads] = useState([])

  useEffect(() => {
    fetchLeads()
  }, [])

  async function fetchLeads() {
    const { data } = await supabase.from('leads').select('*')
    setLeads(data || [])
  }

  async function handleDragEnd(event) {
    const { active, over } = event
    if (!over) return

    const leadId = active.id
    const newStatus = over.id

    await supabase
      .from('leads')
      .update({ status: newStatus })
      .eq('id', leadId)

    fetchLeads()
  }

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <div className="flex gap-6 p-6 overflow-x-auto h-screen bg-[#0b0b0b]">
        {columns.map(col => (
          <div key={col.status} id={col.status} className="min-w-[300px] bg-[#111] rounded-xl p-4">
            <h2 className="text-white mb-4">{col.title}</h2>

            {leads
              .filter(l => l.status === col.status)
              .map(l => (
                <div
                  key={l.id}
                  draggable
                  className="bg-[#1c1c1c] p-3 rounded-lg mb-3 cursor-grab"
                >
                  <p className="text-white">{l.name || 'Sem nome'}</p>
                  <p className="text-gray-400 text-sm">{l.phone || ''}</p>
                </div>
              ))}
          </div>
        ))}
      </div>
    </DndContext>
  )
}
