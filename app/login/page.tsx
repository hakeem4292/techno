"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
function Login() {
   let router=useRouter()
  let [formdata, Setformdata] = useState({
    email: "",
    password: ""
  })
  const handlechange = async (e) => {
   
    Setformdata({ ...formdata, [e.target.name]: e.target.value })
  }
  const handlesubmit = async (e) => {
     e.preventDefault()
    try {

      let responce = await axios.post("https://employee-react.onrender.com/emp/login", { ...formdata })
      console.log("responce.data:", responce.data);
      let token=responce.data.token
      console.log("token:",token);
      localStorage.setItem("token",token)

      alert("LOGIN  success full")
      return router.push('/departments')

    } catch (error) {
      console.error("error on LOGIN form:", error)
       alert("error ")
    }
  }
  return (
    <div>
      <form action="" onSubmit={handlesubmit}>
        <input type="email" placeholder='Email' name='email' onChange={handlechange} value={formdata.email} />
        <input type="password" placeholder='Password' name='password' onChange={handlechange} value={formdata.password} />
        <button type="submit" >LOGIN</button>
      </form>
    </div>
  )
}

export default Login