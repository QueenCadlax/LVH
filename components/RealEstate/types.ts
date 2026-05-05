export interface InvestmentInputs {
  purchasePrice: number;
  downPaymentPct: number; // 0-100
  annualRent: number;
  vacancyRatePct: number; // 0-100
  annualExpenses: number; // insurance, rates, maintenance
  mortgageInterestPct: number; // annual
  mortgageTermYears: number;
  appreciationPct: number; // annual
}

export interface InvestmentOutput {
  downPaymentAmount: number;
  loanAmount: number;
  annualNetOperatingIncome: number;
  cashOnCashReturnPct: number;
  capRatePct: number;
  projectedValueAfterYears: number;
  totalInterestPaid: number;
}

export interface NeighborhoodScore {
  safety: number; // 0-100
  amenities: number; // 0-100
  schools: number; // 0-100
  transport: number; // 0-100
  growthIndex: number; // 0-100
  composite: number; // 0-100
  comparableMedianPrice: number;
}
