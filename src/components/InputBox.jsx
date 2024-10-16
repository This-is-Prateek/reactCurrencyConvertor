import React from 'react'

const InputBox = ({
  label,                  //input box label ie to or from
  amount,                 //user input
  onAmountChange,         //onchange handler for user input
  onCurrencyChange,       //onchange handler for currency selection
  currencyOption = [],    //currency options to be listed in select tag
  selectCurrency = "usd", //selected currency with default value
  amountDisable = false,  //if entering amount is allowed
  currencyDisable = false //if selecting currency is allowed
}) => {

  return (
    <div className='w-96 h-20 flex flex-col justify-between p-3 bg-white'>
      <div className='flex'>
        <div className='w-1/2'>{label}</div>
        <div className='w-1/2 flex justify-end'>Currency Type</div>
      </div>
      <div className='flex'>
        <div className='w-1/2'>
          <input onChange={(e)=>onAmountChange && onAmountChange(Number(e.target.value))} type="text" value={amount} placeholder='Amount' disabled={amountDisable}/>
        </div>
        <div className='w-1/2 flex justify-end'>
          <select name="Currency" id="Currency" value={selectCurrency} onChange={(e)=>onCurrencyChange(e.target.value)} className='px-2 bg-gray-400 rounded-md w-2/5' disabled={currencyDisable}>
            {currencyOption.map((currency)=>{
              return <option key={currency} value={currency}>{currency}</option>
            })}
          </select>
        </div>
      </div>
    </div>
  )
}

export default InputBox;