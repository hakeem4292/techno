"use client"
import { useState } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"
function Register() {
  let router = useRouter()
  let [formdata, Setformdata] = useState({
    name: "",
    email: "",
    password: ""
  })
  const handlechange = async (e) => {

    Setformdata({ ...formdata, [e.target.name]: e.target.value })
  }
  const handlesubmit = async (e) => {
    e.preventDefault()
    try {

      let responce = await axios.post("https://employee-react.onrender.com/emp/register", { ...formdata })
      console.log("responce.data:", responce.data);
      alert("register success full")
      return router.push('/login')

    } catch (error) {
      console.error("error on register form:", error)
      alert("error ")
    }


  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        <form onSubmit={handlesubmit} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder='Username'
              name='name'
              onChange={handlechange}
              value={formdata.name}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <input
              type="email"
              placeholder='Email'
              name='email'
              onChange={handlechange}
              value={formdata.email}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <input
              type="password"
              placeholder='Password'
              name='password'
              onChange={handlechange}
              value={formdata.password}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  )
}

export default Register