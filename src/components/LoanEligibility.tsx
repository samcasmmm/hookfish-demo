import { useState } from 'react';
import './LoanEligibility.css';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

interface InputData {
  age: number;
  occupation: string;
  net_income: number;
  existing_emi: number;
  interest: number;
  tenure: number;
  borrowAmt: number;
  payableAmt: number;
  monthlyEmi: number;
}

ChartJS.register(ArcElement, Tooltip, Legend);

const LoanEligibility = () => {
  const [inputData, setInputData] = useState<InputData>({
    age: 35,
    occupation: 'Salaried',
    net_income: 100000,
    existing_emi: 10000,
    interest: 8.9,
    tenure: 20,
    borrowAmt: 6716630,
    payableAmt: 14400000,
    monthlyEmi: 60000,
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const options: any = {
    plugins: {
      title: {
        display: true,
        text: 'Average Loan',
        fontSize: 20,
      },
      legend: {
        display: true,
        position: 'top',
      },
    },
  };

  const state = {
    labels: ['Loan Amount', 'Interest', 'Total'],
    datasets: [
      {
        label: 'Amount',
        backgroundColor: ['#e63946', '#14213d', '#1d4ed8'],
        hoverBackgroundColor: ['#e6394690', '#14213d90', '#1d4ed890'],
        data: [
          inputData.borrowAmt,
          inputData.payableAmt - inputData.borrowAmt,
          inputData.payableAmt,
        ],
      },
    ],
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const formatIndianCurrency = (number: number) => {
    const formatter = new Intl.NumberFormat('en-IN');
    return formatter.format(number);
  };

  const calculateLoan = () => {
    const { net_income, existing_emi, interest, tenure } = inputData;
    const emi = net_income * 0.7 - existing_emi;
    const tenureMonths = tenure * 12;

    const principalAmount = calculateLoanPrincipal(emi, interest, tenureMonths);
    const payableAmount = calculatePayableAmount(
      principalAmount,
      interest,
      tenureMonths
    );

    setInputData((prevData) => ({
      ...prevData,
      borrowAmt: principalAmount,
      monthlyEmi: emi,
      payableAmt: payableAmount,
    }));
  };

  const calculateLoanPrincipal = (
    emi: number,
    annualInterestRate: number,
    tenureMonths: number
  ) => {
    const monthlyInterestRate = annualInterestRate / 12 / 100;
    const numerator =
      emi * (Math.pow(1 + monthlyInterestRate, tenureMonths) - 1);
    const denominator =
      monthlyInterestRate * Math.pow(1 + monthlyInterestRate, tenureMonths);
    return numerator / denominator;
  };

  const calculatePayableAmount = (
    principal: number,
    annualInterestRate: number,
    tenureMonths: number
  ) => {
    const monthlyInterestRate = annualInterestRate / 12 / 100;
    const emi =
      (principal * monthlyInterestRate) /
      (1 - Math.pow(1 + monthlyInterestRate, -tenureMonths));
    return emi * tenureMonths;
  };

  const handleCalculate = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    calculateLoan();
  };

  return (
    <div className='loanEle-calculator'>
      <div className='top'>
        <form>
          <div className='box'>
            <label htmlFor='age'>Your Age</label>
            <input
              type='number'
              onChange={(e) => handleInputChange(e)}
              name='age'
              value={inputData.age}
            />
          </div>
          <div className='box'>
            <label htmlFor='occupation'>Your Occupation</label>
            <input
              type='text'
              onChange={(e) => handleInputChange(e)}
              name='occupation'
              value={inputData.occupation}
            />
          </div>
          <div className='box'>
            <label htmlFor='net_income'>Net Income</label>
            <input
              type='number'
              onChange={(e) => handleInputChange(e)}
              name='net_income'
              value={inputData.net_income}
            />
          </div>
          <div className='box'>
            <label htmlFor='existing_emi'>Existing EMI</label>
            <input
              type='number'
              onChange={(e) => handleInputChange(e)}
              name='existing_emi'
              value={inputData.existing_emi}
            />
          </div>
          <div className='box'>
            <label htmlFor='interest'>Rate of Interest</label>
            <input
              type='number'
              onChange={(e) => handleInputChange(e)}
              name='interest'
              value={inputData.interest}
            />
          </div>
          <div className='box'>
            <label htmlFor='tenure'>Tenure</label>
            <input
              type='number'
              onChange={(e) => handleInputChange(e)}
              name='tenure'
              value={inputData.tenure}
            />
          </div>
        </form>
      </div>
      <div className='result'>
        <div className='inner'>
          <div className='left'>
            <div className='borrow'>
              <span>You could borrow upto</span>
              <p>₹ {formatIndianCurrency(inputData.borrowAmt)}</p>
            </div>
            <div className='payable'>
              <span>Payable Amount</span>
              <p>₹ {formatIndianCurrency(inputData.payableAmt)}</p>
            </div>
            <div className='emi'>
              <span>Monthly EMI</span>
              <p>₹ {formatIndianCurrency(inputData.monthlyEmi)}</p>
            </div>
          </div>
          <div className='right'>
            <Pie data={state} options={options} />
          </div>
        </div>
        <button className='calculate-btn' onClick={handleCalculate}>
          Calculate
        </button>
      </div>
    </div>
  );
};

export default LoanEligibility;
