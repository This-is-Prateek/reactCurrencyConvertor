import { useState, useEffect } from "react";

function useCurrency(currency) {
    const [data, setData] = useState({});

    //fetches currency data according to the user selection from the given api then stores it into the data state
    useEffect(() => {
        fetch(` https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@2024-03-06/v1/currencies/${currency}.json`)
            .then((res) => res.json())
            .then((res) => { setData(res[currency]) })
    }, [currency])
    return data;
}

export default useCurrency;