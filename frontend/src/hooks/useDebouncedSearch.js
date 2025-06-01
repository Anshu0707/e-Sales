import { useState, useEffect } from "react";
import axios from "axios";

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
        .get(`/api/products/search?q=${query}`, { signal: controller.signal })
        .then((res) => {
          setResults(res.data);
          setLoading(false);
        })
        .catch((err) => {
          if (err.name !== "CanceledError") {
            console.error("❌ Search error:", err);
            setLoading(false);
          }
        });
    }, delay);

    return () => {
      clearTimeout(handler);
      controller.abort(); //Cancel previous requests if query changes
    };
  }, [query, delay]);

  return { results, loading };
};

export default useDebouncedSearch;
