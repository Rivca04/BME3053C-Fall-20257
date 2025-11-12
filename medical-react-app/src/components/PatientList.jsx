import React from 'react'

export default function PatientList({ patients, onSelect, onToggleFavorite, selectedId }) {
  return (
    <div className="patient-list">
      {patients.map(p => (
        <div key={p.id} className={`patient-item ${p.id === selectedId ? 'selected' : ''}`}>
          <div onClick={() => onSelect(p.id)} className="patient-summary">
            <div className="name">{p.name}</div>
            <div className="meta">{p.age}y • {p.gender}</div>
          </div>
          <div className="actions">
            <button onClick={() => onToggleFavorite(p.id)} aria-label="toggle favorite">
              {p.favorite ? '★' : '☆'}
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
