"use client";

import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function Cadastro() {
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [status, setStatus] = useState("novo");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error } = await supabase.from("leads").insert([
      {
        nome,
        telefone,
        status,
      },
    ]);

    if (error) {
      alert("Erro ao salvar");
    } else {
      alert("Lead cadastrado");
      setNome("");
      setTelefone("");
      setStatus("novo");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Cadastrar Lead</h1>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <br /><br />

        <input
          placeholder="Telefone"
          value={telefone}
          onChange={(e) => setTelefone(e.target.value)}
        />
        <br /><br />

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="novo">Novo</option>
          <option value="triagem">Triagem</option>
          <option value="proposta">Proposta</option>
          <option value="negociacao">Negociação</option>
          <option value="convertido">Convertido</option>
        </select>

        <br /><br />

        <button type="submit">Salvar</button>
      </form>
    </div>
  );
}
