import { useState, useEffect } from "react";
import "./App.css";

export default function App() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Data Fetching Failed");
        }
        return response.json();
      })
      .then((data) => setData(data))
      .catch((error) => setError(error.message));
  }, []);

  return (
    <div>
      <h2>Posts</h2>
      {error ? (
        <p>Error: {error}</p>
      ) : (
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
