import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { io } from 'socket.io-client'

const socket = io.connect('http://localhost:3000')

const Room = () => {
    const location = useLocation()
    const Room_id = location.state?.room_id || ''

    const [input, setInput] = useState('')
    const [messages, setMessages] = useState([])

    useEffect(() => {
        if (Room_id) {
            socket.emit('new-joined', Room_id)

            socket.on('receive-message', (message) => {
                setMessages((prevMessages) => [...prevMessages, message])
            })
        }

        // Clean up the effect
        return () => {
            socket.off('receive-message')
            socket.emit('leave-room', Room_id)
        }
    }, [Room_id])

    const handleSubmit = (e) => {
        e.preventDefault()
        if (input.trim()) {
            socket.emit('new-message', input, Room_id)
            setMessages((prevMessages) => [...prevMessages, input]) // Add the message to the local state immediately
            setInput('')
        }
    }

    return (
        <div className='Chatroom'>
            <h1>{Room_id}</h1>
            <ul className='messages'>
                {messages.map((message, index) => (
                    <li key={index}>{message}</li>
                ))}
            </ul>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder='Send a Message'
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
                <button type='submit'>Send</button>
            </form>
        </div>
    )
}

export default Room
