import React from "react";
import Dropdown from "../Dropdown";
import PlayerBundleInformation from "./PlayerBundleInformation";
/**
 * Seller information with their bundles and shares and everything
 * @param props
 * @returns
 */
const PlayerBundleList = ({ bundles, companies, liquidAssets }: { bundles: any, companies: any, liquidAssets: number }) => {
  const relevantBundles = []
  for (const bundle of bundles) {
    for (const company of companies) {
      if (bundle.companyId != company.id) continue;
      const relevantBundle = <PlayerBundleInformation key={bundle.id} bundle={bundle} company={company} liquidAssets={liquidAssets} />
      relevantBundles.push(relevantBundle)
    }
  }
  return <>
    <div>
      <h3>Player Shares</h3>
    </div>
    <Dropdown>
      {relevantBundles}
    </Dropdown>
  </>
}

export default PlayerBundleList