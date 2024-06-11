import { useState, useEffect } from "react";
import "./App.css";

export default function App() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const apiUrl = "https://jsonplaceholder.typicode.com/posts";

  useEffect(() => {
    // Define an async function to fetch data
    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          // Throw an error for HTTP status errors
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setData(result); // Update the data state with the fetched data
      } catch (error) {
        setError(error.message); // Update the error state if there is an error
      }
    };

    fetchData(); // Call the async function to fetch data
  }, []); // Empty dependency array means this effect runs once after the initial render

  // Conditional rendering based on error or data state
  if (error) {
    return <div>Error: {error}</div>; // Display error message if there is an error
  }

  return (
    <div>
      <h2>Posts</h2>
      <ol>
        {data.map((post) => (
          <li key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
