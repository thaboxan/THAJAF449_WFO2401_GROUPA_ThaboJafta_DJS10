import { useState, useEffect } from "react"; // Import the useState and useEffect hooks from React
import "./App.css"; // Import the CSS file for styling

export default function App() {
  const [data, setData] = useState([]); // Initialize the state for data as an empty array
  const [error, setError] = useState(null); // Initialize the state for error as null
  const apiUrl = "https://jsonplaceholder.typicode.com/posts"; // Define the URL for the API

  useEffect(() => {
    // Define an async function to fetch data
    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl); // Make a fetch request to the API URL
        if (!response.ok) {
          // Check if the response is not OK (HTTP status error)
          throw new Error(`HTTP error! status: ${response.status}`); // Throw an error with the HTTP status
        }
        const result = await response.json(); // Parse the response as JSON
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
