const { data, error } = await supabase
  .from('leads')
  .select('*')

console.log(data)
