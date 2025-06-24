// src/App.tsx
import UnitConverter from './components/UnitConverter';

function App() {
  return (
    <div className="min-h-screen bg-white text-black flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-gray-50 p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Unit Converter</h1>
        <UnitConverter />
      </div>
    </div>
  );
}

export default App;
