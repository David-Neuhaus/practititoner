import { useEffect, useState } from "react";

export function useFetch<T = any>(
  url: string | null,
  defaultData: T
): T | null {
  const [data, setData] = useState<T>(defaultData);

  useEffect(() => {
    if (url !== null) {
      let ignore = false;
      fetch(url)
        .then((response) => response.json())
        .then((json) => {
          if (!ignore) {
            setData(json);
          }
        })
        // TODO handle different response codes
        .catch((err) => {
          // TODO handle fetching error
        });
      return () => {
        ignore = true;
      };
    }
  }, [url]);

  return data;
}
