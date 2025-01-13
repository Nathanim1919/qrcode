import { useState } from "react";
import UserDetailCard from "../components/UserDetailCard";

const AdminPage: React.FC = () => {
    const users = [
        {
            name: "John Doe",
            email: "jone@gmail.com",
             phone: "0912345679",
            phone: "0912345679"
        },
        {
            name: "Jane Doe",
            email: "jane@gmail.com",
             phone: "0912345679"
        },
        {
            name: "John Doe",
            email: "jone@gmail.com",
             phone: "0912345679"
        },
        {
            name: "Jane Doe",
            email: "jane@gmail.com",
             phone: "0912345679"
        },
        {
            name: "John Doe",
            email: "jone@gmail.com",
             phone: "0912345679"
        },
        {
            name: "Jane Doe",
            email: "jane@gmail.com",
             phone: "0912345679"
        },
        {
            name: "John Doe",
            email: "jone@gmail.com",
             phone: "0912345679"
        },
        {
            name: "Jane Doe",
            email: "jane@gmail.com",
             phone: "0912345679"
        },
        {
            name: "John Doe",
            email: "jone@gmail.com",
             phone: "0912345679"
        },
        {
            name: "Jane Doe",
            email: "jane@gmail.com",
             phone: "0912345679"
        },
        {
            name: "John Doe",
            email: "jone@gmail.com",
             phone: "0912345679"
        },
        {
            name: "Jane Doe",
            email: "jane@gmail.com",
             phone: "0912345679"
        },
        {
            name: "John Doe",
            email: "jone@gmail.com",
             phone: "0912345679"
        },
        {
            name: "Jane Doe",
            email: "jane@gmail.com",
             phone: "0912345679"
        },
        {
            name: "John Doe",
            email: "jone@gmail.com",
             phone: "0912345679"
        },
        {
            name: "Jane Doe",
            email: "jane@gmail.com",
             phone: "0912345679"
        },
        {
            name: "John Doe",
            email: "jone@gmail.com",
             phone: "0912345679"
        },
        {
            name: "Jane Doe",
            email: "jane@gmail.com",
             phone: "0912345679"
        },
        {
            name: "John Doe",
            email: "jone@gmail.com",
             phone: "0912345679"
        },
        {
            name: "Jane Doe",
            email: "jane@gmail.com",
             phone: "0912345679"
        },
        {
            name: "John Doe",
            email: "jone@gmail.com",
             phone: "0912345679"
        },
        {
            name: "Jane Doe",
            email: "jane@gmail.com",
             phone: "0912345679"
        },
        {
            name: "John Doe",
            email: "jone@gmail.com",
             phone: "0912345679"
        },
        {
            name: "Jane Doe",
            email: "jane@gmail.com",
             phone: "0912345679"
        },
        {
            name: "John Doe",
            email: "jone@gmail.com",
             phone: "0912345679"
        },
        {
            name: "Jane Doe",
            email: "jane@gmail.com",
             phone: "0912345679"
        },
        {
            name: "John Doe",
            email: "jone@gmail.com",
             phone: "0912345679"
        },
        {
            name: "Jane Doe",
            email: "jane@gmail.com",
             phone: "0912345679"
        },
        {
            name: "John Doe",
            email: "jone@gmail.com",
             phone: "0912345679"
        },
        {
            name: "Nathanim Tadele",
            email: "jane@gmail.com",
             phone: "0912345679"
        },

    ]
    const [showUserDetailCard, setShowUserDetailCard] = useState(false);
    return (
      <div className="min-h-screen bg-white p-2 md:w-[100%] md:mx-auto max-h-screen overflow-hidden">
        {/* Header */}
        <UserDetailCard setShowUserDetailCard={setShowUserDetailCard} showUserDetailCard={showUserDetailCard}/>
        <div className="min-h-screen bg-white p-2 md:w-[70%] md:mx-auto max-h-screen overflow-hidden">
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
            <div className="h-[65vh] p-4 overflow-y-auto grid gap-1">
                {
                    users.map(user => (
                        <div className="flex border cursor-pointer hover:bg-gray-100 border-gray-200 p-1 justify-between items-center text-gray-500">
                            <p>{user.name}</p>
                            <p className="hidden md:block">{user.email}</p>
                            <p>{user.phone}</p>
                            <button
                                onClick={() => setShowUserDetailCard(true)}
                             className="text-blue-500 border border-sky-400 px-1 rounded-md">View</button>
                        </div>
                    ))
                }
            </div>
        </div>
        </div>
      </div>
    );
  };
  
  export default AdminPage;
  