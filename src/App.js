import { useEffect, useState } from "react";
import "./App.css";
import Friend from "./Friend";

export default function App() {
  const [friends, setFriends] = useState([]);
  const [editingFriend, setEditingFriend] = useState(null);

  function addFriend(newFriend) {
    const friendWithId = { ...newFriend, id: crypto.randomUUID() };
    setFriends((prev) => [...prev, friendWithId]);
  }

  function updateFriend(updatedFriend) {
    setFriends((prev) =>
      prev.map((f) => (f.id === updatedFriend.id ? updatedFriend : f))
    );
    setEditingFriend(null);
  }

  function handleDelete(id) {
    setFriends((prev) => prev.filter((friend) => friend.id !== id));
  }

  function startEdit(id) {
    const friend = friends.find((f) => f.id === id);
    if (friend) setEditingFriend(friend);
  }

  function cancelEdit() {
    setEditingFriend(null);
  }

  return (
    <div className="App">
      <Friend
        addFriend={addFriend}
        updateFriend={updateFriend}
        editingFriend={editingFriend}
        cancelEdit={cancelEdit}
      />

      {friends.length > 0 && <h2>Friends List:</h2>}

      <ul>
        {friends.map((friend) => (
          <li
            key={friend.id}
            className={editingFriend?.id === friend.id ? "editing-mode" : ""}
          >
            <strong>Friend Name :</strong> {friend.name} <br />
            <strong>Friend Number :</strong> {friend.number} <br />
            <strong>Friend FAV Player :</strong> {friend.favPlayer} <br />
            <strong>Friend Birth Day :</strong> {friend.birthDay} <br />
            <strong>Friend Email :</strong> {friend.email} <br />
            <button onClick={() => handleDelete(friend.id)}>Delete</button>
            <button onClick={() => startEdit(friend.id)}>Edit</button>
            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
}
