import { Navigate, Route, Routes } from "react-router-dom";

import PaymentGateway from "./PaymentGateway.jsx";

function App() {
  return (
    <div>
        <Routes>
            <Route path="/" element={<PaymentGateway/>} />
        </Routes>
    </div>
  )
}

export default App