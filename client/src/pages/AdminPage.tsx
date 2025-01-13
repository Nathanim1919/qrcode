const AdminPage: React.FC = () => {
    const users = [
        {
            name: "John Doe",
            email: "jone@gmail.com"
        },
        {
            name: "Jane Doe",
            email: "jane@gmail.com"
        },
        {
            name: "John Doe",
            email: "jone@gmail.com"
        },
        {
            name: "Jane Doe",
            email: "jane@gmail.com"
        },
        {
            name: "John Doe",
            email: "jone@gmail.com"
        },
        {
            name: "Jane Doe",
            email: "jane@gmail.com"
        },
        {
            name: "John Doe",
            email: "jone@gmail.com"
        },
        {
            name: "Jane Doe",
            email: "jane@gmail.com"
        },
        {
            name: "John Doe",
            email: "jone@gmail.com"
        },
        {
            name: "Jane Doe",
            email: "jane@gmail.com"
        },
        {
            name: "John Doe",
            email: "jone@gmail.com"
        },
        {
            name: "Jane Doe",
            email: "jane@gmail.com"
        },
        {
            name: "John Doe",
            email: "jone@gmail.com"
        },
        {
            name: "Jane Doe",
            email: "jane@gmail.com"
        },
        {
            name: "John Doe",
            email: "jone@gmail.com"
        },
        {
            name: "Jane Doe",
            email: "jane@gmail.com"
        },
        {
            name: "John Doe",
            email: "jone@gmail.com"
        },
        {
            name: "Jane Doe",
            email: "jane@gmail.com"
        },
        {
            name: "John Doe",
            email: "jone@gmail.com"
        },
        {
            name: "Jane Doe",
            email: "jane@gmail.com"
        },
        {
            name: "John Doe",
            email: "jone@gmail.com"
        },
        {
            name: "Jane Doe",
            email: "jane@gmail.com"
        },
        {
            name: "John Doe",
            email: "jone@gmail.com"
        },
        {
            name: "Jane Doe",
            email: "jane@gmail.com"
        },
        {
            name: "John Doe",
            email: "jone@gmail.com"
        },
        {
            name: "Jane Doe",
            email: "jane@gmail.com"
        },
        {
            name: "John Doe",
            email: "jone@gmail.com"
        },
        {
            name: "Jane Doe",
            email: "jane@gmail.com"
        },
        {
            name: "John Doe",
            email: "jone@gmail.com"
        },
        {
            name: "Nathanim Tadele",
            email: "jane@gmail.com"
        },

    ]
    return (
      <div className="min-h-screen bg-gray-100 p-2 md:w-[70%] md:mx-auto max-h-screen overflow-hidden">
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
        <div className="bg-white mt-2">
            <div className="flex justify-center items-center p-2 bg-white">
                <form className="w-full">
                    <input type="text" placeholder="write user name"/>
                    <button type="submit">search</button>
                </form>
            </div>
            <div className="h-[65vh] overflow-y-auto">
                {
                    users.map(user => (
                        <div className="flex justify-between items-center text-gray-500">
                            <p>{user.name}</p>
                            <p>{user.email}</p>
                            <button>View</button>
                        </div>
                    ))
                }
            </div>
        </div>
      </div>
    );
  };
  
  export default AdminPage;
  