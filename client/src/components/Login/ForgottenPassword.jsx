import axios from "axios";
import React, { useState } from "react";
import { server } from "../../server";

const ForgottenPassword = () => {
  const [email, setEmail] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [error, setError] = useState({
    email: "",
  });

  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  const sendOTP = (e) => {
    if (isValidEmail(email)) {
      axios.post(`${server}/user/reset-password`, { email });
      console.log("Sending OTP");
      setIsOtpSent(true);
    } else {
      const oldError = { ...error };

      oldError.email = "Please enter valid email";

      setError({ ...oldError });
    }
  };
  return (
    <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Email address
        </label>
        <div className="mt-1">
          <input
            type="email"
            name="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
      </div>

      <div>
        {!isOtpSent ? (
          <button
            type="submit"
            className="group relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            onClick={(e) => sendOTP()}
          >
            Sennd OTP
          </button>
        ) : (
          <p className="text-sm">An activation Link is sent to your email</p>
        )}
      </div>
    </form>
  );
};

export default ForgottenPassword;
