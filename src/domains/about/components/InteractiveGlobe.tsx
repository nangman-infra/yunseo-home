"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

const Globe = dynamic(() => import("react-globe.gl"), { ssr: false });

export function InteractiveGlobe() {
    const globeRef = useRef<any>(null);
    const [mounted, setMounted] = useState(false);

    // Dynamic width based on window to make it a huge background object
    const [dimensions, setDimensions] = useState({ width: 800, height: 800 });

    useEffect(() => {
        setMounted(true);
        if (typeof window !== "undefined") {
            // Set size dynamically depending on the screen size
            const size = Math.min(window.innerWidth, window.innerHeight) * 1.1;
            setDimensions({ width: size, height: size });

            const handleResize = () => {
                const newSize = Math.min(window.innerWidth, window.innerHeight) * 1.1;
                setDimensions({ width: newSize, height: newSize });
            };
            window.addEventListener('resize', handleResize);
            return () => window.removeEventListener('resize', handleResize);
        }
    }, []);

    useEffect(() => {
        if (globeRef.current) {
            const controls = globeRef.current.controls();
            controls.autoRotate = true;
            controls.autoRotateSpeed = 0.3; // Much slower for cinematic background
            controls.enableZoom = false; // Disable zooming
            controls.enablePan = false;
        }
    }, [mounted]);

    const GLOBE_IMAGE_URL = "//unpkg.com/three-globe/example/img/earth-dark.jpg";

    if (!mounted) {
        return null;
    }

    return (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-30 pointer-events-none mix-blend-screen">
            <Globe
                ref={globeRef}
                width={dimensions.width}
                height={dimensions.height}
                globeImageUrl={GLOBE_IMAGE_URL}
                backgroundColor="rgba(0,0,0,0)"
            />
        </div>
    );
}
