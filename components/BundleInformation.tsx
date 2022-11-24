import React, { useState } from "react";
import { sellShares } from "../api/database";

const BundleInformation = ({ bundle, company }: any) => {

  const [inputValue, setInputValue] = useState('')

  const handleSell = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    const sharesToSell = parseInt(inputValue)
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

  return <div style={{ marginBottom: "40px" }}>
    <b>{company.name}:</b> {bundle.quantity} shares.
    Price per share: ${company.currentPricePerShare}
    {//<form onSubmit={(event) => { handleSell(event) }}>
    }
    <input onChange={(event => { setInputValue(event.target.value) })}></input>
    <button onClick={(event) => {handleSell(event)}}>Sell Shares</button>
    {//</form>
    }
  </div>

}

export default BundleInformation