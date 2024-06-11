// Import useState and useEffect hooks from React
import { useState, useEffect } from "react";
// Import the App.css file for styling
import "./App.css";

// Define the main App component
export default function App() {
  // Declare state variables: data (to hold fetched data) and error (to hold error messages)
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  // Define the API URL for fetching posts
  const apiUrl = "https://jsonplaceholder.typicode.com/posts";

  // useEffect hook to fetch data when the component mounts
  useEffect(() => {
    // Fetch data from the API
    fetch(apiUrl)
      .then((response) => {
        // Check if the response is not OK (status in the range 200-299)
        if (!response.ok) {
          // Throw an error if the response status is not OK
          throw new Error("Data Fetching Failed");
        }
        // Parse the response as JSON
        return response.json();
      })
      .then((data) => setData(data)) // Update the data state with the fetched data
      .catch((error) => setError(error.message)); // Update the error state if there is an error
  }, []); // Empty dependency array means this effect runs once after the initial render

  return (
    <div>
      <h2>Posts</h2>
      {error ? ( // If there is an error, display the error message
        <p>Error: {error}</p>
      ) : (
        // Otherwise, display the list of posts
        <ol>
          {data.map((post) => (
            <li key={post.id}>
              <h3>{post.title}</h3>
              <p>{post.body}</p>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
