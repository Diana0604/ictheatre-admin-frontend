import { useEffect, useState } from "react"
import { getSellers, getCompanies } from "../api/database"
import sellerTableColumns from "../components/sellerTableColumns"
import Navbar from "../components/navbar/NavBar"
import TableContainer from "../components/TableContainer"
import styles from '../styles/Home.module.css'

/**
 * Display an editeable table with sellers information and their shares that can be modified and updated to the server
 * @returns Companies table object
 */
export default function Sellers() {
  //sellersList is the list of all sellers by name and quantity of shares per company
  const [sellersList, setSellersList] = useState([])
  //companies list is the list of companies, needed to be matched with sellers lists
  const [companiesList, setCompaniesList] = useState<any[]>([])
  //tableColumns is the titles of the columns and cell definition 
  const [tableColumns, setTableColumns] = useState(sellerTableColumns)

  //upon rendering -> get list of companies and set it to companiesList object
  useEffect(() => {
    getCompanies().then((newList) => {
      if (companiesList.length === 0)
        setCompaniesList(newList)
    })
  }, [])

  //upon updating companiesList -> add necessary columns to headers so that we have one column per company
  useEffect(() => {
    const currentTableColumns = []
    for (const company of companiesList) {
      currentTableColumns.push({
        Header: `${company.name} Shares` as string,
        accessor: `${company.id}`,
        Cell: ({ cell }: { cell: any }) => {
          return (<input defaultValue={cell.value} onChange={(e) => { cell.value = e.target.value }}></input>)
        }
      })
    }
    for (const header of sellerTableColumns) {
      if (header.accessor === "name") currentTableColumns.unshift(header)
      else currentTableColumns.push(header)
    }
    setTableColumns(currentTableColumns)
  }, [companiesList])

  //upon tableColumns updated -> get sellers information and populate table
  useEffect(() => {
    getSellers().then((newList) => {
      if (newList) {
        const sellersList = newList.sellers
        const shareBundlesList = newList.shareBundles;
        for (const seller of sellersList) {
          //add id to delete and save columns so that button knows which company to delete / save
          seller.delete = seller.id
          seller.save = seller.id
          for (const bundle of shareBundlesList) {
            if (bundle.ownerId === seller.id) {
              seller[bundle.companyId] = bundle.quantity as string
            }
          }
        }
        setSellersList(sellersList)
      }
    })
  }, [tableColumns])

  return <div className={styles.container}>
    <Navbar />
    <TableContainer columns={tableColumns} data={sellersList} />
  </div>
}