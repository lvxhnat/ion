export type TransactionEntry = {
  id: string;
  ticker: string;
  fee: number;
  broker: string;
  assetType: string;
  executionPrice: number;
  type: "long" | "short";
  units: number;
  remarks: string;
};
