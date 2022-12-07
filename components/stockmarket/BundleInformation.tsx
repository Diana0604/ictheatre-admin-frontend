import React, { useState } from "react";
import { buyShares, sellShares } from "../../api/database";

const BundleInformation = ({ bundle, company }: any) => {

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
    sellShares(bundle, sharesToSell, company.currentPricePerShare)
  }

  const handleBuy = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    const sharesToBuy = parseInt(inputValueBuy)
    if (isNaN(sharesToBuy)) {
      alert("You need to input a number to sell")
      return
    }
    buyShares(bundle, sharesToBuy, company.currentPricePerShare)
  }

  return <div style={{ marginBottom: "40px", backgroundColor: bundle.quantity > 0 ? "#79fc98" : "#ffffff" }}>
    <b>{company.name}:</b> {parseFloat(bundle.quantity).toFixed(2)} shares.
    Price per share: ${parseFloat(company.currentPricePerShare).toFixed(2)}
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

export default BundleInformation