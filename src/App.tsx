import { useState } from 'react';
import './App.css';
import LoanCalculator from './components/LoanCalculator';
import EmiCalc from './components/EmiCalc';

function App() {
  const [tab, setTab] = useState<'loan' | 'emi'>('loan');
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
          Emi Calculator
        </li>
      </ul>
      <main>{tab === 'loan' ? <LoanCalculator /> : <EmiCalc />}</main>
    </>
  );
}

export default App;
