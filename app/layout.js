<nav className="flex-1 space-y-2 text-sm font-bold">
  <Link href="/" className="flex items-center gap-3 p-3 rounded-xl hover:bg-blue-600/10 text-slate-400 hover:text-blue-400 transition-all">
    <LayoutDashboard size={20}/> Dashboard
  </Link>
  <Link href="/clientes" className="flex items-center gap-3 p-3 rounded-xl hover:bg-blue-600/10 text-slate-400 hover:text-blue-400 transition-all">
    <Users size={20}/> Clientes
  </Link>
  <Link href="/processos" className="flex items-center gap-3 p-3 rounded-xl hover:bg-blue-600/10 text-slate-400 hover:text-blue-400 transition-all">
    <Briefcase size={20}/> Processos
  </Link>
  <Link href="/prazos" className="flex items-center gap-3 p-3 rounded-xl hover:bg-blue-600/10 text-slate-400 hover:text-blue-400 transition-all">
    <Calendar size={20}/> Prazos
  </Link>
  <Link href="/financeiro" className="flex items-center gap-3 p-3 rounded-xl hover:bg-blue-600/10 text-slate-400 hover:text-blue-400 transition-all">
    <DollarSign size={20}/> Financeiro
  </Link>
</nav>
