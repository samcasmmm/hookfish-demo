import { useState } from 'react';
import './App.css';
import LoanCalculator from './components/LoanCalculator';
import BudgetCalculator from './components/BudgetCalculator';
import LoanEligibility from './components/LoanEligibility';

type Tab = 'loan' | 'emi' | 'eligibility';

function App() {
  const [tab, setTab] = useState<Tab>('loan');

  const Render = () => {
    switch (tab) {
      case 'loan':
        return <LoanCalculator />;
      case 'emi':
        return <BudgetCalculator />;
      case 'eligibility':
        return <LoanEligibility />;
      default:
        return <LoanCalculator />;
    }
  };

  return (
    <>
      <ul className='tab'>
        <li
          className={tab === 'loan' ? 'active' : ''}
          onClick={() => setTab('loan')}
        >
          Loan Calculator
        </li>
        <li
          className={tab === 'emi' ? 'active' : ''}
          onClick={() => setTab('emi')}
        >
          EMI Calculator
        </li>
        <li
          className={tab === 'eligibility' ? 'active' : ''}
          onClick={() => setTab('eligibility')}
        >
          Loan Eligibility
        </li>
      </ul>
      <main>
        <Render />
      </main>
    </>
  );
}

export default App;
