import React from 'react'
import Link from 'next/link'
function Home() {

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96 text-center">
        <h1 className="text-3xl font-bold mb-8">Welcome Home</h1>

        <div className="space-y-4">
          <Link href="/register">
            <div className="bg-blue-500 text-white py-3 px-6 rounded-md hover:bg-blue-600 transition-colors cursor-pointer">
              Register
            </div>
          </Link>

          <Link href="/login">
            <div className="bg-green-500 text-white py-3 px-6 rounded-md hover:bg-green-600 transition-colors cursor-pointer">
              Login
            </div>
          </Link>

          <Link href="/departments">
            <div className="bg-purple-500 text-white py-3 px-6 rounded-md hover:bg-purple-600 transition-colors cursor-pointer">
              Departments
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Home