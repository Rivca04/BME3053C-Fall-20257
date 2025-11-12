import React, { useState } from 'react'

export default function PatientDetails({ patient, onAddNote }) {
  const [note, setNote] = useState('')

  return (
    <div className="patient-details">
      <h2>{patient.name}</h2>
      <div>Age: {patient.age}</div>
      <div>Gender: {patient.gender}</div>
      <div>Conditions: {patient.conditions?.join(', ') || '—'}</div>

      <h3>Notes</h3>
      <ul>
        {(patient.notes || []).map((n, i) => (
          <li key={i}>{n}</li>
        ))}
      </ul>

      <div className="add-note">
        <input value={note} onChange={e => setNote(e.target.value)} placeholder="Add note" />
        <button onClick={() => { if(note.trim()){ onAddNote(patient.id, note.trim()); setNote('') } }}>Add</button>
      </div>
    </div>
  )
}
