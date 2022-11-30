import React, { useState } from "react";
import { savePlayerCompany } from "../../api/database";

/**
 * Display the player company information
 * @returns
 */
const PlayerInformation = ({ playerInformation }: { playerInformation: any }) => {
  //const [playerCompanyInformation, setPlayerCompanyInformation] = useState<IPlayerCompany>({ name: "loading", id: 0, stockValueScore: 0, publicRelationsIndex: 0, liquidAssets: 0 })
  const [inputAssetsValue, setInputAssetsValue] = useState('')
  const [inputStockValue, setStockValue] = useState('')
  const [inputPRScore, setPRScore] = useState('')

  const addRemoveLiquidAssets = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, sign: 1 | -1) => {
    event.preventDefault();
    const liquidAssets = parseInt(inputAssetsValue)
    if (isNaN(liquidAssets)) {
      alert("You need to input a number to sell")
      return
    }
    if (sign === -1 && liquidAssets > playerInformation.liquidAssets) {
      alert("You are trying to take out more money than the company has")
      return
    }
    const newPlayerCompany = { ...playerInformation }
    newPlayerCompany.liquidAssets += sign * liquidAssets
    //console.log(`not implemented. Will add $${sign * liquidAssets}`)
    savePlayerCompany(newPlayerCompany)
  }

  const addRemoveStockValue = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, sign: 1 | -1) => {
    event.preventDefault();
    const stockValue = parseInt(inputStockValue)
    if (isNaN(stockValue)) {
      alert("You need to input a number to sell")
      return
    }
    if (sign === -1 && stockValue > playerInformation.stockValueScore) {
      alert("You are trying to take out points than the company has")
      return
    }
    //console.log(`not implemented. Will add $${sign * stockValue}`)
    const newPlayerCompany = { ...playerInformation }
    newPlayerCompany.stockValueScore += sign * stockValue
    savePlayerCompany(newPlayerCompany)
  }

  const addRemovePRScore = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, sign: 1 | -1) => {
    event.preventDefault();
    const pRScore = parseInt(inputPRScore)
    if (isNaN(pRScore)) {
      alert("You need to input a number to sell")
      return
    }
    if (sign === -1 && playerInformation.publicRelationsIndex * 100 - pRScore < 0) {
      alert("PR score would be below zero after operation")
      return
    }
    if (sign === 1 && playerInformation.publicRelationsIndex * 100 + pRScore > 100) {
      alert("PR score would be above 100 after operation")
      return
    }
    //console.log(`not implemented. Will add $${sign * pRScore}`)
    const newPlayerCompany = { ...playerInformation }
    newPlayerCompany.publicRelationsIndex += sign * pRScore / 100
    savePlayerCompany(newPlayerCompany)
  }

  return <div>Company: {playerInformation.name}
    <div>Liquid Assets: ${playerInformation.liquidAssets.toFixed(2)} </div>
    <div>
      <input onChange={(event) => { setInputAssetsValue(event.target.value) }}></input>
      <button onClick={(event) => { addRemoveLiquidAssets(event, 1) }}>Add Liquid Assets</button>
      <button onClick={(event) => { addRemoveLiquidAssets(event, -1) }}>Remove Liquid Assets</button>
    </div>
    <div>Stock Value Score: {playerInformation.stockValueScore.toFixed(2)}</div>
    <div>
      <input onChange={(event) => { setStockValue(event.target.value) }}></input>
      <button onClick={(event) => { addRemoveStockValue(event, 1) }}>Add Stock Value Score</button>
      <button onClick={(event) => { addRemoveStockValue(event, -1) }}>Remove Stock Value Score</button>
    </div>
    <div>Public Relations Index: {(playerInformation.publicRelationsIndex * 100).toFixed(2)} %</div>
    <div>
      <input onChange={(event) => { setPRScore(event.target.value) }}></input>
      <button onClick={(event) => { addRemovePRScore(event, 1) }}>Add PR Score</button>
      <button onClick={(event) => { addRemovePRScore(event, -1) }}>Remove PR Score</button>
    </div>
  </div>
}

export default PlayerInformation;