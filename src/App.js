import { useEffect, useState } from 'react';
import './App.css';
import CurrencyComponent from './components/CurrencyComponent';
import money from './img/money.png';

function App() {

  const [currencyChoice, setCurrencyChoice] = useState([]);
  const [fromCurrency, setFromCurrency] = useState("THB");
  const [toCurrency, setToCurrency] = useState("USD");
  const [amount, setAmount] = useState(1);
  const [exChangeRate, setExChangeRate] = useState(0);
  const [checkFromCurrency, setChckFromCurrency] = useState(true);
  let fromAmount, toAmount;

  if (checkFromCurrency) {
    fromAmount = amount;
    toAmount = (amount * exChangeRate).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  } else {
    toAmount = amount;
    fromAmount = (amount / exChangeRate).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  useEffect(() => {
    const url = `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`;
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setCurrencyChoice([...Object.keys(data.rates)]);
        setExChangeRate(data.rates[toCurrency]);
      });
  }, [fromCurrency, toCurrency]);

  const amountFromCurrency = (value) => {
    setAmount(value);
    setChckFromCurrency(true);
  };

  const amountToCurrency = (value) => {
    setAmount(value);
    setChckFromCurrency(false);
  };

  return (
    <div>
      <img src={money} alt="logo" className='money-img' />
      <h1>แอพแปลงสกุลเงิน (API)</h1>
      <div className="container">
        <CurrencyComponent
          currencyChoice={currencyChoice}
          selectCurrency={fromCurrency}
          changeCurrency={(e) => setFromCurrency(e.target.value)}
          amount={fromAmount}
          onchangeAmount={amountFromCurrency}
        />
        <div className="equal"> = </div>
        <CurrencyComponent
          currencyChoice={currencyChoice}
          selectCurrency={toCurrency}
          changeCurrency={(e) => setToCurrency(e.target.value)}
          amount={toAmount}
          onchangeAmount={amountToCurrency}
        />
      </div>
    </div>
  );
}

export default App;