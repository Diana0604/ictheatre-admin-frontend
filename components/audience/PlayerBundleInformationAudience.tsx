import React, { useState } from "react";
import { buyPlayerShares, sellPlayerShares } from "../../api/database";

const PlayerBundleInformationAuidence = ({ bundle, company, liquidAssets }: any) => {

  return <div style={{ marginBottom: "40px" }}>
    <b>{company.name}:</b> {parseFloat(bundle.quantity).toFixed(2)} shares.
    Price per share: ${parseFloat(company.currentPricePerShare).toFixed(2)}
  </div>

}

export default PlayerBundleInformationAuidence