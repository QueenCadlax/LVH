import React, { useMemo } from 'react';
import { InvestmentInputs, InvestmentOutput } from './types';

const defaultInputs: InvestmentInputs = {
  purchasePrice: 1200000,
  downPaymentPct: 20,
  annualRent: 120000,
  vacancyRatePct: 8,
  annualExpenses: 24000,
  mortgageInterestPct: 9.5,
  mortgageTermYears: 20,
  appreciationPct: 4
};

function calculate(inputs: InvestmentInputs, years = 5): InvestmentOutput {
  const downPaymentAmount = (inputs.downPaymentPct / 100) * inputs.purchasePrice;
  const loanAmount = inputs.purchasePrice - downPaymentAmount;

  const vacancyLoss = inputs.annualRent * (inputs.vacancyRatePct / 100);
  const effectiveGrossIncome = inputs.annualRent - vacancyLoss;
  const annualNetOperatingIncome = effectiveGrossIncome - inputs.annualExpenses;

  const capRatePct = (annualNetOperatingIncome / inputs.purchasePrice) * 100;

  // simple mortgage interest estimate (total interest over term)
  const monthlyInterest = inputs.mortgageInterestPct / 100 / 12;
  const n = inputs.mortgageTermYears * 12;
  const monthlyPayment = (loanAmount * monthlyInterest) / (1 - Math.pow(1 + monthlyInterest, -n));
  const totalPayment = monthlyPayment * n;
  const totalInterestPaid = Math.max(0, totalPayment - loanAmount);

  const annualDebtService = monthlyPayment * 12;
  const cashFlowBeforeTax = annualNetOperatingIncome - annualDebtService;
  const cashOnCashReturnPct = (cashFlowBeforeTax / downPaymentAmount) * 100;

  const projectedValueAfterYears = Math.round(inputs.purchasePrice * Math.pow(1 + inputs.appreciationPct / 100, years));

  return {
    downPaymentAmount: Math.round(downPaymentAmount),
    loanAmount: Math.round(loanAmount),
    annualNetOperatingIncome: Math.round(annualNetOperatingIncome),
    cashOnCashReturnPct: Math.round(cashOnCashReturnPct * 100) / 100,
    capRatePct: Math.round(capRatePct * 100) / 100,
    projectedValueAfterYears,
    totalInterestPaid: Math.round(totalInterestPaid)
  };
}

export const InvestmentCalculator: React.FC<{ inputs?: InvestmentInputs }> = ({ inputs = defaultInputs }) => {
  const result = useMemo(() => calculate(inputs, 5), [inputs]);

  return (
    <div className="p-6 bg-[#0b0b0b] rounded-2xl border border-white/6">
      <h3 className="text-xl font-semibold text-white mb-4">Investment Calculator (5yr projection)</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <div className="text-sm text-gray-400">Down Payment</div>
          <div className="text-lg font-bold text-white">R{result.downPaymentAmount.toLocaleString()}</div>
        </div>

        <div className="space-y-2">
          <div className="text-sm text-gray-400">Loan Amount</div>
          <div className="text-lg font-bold text-white">R{result.loanAmount.toLocaleString()}</div>
        </div>

        <div className="space-y-2">
          <div className="text-sm text-gray-400">Annual NOI</div>
          <div className="text-lg font-bold text-white">R{result.annualNetOperatingIncome.toLocaleString()}</div>
        </div>

        <div className="space-y-2">
          <div className="text-sm text-gray-400">Cap Rate</div>
          <div className="text-lg font-bold text-white">{result.capRatePct}%</div>
        </div>

        <div className="space-y-2">
          <div className="text-sm text-gray-400">Cash-on-Cash Return</div>
          <div className="text-lg font-bold text-white">{result.cashOnCashReturnPct}%</div>
        </div>

        <div className="space-y-2">
          <div className="text-sm text-gray-400">Projected Value (5yr)</div>
          <div className="text-lg font-bold text-white">R{result.projectedValueAfterYears.toLocaleString()}</div>
        </div>

        <div className="col-span-full mt-4 text-sm text-gray-400">
          <div><strong>Estimated total interest:</strong> R{result.totalInterestPaid.toLocaleString()}</div>
        </div>
      </div>
    </div>
  );
};

export default InvestmentCalculator;
