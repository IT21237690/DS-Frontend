import React, { useState,useEffect } from "react";
import { Route, useLocation } from 'react-router-dom';
import axios from 'axios';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

import './PaymentGateway.css'

import COVER_IMAGE from '/payment-cover.jpg'

// Renders errors or successfull transactions on the screen.
function Message({ content }) {
  return <p>{content}</p>;
}

function PaymentGateway() {

  const [course, setCourse] = useState([]);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const courseCode = queryParams.get('course');
  console.log(courseCode);

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchCourse = async () => {
        try {
            const response = await axios.get('http://localhost:5002/api/course/get/' + `${courseCode}`);
            setCourse(response.data);
            console.log(response);

        } catch (error) {
            console.error('Error fetching courses:', error);
        }
    };

    fetchCourse();
}, []);

  const initialOptions = {
    "client-id": "AWa2aBW3CM4lCp3bo_b43TRdIWVUJIPd3VA_VzQKkijb6up1tLytIpQ8IbShOF-VeZLZXMyyoOgvL3BG",
    "enable-funding": "paylater,venmo",
    "data-sdk-integration-source": "integrationbuilder_sc",
  };

  const [message, setMessage] = useState("");

  return (
    <div className="grid grid-cols-2">

      {/* left */}
      <div>
        <h1 className="absolute top-3/4 left-20 flex flex-col justify-start">
          <span className="text-4xl text-[#1264AA] font-bold my-4">Head in the clouds, learning never stops.</span>
          <span className="text-3xl text-[#1264AA] font-normal">Pay now and take flight!</span>
        </h1>
        <img src={COVER_IMAGE} alt="payment-banner-image" className="min-h-screen object-cover"/>
      </div>

      {/* right */}
      <div className="flex flex-col gap-5 justify-center items-center min-h-screen w-full">

          <h1 className="text-start text-4xl text-[#3889CD] font-bold my-4 underline">Summary</h1>
          

        <div className="flex flex-col text-start gap-5">
        
          <h1 className="text-start text-3xl text-[#B9B0A0] font-bold my-4">Course: {course.cname}</h1>
          <h1 className="text-start text-3xl text-[#B9B0A0] font-bold my-4">Description: {course.description}</h1>
          <h1 className="text-start text-3xl text-[#B9B0A0] font-bold my-4">Fee: {course.price}</h1>
        
        </div>

      <PayPalScriptProvider options={initialOptions}>
          <PayPalButtons
            // style={{
            //   shape: "rect",
            //   //color:'blue' change the default color of the buttons
            //   layout: "vertical",//default value. Can be changed to horizontal
            // }}
            className="w-full max-w-[500px]"
            createOrder={async () => {
              try {
                const response = await fetch("http://localhost:5003/api/orders", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json"
                  },
                  // use the "body" param to optionally pass additional order information
                  // like product ids and quantities
                  body: JSON.stringify({
                    cart: [
                      {
                        id: "YOUR_PRODUCT_ID",
                        quantity: "YOUR_PRODUCT_QUANTITY",
                      },
                    ],
                  }),
                });

                const orderData = await response.json();

                if (orderData.id) {
                  return orderData.id;
                } else {
                  const errorDetail = orderData?.details?.[0];
                  const errorMessage = errorDetail
                    ? `${errorDetail.issue} ${errorDetail.description} (${orderData.debug_id})`
                    : JSON.stringify(orderData);

                  throw new Error(errorMessage);
                }
              } catch (error) {
                console.error(error);
                setMessage(`Could not initiate PayPal Checkout...${error}`);
              }
            }}
            onApprove={async (data, actions) => {
              try {
                const response = await fetch(
                  `http://localhost:5003/api/orders/${data.orderID}/capture/` + `${courseCode}`,
                  {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                      Authorization: `Bearer ${token}`
                    },
                  },
                );

                const orderData = await response.json();
                // Three cases to handle:
                //   (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()
                //   (2) Other non-recoverable errors -> Show a failure message
                //   (3) Successful transaction -> Show confirmation or thank you message

                const errorDetail = orderData?.details?.[0];

                if (errorDetail?.issue === "INSTRUMENT_DECLINED") {
                  // (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()
                  // recoverable state, per https://developer.paypal.com/docs/checkout/standard/customize/handle-funding-failures/
                  return actions.restart();
                } else if (errorDetail) {
                  // (2) Other non-recoverable errors -> Show a failure message
                  throw new Error(
                    `${errorDetail.description} (${orderData.debug_id})`,
                  );
                } else {
                  // (3) Successful transaction -> Show confirmation or thank you message
                  // Or go to another URL:  actions.redirect('thank_you.html');
                  const transaction =
                    orderData.purchase_units[0].payments.captures[0];
                  setMessage(
                    `Transaction ${transaction.status}: ${transaction.id}. See console for all available details`,
                  );
                  console.log(
                    "Capture result",
                    orderData,
                    JSON.stringify(orderData, null, 2),
                  );
                }
              } catch (error) {
                console.error(error);
                setMessage(
                  `Sorry, your transaction could not be processed...${error}`,
                );
              }
            }}
          />
        </PayPalScriptProvider>
        {/* <Message content={message} /> */}
      </div>
    </div>
  );
}

export default PaymentGateway;
