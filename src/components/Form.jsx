import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Form = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [pan, setPan] = useState("");
  const [panValid, setPanValid] = useState(false);
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [validPostalCode, setValidPostalCode] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const navigate = useNavigate();

  // Load form data from local storage when the component mounts
  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("formData"));
    if (savedData) {
      setName(savedData.name || "");
      setEmail(savedData.email || "");
      setNumber(savedData.number || "");
      setPan(savedData.pan || "");
      setPanValid(validatePan(savedData.pan || ""));
      setAddress1(savedData.address1 || "");
      setAddress2(savedData.address2 || "");
      setCity(savedData.city || "");
      setState(savedData.state || "");
      setPostalCode(savedData.postalCode || "");
      setValidPostalCode(validatePostalCode(savedData.postalCode || ""));
    }
  }, []);

  const validatePan = (p) => {
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    return panRegex.test(p);
  };

  const handlePanChange = (e) => {
    const panValue = e.target.value.toUpperCase();
    setPan(panValue);
    setPanValid(validatePan(panValue));
  };

  const validatePostalCode = (p) => {
    const postalRegex = /^[0-9]{6}$/;
    return postalRegex.test(p);
  };

  const handlePostalCodeChange = (e) => {
    const postalCodeValue = e.target.value;
    setPostalCode(postalCodeValue);
    setValidPostalCode(validatePostalCode(postalCodeValue));

    if (validatePostalCode(postalCodeValue)) {
      fetchCityAndState(postalCodeValue);
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhoneNumber = (number) => {
    const phoneRegex = /^\+91\d{10}$/;
    return phoneRegex.test(number);
  };

  const handlePhoneNumberChange = (e) => {
    let phoneValue = e.target.value.replace(/-/g, ""); // Remove any dashes
    if (!phoneValue.startsWith("+91")) {
      phoneValue = "+91 " + phoneValue;
    }
    setNumber(phoneValue);
  };

  const fetchCityAndState = async (postcode) => {
    const url = "https://lab.pixel6.co/api/get-postcode-details.php";
    const data = { postcode: postcode };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();

      if (responseData.status === "Success" && responseData.statusCode === 200) {
        populateCityAndState(responseData.city, responseData.state);
      } else {
        console.error("Failed to fetch postcode details");
      }
    } catch (error) {
      console.error("Error fetching postcode details:", error);
    }
  };

  const populateCityAndState = (cities, states) => {
    if (cities && cities.length > 0) {
      setCity(cities[0].name);
    }
    if (states && states.length > 0) {
      setState(states[0].name);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValidForm =
      name &&
      validateEmail(email) &&
      validatePhoneNumber(number) &&
      panValid &&
      address1 &&
      city &&
      state &&
      validPostalCode;

    if (isValidForm) {
      const formData = {
        name,
        email,
        number,
        pan,
        address1,
        address2,
        city,
        state,
        postalCode
      };

      const existingData = JSON.parse(localStorage.getItem("formData")) || [];
      existingData.push(formData);
      localStorage.setItem("formData", JSON.stringify(existingData)); // Save form data to local storage
      setFormSubmitted(true);
      navigate("/Home");
    } else {
      setFormSubmitted(false);
     
      alert("Fill the form properly");
    }
  };

  return (
    <div className="flex items-center w-full justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg px-8 pt-4 pb-4 mt-4 mb-4 w-full max-w-md"
      >
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="example@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="number" className="block text-gray-700 text-sm font-bold mb-2">
            Phone Number
          </label>
          <input
            type="text"
            id="number"
            placeholder="+91 1234567890"
            value={number}
            maxLength={14} // Adjust this if needed to accommodate "+91" prefix
            onChange={handlePhoneNumberChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="pan" className="block text-gray-700 text-sm font-bold mb-2">
            PAN
          </label>
          <input
            type="text"
            id="pan"
            placeholder="PAN Here"
            value={pan}
            onChange={handlePanChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          <span className={`text-sm ${panValid ? "text-green-500" : "text-red-500"}`}>
            {panValid ? "Valid PAN" : "Invalid PAN"}
          </span>
        </div>
        <div className="mb-4">
          <label htmlFor="address1" className="block text-gray-700 text-sm font-bold mb-2">
            Address Line 1
          </label>
          <input
            type="text"
            id="address1"
            placeholder="Address Line 1"
            value={address1}
            onChange={(e) => setAddress1(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="address2" className="block text-gray-700 text-sm font-bold mb-2">
            Address Line 2
          </label>
          <input
            type="text"
            id="address2"
            placeholder="Address Line 2"
            value={address2}
            onChange={(e) => setAddress2(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="city" className="block text-gray-700 text-sm font-bold mb-2">
            City
          </label>
          <input
            type="text"
            id="city"
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="state" className="block text-gray-700 text-sm font-bold mb-2">
            State
          </label>
          <input
            type="text"
            id="state"
            placeholder="State"
            value={state}
            onChange={(e) => setState(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="postalCode" className="block text-gray-700 text-sm font-bold mb-2">
            Postal Code
          </label>
          <input
            type="text"
            id="postalCode"
            placeholder="Postal Code"
            value={postalCode}
            onChange={handlePostalCodeChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          <span className={`text-sm ${validPostalCode ? "text-green-500" : "text-red-500"}`}>
            {validPostalCode ? "Valid Postal Code" : "Invalid Postal Code"}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Save
          </button>
        </div>
        {formSubmitted && (
          <div className="mt-4 text-green-600">Form submitted successfully!</div>
        )}
      </form>
    </div>
  );
};

export default Form;
