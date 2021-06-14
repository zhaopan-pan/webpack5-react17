import React, { useState } from 'react'
import Index from '@/views/index'
// import history from 'history'

const App = () => {
    const [haha, setHaha] = useState('12')
    return (
        <div>
            <div onClick={() => setHaha('212122')}>click</div>
            <span>{haha}</span>
            <button
                onClick={() => {
                    // history['push']('/about')
                }}
            ></button>
            <Index />
        </div>
    )
}
export default App
