import React, { ReactNode } from 'react'
import { User } from '../database/entity/User'
import Header from './Header'

interface ILayoutProps {
  user?: User
  children: ReactNode
}

export default function Layout({ user, children }: ILayoutProps): JSX.Element {
  return (
    <html>
      <head>
        <title>Git UI</title>
        <link rel="stylesheet" type="text/css" href="/styles/bulma.min.css" />
        <link rel="stylesheet" type="text/css" href="/styles/fontawesome.min.css" />
        <link rel="icon" type="image/png" href="/favicon.svg" />
      </head>
      <body>
        <Header user={user} />
        <section className="section">
          <div className="container">{children}</div>
        </section>
      </body>
    </html>
  )
}
