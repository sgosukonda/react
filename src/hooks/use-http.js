import { useState } from "react";

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const sendRequest = async (requestConfig) => {
    setIsLoading(true);
    let data = {};
    try {
      let response = await fetch(requestConfig.url, {
        method: requestConfig.method ? requestConfig.method : "GET",
        headers: requestConfig.headers ? requestConfig.headers : [],
        body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
      });

      if (!response.ok) throw Error("Something wrong with fetch.");
      data = await response.json();
    } catch (error) {
      setErrorMessage(error.message);
    }
    setIsLoading(false);
    return data;
  };

  return {
    sendRequest,
    isLoading,
    errorMessage,
  };
};

export default useHttp;
