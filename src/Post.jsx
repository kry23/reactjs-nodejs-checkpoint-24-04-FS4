import React, { useState } from "react";

export default function Post({ post, onDelete, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(post.text);

  const handleUpdateClick = () => {
    if (isEditing) {
      onUpdate(post.id, text);
    }
    setIsEditing(!isEditing);
  };

  const handleChange = (e) => {
    setText(e.target.value);
  };
  return (
    <div className="post">
      {isEditing ? (
        <input type="text" value={text} onChange={handleChange} />
      ) : (
        <p>{text}</p>
      )}
      <button onClick={() => onDelete(post.id)}>Delete</button>
      <button onClick={handleUpdateClick}>{isEditing ? "Save" : "Edit"}</button>

      <small className="timestamp">
        Posted at {new Date(post.timestamp).toUTCString()}
      </small>
    </div>
  );
}
