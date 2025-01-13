export const ScanningOption: React.FC = () => {
    return (
      <div className="fixed top-0 left-0 w-screen h-screen flex flex-col justify-center items-center bg-gradient-to-br from-blue-500 to-sky-300 text-white">
        {/* Header */}
        <h1 className="text-2xl w-[90%] mb-4 md:text-3xl font-bold  text-center">
          Select Scanning Option for <span className="underline">Jan 23</span>
        </h1>
  
        {/* Options Container */}
        <div className="grid grid-cols-2 gap-2 max-w-lg w-[90%] md:w-[700px]">
          {/* Morning Event Scan */}
          <button className="border border-gray-100 scanning-option-card bg-gradient-to-r from-blue-700 to-sky-500 hover:from-blue-800 hover:to-sky-600 text-center p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold">Morning Event Scan</h2>
            <p className="text-sm opacity-80 mt-2">Scan for the morning event session.</p>
          </button>
  
          {/* Afternoon Event Scan */}
          <button className="border border-gray-100 scanning-option-card bg-gradient-to-r from-green-600 to-teal-400 hover:from-green-700 hover:to-teal-500 text-center p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold">Afternoon Event Scan</h2>
            <p className="text-sm opacity-80 mt-2">Scan for the afternoon event session.</p>
          </button>
  
          {/* Morning Meal Scan */}
          <button className="border border-gray-100 scanning-option-card bg-gradient-to-r from-orange-500 to-yellow-400 hover:from-orange-600 hover:to-yellow-500 text-center p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold">Morning Meal Scan</h2>
            <p className="text-sm opacity-80 mt-2">Scan for the morning meal session.</p>
          </button>
  
          {/* Afternoon Meal Scan */}
          <button className="border border-gray-100 scanning-option-card bg-gradient-to-r from-pink-500 to-purple-400 hover:from-pink-600 hover:to-purple-500 text-center p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold">Afternoon Meal Scan</h2>
            <p className="text-sm opacity-80 mt-2">Scan for the afternoon meal session.</p>
          </button>
        </div>
      </div>
    );
  };
  
  export default ScanningOption;
  