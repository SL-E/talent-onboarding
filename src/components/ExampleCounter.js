// src/components/ExampleCounter.js

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement } from '../redux/slices/exampleSlices';

const ExampleCounter = () => {
  const count = useSelector((state) => state.example.value);
  const dispatch = useDispatch();

  return (
    <div className="p-4 text-center">
      <h1 className="text-xl font-bold">Counter: {count}</h1>
      <div className="mt-4 flex justify-center gap-2">
        <button className="bg-blue-500 text-white px-3 py-1 rounded" onClick={() => dispatch(increment())}>
          +
        </button>
        <button className="bg-red-500 text-white px-3 py-1 rounded" onClick={() => dispatch(decrement())}>
          -
        </button>
      </div>
    </div>
  );
};

export default ExampleCounter;