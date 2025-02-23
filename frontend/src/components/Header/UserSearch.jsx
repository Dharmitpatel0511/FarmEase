import { useState } from "react";
import axios from 'axios'
import {Loader2} from 'lucide-react'
import { NavLink } from "react-router-dom";


function UserSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)

  const handleSearch = (e) => {
    e.preventDefault()
    setLoading(true)
    axios.post(`${import.meta.env.VITE_BACKEND_API}/user/filteruser`, {search: searchTerm}, {
      withCredentials: true
    })
    .then((res)  => {
      if (res.status<400){
        setUsers(res.data.users)
      }
      else{
        console.log(res)
      }
      setLoading(false)
    })
    .catch((err) => {
      console.log(err)
      setLoading(false)
    })
  }
  

  return (
    <>
    {loading && (
                    <>
                    <div className="z-[100] opacity-10 top-0 left-0 min-h-[100vh] min-w-[100vw] fixed bg-black" />
                    <Loader2 className="z-[100] opacity top-[45vh] left-[45vw] min-h-[10vh] min-w-[10vw] fixed flex justify-center w-10 opacity-100 h-10 animate-spin text-gray-800 " />
                    </>
                )}
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-lg mt-10">
      <h2 className="text-2xl font-bold text-center mb-4">Search Users</h2>

      {/* Search Input */}
      <form onSubmit={handleSearch} className="flex gap-2">
        <input
          type="text"
          placeholder="Search by username or email..."
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown = {(e) => {
            if (e.key === 'Enter'){
              handleSearch(e)
            }
          }}
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Search
        </button>
      </form>

      {/* User List */}
      <div className="space-y-4">
        {users.length > 0 ? (
          users.map((user, index) => (
            <>
            <NavLink to={`/profile?username=${encodeURIComponent(user.username)}`} >
            <div key={index} className="flex items-center bg-gray-50 p-4 rounded-lg shadow">
              <img src={user.avatar} alt="Avatar" className="w-12 h-12 rounded-full mr-4" />
              <div>
                <h3 className="font-semibold text-lg">{user.username}</h3>
                <p className="text-gray-600">{user.email}</p>
                <span className={`text-sm px-2 py-1 rounded ${user.isFarmer ? "bg-green-200 text-green-700" : "bg-blue-200 text-blue-700"}`}>
                  {user.isFarmer ? "Farmer" : "Buyer"}
                </span>
              </div>
            </div>
            </NavLink>
            </>
          ))
        ) : (
          <p className="text-center text-gray-500">No users found.</p>
        )}
      </div>
    </div>
    </>
  );
}

export default UserSearch;