import { useState,useEffect } from "react";
import { Route, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import Swal from 'sweetalert2'

import './PaymentGateway.css'

// Renders errors or successfull transactions on the screen.
function Message({ content }) {
  return <p>{content}</p>;
}

function PaymentGateway() {

  const [course, setCourse] = useState([]);
  const [price, setPrice] = useState();

  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const courseCode = queryParams.get('course');
  
  console.log(courseCode);

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchCourse = async () => {
        try {
            const response = await axios.get('http://localhost:9080/api/course/get/' + `${courseCode}`);
            setCourse(response.data);
            const afterPrice = response.data.price.replace("$", "");
            setPrice(afterPrice)
            // console.log(response);

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
//   console.log(course.price)

  return (
    <div className="grid lg:grid-cols-2 sm:grid-cols-1 items-center min-h-screen bg-gray-200 bg-gradient-to-r from-blue-500 to-blue-500">
        <div className="sm:flex">
            <img src="/pay.svg" alt="" />
        </div>
        <div className="w-full md:w-1/2 mx-auto p-8 m-4 space-y-4 bg-white rounded-xl drop-shadow-2xl backdrop-blur-md">
            <h2 className="text-2xl font-semibold text-center text-gray-800">Review your course details before enroll.</h2>
            <div className="flex flex-col space-y-4">

                <div className="flex items-center border-b border-gray-200 py-2">
                    <h1 className="w-full px-3 py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-50"><b>Course:</b> {course.cname}</h1>
                </div>

                <div className="flex items-center border-b border-gray-200 py-2">                    
                    <h1 className="w-full px-3 py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-50"><b>Description:</b> {course.description}</h1>
                </div>

                <div className="flex items-center border-b border-gray-200 py-2">                    
                    <h1 className="w-full px-3 py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-50"><b>Fee:</b> ${price}</h1>
                </div>

                <div>
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
                                const response = await fetch(`http://localhost:9080/api/orders/` + `${courseCode}`, {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                // use the "body" param to optionally pass additional order information
                                // like product ids and quantities
                                body: JSON.stringify({
                                    cart: [
                                    {
                                        id: courseCode,
                                        quantity: "YourQuantity",
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
                                `http://localhost:9080/api/orders/${data.orderID}/capture/` + `${courseCode}`,
                                {
                                    method: "POST",
                                    headers: {
                                    "Content-Type": "application/json",
                                    Authorization: `Bearer ${token}`
                                    },
                                },
                                );

                                const orderData = await response.json();
                                console.log(orderData,"This is orderData");
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

                                    Swal.fire({
                                        title: "Payment Completed!",
                                        text: "Enjoy your course!",
                                        icon: "success"
                                    });

                                    navigate('/allcourses');

                                }
                            } catch (error) {
                                console.error(error);
                                setMessage(
                                `Sorry, your transaction could not be processed...${error}`,
                                );

                                Swal.fire({
                                    icon: "error",
                                    title: "Oops...",
                                    text: "Something went wrong!"
                                  });
                            }
                            }}
                        />
                    </PayPalScriptProvider>
                    <Message content={message} />
                </div>



            </div>
        </div>
    </div>
  )
}

export default PaymentGateway;
