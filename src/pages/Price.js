import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Price = () => {
    const [coin, setCoin] = useState(null)

// use the useEffect hook to make an api call
    useEffect(() => {
       getCoin();
    }, []);


    
    // store the apiKey and currency symbol in differenet variables
    const apiKey = '486883AC-0243-4154-89B6-2795BB4FB8C9';
    // return an object with matching URL params
    const params = useParams()

    // interpolate the apiKey and symbol in the fetch URL
    const url = `http://rest-sandbox.coinapi.io/v1/exchangerate/${params.symbol}/USD?apikey=${apiKey}`
    
   // fetch the coin data 
   const getCoin = async () => {
       try{
        // make the fetch request
        const res = await fetch(url)
        const data = await res.json()
        // save the resulting data in state
        setCoin(data)
    }catch(error){
        console.log(error)
     }
   }

   // Rendering the data
   // If data is loaded
    const loaded = () => {
        return(
            <div>
                <h1>{coin.asset_id_base}/{coin.asset_id_quote}</h1>
                <h2>$ {coin.rate} USD</h2>
            </div>
        );
    };


   // If data is still loading
   const loading = () => {
    return <h1>Loading....</h1>;
   }
   return(
        <div>
            <h1>Price Page</h1>
            {coin && coin.rate ? loaded() : loading()}
        </div>
    );
};

export default Price;