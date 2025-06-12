import { useEffect, useState } from "react";

function useCurrencyInfo(currency) {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch(
      `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currency.toLowerCase()}.json`
    )
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch currency data");
        return res.json();
      })
      .then((res) => {
        setData(res[currency.toLowerCase()] || {});
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [currency]);

  return { data, loading, error };
}

export default useCurrencyInfo;