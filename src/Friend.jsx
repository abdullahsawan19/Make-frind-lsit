import { useEffect, useState } from "react";

export default function Friend({
  addFriend,
  updateFriend,
  editingFriend,
  cancelEdit,
}) {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [favPlayer, setFavPlayer] = useState("");
  const [birthDay, setBirthDay] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (editingFriend) {
      setName(editingFriend.name || "");
      setNumber(editingFriend.number || "");
      setFavPlayer(editingFriend.favPlayer || "");
      setBirthDay(editingFriend.birthDay || "");
      setEmail(editingFriend.email || "");
      setPassword(editingFriend.password || "");
    } else {
      setName("");
      setNumber("");
      setFavPlayer("");
      setBirthDay("");
      setEmail("");
      setPassword("");
    }
  }, [editingFriend]);

  function handleSubmit(event) {
    event.preventDefault();

    const friendData = {
      name,
      number,
      favPlayer,
      birthDay,
      email,
      password,
    };

    if (editingFriend) {
      updateFriend({ ...friendData, id: editingFriend.id });
    } else {
      addFriend(friendData);
      setName("");
      setNumber("");
      setFavPlayer("");
      setBirthDay("");
      setEmail("");
      setPassword("");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>{editingFriend ? "Edit Friend" : "Add Friend"}</h2>

      <label>Friend Name:</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <label>Friend Number:</label>
      <input
        type="tel"
        value={number}
        onChange={(e) => setNumber(e.target.value)}
        required
      />

      <label>Friend FAV Player:</label>
      <input
        type="text"
        value={favPlayer}
        onChange={(e) => setFavPlayer(e.target.value)}
      />

      <label>Friend Birth Day:</label>
      <input
        type="date"
        value={birthDay}
        onChange={(e) => setBirthDay(e.target.value)}
      />

      <label>Friend Email:</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <label>Friend Password:</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <div style={{ marginTop: 8 }}>
        <button type="submit">{editingFriend ? "Update" : "Add Friend"}</button>

        {editingFriend && (
          <button type="button" onClick={cancelEdit} className="cancel">
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
