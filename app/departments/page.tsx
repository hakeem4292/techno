"use client"
import axios from 'axios'
import React from 'react'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
function Department() {
  let [Departments, SetDepartments] = useState([])
  let [showForm, setShowForm] = useState(false)
  let [deptName, setDeptName] = useState("")
  let [description, setDescription] = useState("")
  let router = useRouter()
  useEffect(() => {
    const Fetchdepartment = async () => {
      try {
        let token = localStorage.getItem("token")
        if (!token) {
          router.push("/login")
        }
        let responce = await axios.get("https://employee-react.onrender.com/emp/departments", { headers: { Authorization: token } })
        console.log("responce.data:", responce.data)
        SetDepartments(responce.data)

      } catch (error) {
        console.error("error on fetchig department:", error)

      }

    }
    Fetchdepartment()
  }, [])

  const handleAddDepartment = async (e: any) => {
    e.preventDefault()
    try {
      let token = localStorage.getItem("token")
      if (!token) {
        router.push("/login")
      }
      await axios.post("https://employee-react.onrender.com/emp/add-department", {
        dept_name: deptName,
        description: description
      }, { headers: { Authorization: token } })

      console.log("Department added successfully")
      // Clear form
      setDeptName("")
      setDescription("")
      setShowForm(false)
      // Refresh departments list
      const responce = await axios.get("https://employee-react.onrender.com/emp/departments", { headers: { Authorization: token } })
      SetDepartments(responce.data)
    } catch (error) {
      console.error("Error adding department:", error)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Departments</h1>

        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors mb-6"
        >
          {showForm ? "Cancel" : "Add Department"}
        </button>

        {showForm && (
          <form onSubmit={handleAddDepartment} className="bg-white p-6 rounded-lg shadow-md mb-6">
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Department Name:</label>
              <input
                type="text"
                name='dept_name'
                value={deptName}
                onChange={(e) => setDeptName(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Description:</label>
              <input
                type="text"
                name='description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 transition-colors"
            >
              Submit
            </button>
          </form>
        )}

        <div className="space-y-4">
          {Departments.map((department: any) => (
            <div
              key={department._id}
              onClick={() => router.push(`/department/${department._id}`)}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer border-l-4 border-green-500"
            >
              <h3 className="text-xl font-semibold mb-2">{department.department}</h3>
              <p className="text-gray-600">Description: {department.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Department