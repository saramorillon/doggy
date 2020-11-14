import React from 'react'
import { IContainer } from '../models/IContainer'

function Container({ container }: { container: IContainer }) {
  return <>{container.name}</>
}

export default function Home({ containers }: { containers: IContainer[] }): JSX.Element {
  return (
    <>
      {containers.map((container) => (
        <Container key={container.id} container={container} />
      ))}
    </>
  )
}
