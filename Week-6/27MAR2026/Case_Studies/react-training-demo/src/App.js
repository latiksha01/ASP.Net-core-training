// import React from "react";
// import ReactDOM from "react-dom/client";


// function App(){
//   const userName = "Alice Johnsan";
//   const userRole = "Admin";
//   const isLoggedIn = true;
//   const unreadMessages = 5;
//   const getGreeting = () => {
//     const hours = new Date().getHours();
//     if (hours < 12) return "Good morning";
//     if (hours < 18)  return "Good afternoon";
//     return "Good evening";
//   };

//   const notificationBadge = unreadMessages > 0 ? <span className="badge">{unreadMessages}</span> : null;
//   return (
//     <div>
//       <h1>{getGreeting()} {userName} !</h1>
//       <p>User Role : {userRole}</p>
//       {isLoggedIn ? (
//       <div>
//         <p> Yoou have {unreadMessages} unread messages</p>
//         {notificationBadge}
//       </div>
//       ):(
//         <p> Please log in to see your messages.</p>
//       )}

//       <ul>
//         {["Learn React", "Build a project", "Deploy to production"]
//         .map((task) => <li>{task}</li>)}
//       </ul>

//     </div>
//   );
// }

// const rootElement = document.getElementById("root");
// ReactDOM.render(<App />, rootElement);

//-----------------------------------------------------------------------------------------------------------------------

// import React, {useState} from "react";
// function App() {
//   const [count, setCount] = useState(0);
//   const [timestamp, setTimestamp] = useState(Date.now()); // Initialize with current timestamp

//   const updateTimestamp = () => {
//     setTimestamp(new Date().toLocaleDateString());
//   };

//   return (
//     <div>
//       <h1> Virtual DOM</h1>
//       <div style={{padding: '20px', border: '1px solid #ccc'}}>
//         <h2>Counter: {count}</h2>
//         <button onClick = {() => setCount(count + 1)}>Increment(Re-renders)</button>
//       </div>

//       <div style={{padding: '20px', marginTop: '20px', border: '1px solid #ccc'}}>
//         <h2>Timestamp: {timestamp}</h2>
//         <button onClick={updateTimestamp}>Update Time (Only this changes)</button>
//       </div>
//       <p style={{color:'gray'}}>Static content- React doesn't touch this</p>

//     </div>
//   );
// }

// export default App;

//-----------------------------------------------------------------------------------------------------------------------

// import React from 'react';
// import Header from './components/Header';
// import Card from './components/Card';


// function App() {
  // const projects = [
  //   { id: 1, title: 'React App', content: 'A modern web application', icon: '⚛️', featured: true },
  //   { id: 2, title: 'API Service', content: 'RESTful API integration', icon: '🔗'},
  //   { id: 3, title: 'Mobile App', content: 'React Native project', icon: '📱'}
  // ];

  // return (
  //   <div>
  //     <Header
  //       title="Component Composition Demo"
  //       subtitle="Building UIs from reusable pieces"
  //     />

  //     <div
  //       style={{
  //         display: 'flex',
  //         justifyContent: 'center',
  //         flexWrap: 'wrap',
  //         padding: '20px'
  //       }}
  //     >
  //       {projects.map((project) => (
  //         <Card
  //           key={project.id}
  //           title={project.title}
  //           content={project.content}
  //           icon={project.icon}
  //           isFeatured={project.featured}
  //         />
  //       ))}
  //     </div>
  //   </div>
  // );
// }

// export default App;

//-----------------------------------------------------------------------------------------------------------------------

// import UserProfile from './components/UserProfile';
// function App() {
// const handleEdit = () => {
//     alert('Edit button clicked');
//   };
//   return(
//     <div style={{padding: '20px'}}>
//       <h1>Props Validation Demo</h1>
//       <UserProfile name="John Doe" age={30} email="3oY8R@example.com" isActive ={true} hobbies={['Reading','Coding', 'Gaming']} onEdit={handleEdit} />
//       <UserProfile name="Jane Smith" age="twenty" email="3jane@gmail.com"  onEdit={handleEdit} />
//     </div>
//   )
// }

// export default App;

//-----------------------------------------Todo App------------------------------------------------------------------------------
import React, { useState } from 'react';
import TodoForm from './components/TodoForm';
import TodoItem from './components/TodoItems';
import TodoStats from './components/TodoStatus';

function App() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn React Props', completed: true },
    { id: 2, text: 'Build a Todo App', completed: false },
    { id: 3, text: 'Master Component Communication', completed: false }
  ]);
  
  // Add new todo - receives data from child (TodoForm)
  const addTodo = (text) => {
    const newTodo = {
      id: Date.now(),
      text: text,
      completed: false
    };
    setTodos([...todos, newTodo]);
  };
  
  // Toggle todo status - receives data from child (TodoItem)
  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };
  
  // Delete todo - receives data from child (TodoItem)
  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };
  
  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <h1>📝 Todo App - Communication Patterns</h1>
      <p style={{ color: '#666' }}>
        <strong>Patterns shown:</strong><br/>
        • Parent → Child: Props passed to TodoForm, TodoItem, TodoStats<br/>
        • Child → Parent: Callbacks (addTodo, toggleTodo, deleteTodo)<br/>
        • Sibling Communication: TodoForm updates state, TodoStats displays it
      </p>
      
      {/* Child to Parent: TodoForm sends data UP via onAddTodo */}
      <TodoForm onAddTodo={addTodo} />
      
      {/* Parent to Child: Stats receives todos via props */}
      <TodoStats todos={todos} />
      
      {/* Parent to Child: TodoItem receives data and callbacks */}
      <div>
        <h3>Your Tasks</h3>
        {todos.length === 0 ? (
          <p>No tasks yet. Add one above!</p>
        ) : (
          todos.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default App;
