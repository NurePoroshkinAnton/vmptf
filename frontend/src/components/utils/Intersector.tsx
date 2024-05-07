import { useRef, useEffect } from "react"

interface IntersectorProps {
    callback: () => Promise<void>
}

export default function Intersector({ callback }: IntersectorProps) {
    const intersectionRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        const options = {
            root: null,
            rootMargin: "0px",
            threshold: 0.1,
        }

        const observedElement = intersectionRef.current

        if (!observedElement) {
            return
        }

        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                callback()
            }
        }, options)

        if (intersectionRef.current) {
            observer.observe(observedElement)
        }

        return () => {
            observer.unobserve(observedElement)
        }
    }, [callback])

    return (
        <div
            ref={intersectionRef}
            style={{ marginBlockStart: "auto", height: 1 }}
        />
    )
}

