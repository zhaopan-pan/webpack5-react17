import { useState, useEffect } from 'react'

export default function useClickOutside(ref: HTMLElement | any) {
    const [outside, setOutside] = useState(false)
    useEffect(() => {
        const handleClickOutside = (e: Event) => {
            const { current = null } = ref
            if (current && !current.contains(e.target)) {
                setOutside(true)
            } else {
                setOutside(false)
            }
        }
        document.addEventListener('mousedown', e => handleClickOutside(e), false)
        return () => document.removeEventListener('mousedown', e => handleClickOutside(e), false)
    }, [])
    return { outside }
}
