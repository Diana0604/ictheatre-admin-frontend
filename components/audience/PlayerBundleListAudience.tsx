import React from "react";
import Dropdown from "../Dropdown";
import PlayerBundleInformation from "./PlayerBundleInformationAudience";
/**
 * Seller information with their bundles and shares and everything
 * @param props
 * @returns
 */
const PlayerBundleListAudience = ({ bundles, companies, liquidAssets }: { bundles: any, companies: any, liquidAssets: number }) => {
  const relevantBundles = []
  for (const bundle of bundles) {
    for (const company of companies) {
      if(bundle.quantity === 0) continue;
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

export default PlayerBundleListAudience