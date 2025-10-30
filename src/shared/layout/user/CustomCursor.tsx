'use client';
import React, { useEffect, useRef } from 'react';

export default function CustomCursor() {
    const dotRef = useRef<HTMLDivElement | null>(null);
    const ringRef = useRef<HTMLDivElement | null>(null);
    const rafRef = useRef<number | null>(null);

    useEffect(() => {
        const dot = dotRef.current;
        const ring = ringRef.current;
        if (!dot || !ring) return;

        const prefersReduced =
            typeof window !== 'undefined' && window.matchMedia
                ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
                : false;

        const isTouch =
            typeof navigator !== 'undefined' &&
            ('ontouchstart' in window || navigator.maxTouchPoints > 0);
        if (prefersReduced || isTouch) {
            // don't enable custom cursor on touch or reduced-motion
            return;
        }

        // enable hiding native cursor
        document.body.classList.add('has-custom-cursor');

        let mouseX = window.innerWidth / 2;
        let mouseY = window.innerHeight / 2;
        let ringX = mouseX;
        let ringY = mouseY;

        const ease = 0.16; // ring smoothing

        const onMove = (e: MouseEvent) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            // move dot immediately
            dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
        };

        const onEnterInteractive = () => {
            document.body.setAttribute('data-cursor', 'hover');
        };
        const onLeaveInteractive = () => {
            document.body.removeAttribute('data-cursor');
        };

        const raf = () => {
            // lerp ring towards mouse
            ringX += (mouseX - ringX) * ease;
            ringY += (mouseY - ringY) * ease;
            ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
            rafRef.current = requestAnimationFrame(raf);
        };

        window.addEventListener('mousemove', onMove);

        // enlarge ring on interactive elements
        const interactiveSelector =
            'a, button, input, textarea, select, [data-cursor-target]';
        const onOver = (e: Event) => onEnterInteractive();
        const onOut = (e: Event) => onLeaveInteractive();

        document.querySelectorAll(interactiveSelector).forEach((el) => {
            el.addEventListener('mouseover', onOver);
            el.addEventListener('mouseout', onOut);
        });

        rafRef.current = requestAnimationFrame(raf);

        return () => {
            document.body.classList.remove('has-custom-cursor');
            window.removeEventListener('mousemove', onMove);
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
            document.querySelectorAll(interactiveSelector).forEach((el) => {
                el.removeEventListener('mouseover', onOver);
                el.removeEventListener('mouseout', onOut);
            });
        };
    }, []);

    return (
        <>
            <div ref={ringRef} className="custom-cursor-ring" aria-hidden />
            <div ref={dotRef} className="custom-cursor-dot" aria-hidden />
        </>
    );
}
