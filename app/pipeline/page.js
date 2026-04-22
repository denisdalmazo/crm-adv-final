"use client";
import { useEffect, useState } from "react";
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

export default function Pipeline() {
 const [data, setData] = useState([]);
  const fetchLeads = async () => {
  const { data } = await supabase.from("leads").select("*");
  setData(data);
};
  
 useEffect(() => {
  fetchLeads();
}, []);
  const atualizarStatus = async (id, novoStatus) => {
  await supabase
    .from("leads")
    .update({ status: novoStatus })
    .eq("id", id);

  fetchLeads();
};

  const colunas = [
    { key: 'novo', label: 'Novo' },
    { key: 'triagem', label: 'Triagem' },
    { key: 'proposta', label: 'Proposta' },
    { key: 'negociacao', label: 'Negociação' },
    { key: 'convertido', label: 'Convertido' }
  ]

  return (
    <div style={{ display: 'flex', gap: 20, padding: 20 }}>
      {colunas.map((coluna) => (
        <div
          key={coluna.key}
          style={{
            border: '1px solid #ccc',
            padding: 10,
            width: 220,
            borderRadius: 10
          }}
        >
          {/* título bonito sem quebrar o filtro */}
          <h2 style={{ marginBottom: 10 }}>{coluna.label}</h2>

          {data
            .filter((l) => l.status?.trim().toLowerCase() === coluna.key)
            .map((lead) => (
              <div
                key={lead.id}
                style={{
                  marginBottom: 10,
                  padding: 8,
                  border: '1px solid #eee',
                  borderRadius: 6
                }}
              >
               <strong>{lead.nome}</strong>

<br />

<select
  value={lead.status}
  onChange={(e) => atualizarStatus(lead.id, e.target.value)}
>
  <option value="novo">Novo</option>
  <option value="triagem">Triagem</option>
  <option value="proposta">Proposta</option>
  <option value="negociacao">Negociação</option>
  <option value="convertido">Convertido</option>
</select>

                <div style={{ marginTop: 5 }}>
                  <a
                    href={`https://wa.me/55${lead.telefone}`}
                    target="_blank"
                  >
                    WhatsApp
                  </a>
                </div>
              </div>
            ))}
        </div>
      ))}
    </div>
  )
}
