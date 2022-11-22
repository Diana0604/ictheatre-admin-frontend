import React from "react";
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
      const relevantBundle = <div key={bundle.id}> <b>{company.name}:</b> {bundle.quantity} shares. Price per share: {company.currentPricePerShare} </div>
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