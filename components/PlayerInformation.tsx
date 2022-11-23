import React, { useEffect, useState } from "react";
import { getPlayerCompany, getPlayerShareBundles } from "../api/database";
import { IPlayerCompany } from "../types/types.database";
import PlayerShares from "./PlayerShares";

/**
 * Display the player company information
 * @returns
 */
const PlayerInformation = ({ companiesList }: any) => {
  const [playerCompanyInformation, setPlayerCompanyInformation] = useState<IPlayerCompany>({ name: "loading", id: 0, currentPricePerShare: 0, publicRelationsIndex: 0, liquidAssets: 0 })
  const [playerShareBundles, setPlayerShareBundles] = useState<any[]>([]);
  const [sharesDisplay, setSharesDisplay] = useState<any[]>([]);

  setTimeout(() => {
    getPlayerCompany().then(company => {
      setPlayerCompanyInformation(company)
    })

    getPlayerShareBundles().then((bundle) => {
      setPlayerShareBundles(bundle)
    })
  }, 1000)

  useEffect(() => {
    const newDisplay = []
    for (const bundle of playerShareBundles) {
      for (const company of companiesList) {
        if (company.id === bundle.companyId) {
          const newBundleDisplay = <PlayerShares key={company.id} bundle={bundle} company={company} />
          newDisplay.push(newBundleDisplay)
        }
      }
    }
    setSharesDisplay(newDisplay)
  }, [playerShareBundles])

  return <div>Company: {playerCompanyInformation.name}
    <div>Liquid Assets: ${playerCompanyInformation.liquidAssets} </div>
    <div>Stock Value Score: ${playerCompanyInformation.currentPricePerShare}</div>
    <div>Public Relations Index: {playerCompanyInformation.publicRelationsIndex * 100} %</div>
    <div>{sharesDisplay}</div>
  </div>
}

export default PlayerInformation;