import React, { useState } from "react";

const CompanyFloatingShares = ({ company }: any) => {

  const [inputValue, setInputValue] = useState('')

  const handleSell = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const sharesToSell = parseInt(inputValue)
    if (isNaN(sharesToSell)) {
      alert("You need to input a number to sell")
      return
    }
    if (sharesToSell > company.floatingShares) {
      alert("You are trying to sell more shares than this company has")
      return
    }
    //sellFloatingShares(sharesToSell, company)
  }

  return <div style={{ marginBottom: "40px" }}>
    <b>{company.name}:</b> {company.floatingShares} available shares.
    Price per share: ${company.currentPricePerShare}
    <form onSubmit={(event) => { handleSell(event) }}>
      <input onChange={(event => { setInputValue(event.target.value) })}></input>
      <button>Sell Shares to Player Company</button>
    </form>
  </div>

}

export default CompanyFloatingShares