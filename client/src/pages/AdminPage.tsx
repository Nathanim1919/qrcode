import { useEffect, useState } from "react";
import UserDetailCard from "../components/UserDetailCard";
import ScanningOption from "../components/ScanOption";
import axios from "axios";
import { BASE_URL } from "../constants/config";


interface IUser {
    name: string;
    email: string;
    phone: string;
    address: string;
    uniqueId: string;
    qrCodeId: string;
}

const AdminPage: React.FC = () => {
    const [users, setUsers] = useState<IUser[]>([]);
    const [selectedUser, setSelectedUser] = useState<IUser | null>(null);


    const fetchUsers = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/users`);
            const data = response.data;
            setUsers(data);
        } catch (error) {
            console.log(error);
        }
    };


    useEffect(() => {
        fetchUsers();
    }, []);
   
    const [showUserDetailCard, setShowUserDetailCard] = useState(false);
    return (
      <div className="min-h-screen bg-white p-2 md:w-[100%] md:mx-auto max-h-screen overflow-hidden">
        {/* Header */}
        <ScanningOption/>
        <UserDetailCard selectedUser={selectedUser} setShowUserDetailCard={setShowUserDetailCard} showUserDetailCard={showUserDetailCard}/>
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
                                onClick={() => {
                                    setSelectedUser(user)
                                    setShowUserDetailCard(true)
                                }}
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
  