import React from 'react'

const Page = async ({ params }: { params: { id: string } }) => {
  const id = params.id
  return (
    <div>Page {id}</div>
  )
}

export default Page