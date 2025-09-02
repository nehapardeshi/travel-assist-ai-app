import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ChatComponent from "./ChatComponent";

const Summary = () => {
  const location = useLocation();
  const { noOfDays, tripLocation } = location.state || {};
  const [prompt, setPrompt] = useState(null);

  useEffect(() => {
    if (!location.state) return;

    const { noOfDays, tripLocation, travellersCount, withKids, kidsAge, travelMode, interests, foodPreferences, withStroller } = location.state;
    let builtPrompt = `You are a travel planner. Create a detailed travel itinerary for ${noOfDays} days in ${tripLocation}. `;
    if (travellersCount && travellersCount != "") {
      builtPrompt += `We are a group of ${travellersCount}`;
    }
    if (withKids) {
      if(kidsAge && kidsAge != "")
        builtPrompt += `, including kids aged ${kidsAge}`;
      else
      builtPrompt += `, including kids`;
    }
    if (withStroller) {
      builtPrompt += `. We will be bringing a stroller so please consider stroller-friendly activities and locations`;
    }
    if (travelMode && travelMode != "") {
      builtPrompt += `. We will be traveling by ${travelMode}`;
    }
    if (interests && interests.length > 0) {
      builtPrompt += `. Our interests include ${interests.join(", ")}`;
    }
    if (foodPreferences && foodPreferences.length > 0) {  
      builtPrompt += `. We have the following food preferences: ${foodPreferences.join(", ")} so include restaurant suggestions that cater to these preferences`;
    }  
    console.log("Built Prompt: " + builtPrompt);
    
    //const builtPrompt = `Hi, can you give me code examples about consuming Web API in C#, Java, and Python?`;

    setPrompt(builtPrompt);
  }, [location.state]);

  return (
    <div className="itinerary-container">
      <h2 >Suggested Itinerary for {noOfDays} days in {tripLocation}</h2>
      {prompt ? <ChatComponent prompt={prompt} /> : <p>Loading prompt...</p>}
    </div>
  );
};

export default Summary;


/*
  const navigate = useNavigate();
  const { state } = useLocation(); // <-- form data passed from navigate()
    alert(JSON.stringify(state));
  // if user refreshed or came directly, state may be undefined:
  if (!state) {
    return (
      <div>
        <p>No form data found. Please fill out the form first.</p>
        <button onClick={() => navigate("/")}>Go to form</button>
      </div>
    );
  }

  const { travelDates, location, groupInfo } = state;
  // Build prompt dynamically from form data
  const builtPrompt = `Hi give me code examples to call web api in C#, Java, and Python.`;
  setPrompt(builtPrompt);

  return (
    <div style={{ maxWidth: 420 }}>
      <h2>Review your info</h2>
      <p><strong>travelDates:</strong> {travelDates}</p>
      <p><strong>location:</strong> {location}</p>
      <p><strong>groupInfo:</strong> {groupInfo}</p>

      {/* <button onClick={() => navigate("/", { state })}>Back</button>
      <button
        onClick={() => {
          // pretend to submit to an API here
          alert("Submitted! 🎉");
          //navigate("/", { replace: true });
        }}
      >
        Confirm & Submit
      </button> 
    </div>
  );
}*/

// Summary.navigationOptions = {
//     title: "Travel Assist : Your Trip Summary"
//   };

// export default Summary;