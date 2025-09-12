import React from 'react'

const RedSpot = ({ cl }: { cl?: string }) => {
  return (
    <div className={"w-1/2 aspect-square opacity-20 bg-orange-600 rounded-full blur-[200px] -z-100 " + cl}/>
  )
}

export default RedSpot