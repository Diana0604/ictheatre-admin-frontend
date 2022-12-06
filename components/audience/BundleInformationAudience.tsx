import React, { useState } from "react";
import { buyShares, sellShares } from "../../api/database";

const BundleInformationAudience = ({ bundle, company }: any) => {

  return <div style={{ marginBottom: "40px" }}>
    <b>{company.name}:</b> {parseFloat(bundle.quantity).toFixed(2)} shares.
    Price per share: ${parseFloat(company.currentPricePerShare).toFixed(2)}
  </div>

}

export default BundleInformationAudience