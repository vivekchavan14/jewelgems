import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { cashfree } from './util'
import '../paypal/paypal.css';
import cashfreeimg from '../../image/cashfree.png'
import { useParams } from 'react-router-dom';

const Cashfree = () => {
    const params = useParams()
    const isSessionId = params.sessionid
    const [loading, setLoading] = useState('');
    const [sessionId, setSessionId] = useState('');
    let version = cashfree.version();
    
    const getSessionId = (e)=>{
        e.preventDefault();
        setLoading(true);
        axios.post('api/cashfree/payment', {version})
        .then((res)=>{
            setLoading(false);
            setSessionId(res.data);
            // window.open(res.data, '_blank');
        })
        .catch((err)=>{
            setLoading(false);
            console.log(err);
        })
    }

    const handlePayment = ()=>{
        let checkoutOptions = {
            paymentSessionId: sessionId,
            returnUrl: "http://localhost:8000/api/cashfree/status/{order_id} ",
            
        }   
        cashfree.checkout(checkoutOptions).then(function(result){
            if(result.error){
                alert(result.error.message);
            }
            if(result.redirect){
                console.log("Redirection")
                console.log(result);
            }
        });
    }

    useEffect(()=>{
        setSessionId(isSessionId)
    }, [isSessionId])

  return (
    <>
    <div className='main'>
        <div className='center'>
            <img width={300} src={cashfreeimg} alt="" />
        </div>
        <div className='card px-5 py-4 mt-5'>
            <form onSubmit={getSessionId}>
                <h1>Session Id</h1>
                <input type="text" value={sessionId} onChange={(e)=>{setSessionId(e.target.value)}} />
                {!loading? <div className='col-12 center'>
                    <button className='w-100 ' type="submit">getSessionID</button>
                </div>
                :
                <div className='col-12 center'>
                    <button className='w-100 text-center' type="submit">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden ">Wait...</span>
                    </div>
                    </button>
                </div>
                }
            </form>
            <div className='col-12 center'>
                <button className='w-100 ' type="submit" onClick={handlePayment}>Pay Now</button>
            </div>
        </div>
    </div>
    
    </>
  )
}

export default Cashfree