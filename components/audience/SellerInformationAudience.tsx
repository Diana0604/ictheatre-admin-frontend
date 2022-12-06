import React from "react";
import Dropdown from "../Dropdown";
import BundleInformation from "./BundleInformationAudience";
/**
 * Seller information with their bundles and shares and everything
 * @param props
 * @returns
 */
const SellerInformationAudience = ({ seller, bundles, companies }: { seller: any, bundles: any, companies: any }) => {
  const relevantBundles = []
  for (const bundle of bundles) {
    if (bundle.ownerId != seller.id) continue;
    for (const company of companies) {
      if (bundle.quantity === 0) continue;
      if (bundle.companyId != company.id) continue;
      const relevantBundle = <BundleInformation key={bundle.id} bundle={bundle} company={company} />
      relevantBundles.push(relevantBundle)
    }
  }
  return <>
    <div>
      <h3>Seller: {seller.name}</h3>
    </div>
    {//<Dropdown>
    }
    {relevantBundles}
    {//</></Dropdown>
    }
  </>
}

export default SellerInformationAudience