import express from "express";
import cors from "cors";
const app = express();

const PORT = 3000;
interface Post {
  id: number;
  text: string;
  timestamp: number;
}

let posts: Post[] = [];

let nextId = 1;

app.use(express.json());
app.use(cors());

app.get("/api/posts", (req, res) => {
  res.status(200).json(posts);
});

app.post("/api/posts", (req, res) => {
  const newPost: Post = {
    id: nextId++,
    text: req.body.text,
    timestamp: Date.now(),
  };
  posts.push(newPost);
  res.status(201).json(newPost);
});

app.put("/api/posts/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const postIndex = posts.findIndex((post) => post.id === id);

  if (postIndex === -1) {
    res.status(404).json({ error: "Post not found" });
  } else {
    posts[postIndex].text = req.body.text;
    res.status(200).json(posts[postIndex]);
  }
});

app.delete("/api/posts/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const postIndex = posts.findIndex((post) => post.id === id);

  if (postIndex === -1) {
    res.status(404).json({ error: "Post not found" });
  } else {
    posts.splice(postIndex, 1);
    res.status(200).json({ message: "Post deleted" });
  }
});

app.listen(PORT, () => {
  console.log(`Server started at ${PORT}`);
});
