const AdminPage: React.FC = () => {
    return (
      <div className="min-h-screen bg-gray-100 p-2 md:w-[70%] md:mx-auto">
        {/* Header */}
        <div className="bg-white p-2 rounded-md mb-2">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-700">
              Jan 23, Morning
            </h2>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-600 transition">
              View All
            </button>
          </div>
        </div>
  
        {/* Stats Section */}
        <div className="grid grid-cols-3 gap-1">
          {/* Total Users */}
          <div className="bg-white p-6 rounded-md text-center">
            <h2 className="text-4xl font-bold text-blue-600">800</h2>
            <p className="text-gray-500">Total</p>
          </div>
  
          {/* Scanned Users */}
          <div className="bg-white p-6 rounded-md text-center">
            <h2 className="text-4xl font-bold text-green-600">356</h2>
            <p className="text-gray-500">Scanned</p>
          </div>
  
          {/* Unscanned Users */}
          <div className="bg-white p-6 rounded-md text-center">
            <h2 className="text-4xl font-bold text-red-600">444</h2>
            <p className="text-gray-500">Unscanned</p>
          </div>
        </div>
      </div>
    );
  };
  
  export default AdminPage;
  