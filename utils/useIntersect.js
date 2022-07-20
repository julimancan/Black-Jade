import { useEffect, useRef, useState } from "react"

export const useIntersect = ({root = null, rootMargin, threshold = 0}) => {
  const [entry, updateEntry]  = useState({})
  const [node, setNode] = useState(null)

  
  const observer = useRef(null)
  
  useEffect(() => {
    if (observer.current) observer.current.disconnect()
    
    const options = { root, rootMargin, threshold }
    observer.current = new window.IntersectionObserver(([entry]) => updateEntry(entry), options)
    

    const { current: currentObserver } = observer

    if (node) currentObserver.observe(node)

    return () => currentObserver.disconnect()
  }, [node, root, rootMargin, threshold])

  return [setNode, entry]
}