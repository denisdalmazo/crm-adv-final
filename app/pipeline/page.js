'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

const columns = [
  { title: 'Novo', status: 'novo' },
  { title: 'Qualificação', status: 'qualificacao' },
  { title: 'Proposta', status: 'proposta' },
  { title: 'Negociação', status: 'negociacao' },
  { title: 'Fechado', status: 'fechado' },
]

export default function Pipeline() {
  const [cases, setCases] = useState([])

  useEffect(() => {
    fetchCases()
  }, [])

  async function fetchCases() {
    const { data } = await supabase.from('cases').select('*')
    setCases(data || [])
  }

  return (
    <div className="flex gap-6 p-6 overflow-x-auto h-screen bg-[#0b0b0b]">
      {columns.map(col => (
        <div key={col.status} className="min-w-[300px] bg-[#111] rounded-xl p-4">
          <h2 className="text-white font-semibold mb-4">{col.title}</h2>

          {cases
            .filter(c => c.status === col.status)
            .map(c => (
              <div
                key={c.id}
                className="bg-[#1c1c1c] p-3 rounded-lg mb-3 hover:bg-[#2a2a2a] transition"
              >
                <p className="text-white font-medium">{c.name || 'Sem nome'}</p>
                <p className="text-sm text-gray-400">{c.type || 'Sem tipo'}</p>
              </div>
            ))}
        </div>
      ))}
    </div>
  )
}
