import React, { useState } from 'react'
import patientsData from './data/patients.json'
import PatientList from './components/PatientList'
import PatientDetails from './components/PatientDetails'

export default function App() {
  const [patients, setPatients] = useState(patientsData)
  const [selectedId, setSelectedId] = useState(patients[0]?.id ?? null)

  function toggleFavorite(id) {
    setPatients(p => p.map(x => (x.id === id ? { ...x, favorite: !x.favorite } : x)))
  }

  function addNote(id, note) {
    setPatients(p => p.map(x => (x.id === id ? { ...x, notes: [...(x.notes||[]), note] } : x)))
  }

  const selectedPatient = patients.find(p => p.id === selectedId) || null

  return (
    <div className="app">
      <header>
        <h1>Medical Records</h1>
      </header>
      <main>
        <aside>
          <PatientList
            patients={patients}
            onSelect={setSelectedId}
            onToggleFavorite={toggleFavorite}
            selectedId={selectedId}
          />
        </aside>
        <section>
          {selectedPatient ? (
            <PatientDetails patient={selectedPatient} onAddNote={addNote} />
          ) : (
            <div>Select a patient</div>
          )}
        </section>
      </main>
    </div>
  )
}
