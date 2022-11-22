import React, { useState } from "react";

const BundleInformation = ({ companyName, quantity, currentPrice }: any) => {

  const [inputValue, setInputValue] = useState('')

  const handleSell = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const sharesToSell = parseInt(inputValue)
    if (isNaN(sharesToSell))
      alert("You need to input a number to sell")
    if (sharesToSell > quantity)
      alert("You are trying to sell more shares than this person has");
  }

  return <div style={{ marginBottom: "40px" }}>
    <b>{companyName}:</b> {quantity} shares.
    Price per share: ${currentPrice}
    <form onSubmit={(event) => { handleSell(event) }}>
      <input onChange={(event => { setInputValue(event.target.value) })}></input>
      <button>Sell Shares</button>
    </form>
  </div>

}

export default BundleInformation