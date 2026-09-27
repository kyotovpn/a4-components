import { useState } from "react";

export default function LeaderBoard(props) {
  const [editingId, setEditingId] = useState(null); // which row is being edited
  const [draft, setDraft] = useState("");

  const sorted = [...props.scores].sort((a, b) => b.score - a.score);
  function startEdit(entry) {
    setEditingId(entry._id);
    setDraft(entry.note);
  }
  function cancelEdit() {
    setEditingId(null);
  }
  async function saveEdit(id) {
    await fetch("/updte", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ _id: id, note: draft }),
    });
    setEditingId(null);
    props.onChange();
  }
  async function handleDelete(id) {
    await fetch("/delete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ _id: id }),
    });
    props.onChange();
  }
  return (
    <aside id="leaderBoard" className="nes-table-responsive">
      <h2>Leader Board</h2>
      <table className="nes-table is-bordered is-centered">
        <thead>
          <tr>
            <th scope="col">Rank</th>
            <th scope="col">Score</th>
            <th scope="col">Name</th>
            <th scope="col">CPS</th>
            <th scope="col">Note</th>
            <th scope="col">Date </th>
            <th scope="col">Remove</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((entry, i) => {
            const isMine = props.user && entry.name === props.user.username;
            const isEditing = entry._id === editingId;
            return (
              <tr key={entry._id}>
                <th scope="row">{i + 1}</th>
                <td>{entry.score}</td>
                <td>{entry.name}</td>
                <td>{entry.cps}</td>

                <td>{isEditing ? (
                    <>
                <input value={draft} maxLength={25} onChange={(e)=> setDraft(e.target.value)}/>
                <button onClick={()=> saveEdit(entry._id)}>save</button>
                <button onClick={cancelEdit}>cancel</button>
                </>): (entry.note)}</td>
                <td>{entry.date}</td>
                 <td>
                  {isMine && !isEditing && (
                    <>
                      <button onClick={() => startEdit(entry)}>edit</button>
                      <button onClick={() => handleDelete(entry._id)}>delete</button>
                    </>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </aside>
  );
}
