import { useState, useEffect } from "react";
import useCurrencyInfo from "./hooks/useCurrencyInfo.jsx";
import InputBox from "./components/InputBox.jsx";
import currencyList from "./data/currencyList.js";
import "./index.css";
import { ArrowUpDown } from "lucide-react";

function App() {
  const [amount, setAmount] = useState("");
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("INR");
  const [convertedAmount, setConvertedAmount] = useState("");
  const [activeField, setActiveField] = useState(null);
  const { data: currencyInfo, loading, error } = useCurrencyInfo(from);
  const currencyOptions = Object.entries(currencyList);

  const convertFromToTo = () => {
    const rate = currencyInfo?.[to.toLowerCase()];
    if (!rate || isNaN(amount) || amount === "") {
      setConvertedAmount("");
      return;
    }
    const result = parseFloat(amount) * rate;
    setConvertedAmount(result.toFixed(2));
  };

  const convertToToFrom = () => {
    const rate = currencyInfo?.[to.toLowerCase()];
    if (!rate || isNaN(convertedAmount) || convertedAmount === "") {
      setAmount("");
      return;
    }
    const result = parseFloat(convertedAmount) / rate;
    setAmount(result.toFixed(2));
  };

  const handleFromAmountChange = (value) => {
    setAmount(value);
    setActiveField("from");
    if (value === "") {
      setConvertedAmount("");
    }
  };

  const handleToAmountChange = (value) => {
    setConvertedAmount(value);
    setActiveField("to");
    if (value === "") {
      setAmount("");
    }
  };

  const handleSwap = () => {
    setFrom(to);
    setTo(from);
    setAmount(convertedAmount);
    setConvertedAmount(amount);
    setActiveField("from");
  };

  useEffect(() => {
    if (loading || error || (amount === "" && convertedAmount === "")) {
      return;
    }

    if (activeField === "from" && amount !== "") {
      convertFromToTo();
    } else if (activeField === "to" && convertedAmount !== "") {
      convertToToFrom();
    }
  }, [amount, convertedAmount, from, to, currencyInfo, loading, error, activeField]);

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-purple-200 to-indigo-300 p-4">
      <div className="bg-white/30 backdrop-blur p-6 rounded-xl w-full max-w-md shadow-lg border border-white">
        {loading && <p className="text-center text-white">Loading rates...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}
        <div className="relative">
          <InputBox
            label="From"
            amount={amount}
            onAmountChange={handleFromAmountChange}
            onCurrencyChange={setFrom}
            currencyOptions={currencyOptions}
            selectCurrency={from}
          />
          <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-10">
            <button
              type="button"
              onClick={handleSwap}
              className="bg-indigo-600 text-white p-2 rounded-full hover:bg-indigo-700"
              disabled={loading}
            >
              <ArrowUpDown size={18} />
            </button>
          </div>
          <InputBox
            label="To"
            amount={convertedAmount}
            onAmountChange={handleToAmountChange}
            onCurrencyChange={setTo}
            currencyOptions={currencyOptions}
            selectCurrency={to}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
