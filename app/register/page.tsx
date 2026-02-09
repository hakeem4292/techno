"use client"
import { useState } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"
function Register() {
  let router=useRouter()
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
    <div>
      <form action="" onSubmit={handlesubmit}>
        <input type="text" placeholder='Username' name='name' onChange={handlechange} value={formdata.name} />
        <input type="email" placeholder='Email' name='email' onChange={handlechange} value={formdata.email} />
        <input type="password" placeholder='Password' name='password' onChange={handlechange} value={formdata.password} />
        <button type="submit" >Register</button>
      </form>
    </div>
  )
}

export default Register