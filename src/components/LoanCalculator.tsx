import React, { useEffect, useState } from 'react';
import './LoanCalculator.css';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const LoanCalculator = () => {
  const [inputData, setInputData] = useState({
    amount: 20000,
    interest: 7.5,
    tenure: 10,
    loanEmi: 0,
    interestPayable: 0,
    totalAmount: 0,
  });

  useEffect(() => calculateLoan, []);

  const state = {
    labels: ['Total Interest', 'Principal Loan Amount'],
    datasets: [
      {
        // label: labels,
        backgroundColor: ['#e63946', '#14213d'],
        hoverBackgroundColor: ['#e6394690', '#14213d90'],
        data: [inputData.interestPayable, inputData.totalAmount],
      },
    ],
  };

  const handleChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const { amount, interest, tenure } = inputData;
  const monthlyInterestRate = interest / 12 / 100;
  const totalMonths = tenure * 12;
  const calculateLoan = () => {
    const emi =
      (amount *
        monthlyInterestRate *
        Math.pow(1 + monthlyInterestRate, totalMonths)) /
      (Math.pow(1 + monthlyInterestRate, totalMonths) - 1);

    console.log(Math.round(emi));
    updateData(emi);
  };

  const updateData = (emi: number) => {
    const _totalAmount = Math.round(totalMonths * emi);
    const _interestPayable = Math.round(_totalAmount - amount);

    setInputData((prev) => ({
      ...prev,
      loanEmi: Math.round(emi),
      interestPayable: _interestPayable,
      totalAmount: Math.round(_totalAmount),
    }));
  };

  function formatIndianCurrency(number: number) {
    const formatter = new Intl.NumberFormat('en-IN');
    return formatter.format(number);
  }

  return (
    <div className='loan-calculator'>
      <div className='top'>
        <h2>Loan Calculator</h2>

        <form action='#'>
          <div className='group'>
            <div className='title'>Amount</div>
            <input
              type='text'
              name='amount'
              value={inputData.amount}
              className='loan-amount'
              onChange={(e) => {
                handleChanges(e);
              }}
            />
          </div>

          <div className='group'>
            <div className='title'>Interest Rate</div>
            <input
              type='text'
              name='interest'
              value={inputData.interest}
              className='interest-rate'
              onChange={(e) => {
                handleChanges(e);
              }}
            />
          </div>

          <div className='group'>
            <div className='title'>Tenure (in Years)</div>
            <input
              type='text'
              name='tenure'
              value={inputData.tenure}
              className='loan-tenure'
              onChange={(e) => {
                handleChanges(e);
              }}
            />
          </div>
        </form>
      </div>

      <div className='result'>
        <div className='left'>
          <div className='loan-emi'>
            <h3>Loan EMI</h3>
            <div className='value'>
              {formatIndianCurrency(inputData.loanEmi) || 0}
            </div>
          </div>

          <div className='total-interest'>
            <h3>Total Interest Payable</h3>
            <div className='value'>
              {formatIndianCurrency(inputData.interestPayable) || 0}
            </div>
          </div>

          <div className='total-amount'>
            <h3>Total Amount</h3>
            <div className='value'>
              {formatIndianCurrency(inputData.totalAmount) || 0}
            </div>
          </div>

          <button className='calculate-btn' onClick={calculateLoan}>
            Calculate
          </button>
        </div>

        <div className='right'>
          <Pie
            data={state}
            options={{
              title: {
                display: true,
                text: 'Average Rainfall per month',
                fontSize: 20,
              },
              legend: {
                display: true,
                position: 'right',
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default LoanCalculator;
