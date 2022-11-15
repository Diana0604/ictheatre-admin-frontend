import { useState } from 'react'
import Link from 'next/link'

export default function Home() {

  return (
    <ul>
      <li>
        <Link href="/">Home</Link>
      </li>
      <li>
        <Link href="/admin">Admin</Link>
      </li>
      <li>
        <Link href="/state">State</Link>
      </li>
    </ul>
  )
}
