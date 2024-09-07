import React, { useState, useEffect } from 'react';

const CurrencyComponent = (props) => {
    const { currencyChoice, selectCurrency, changeCurrency, amount, onchangeAmount } = props;
    const [displayAmount, setDisplayAmount] = useState(amount.toLocaleString());

    useEffect(() => {
        setDisplayAmount(amount.toLocaleString());
    }, [amount]);

    const handleAmountChange = (e) => {
        const rawValue = e.target.value.replace(/,/g, '');
        const numericValue = parseFloat(rawValue);
        
        if (!isNaN(numericValue)) {
            onchangeAmount(numericValue);
            setDisplayAmount(numericValue.toLocaleString());
        } else {
            setDisplayAmount('');
        }
    };

    return (
        <div className="currency">
            <select value={selectCurrency} onChange={changeCurrency}>
                {currencyChoice.map((choice) => 
                    <option key={choice} value={choice}>{choice}</option>
                )}
            </select>
            <input type="text"
                value={displayAmount}
                onChange={handleAmountChange}
            />
        </div>
    );
}

export default CurrencyComponent;