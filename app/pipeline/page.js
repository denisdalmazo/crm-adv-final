import { supabase } from '@/lib/supabase'

export default async function Pipeline() {
  const { data, error } = await supabase
    .from('leads')
    .select('*')

  console.log(data)

  return (
    <div style={{ padding: 20 }}>
      <h1>Pipeline</h1>

      {error && <p>Erro ao carregar</p>}

      {!data || data.length === 0 ? (
        <p>Nenhum dado encontrado</p>
      ) : (
        data.map((lead) => (
          <div key={lead.id} style={{ marginBottom: 10 }}>
            {lead.nome} - {lead.status}
          </div>
        ))
      )}
    </div>
  )
}
