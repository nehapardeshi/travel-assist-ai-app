import React, { useEffect, useState, useRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const chatapi_endpoint = process.env.REACT_APP_CHATAPI_ENDPOINT; // safe

const ChatComponent = ({ prompt }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [response, setResponse] = useState("");

//   useEffect(() => {
//     if (!prompt) return;

const hasFetched = useRef(false); // to prevent multiple fetches

useEffect(() => {
  if (!prompt || hasFetched.current) return;
  hasFetched.current = true;

    setResponse("");

    const fetchData = async () => {
      setIsLoading(true);
      setStatusMessage('Generating itinerary, please wait...');
      try {
        const res = await fetch(chatapi_endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ prompt: prompt, // your payload 
          }), });

        console.log("Response status:", res.status);

        const jsonResponse = await res.json(); // adjust if your API returns plain text
        console.log("Response data:", jsonResponse);

        setResponse(jsonResponse.answer || jsonResponse); // or adjust based on your API shape
      } catch (error) {
        console.error("Error:", error);
        setResponse("Error: " + error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [prompt]);

  return (
    <div className="itinerary-container">      
      {isLoading && <p>{statusMessage}</p>}
      {!isLoading && response.data && (
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{response.data}</ReactMarkdown>
    )}
    </div>
  );
};

export default ChatComponent;
