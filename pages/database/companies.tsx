import { useEffect, useState } from "react"
import { getCompanies } from "../../api/database"
import companiesTableColumns from "../../components/companiesTableColumns"
import Navbar from "../../components/navbar/NavBar"
import TableContainer from "../../components/TableContainer"
import styles from '../../styles/Home.module.css'

/**
 * Display an editeable table with companies information that can be modified and updated to the server
 * @returns Companies table object
 */
export default function Companies() {
  const [companiesList, setCompaniesList] = useState([])

  useEffect(() => {
    //at first render -> get full list of compaines from API and store it in companiesList object
    getCompanies().then((newList) => {
      if (newList) {
        for (const company of newList) {
          //add id to delete and save columns so that button knows which company to delete / save
          company.delete = company.id
          company.save = company.id
        }
        setCompaniesList(newList)
      }
    })
  }, [])
  return <div className={styles.container}>
    <Navbar />
    <TableContainer columns={companiesTableColumns} data={companiesList} />
  </div>
}