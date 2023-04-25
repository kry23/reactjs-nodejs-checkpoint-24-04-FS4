import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import Post from "./Post";

const API_URL = "http://localhost:3000/";

function App() {
  const [posts, setPosts] = useState([]);
  const [inputText, setInputText] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await axios.get(API_URL + "api/posts");
      setPosts(response.data);
    };

    fetchPosts();
  }, []);

  const handleSubmit = async () => {
    const response = await axios.post(API_URL + "api/posts", {
      text: inputText,
    });
    setPosts([...posts, response.data]);
    setInputText("");
  };
  const handleDelete = async (id) => {
    await axios.delete(API_URL + `api/posts/${id}`);
    setPosts(posts.filter((post) => post.id !== id));
  };
  const handleUpdate = async (id, text) => {
    const response = await axios.put(API_URL + `api/posts/${id}`, {
      text: text,
    });
    setPosts(posts.map((post) => (post.id === id ? response.data : post)));
  };

  const handleSort = () => {
    const sortedPosts = [...posts].sort((a, b) =>
      sortOrder === "desc"
        ? b.timestamp - a.timestamp
        : a.timestamp - b.timestamp
    );
    setPosts(sortedPosts);
    setSortOrder(sortOrder === "desc" ? "asc" : "desc");
  };

  return (
    <div className="App">
      <input
        type="text"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />
      <button onClick={handleSubmit}>Save</button>
      <button onClick={handleSort}>
        Sort by {sortOrder === "desc" ? "ASC" : "DESC"}
      </button>
      {posts.map((post) => (
        <Post
          key={post.id}
          post={post}
          onDelete={handleDelete}
          onUpdate={handleUpdate}
        />
      ))}
    </div>
  );
}

export default App;
