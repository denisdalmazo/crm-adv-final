import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

export default async function Pipeline() {
  const { data, error } = await supabase
    .from('leads')
    .select('*')

  if (error) {
    return <div>Erro ao carregar</div>
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Teste Pipeline</h1>

      {!data || data.length === 0 ? (
        <p>Nenhum dado encontrado</p>
      ) : (
        data.map((lead) => (
          <div key={lead.id}>
            {lead.nome} - {lead.status}
          </div>
        ))
      )}
    </div>
  )
}
