const colunas = ['novo', 'triagem', 'proposta', 'negociacao', 'convertido']

return (
  <div style={{ display: 'flex', gap: 20 }}>
    {colunas.map((coluna) => (
      <div key={coluna}>
        <h2>{coluna}</h2>

        {data
          .filter((l) => l.status === coluna)
          .map((lead) => (
            <div key={lead.id}>
              {lead.nome}
            </div>
          ))}
      </div>
    ))}
  </div>
)
