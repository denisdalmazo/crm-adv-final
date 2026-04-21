export const metadata = {
  title: 'DALMAZO | CRM JURÍDICO',
  description: 'Sistema de Gestão Ativa',
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body>
        {children}
      </body>
    </html>
  )
}
