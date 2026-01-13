"use client"
const ExploreMoreButton = () => {
  return (
    <button onClick={() => window.scrollTo({ top: document.getElementById('workshops')?.offsetTop, behavior: 'smooth' })} className='bg-secondary-500 hover:bg-secondary-700 text-white text-lg px-8 py-2 rounded-full'>Explore Workshops</button>
  )
}

export default ExploreMoreButton
