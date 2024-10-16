import { useCallback, useEffect, useState } from 'react'
import useCurrency from './hooks/useCurrency'
import { InputBox } from './components';

function App() {
  const [amount, setAmount] = useState(0); //stores user input
  const [convertedAmount, setConvertedAmount] = useState(0); //stores converted data
  const [from, setFrom] = useState("usd"); //currency to be converted from
  const [to, setTo] = useState("inr"); //currency to be converted into
  const [currencyInfo, setCurrencyInfo] = useState({}); //stores fetched data from the api in a json or obj format
  const [currencyOption, setCurrencyOption] = useState([]); //stores all the currency names for the purpose of selection for from and to states
  const data = useCurrency(from); //temporarily storing fetched data from useCurrency custom hook

  //useEffect hook used to store  latest and updated data in the currencyInfo and currencyOption state according to the user selection
  useEffect(() => {
    if (data && Object.keys(data).length > 0) { //checking if data is fetched in data variable
      setCurrencyInfo(data);
      setCurrencyOption(Object.keys(data));
    }
  }, [data, from]);

  //swaps currency when this function is called
  const swap = useCallback(() => {
    setFrom(to);
    setTo(from);
  }, [to, from]);

  //resets input boxes when this function is called
  const reset = useCallback(() => {
    setAmount(0);
    setConvertedAmount(0);
  })

  //sets the from currency
  const onFromCurrencyChange = useCallback((value) => {
    setFrom(value);
  }, [from])

  //sets the to currency
  const onToCurrencyChange = useCallback((value) => {
    setTo(value);
  }, [to])

  //onchange handler for user input box
  const onAmountChange = useCallback((value) => {
    if (isNaN(value)) {               //if user enters not a number then alert is shown
      alert("Enter a valid number");
      setAmount(0)
    }
    else {
      setAmount(value);
    }
  }, [amount])

  useEffect(() => {
    console.log(amount);
  }, [amount])

  //converts into the selected to currency when this function is called
  const convert = useCallback(() => {
    setConvertedAmount(amount * currencyInfo[to]);
  }, [convertedAmount, amount, to, currencyInfo])

  useEffect(() => {
    console.log(convertedAmount);
  }, [convertedAmount]);

  return (
    <>
      <div className='w-full h-full flex justify-center items-center bg-custom-image'>
        <div className='flex flex-col gap-3 p-12 border border-blue-400 rounded-lg bg-blue-400 bg-opacity-50 relative'>
          <div className='w-full flex justify-center'>
            <div onClick={reset} className='rounded-md p-2 w-fit bg-blue-400 text-white text-sm cursor-pointer hover:bg-blue-300'>Reset</div>
          </div>
          <div className='absolute w-full left-0 top-[170px] flex justify-center'>
            <div onClick={swap} className='rounded-md p-1 w-fit bg-blue-400 text-white text-sm cursor-pointer hover:bg-blue-300'>Swap</div>
          </div>
          <div><InputBox label={"From"} currencyOption={currencyOption} amount={amount} selectCurrency={from} onAmountChange={onAmountChange} onCurrencyChange={onFromCurrencyChange} /></div>
          <div><InputBox label={"To"} currencyOption={currencyOption} amount={convertedAmount} selectCurrency={to} onCurrencyChange={onToCurrencyChange} /></div>
          <div onClick={convert} className='h-10 bg-blue-400 text-white flex justify-center items-center cursor-pointer hover:bg-blue-300'>Convert</div>
        </div>
      </div>
    </>
  )
}

export default App;
