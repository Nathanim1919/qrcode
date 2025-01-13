const UserDetailCard: React.FC = () => {
  return (
    <div className="fixed top-0 left-0 grid place-items-center w-screen h-screen bg-black/40 backdrop-blur-sm">
      <div className="w-[90%] md:max-w-[700px] max-h-[95vh] bg-white rounded-lg shadow-lg overflow-y-auto">
        {/* Header Section */}
        <div
          className="text-white sticky top-0 p-8 flex flex-col items-center
            before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-gray-800 before:rounded-br-full before:rounded-bl-full
          "
        >
          <h2 className="text-xl font-bold text-white relative z-10">
            Nathanim Tadele
          </h2>
          <p className="text-sm opacity-90">Admin</p>
        </div>

        {/* Details Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
          {/* Personal Info */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-gray-700">
              Personal Information
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <p className="font-medium text-gray-600">Email:</p>
                <p className="text-gray-700">nathanim@gmail.com</p>
              </div>
              <div className="flex justify-between">
                <p className="font-medium text-gray-600">Phone:</p>
                <p className="text-gray-700">0912345679</p>
              </div>
              <div className="flex justify-between">
                <p className="font-medium text-gray-600">Role:</p>
                <p className="text-gray-700">Admin</p>
              </div>
              <div className="flex justify-between">
                <p className="font-medium text-gray-600">Address:</p>
                <p className="text-gray-700">Addis Ababa</p>
              </div>
              <div className="flex justify-between">
                <p className="font-medium text-gray-600">Unique ID:</p>
                <p className="text-gray-700">#wls384747</p>
              </div>
            </div>
          </div>

          {/* QR Code Section */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-gray-700">
              Your QR Code
            </h3>
            <div className="bg-gray-200 h-40 w-full rounded-lg flex items-center justify-center">
              <p className="text-gray-500">QR Code Placeholder</p>
            </div>
            <button className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg font-medium hover:bg-blue-600 transition">
              Print QR Code
            </button>
          </div>
        </div>

        {/* Attendance Section */}
        <div className="p-6 bg-gray-50">
          <h3 className="font-bold text-lg text-gray-700 mb-4">Attendance</h3>
          <div className="space-y-6">
            {/* Attendance Day */}
            {["Jan 23", "Jan 24", "Jan 25"].map((day) => (
              <div key={day}>
                <h4 className="font-medium text-gray-600 mb-2">{day}</h4>
                <div className="flex justify-between">
                  <div className="flex-1 text-center">
                    <p className="font-medium text-sm text-gray-700">Morning</p>
                    <div className="flex justify-center gap-2 mt-2">
                      <div className="w-6 h-6 bg-green-500 rounded"></div>
                      <div className="w-6 h-6 bg-green-500 rounded"></div>
                    </div>
                  </div>
                  <div className="flex-1 text-center">
                    <p className="font-medium text-sm text-gray-700">
                      Afternoon
                    </p>
                    <div className="flex justify-center gap-2 mt-2">
                      <div className="w-6 h-6 bg-red-500 rounded"></div>
                      <div className="w-6 h-6 bg-red-500 rounded"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetailCard;
