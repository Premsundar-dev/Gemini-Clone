// import React from 'react'
// import Sidebar from './components/Sidebar/Sidebar'
// import Main from './components/Main/Main'

// const App = () => {
//   return (
//     <>
//       <Sidebar/>
//       <Main/>
//     </>
//   )
// }

// export default App




// import React, { useState } from 'react'
// import Sidebar from './components/Sidebar/Sidebar'
// import Main from './components/Main/Main'

// const App = () => {

//   // 1. State is now managed here in the parent App component
//   const [prevPrompts, setPrevPrompts] = useState([]);
//   const [recentPrompt, setRecentPrompt] = useState("");

//   // 2. This function contains the logic for updating the state
//   const onSent = (prompt) => {
//     // Avoids adding empty or duplicate prompts to the history
//     if (!prompt || prevPrompts.includes(prompt)) {
//       return; 
//     }
//     setRecentPrompt(prompt);
//     setPrevPrompts(prev => [...prev, prompt]);
//   };

//   return (
//     <>
//       {/* 3. Pass the state and functions down to children as props */}
//       <Sidebar
//         onSent={onSent}
//         prevPrompts={prevPrompts}
//         setRecentPrompt={setRecentPrompt}
//       />
//       <Main
//         onSent={onSent}
//         recentPrompt={recentPrompt}
//       />
//     </>
//   )
// }

// export default App


// import React, { createContext, useState } from 'react';

// // This creates the context object
// export const Context = createContext();

// // This is the provider component that will wrap your app
// const ContextProvider = (props) => {
//   // All your shared state will live here
//   const [prevPrompts, setPrevPrompts] = useState([]);
//   const [recentPrompt, setRecentPrompt] = useState("");
//   // You can add other states here like input, loading, resultData, etc.

//   const onSent = (prompt) => {
//     // Logic to update the state
//     if (!prompt || prevPrompts.includes(prompt)) {
//       return;
//     }
//     setRecentPrompt(prompt);
//     setPrevPrompts(prev => [...prev, prompt]);
//     // You'll eventually add your API call logic here as well
//   };

//   // This object bundles up all the state and functions
//   const contextValue = {
//     prevPrompts,
//     setPrevPrompts,
//     recentPrompt,
//     setRecentPrompt,
//     onSent,
//   };

//   return (
//     <Context.Provider value={contextValue}>
//       {props.children}
//     </Context.Provider>
//   );
// };

// export default ContextProvider;



import React from 'react';
import Sidebar from './components/Sidebar/Sidebar';
import Main from './components/Main/Main'; // Ensure this is imported

const App = () => {
  return (
    <>
      <Sidebar />
      <Main /> {/* Ensure this is here and not commented out */}
    </>
  );
};

export default App;