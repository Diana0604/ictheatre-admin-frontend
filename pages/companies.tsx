import { useEffect, useState } from "react"
import { getCompanies } from "../api/database"
import companiesTableCollumns from "../components/companiesTableCollumns"
import TableContainer from "../components/TableContainer"

export default function Companies() {
  const [companiesList, setCompaniesList] = useState([])

  useEffect(() => {
    getCompanies().then((newList) => {
      if (newList) {
        for (const company of newList) {
          company.delete = company.id
          company.save = company.id
        }
        setCompaniesList(newList)
      }
    })
  }, [])
  return <div>
    <TableContainer columns={companiesTableCollumns} data={companiesList} />
  </div>
}