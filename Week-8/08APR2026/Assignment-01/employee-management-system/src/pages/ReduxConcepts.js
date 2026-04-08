import React from 'react';

const concepts = [
  {
    title: 'Task 1 — Store: Single Source of Truth',
    color: '#eff6ff', accent: '#2563eb', label: 'S',
    desc: 'The Redux store holds the entire application state as a plain JS object tree. All components read from this one store, ensuring consistency across the app.',
    code: `import { configureStore } from '@reduxjs/toolkit'
const store = configureStore({
  reducer: {
    employees: employeeReducer,
    auth: authReducer,
    ui: uiReducer,
  }
})
// store.getState() → full app state`,
  },
  {
    title: 'Task 2 — Actions: Plain JS Objects',
    color: '#f0fdf4', accent: '#16a34a', label: 'A',
    desc: 'Actions describe what happened. They must have a type field and optionally a payload. createSlice auto-generates action creators.',
    code: `// Dispatching an action
dispatch(addEmployee({
  id: Date.now(),
  fname: 'Priya',
  dept: 'Engineering',
}))
// type: 'employees/addEmployee'`,
  },
  {
    title: 'Task 3 — Reducers + Immutability',
    color: '#fef9c3', accent: '#a16207', label: 'R',
    desc: 'Reducers are pure functions: (state, action) → newState. Never mutate state directly. RTK uses Immer internally so you can write "mutating" syntax safely.',
    code: `addEmployee: (state, action) => {
  // Immer allows this — produces new state
  state.list.push(action.payload)
}
deleteEmployee: (state, action) => {
  state.list = state.list.filter(
    e => e.id !== action.payload
  )
}`,
  },
  {
    title: 'Task 4 — Redux Data Flow Cycle',
    color: '#fdf4ff', accent: '#9333ea', label: 'F',
    desc: 'Unidirectional data flow: Component → dispatch(action) → Middleware → Reducer → Store → UI re-renders.',
    steps: [
      'Component calls dispatch(action)',
      'Action travels through middleware (logger, thunk)',
      'Reducer receives action, returns new state',
      'Store updates with the new state tree',
      'Connected components re-render with fresh data',
    ],
  },
  {
    title: 'Task 5 — createSlice (Redux Toolkit)',
    color: '#fff7ed', accent: '#c2410c', label: 'C',
    desc: "RTK's createSlice generates action creators and reducer together, eliminating boilerplate switch statements.",
    code: `const employeeSlice = createSlice({
  name: 'employees',
  initialState: { list: [], loading: false },
  reducers: {
    addEmployee, editEmployee,
    deleteEmployee, setFilter,
  }
})
export const { addEmployee } = employeeSlice.actions`,
  },
  {
    title: 'Bonus — Middleware + Persistence',
    color: '#ecfdf5', accent: '#059669', label: 'M',
    desc: 'Logger middleware intercepts every action for debugging. State is persisted to localStorage so data survives page refreshes.',
    code: `// Logger middleware
const logger = store => next => action => {
  console.log('ACTION:', action.type)
  const result = next(action)
  console.log('STATE:', store.getState())
  return result
}
// Persist: store.subscribe(() =>
//   localStorage.setItem('state', ...)
// )`,
  },
];

export default function ReduxConcepts() {
  return (
    <div className="page-inner">
      <div className="redux-intro-card">
        <h2>What is Redux?</h2>
        <p>
          Redux is a <strong>predictable state container</strong> for JavaScript apps.
          It centralizes application state in a single store, making state mutations
          predictable, traceable, and debuggable. Use Redux for large-scale apps with
          complex shared state. <em>Avoid Redux for simple apps, local UI state, or
          when the team is unfamiliar with the pattern.</em>
        </p>
      </div>
      <div className="doc-grid">
        {concepts.map((c) => (
          <div className="doc-card" key={c.title}>
            <div className="doc-card-title">
              <div className="doc-card-icon" style={{ background: c.color, color: c.accent }}>{c.label}</div>
              {c.title}
            </div>
            <p>{c.desc}</p>
            {c.code && <pre className="code-block"><code>{c.code}</code></pre>}
            {c.steps && (
              <div className="flow-steps">
                {c.steps.map((s, i) => (
                  <div className="flow-step" key={i}>
                    <div className="flow-num">{i + 1}</div>
                    <div>{s}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}