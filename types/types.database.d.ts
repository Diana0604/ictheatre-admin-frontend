export interface ICompanyProperties {
  id?: number;
  name: string;
  description: string;
  initPricePerShare: number; //price at init of show
  finalPricePerShare: number; //price at end of show
  currentPricePerShare?: number; //price right now
  tendency: 1 | 0 | -1;
}

export interface IPlayerCompany {
  stockValueScore: ReactNode;
  id?: number;
  name: string;
  publicRelationsIndex: number;
  liquidAssets: number;
}
