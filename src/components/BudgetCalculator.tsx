import { useState } from 'react';
import './BudgetCalculator.css';

const BudgetCalculator = () => {
  const [savings, setSavings] = useState([
    {
      label: 'Savings for buying home',
      subLabel: '',
      value: 2000000,
      min: 500000,
      max: 200000000,
      steps: 500000,
    },
    {
      label: 'Preferred loan tenure',
      subLabel: 'Years',
      value: 10,
      min: 1,
      max: 30,
      steps: 1,
    },
    {
      label: 'EMI you can afford',
      subLabel: '/Month',
      value: 20000,
      min: 1000,
      max: 1000000,
      steps: 1000,
    },
  ]);

  const totalBudget = savings.reduce(
    (acc, currentValue) => acc + currentValue.value,
    0
  );

  const handleRangeChange = (index: number, newValue: number) => {
    const newSavings = [...savings];
    newSavings[index].value = newValue;
    setSavings(newSavings);
  };
  const formatBudget = (budget: number, interestRate = 0.875) => {
    const interest = budget * interestRate;
    const totalBudget = budget + interest;
    if (totalBudget >= 10000000) {
      return `${(totalBudget / 10000000).toFixed(2)} - ${(
        (totalBudget + 5000000) /
        10000000
      ).toFixed(2)} cr`;
    } else {
      return `${(totalBudget / 100000).toFixed(2)} - ${(
        (totalBudget + 500000) /
        100000
      ).toFixed(2)}  lacs`;
    }
  };

  return (
    <div className='budget-calculator'>
      <div className='top'>
        <h2>Check your home buying budget</h2>
        <div className='top-inputs'>
          {savings.map((item, index) => (
            <div className='inputBox' key={index}>
              <label htmlFor={`saving${index}`}>
                <p>{item.label}</p>
                <p>
                  ₹ {item.value.toLocaleString()} {item.subLabel}
                </p>
              </label>
              <input
                type='range'
                id={`saving${index}`}
                min={item.min}
                max={item.max}
                step={item.steps}
                value={item.value}
                onChange={(e) =>
                  handleRangeChange(index, parseInt(e.target.value))
                }
              />
            </div>
          ))}
        </div>
      </div>
      <div className='result'>
        <p>
          Your home budget: ₹ <span>{formatBudget(totalBudget, 0.875)}</span>
        </p>
      </div>
    </div>
  );
};

export default BudgetCalculator;
