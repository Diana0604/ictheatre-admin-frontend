import React from "react";
import BundleInformation from "./BundleInformation";
/**
 * Seller information with their bundles and shares and everything
 * @param props
 * @returns
 */
const SellerInformation = ({ seller, bundles, companies }: { seller: any, bundles: any, companies: any }) => {
  const relevantBundles = []
  for (const bundle of bundles) {
    if (bundle.ownerId != seller.id) continue;
    if (bundle.quantity === 0) continue;
    for (const company of companies) {
      if (bundle.companyId != company.id) continue;
      const relevantBundle = <BundleInformation key={bundle.id} companyName={company.name} quantity={bundle.quantity} currentPrice={company.currentPricePerShare} />
      relevantBundles.push(relevantBundle)
    }
  }
  return <>
    <div>
      <h3>Seller: {seller.name}</h3>
    </div>
    <div>
      {relevantBundles}
    </div>
  </>
}

export default SellerInformation