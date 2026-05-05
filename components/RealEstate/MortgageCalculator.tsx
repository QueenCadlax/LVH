import React, { useState, useMemo } from 'react';
import { DollarSign, Home, Percent, Calendar } from 'lucide-react';

interface MortgageCalculation {
  monthlyPayment: number;
  totalAmount: number;
  totalInterest: number;
  paymentSchedule: Array<{
    month: number;
    payment: number;
    principal: number;
    interest: number;
    balance: number;
  }>;
}

interface MortgageCalculatorProps {
  propertyPrice?: number;
  onCalculate?: (calculation: MortgageCalculation) => void;
}

export default function MortgageCalculator({
  propertyPrice = 1800000,
  onCalculate
}: MortgageCalculatorProps) {
  const [homePrice, setHomePrice] = useState(propertyPrice);
  const [downPayment, setDownPayment] = useState(20);
  const [loanTerm, setLoanTerm] = useState(20);
  const [interestRate, setInterestRate] = useState(7.5);
  const [propertyTax, setPropertyTax] = useState(1.2);
  const [insurance, setInsurance] = useState(500);
  const [hoa, setHoa] = useState(0);

  const calculation = useMemo(() => {
    // Calculate loan amount
    const downPaymentAmount = (homePrice * downPayment) / 100;
    const loanAmount = homePrice - downPaymentAmount;

    // Calculate monthly payment using mortgage formula
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;

    let monthlyPayment = 0;
    if (monthlyRate === 0) {
      monthlyPayment = loanAmount / numberOfPayments;
    } else {
      monthlyPayment =
        (loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments))) /
        (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    }

    // Calculate total amounts
    const totalAmount = monthlyPayment * numberOfPayments;
    const totalInterest = totalAmount - loanAmount;

    // Generate payment schedule (first 12 months)
    const paymentSchedule = [];
    let balance = loanAmount;
    for (let month = 1; month <= Math.min(12, numberOfPayments); month++) {
      const interestPayment = balance * monthlyRate;
      const principalPayment = monthlyPayment - interestPayment;
      balance -= principalPayment;

      paymentSchedule.push({
        month,
        payment: monthlyPayment,
        principal: principalPayment,
        interest: interestPayment,
        balance: Math.max(0, balance)
      });
    }

    return {
      monthlyPayment,
      totalAmount,
      totalInterest,
      paymentSchedule
    };
  }, [homePrice, downPayment, loanTerm, interestRate]);

  // Calculate additional monthly costs
  const monthlyPropertyTax = (homePrice * (propertyTax / 100)) / 12;
  const totalMonthlyPayment = calculation.monthlyPayment + monthlyPropertyTax + insurance + hoa;

  const downPaymentAmount = (homePrice * downPayment) / 100;
  const loanAmount = homePrice - downPaymentAmount;

  const affordabilityRatio = (totalMonthlyPayment * 12) / (homePrice * 0.05); // 5% rule

  return (
    <div className="bg-black border border-yellow-600/40 rounded-lg p-6 space-y-6">
      {/* HEADER */}
      <div className="flex items-center gap-2">
        <Home size={24} className="text-yellow-400" />
        <div>
          <h3 className="text-white font-bold text-lg">Mortgage Calculator</h3>
          <p className="text-sm text-gray-400">Calculate monthly payments & affordability</p>
        </div>
      </div>

      {/* INPUT CONTROLS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* HOME PRICE */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-white flex items-center gap-2">
            <DollarSign size={16} className="text-yellow-400" />
            Home Price
          </label>
          <input
            type="number"
            value={homePrice}
            onChange={(e) => setHomePrice(Number(e.target.value))}
            className="w-full px-3 py-2 bg-white/10 border border-white/20 text-white rounded-lg focus:outline-none focus:border-yellow-600 text-sm"
          />
          <p className="text-xs text-gray-400">R {homePrice.toLocaleString()}</p>
        </div>

        {/* DOWN PAYMENT */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-white flex items-center gap-2">
            Down Payment
          </label>
          <div className="flex gap-2">
            <input
              type="number"
              value={downPayment}
              onChange={(e) => setDownPayment(Math.min(100, Math.max(0, Number(e.target.value))))}
              className="flex-1 px-3 py-2 bg-white/10 border border-white/20 text-white rounded-lg focus:outline-none focus:border-yellow-600 text-sm"
            />
            <span className="px-3 py-2 bg-white/10 rounded-lg text-white text-sm font-bold">%</span>
          </div>
          <p className="text-xs text-gray-400">R {downPaymentAmount.toLocaleString()}</p>
        </div>

        {/* LOAN AMOUNT */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-white">Loan Amount</label>
          <div className="px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white font-bold">
            R {loanAmount.toLocaleString()}
          </div>
        </div>

        {/* LOAN TERM */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-white flex items-center gap-2">
            <Calendar size={16} className="text-yellow-400" />
            Loan Term (Years)
          </label>
          <input
            type="number"
            value={loanTerm}
            onChange={(e) => setLoanTerm(Math.max(1, Number(e.target.value)))}
            className="w-full px-3 py-2 bg-white/10 border border-white/20 text-white rounded-lg focus:outline-none focus:border-yellow-600 text-sm"
          />
        </div>

        {/* INTEREST RATE */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-white flex items-center gap-2">
            <Percent size={16} className="text-yellow-400" />
            Interest Rate (Annual)
          </label>
          <div className="flex gap-2">
            <input
              type="number"
              step="0.1"
              value={interestRate}
              onChange={(e) => setInterestRate(Math.max(0, Number(e.target.value)))}
              className="flex-1 px-3 py-2 bg-white/10 border border-white/20 text-white rounded-lg focus:outline-none focus:border-yellow-600 text-sm"
            />
            <span className="px-3 py-2 bg-white/10 rounded-lg text-white text-sm font-bold">%</span>
          </div>
        </div>

        {/* PROPERTY TAX */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-white">Annual Property Tax</label>
          <div className="flex gap-2">
            <input
              type="number"
              step="0.1"
              value={propertyTax}
              onChange={(e) => setPropertyTax(Math.max(0, Number(e.target.value)))}
              className="flex-1 px-3 py-2 bg-white/10 border border-white/20 text-white rounded-lg focus:outline-none focus:border-yellow-600 text-sm"
            />
            <span className="px-3 py-2 bg-white/10 rounded-lg text-white text-sm font-bold">%</span>
          </div>
        </div>

        {/* INSURANCE */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-white">Monthly Insurance</label>
          <div className="flex gap-2">
            <span className="px-3 py-2 bg-white/10 rounded-lg text-white text-sm font-bold">R</span>
            <input
              type="number"
              value={insurance}
              onChange={(e) => setInsurance(Math.max(0, Number(e.target.value)))}
              className="flex-1 px-3 py-2 bg-white/10 border border-white/20 text-white rounded-lg focus:outline-none focus:border-yellow-600 text-sm"
            />
          </div>
        </div>

        {/* HOA FEES */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-white">Monthly HOA Fees</label>
          <div className="flex gap-2">
            <span className="px-3 py-2 bg-white/10 rounded-lg text-white text-sm font-bold">R</span>
            <input
              type="number"
              value={hoa}
              onChange={(e) => setHoa(Math.max(0, Number(e.target.value)))}
              className="flex-1 px-3 py-2 bg-white/10 border border-white/20 text-white rounded-lg focus:outline-none focus:border-yellow-600 text-sm"
            />
          </div>
        </div>
      </div>

      {/* RESULTS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* MONTHLY PAYMENT */}
        <div className="bg-yellow-600/20 border border-yellow-600/50 rounded-lg p-4">
          <p className="text-xs text-yellow-200 font-semibold mb-1">Monthly Mortgage Payment</p>
          <p className="text-3xl font-bold text-yellow-400">
            R {Math.round(calculation.monthlyPayment).toLocaleString()}
          </p>
          <p className="text-xs text-yellow-200 mt-2">(Principal + Interest)</p>
        </div>

        {/* TOTAL MONTHLY */}
        <div className="bg-green-600/20 border border-green-600/50 rounded-lg p-4">
          <p className="text-xs text-green-200 font-semibold mb-1">Total Monthly Payment</p>
          <p className="text-3xl font-bold text-green-400">
            R {Math.round(totalMonthlyPayment).toLocaleString()}
          </p>
          <p className="text-xs text-green-200 mt-2">(Including taxes, insurance, HOA)</p>
        </div>

        {/* TOTAL INTEREST */}
        <div className="bg-red-600/20 border border-red-600/50 rounded-lg p-4">
          <p className="text-xs text-red-200 font-semibold mb-1">Total Interest Paid</p>
          <p className="text-3xl font-bold text-red-400">
            R {Math.round(calculation.totalInterest).toLocaleString()}
          </p>
          <p className="text-xs text-red-200 mt-2">Over {loanTerm} years</p>
        </div>

        {/* TOTAL COST */}
        <div className="bg-blue-600/20 border border-blue-600/50 rounded-lg p-4">
          <p className="text-xs text-blue-200 font-semibold mb-1">Total Cost of Loan</p>
          <p className="text-3xl font-bold text-blue-400">
            R {Math.round(calculation.totalAmount).toLocaleString()}
          </p>
          <p className="text-xs text-blue-200 mt-2">Principal + Interest</p>
        </div>
      </div>

      {/* AFFORDABILITY */}
      <div className={`border rounded-lg p-4 ${
        affordabilityRatio <= 1 ? 'bg-green-900/20 border-green-600/30' : 'bg-red-900/20 border-red-600/30'
      }`}>
        <p className={`text-sm font-bold ${affordabilityRatio <= 1 ? 'text-green-300' : 'text-red-300'}`}>
          {affordabilityRatio <= 1 ? '✓ Affordable' : '✗ May Be Unaffordable'}
        </p>
        <p className={`text-xs mt-2 ${affordabilityRatio <= 1 ? 'text-green-200' : 'text-red-200'}`}>
          Your annual payment is {(affordabilityRatio * 100).toFixed(0)}% of home price.
          {affordabilityRatio <= 1
            ? ' This is within recommended guidelines (< 100%).'
            : ' Consider a larger down payment or less expensive property.'}
        </p>
      </div>

      {/* PAYMENT BREAKDOWN */}
      <div className="space-y-3">
        <h4 className="text-white font-bold text-sm">Payment Breakdown (First 12 Months)</h4>
        <div className="max-h-48 overflow-y-auto space-y-2">
          {calculation.paymentSchedule.slice(0, 12).map((payment) => (
            <div key={payment.month} className="bg-white/5 rounded-lg p-3 border border-white/10">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-bold text-white">Month {payment.month}</span>
                <span className="text-yellow-400 font-bold">R {Math.round(payment.payment).toLocaleString()}</span>
              </div>
              <div className="flex gap-2 text-xs">
                <div className="flex-1">
                  <p className="text-gray-400">Principal</p>
                  <p className="text-green-400 font-semibold">R {Math.round(payment.principal).toLocaleString()}</p>
                </div>
                <div className="flex-1">
                  <p className="text-gray-400">Interest</p>
                  <p className="text-red-400 font-semibold">R {Math.round(payment.interest).toLocaleString()}</p>
                </div>
                <div className="flex-1">
                  <p className="text-gray-400">Balance</p>
                  <p className="text-blue-400 font-semibold">R {Math.round(payment.balance).toLocaleString()}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ACTION BUTTON */}
      <button
        onClick={() => onCalculate?.(calculation)}
        className="w-full px-4 py-3 bg-yellow-600 hover:bg-yellow-500 text-black rounded-lg font-bold transition"
      >
        Save Calculation
      </button>
    </div>
  );
}
