import { useState, useEffect } from "react";
import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_URL;

const useDebouncedSearch = (query, delay = 500) => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }

    const controller = new AbortController();
    const handler = setTimeout(() => {
      setLoading(true);
      axios
        .get(`${API_BASE_URL}/api/products/search?q=${query}`, {
          signal: controller.signal,
        })
        .then((res) => {
          setResults(res.data);
          setLoading(false);
        })
        .catch((err) => {
          if (err.name !== "CanceledError") console.error(err);
          setLoading(false);
        });
    }, delay);

    return () => {
      clearTimeout(handler);
      controller.abort();
    };
  }, [query, delay]);

  return { results, loading };
};

export default useDebouncedSearch;
