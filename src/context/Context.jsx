import React, { createContext, useState } from 'react';
import { runChat } from '../config/gemini'; // Adjust path if needed

export const Context = createContext();

const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPrompts, setPrevPrompts] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");

  const newChat = () =>{
    setLoading(false)
    setShowResult(false)
  }

  const onSent = async (prompt) => {
    // If no prompt is provided, use the one from the input state
    const currentPrompt = prompt !== undefined ? prompt : input;
    if (currentPrompt.trim() === "") return;

    setResultData(""); // Clear previous result
    setLoading(true);
    setShowResult(true);
    setRecentPrompt(currentPrompt);
    
    // Add to prevPrompts only if it's a new prompt
    if (!prevPrompts.includes(currentPrompt)) {
        setPrevPrompts(prev => [...prev, currentPrompt]);
    }

    try {
      const response = await runChat(currentPrompt);
      // Format response with bolding and line breaks
      let formattedResponse = response.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>');
      formattedResponse = formattedResponse.replace(/\*/g, '<br/>');
      setResultData(formattedResponse);
    } catch (err) {
      setResultData("Something went wrong. Please try again.");
    }

    setLoading(false);
    setInput("");
  };

  const contextValue = {
    input,
    setInput,
    recentPrompt,
    setRecentPrompt,
    prevPrompts,
    setPrevPrompts,
    showResult,
    setShowResult,
    loading,
    setLoading,
    resultData,
    setResultData,
    onSent,
    newChat
  };

  return (
    <Context.Provider value={contextValue}>
      {props.children}
    </Context.Provider>
  );
};

export default ContextProvider;