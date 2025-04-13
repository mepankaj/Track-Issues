// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
//Code2
// import React from "react";

// const issues = [
//   { id: 1, title: "Bug in login", description: "Users cannot log in with Google OAuth.", status: "Open" },
//   { id: 2, title: "UI issue on dashboard", description: "Buttons are misaligned on the mobile view.", status: "Closed" },
//   { id: 3, title: "Slow API response", description: "Fetching user data takes too long.", status: "Open" }
// ];

// const IssueList = () => {
//   return (
//     <div className="max-w-2xl mx-auto mt-10 p-5 bg-white shadow-lg rounded-xl">
//       <h1 className="text-2xl font-bold mb-4">Issue Tracker</h1>
//       <ul>
//         {issues.map((issue) => (
//           <li key={issue.id} className="border-b py-3">
//             <h2 className="text-lg font-semibold">{issue.title}</h2>
//             <p className="text-gray-600">{issue.description}</p>
//             <span
//               className={`px-2 py-1 text-sm font-bold rounded-md ${
//                 issue.status === "Open" ? "bg-red-500 text-white" : "bg-green-500 text-white"
//               }`}
//             >
//               {issue.status}
//             </span>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };
//code3
// export default function App() {
//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center">
//       <IssueList />
//     </div>
//   );
// }

// import React, { useState } from "react";

// const initialIssues = [
//   { id: 1, title: "Bug in login", description: "Users cannot log in with Google OAuth.", status: "Open" },
//   { id: 2, title: "UI issue on dashboard", description: "Buttons are misaligned on the mobile view.", status: "Closed" },
//   { id: 3, title: "Slow API response", description: "Fetching user data takes too long.", status: "Open" }
// ];

// const IssueList = () => {
//   const [issues, setIssues] = useState(initialIssues);
//   const [filter, setFilter] = useState("All");

//   const addIssue = () => {
//     const newIssue = {
//       id: issues.length + 1,
//       title: "New Issue",
//       description: "This is a new issue.",
//       status: "Open"
//     };
//     setIssues([...issues, newIssue]);
//   };

//   const filteredIssues = filter === "All" ? issues : issues.filter(issue => issue.status === filter);

//   return (
//     <div className="max-w-2xl mx-auto mt-10 p-5 bg-white shadow-lg rounded-xl">
//       <h1 className="text-2xl font-bold mb-4">Issue Tracker</h1>
//       <div className="mb-4">
//         <button className="px-4 py-2 bg-blue-500 text-white rounded mr-2" onClick={() => setFilter("All")}>All</button>
//         <button className="px-4 py-2 bg-red-500 text-white rounded mr-2" onClick={() => setFilter("Open")}>Open</button>
//         <button className="px-4 py-2 bg-green-500 text-white rounded" onClick={() => setFilter("Closed")}>Closed</button>
//       </div>
//       <button className="px-4 py-2 bg-purple-500 text-white rounded mb-4" onClick={addIssue}>Add Issue</button>
//       <ul>
//         {filteredIssues.map((issue) => (
//           <li key={issue.id} className="border-b py-3">
//             <h2 className="text-lg font-semibold">{issue.title}</h2>
//             <p className="text-gray-600">{issue.description}</p>
//             <span
//               className={`px-2 py-1 text-sm font-bold rounded-md ${
//                 issue.status === "Open" ? "bg-red-500 text-white" : "bg-green-500 text-white"
//               }`}
//             >
//               {issue.status}
//             </span>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default function App() {
//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center">
//       <IssueList />
//     </div>
//   );
// }
//code4
import React, { useState, useEffect } from "react";

const IssueList = () => {
  const [issues, setIssues] = useState(() => {
    const savedIssues = localStorage.getItem("issues");
    return savedIssues ? JSON.parse(savedIssues) : [
      { id: 1, title: "Bug in login", description: "Users cannot log in with Google OAuth.", status: "Open" },
      { id: 2, title: "UI issue on dashboard", description: "Buttons are misaligned on the mobile view.", status: "Closed" },
      { id: 3, title: "Slow API response", description: "Fetching user data takes too long.", status: "Open" }
    ];
  });
  const [filter, setFilter] = useState("All");
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");

  useEffect(() => {
    localStorage.setItem("issues", JSON.stringify(issues));
  }, [issues]);

  const addIssue = () => {
    if (!newTitle || !newDescription) return;
    const newIssue = {
      id: issues.length + 1,
      title: newTitle,
      description: newDescription,
      status: "Open"
    };
    setIssues([...issues, newIssue]);
    setNewTitle("");
    setNewDescription("");
  };

  const toggleStatus = (id) => {
    setIssues(issues.map(issue => issue.id === id ? { ...issue, status: issue.status === "Open" ? "Closed" : "Open" } : issue));
  };

  const deleteIssue = (id) => {
    setIssues(issues.filter(issue => issue.id !== id));
  };

  const filteredIssues = filter === "All" ? issues : issues.filter(issue => issue.status === filter);

  return (
    <div className="max-w-2xl mx-auto mt-10 p-5 bg-white shadow-lg rounded-xl">
      <h1 className="text-2xl font-bold mb-4">Issue Tracker</h1>
      <div className="mb-4">
        <button className="px-4 py-2 bg-blue-500 text-white rounded mr-2" onClick={() => setFilter("All")}>All</button>
        <button className="px-4 py-2 bg-red-500 text-white rounded mr-2" onClick={() => setFilter("Open")}>Open</button>
        <button className="px-4 py-2 bg-green-500 text-white rounded" onClick={() => setFilter("Closed")}>Closed</button>
      </div>
      <div className="mb-4">
        <input type="text" placeholder="Title" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} className="border p-2 mr-2" />
        <input type="text" placeholder="Description" value={newDescription} onChange={(e) => setNewDescription(e.target.value)} className="border p-2" />
        <button className="px-4 py-2 bg-purple-500 text-white rounded ml-2" onClick={addIssue}>Add Issue</button>
      </div>
      <ul>
        {filteredIssues.map((issue) => (
          <li key={issue.id} className="border-b py-3 flex justify-between items-center">
            <div>
              <h2 className="text-lg font-semibold">{issue.title}</h2>
              <p className="text-gray-600">{issue.description}</p>
              <button
                className={`px-2 py-1 text-sm font-bold rounded-md ${
                  issue.status === "Open" ? "bg-red-500 text-white" : "bg-green-500 text-white"
                }`} onClick={() => toggleStatus(issue.id)}
              >
                {issue.status}
              </button>
            </div>
            <button className="px-3 py-1 bg-gray-300 text-black rounded" onClick={() => deleteIssue(issue.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <IssueList />
    </div>
  );
}

