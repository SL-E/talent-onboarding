// App.js
import React from 'react';
import ExampleCounter from './components/ExampleCounter';

function App() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Redux Counter Example</h1>
      <ExampleCounter />
    </div>
  );
}

export default App;