"use client"
import axios from 'axios'
import React from 'react'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

function department({ params }: any) {
  let [department, Setdepartment] = useState([])
  let router = useRouter()
  useEffect(() => {
    const fetchdept = async () => {
      try {

        const resolvedParams = await params
        console.log("params:", resolvedParams)
        console.log("params.deptId:", resolvedParams.deptId)
        let token = localStorage.getItem("token")
        let responce = await axios.get(`https://employee-react.onrender.com/emp/department/${resolvedParams.deptId}`, { headers: { Authorization: token } })
        console.log("responce.dataaa:", responce.data)
        Setdepartment(responce.data)

      } catch (error) {
        console.error("error on fetchigggg department:", error)

      }

    }
    fetchdept()
  }, [])

  const handleDeleteDepartment = async () => {
    try {
      const resolvedParams = await params
      let token = localStorage.getItem("token")
      console.log(token);
      
      await axios.delete(`https://employee-react.onrender.com/emp/delete-department/${resolvedParams.deptId}`, {
        headers: { Authorization: token }
      })
      console.log("Department deleted successfullyyy")

      router.push('/departments')
    } catch (error) {
      console.error("Error deleting department:", error)
    }
  }

  return (
    <div style={{ backgroundColor: "yellow", border: "3px solid " }}>
      <li>{department.department}</li>
      <li>{department.description}</li>
      <button
        onClick={handleDeleteDepartment}
        style={{
          backgroundColor: "red",
          color: "white",
          padding: "4px 8px",
          border: "2px solid darkred"
        }}
      >
        Delete Department
      </button>
    </div>
  )
}

export default department