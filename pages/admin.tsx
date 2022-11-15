import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useState } from 'react'
import { playShow, pauseShow } from '../api/showManagement'
import { restartDatabase } from '../api/database'

export default function Home() {
  const [playing, isPlaying] = useState(false)
  const [warningOn, setWarningOn] = useState(false)
  const warning = "YOU TRIED RESETTING WHEN DATABASE WAS ON!"

  return (
    <div className={styles.container}>
      <Head>
        <title>Admin App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        Show status: {playing ? `Show is playing` : `Show is not playing`}
        <button onClick={() => { playShow(isPlaying); setWarningOn(false); }}>Play Show</button>
        <button onClick={() => { pauseShow(isPlaying); setWarningOn(false); }}>Pause Show</button>
        <div>
          {warningOn ? `${warning}` : ''}
        </div>
        <div>
          <button onClick={() => { restartDatabase(setWarningOn) }}>Restart Database</button>
        </div>
      </main>
    </div>
  )
}
