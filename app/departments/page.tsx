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
        if(!token){
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
           if(!token){
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
    <div>
      <button
        onClick={() => setShowForm(!showForm)}
        style={{
          backgroundColor: "blue",
          color: "white",
          padding: "10px 20px",
          margin: "10px",
          border: "2px solid darkblue"
        }}
      >
        {showForm ? "Cancel" : "Add Department"}
      </button>

      {showForm && (
        <form onSubmit={handleAddDepartment} style={{ margin: "10px", padding: "10px", border: "2px solid blue" }}>
          <div style={{ marginBottom: "10px" }}>
            <label>Department Name: </label>
            <input
              type="text"
              name='dept_name'
              value={deptName}
              onChange={(e) => setDeptName(e.target.value)}
              required
             
            />
          </div>
          <div style={{ marginBottom: "10px" }}>
            <label>Description: </label>
            <input
              type="text"
              name='description'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              
            />
          </div>
          <button
            type="submit"
  
          >
            Submit
          </button>
        </form>
      )}

      <ul style={{ backgroundColor: "green", border: "2px solid" }}>
        {Departments.map((department: any) => (
          <div style={{ backgroundColor: "green", border: "2px solid" }} key={department._id} onClick={() => router.push(`/department/${department._id}`)}>

            <li >{department.department}</li>
            <li>description:{department.description}</li>
          </div>
        ))}
      </ul>
    </div>

  )
}

export default Department