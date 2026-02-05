import { useState } from "react";
import img from "../assets/login.webp";
import { UserData } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

const Verify = () => {
  const {verifyUser ,btnLoading} = UserData()
  const [otp, setOtp] = useState("")
  const navigate = useNavigate()

  const handleClick = (e) => {
     e.preventDefault()
    verifyUser(Number(otp), navigate);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 p-4">
      <div className="flex flex-col md:flex-row bg-white rounded-3xl shadow-2xl overflow-hidden max-w-5xl w-full">

        {/* Left section */}
        <div className="flex-1 p-10 md:p-16 flex flex-col justify-center bg-gradient-to-b from-white via-gray-50 to-gray-100">
          <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
             Verify Your Otp
          </h3>
          
          <input
            type="Number"
            placeholder="Enter your Otp"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full mb-4 px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          />
          <button
            onClick={handleClick}
            disabled = {btnLoading}
            className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl hover:opacity-90 transform hover:-translate-y-1 transition"
          >
             {btnLoading ? "Please wait....": "Submit"}
          </button>
        </div>

       
        <div className="flex-1 p-8 flex items-center justify-center bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200">
          <div className="w-full max-w-2xl h-100    border-gray-300 rounded-2xl flex items-center justify-center">
            <img src={img} alt="Chatbot" className="max-h-full object-contain" />
          </div>
        </div>

      </div>
    </div>
  );
};

export default Verify;
