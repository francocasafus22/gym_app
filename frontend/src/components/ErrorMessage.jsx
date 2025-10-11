import React from 'react'

export default function ErrorMessage({children}) {
  return (
    <p className="text-red-500 text-center mt-2 w-full bg-red-100 py-2 rounded-md">
                    {children}
    </p>
  )
}
