import React, { useState } from "react";
import { buyPlayerShares, sellPlayerShares } from "../../api/database";

const PlayerBundleInformation = ({ bundle, company, liquidAssets }: any) => {

  const [inputValueSell, setInputValueSell] = useState('')
  const [inputValueBuy, setInputValueBuy] = useState('')

  const handleSell = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    const sharesToSell = parseInt(inputValueSell)
    if (isNaN(sharesToSell)) {
      alert("You need to input a number to sell")
      return
    }
    if (sharesToSell > bundle.quantity) {
      alert("You are trying to sell more shares than this person has")
      return
    }
    sellPlayerShares(bundle, sharesToSell, company.currentPricePerShare)
  }

  const handleBuy = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    const sharesToBuy = parseInt(inputValueBuy)
    if (isNaN(sharesToBuy)) {
      alert("You need to input a number to sell")
      return
    }
    if (liquidAssets < sharesToBuy * company.currentPricePerShare) {
      alert("The Player is trying to buy above their possibilities")
      return
    }
    buyPlayerShares(bundle, sharesToBuy, company.currentPricePerShare)
  }

  return <div style={{ marginBottom: "40px" }}>
    <b>{company.name}:</b> {parseFloat(bundle.quantity).toFixed(2)} shares.
    Price per share: ${parseFloat(company.currentPricePerShare).toFixed(2)}
    Bought at: ${parseFloat(bundle.boughtAt).toFixed(2)}
    {//<form onSubmit={(event) => { handleSell(event) }}>
    }
    <div>
      <input onChange={(event => { setInputValueSell(event.target.value) })}></input>
      <button onClick={(event) => { handleSell(event) }}>Sell Shares</button>
    </div>
    <div>
      <input onChange={(event => { setInputValueBuy(event.target.value) })}></input>
      <button onClick={(event) => { handleBuy(event) }}>Buy Shares</button>
    </div>
    {//</form>
    }
  </div>

}

export default PlayerBundleInformation