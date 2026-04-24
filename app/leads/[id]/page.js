"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function Lead({ params }) {
  const [lead, setLead] = useState(null);
  const [interacoes, setInteracoes] = useState([]);
  const [mensagem, setMensagem] = useState("");

  const fetchData = async () => {
    const { data: leadData } = await supabase
      .from("leads")
      .select("*")
      .eq("id", params.id)
      .single();

    const { data: interacoesData } = await supabase
      .from("interacooes") // seu nome real
      .select("*")
      .eq("cliente_id", params.id)
      .order("data_contato", { ascending: false });

    setLead(leadData);
    setInteracoes(interacoesData || []);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const salvarInteracao = async () => {
    if (!mensagem.trim()) return;

    await supabase.from("interacooes").insert([
      {
        cliente_id: params.id,
        relato: mensagem,
        data_contato: new Date().toISOString(),
      },
    ]);

    setMensagem("");
    fetchData();
  };

  if (!lead) return <div>Carregando...</div>;

  return (
    <div style={{ padding: 20 }}>
      <h1>{lead.nome}</h1>
      <p>Telefone: {lead.telefone}</p>
      <p>Status: {lead.status}</p>

      <hr />

      <h3>Nova interação</h3>

      <textarea
        value={mensagem}
        onChange={(e) => setMensagem(e.target.value)}
        placeholder="Digite o atendimento..."
        style={{ width: "100%", height: 80 }}
      />

      <br /><br />

      <button onClick={salvarInteracao}>
        Salvar
      </button>

      <hr />

      <h3>Histórico</h3>

      {interacoes.map((i) => (
        <div key={i.id} style={{ marginBottom: 10 }}>
          <strong>
            {new Date(i.data_contato).toLocaleString()}
          </strong>
          <p>{i.relato}</p>
        </div>
      ))}
    </div>
  );
}
