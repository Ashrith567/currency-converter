import React from "react";
import { ChevronDown } from "lucide-react";

function InputBox({
  label,
  amount,
  onAmountChange,
  onCurrencyChange,
  currencyOptions = [],
  selectCurrency = "USD",
  amountDisable = false,
  currencyDisable = false,
}) {
  const selectedOption = currencyOptions.find(([code]) => code === selectCurrency);
  const selectedCountryCode = selectedOption?.[1].countryCode || "US";

  return (
    <div className="bg-white/70 p-3 rounded-lg text-sm flex mb-2">
      <div className="w-1/2 pr-2">
        <label className="text-black/50 mb-1 inline-block">{label}</label>
        <input
          className="outline-none w-full bg-transparent py-1.5"
          type="number"
          placeholder="Amount"
          disabled={amountDisable}
          value={amount}
          onChange={(e) => onAmountChange?.(e.target.value)}
        />
      </div>
      <div className="w-1/2 pl-2 flex flex-col justify-end">
        <p className="text-black/50 mb-1 text-right">Currency</p>
        <div className="relative flex items-center justify-end currency-wrapper">
          <div className="flex items-center bg-gray-100 rounded-lg py-1 px-2">
            <img
              src={`https://flagsapi.com/${selectedCountryCode}/flat/24.png`}
              alt={`${selectCurrency} flag`}
              className="w-6 h-6 mr-2"
              onError={(e) => (e.target.style.display = "none")}
            />
            <span className="text-xs font-medium mr-2">{selectCurrency}</span>
            <ChevronDown size={12} className="text-gray-700" />
            <select
              className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
              value={selectCurrency}
              onChange={(e) => onCurrencyChange?.(e.target.value)}
              disabled={currencyDisable}
            >
              {currencyOptions.map(([code, { name, countryCode }]) => (
                <option key={code} value={code}>
                  {name} ({code})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InputBox;