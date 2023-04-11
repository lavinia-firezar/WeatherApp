import { useEffect, useState } from "react";

function useFetchHook(url) {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        setData(json);
      });
  }, [url]);

  return data;
}

export default useFetchHook;
