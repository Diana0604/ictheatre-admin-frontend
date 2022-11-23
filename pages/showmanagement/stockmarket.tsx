import Head from 'next/head'
import { useEffect, useState } from 'react'
import { getCompanies, getSellers } from '../../api/database'
import CompanyFloatingShares from '../../components/CompanyFloatingShares'
import Navbar from '../../components/navbar/NavBar'
import PlayerInformation from '../../components/PlayerInformation'
import SellerInformation from '../../components/SellerInformation'
import styles from '../../styles/Home.module.css'

/**
 * Display state of game (current stock value, company player info etc.)
 * Currently is under construction
 * @returns
 */
export default function State() {
  const [sellersInformation, setSellersInformation] = useState<any>({})
  const [sharersDisplay, setSharersDisplay] = useState<any[]>([])
  const [allCompanies, setAllCompanies] = useState<any[]>([])
  const [companiesDisplay, setCompaniesDisplay] = useState<any[]>([]);
  const [playerCompanyShares, setPlayerCompanyShares] = useState<any[]>([]);
  const [playerCompanyDisplay, setPlayerCompanyDisplay] = useState<any[]>([]);

  useEffect(() => {
  }, [])

  setTimeout(() => {
    getCompanies().then(companies => {
      setAllCompanies(companies)
      getSellers().then(newSellers => {
        setSellersInformation(newSellers)
      })
    })
  }, 1000)

  useEffect(() => {
    if (Object.keys(sellersInformation).length === 0) return;
    const sellers = sellersInformation.sellers;
    const shareBundles = sellersInformation.shareBundles;
    const newDisplay = []
    for (const seller of sellers) {
      newDisplay.push(<SellerInformation key={seller.id} bundles={shareBundles} seller={seller} companies={allCompanies} />)
    }
    setSharersDisplay(newDisplay)
  }, [sellersInformation])

  useEffect(() => {
    const newDisplay = []
    for (const company of allCompanies) {
      newDisplay.push(<CompanyFloatingShares key={company.id} company={company} />)
    }
    setCompaniesDisplay(newDisplay)
  }, [allCompanies])

  return (
    <div className={styles.container}>
      <Head>
        <title>Admin App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />
      <main>
        <div style={{ display: "flex", height: "100%" }}>
          <PlayerInformation />
          <div style={{ marginLeft: "50px" }}>
            {sharersDisplay}
          </div>
          <div style={{ marginLeft: "50px" }}>
            {companiesDisplay}
          </div>
        </div>
      </main>
    </div>
  )
}
