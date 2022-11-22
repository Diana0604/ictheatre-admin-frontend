import React, { useState } from "react";
import { getPlayerCompany } from "../api/database";
import { IPlayerCompany } from "../types/types.database";

/**
 * Display the player company information
 * @returns
 */
const PlayerInformation = () => {
  const [playerCompanyInformation, setPlayerCompanyInformation] = useState<IPlayerCompany>({ name: "loading", id: 0, currentPricePerShare: 0, publicRelationsIndex: 0, liquidAssets: 0 })
  setTimeout(() => {
    getPlayerCompany().then(company => {
      setPlayerCompanyInformation(company)
    })
  }, 1000)
  return <div>Company: {playerCompanyInformation.name}
    <div>Liquid Assets: ${playerCompanyInformation.liquidAssets} </div>
    <div>Stock Value Score: ${playerCompanyInformation.currentPricePerShare}</div>
    <div>Public Relations Index: {playerCompanyInformation.publicRelationsIndex * 100} %</div>
  </div>
}

export default PlayerInformation;