import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const navigate = useNavigate()

    const [roomID,setRoomID] = useState('')

    const handleSubmit = () => {
        navigate('/chat',{state:{room_id:roomID}})
    }

  return (
    <div className='home'>
        <h2>ChatRooms</h2>
        <input 
            type="text"
            placeholder='Enter Room ID' 
            onChange={(e)=>setRoomID(e.target.value)}
        /><br />
        <button onClick={handleSubmit}>Join</button>
    </div>
  )
}

export default Home