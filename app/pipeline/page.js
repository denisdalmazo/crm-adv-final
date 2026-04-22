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

  const colunas = ['novo', 'triagem', 'proposta', 'negociacao', 'convertido']

  return (
    <div style={{ display: 'flex', gap: 20, padding: 20 }}>
      {colunas.map((coluna) => (
        <div key={coluna} style={{ border: '1px solid #ccc', padding: 10, width: 200 }}>
          <h2>{coluna}</h2>

          {data
            .filter((l) => l.status === coluna)
            .map((lead) => (
              <div key={lead.id} style={{ marginBottom: 8 }}>
                {lead.nome}
              </div>
            ))}
        </div>
      ))}
    </div>
  )
}
