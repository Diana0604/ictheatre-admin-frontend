import React from "react";

/**
 * Display the player company information
 * @returns
 */
const PlayerInformationAudience = ({ playerInformation }: { playerInformation: any }) => {

  return <div>Company: {playerInformation.name}
    <div>Liquid Assets: ${playerInformation.liquidAssets.toFixed(2)} </div>
    <div>Stock Value Score: {playerInformation.stockValueScore.toFixed(2)}</div>
    <div>Public Relations Index: {(playerInformation.publicRelationsIndex * 100).toFixed(2)} %</div>
  </div>
}

export default PlayerInformationAudience;