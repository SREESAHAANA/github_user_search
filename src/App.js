// App.js

import { useState } from "react";
import "./App.css";

const API_URL = "https://api.github.com";

async function fetchResults(query) {
  try {
    const response = await fetch(`${API_URL}/search/users?q=${query}`);
    const json = await response.json();
    return json.items || [];
  } catch (e) {
    throw new Error(e);
  }
}

export default function App() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  async function fetchSearchResults(query) {
    setLoading(true);
    const results = await fetchResults(query);
    setResults(results);
    setLoading(false);
  }

  function onSearchChange(event) {
    setQuery(event.target.value);
  }

  function onSearchSubmit(event) {
    event.preventDefault();
    if (query.trim() !== "") {
      fetchSearchResults(query);
    }
  }

  return (
    <div className="app">
      <main className="main">
        <h2>GitHub User Search</h2>
        <form className="search-form" onSubmit={onSearchSubmit}>
          <input
            id="search"
            type="text"
            placeholder="Enter username"
            onChange={onSearchChange}
            value={query}
          />
          <button type="submit" disabled={loading}>
            {loading ? "Searching..." : "Search"}
          </button>
        </form>
        <div id="results">
          {results.map((user) => (
            <User
              key={user.id}
              avatar={user.avatar_url}
              url={user.html_url}
              username={user.login}
            />
          ))}
        </div>
      </main>
    </div>
  );
}

function User({ avatar, url, username }) {
  return (
    <div className="user">
      <a href={url} target="_blank" rel="noopener noreferrer">
        <img src={avatar} alt="Profile" width="100" height="100" />
        <div className="username">{username}</div>
      </a>
    </div>
  );
}
