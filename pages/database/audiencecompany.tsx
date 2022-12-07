import React, { useEffect, useState } from "react";
import { getPlayerCompany, savePlayerCompany } from "../../api/database";
import Navbar from "../../components/navbar/NavBar";
import { IPlayerCompany } from "../../types/types.database";

const AudienceCompany = () => {
  const [companyInformation, setCompanyInformation] = useState<IPlayerCompany>({ name: "loading", liquidAssets: 0, stockValueScore: 0, publicRelationsIndex: 0 })
  const [name,setName] = useState<string>("loading")
  /*
  const [companyInformation, setCompanyInformation] = useState<IPlayerCompany>({ name: "loading", liquidAssets: 0, stockValueScore: 0, publicRelationsIndex: 0 })
  const [companyInformation, setCompanyInformation] = useState<IPlayerCompany>({ name: "loading", liquidAssets: 0, stockValueScore: 0, publicRelationsIndex: 0 })
  const [companyInformation, setCompanyInformation] = useState<IPlayerCompany>({ name: "loading", liquidAssets: 0, stockValueScore: 0, publicRelationsIndex: 0 })
  */

  /*
  getPlayerCompany().then(company => {
    console.log(company)
    setCompanyInformation(company)
  })
  */

  
  useEffect(() => {
    getPlayerCompany().then(company => {
      setCompanyInformation(company)
    })
  }, [])


  const handleSave = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault()
    if ('' === companyInformation.name) {
      alert("You need to input a name")
      return
    }
    if (isNaN(companyInformation.liquidAssets) || isNaN(companyInformation.stockValueScore) || isNaN(companyInformation.publicRelationsIndex)) {
      alert("You need to input a number for liquid assets / stock value score / public relations index")
      return
    }
    if (0 > companyInformation.stockValueScore) {
      alert("stock value must be > 0")
      return
    }
    if (0 > companyInformation.publicRelationsIndex || 1 < companyInformation.publicRelationsIndex) {
      alert("PR Index must be between 0 and 100")
      return
    }
    if (0 > companyInformation.liquidAssets) {
      alert("liquid assets must be > 0")
      return
    }
    savePlayerCompany(companyInformation).then((res) => {
      if (res) {
        window.location.reload()
        alert("company saved!")
      }
      else alert("something went wrong when saving comp ")
    })
  }

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newInfo = { ...companyInformation }
    newInfo.name = event.target.value
    setCompanyInformation(newInfo)
  }

  const handleLiquidAssetsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newInfo = { ...companyInformation }
    newInfo.liquidAssets = parseFloat(event.target.value)
    setCompanyInformation(newInfo)
  }

  const handleStockValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newInfo = { ...companyInformation }
    newInfo.stockValueScore = parseFloat(event.target.value)
    setCompanyInformation(newInfo)
  }

  const handlePRChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newInfo = { ...companyInformation }
    newInfo.publicRelationsIndex = parseFloat(event.target.value) / 100
    setCompanyInformation(newInfo)
  }



  return <>
    <Navbar />
    <hr/>
    <div style={{backgroundColor:"#fcd9d9"}}>Hi! Diana Here. This page has some error that I didn't manage to fix :/ . If you are seeing the name coming up as 'loading', please refresh the page.</div>
    <hr/>
    <p>Name: </p>
    <input defaultValue={companyInformation.name} onChange={(event => { handleNameChange(event) })} />
    <p>Liquid Assets: </p>
    <input defaultValue={companyInformation.liquidAssets} onChange={(event => { handleLiquidAssetsChange(event) })} />
    <p>Stock Value Score: </p>
    <input defaultValue={companyInformation.stockValueScore} onChange={event => { handleStockValueChange(event) }} />
    <p>Public Relations Value (%): </p>
    <input defaultValue={companyInformation.publicRelationsIndex * 100} onChange={event => { handlePRChange(event) }} />
    <div><button onClick={(event) => { handleSave(event) }}>Save</button></div>
  </>
}

export default AudienceCompany