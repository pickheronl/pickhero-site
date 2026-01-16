import React from 'react'
import './globals.css'

export const metadata = {
  title: 'PickHero - Magazijnbeheer voor E-commerce',
  description: 'De slimme WMS-oplossing voor webwinkels. Eenvoudig, snel en betrouwbaar magazijnbeheer.',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="nl">
      <body>
        {children}
      </body>
    </html>
  )
}
