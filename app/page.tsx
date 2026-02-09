import React from 'react'
import Link from 'next/link'
function Home() {

  return (
    
    <div>
<h1>this is home page</h1><br />
    <Link href="/register">
      <h2 className="cursor-pointer hover:underline">
        REGISTER
      </h2>
    </Link>
      <Link href="/login">
      <h2 className="cursor-pointer hover:underline">
        LOGIN
      </h2>
    </Link>
      <Link href="/departments">
      <h2 className="cursor-pointer hover:underline">
        DEPARTMENT
      </h2>
    </Link>
    </div>
    
  )
}

export default Home