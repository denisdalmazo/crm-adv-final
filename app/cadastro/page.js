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
  const [loading, setLoading] = useState(false);

  const limparTelefone = (tel) => {
    return tel.replace(/\D/g, ""); // remove tudo que não for número
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nome.trim()) {
      alert("Nome obrigatório");
      return;
    }

    if (!telefone.trim()) {
      alert("Telefone obrigatório");
      return;
    }

    const telefoneLimpo = limparTelefone(telefone);

    if (telefoneLimpo.length < 10) {
      alert("Telefone inválido");
      return;
    }

    setLoading(true);

    const { error } = await supabase.from("leads").insert([
      {
        nome: nome.trim(),
        telefone: telefoneLimpo,
        status: status || "novo",
      },
    ]);

    setLoading(false);

    if (error) {
      console.error(error);
      alert("Erro ao salvar");
    } else {
      alert("Lead cadastrado com sucesso");
      setNome("");
      setTelefone("");
      setStatus("novo");
    }
  };

  return (
    <div style={{ padding: 20, maxWidth: 400 }}>
      <h1>Cadastrar Lead</h1>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          style={{ width: "100%", padding: 8 }}
        />
        <br /><br />

        <input
          placeholder="Telefone (com DDD)"
          value={telefone}
          onChange={(e) => setTelefone(e.target.value)}
          style={{ width: "100%", padding: 8 }}
        />
        <br /><br />

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          style={{ width: "100%", padding: 8 }}
        >
          <option value="novo">Novo</option>
          <option value="triagem">Triagem</option>
          <option value="proposta">Proposta</option>
          <option value="negociacao">Negociação</option>
          <option value="convertido">Convertido</option>
        </select>

        <br /><br />

        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            padding: 10,
            background: loading ? "#ccc" : "#000",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          {loading ? "Salvando..." : "Salvar"}
        </button>
      </form>
    </div>
  );
}
