import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default async function Lead({ params }) {
  const { data } = await supabase
    .from("leads")
    .select("*")
    .eq("id", params.id)
    .single();

  if (!data) {
    return <div>Lead não encontrado</div>;
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>{data.nome}</h1>
      <p>Telefone: {data.telefone}</p>
      <p>Status: {data.status}</p>
    </div>
  );
}
