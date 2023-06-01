import "./globals.css"


export const metadata = {
   title: "Component playground",
   description: "A place to play with React components and tailwindcss",
}

export default function RootLayout({
                                      children,
                                   }: {
   children: React.ReactNode
}) {
   return (
      <html lang="en">
      <body className={'bg-slate-50'}>{children}</body>
      </html>
   )
}
