"use client";
import React, { useEffect, useRef } from 'react';

export function Meow() {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const innerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const el = containerRef.current;
        const inner = innerRef.current;
        if (!el || !inner) return;

        // respect accessibility preferences
        const prefersReduced = typeof window !== 'undefined' && window.matchMedia
            ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
            : false;

        // disable on touch devices
        const isTouch = typeof navigator !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0);
        if (prefersReduced || isTouch) {
            // simple static transform or subtle transition for reduced motion
            inner.style.transition = prefersReduced ? 'transform 240ms ease' : '';
            inner.style.willChange = 'transform';
            return;
        }

        const maxDeg = 12; // maximum rotation in degrees
        let targetX = 0; // rotateX (tilt up/down)
        let targetY = 0; // rotateY (tilt left/right)
        let currentX = 0;
        let currentY = 0;
        const ease = 0.12;
        let rafId = 0;

        const setTargetFromPointer = (clientX: number, clientY: number) => {
            const rect = el.getBoundingClientRect();
            const cx = rect.left + rect.width / 2;
            const cy = rect.top + rect.height / 2;
            const dx = (clientX - cx) / (rect.width / 2); // -1..1
            const dy = (clientY - cy) / (rect.height / 2); // -1..1

            // make rotation follow the cursor: move right -> rotateY positive (look right)
            targetY = Math.max(-1, Math.min(1, dx)) * maxDeg;
            // move down -> rotateX positive (tilt down) -> invert sign if previously reversed
            targetX = Math.max(-1, Math.min(1, dy)) * -maxDeg;
        };

        const onMove = (e: MouseEvent | TouchEvent) => {
            let clientX: number, clientY: number;
            if ('touches' in e) {
                if (e.touches.length === 0) return;
                clientX = e.touches[0].clientX;
                clientY = e.touches[0].clientY;
            } else {
                clientX = (e as MouseEvent).clientX;
                clientY = (e as MouseEvent).clientY;
            }
            setTargetFromPointer(clientX, clientY);
        };

        const onLeave = () => {
            targetX = 0;
            targetY = 0;
        };

        const animate = () => {
            // lerp current towards target
            currentX += (targetX - currentX) * ease;
            currentY += (targetY - currentY) * ease;

            // apply transform
            inner.style.transform = `perspective(800px) rotateX(${currentX}deg) rotateY(${currentY}deg)`;

            // small threshold to stop animation when near target
            if (Math.abs(currentX - targetX) > 0.01 || Math.abs(currentY - targetY) > 0.01) {
                rafId = requestAnimationFrame(animate);
            } else {
                // keep a small RAF to remain responsive to small moves
                rafId = requestAnimationFrame(animate);
            }
        };

        el.addEventListener('mousemove', onMove as EventListener);
        el.addEventListener('touchmove', onMove as EventListener, { passive: true } as any);
        el.addEventListener('mouseleave', onLeave);

        // start animation loop
        rafId = requestAnimationFrame(animate);

        // setup hints
        inner.style.transformStyle = 'preserve-3d';
        inner.style.willChange = 'transform';

        return () => {
            cancelAnimationFrame(rafId);
            el.removeEventListener('mousemove', onMove as EventListener);
            el.removeEventListener('touchmove', onMove as EventListener as any);
            el.removeEventListener('mouseleave', onLeave);
        };
    }, []);

    return (
        <div ref={containerRef} className="flex justify-center items-center min-h-screen w-full">
            <div ref={innerRef} className="relative size-1/3" style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}>
                {/* face */}
                <svg
                    className=""
                    viewBox="0 0 583 597"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="xMidYMid meet"
                >
                    <g filter="url(#filter0_f_115_702)">
                        <ellipse
                            cx="282.151"
                            cy="357.716"
                            rx="204.5"
                            ry="177.5"
                            fill="url(#paint0_radial_115_702)"
                        />
                    </g>
                    <foreignObject
                        x="-88.0001"
                        y="-88.0001"
                        width="758.791"
                        height="686.813"
                    >
                        <div
                            style={{
                                backdropFilter: 'blur(79.95px)',
                                clipPath: 'url(#bgblur_0_115_702_clip_path)',
                                height: '100%',
                                width: '100%',
                            }}
                        ></div>
                    </foreignObject>
                    <g filter="url(#filter1_f_115_702)">
                        <ellipse
                            cx="291.395"
                            cy="255.406"
                            rx="219.5"
                            ry="183.5"
                            transform="rotate(-179.294 291.395 255.406)"
                            fill="url(#paint1_linear_115_702)"
                        />
                    </g>
                    <foreignObject
                        x="21.4573"
                        y="0.0100212"
                        width="546"
                        height="543"
                    >
                        <div
                            style={{
                                backdropFilter: 'blur(7.58px)',
                                clipPath: 'url(#bgblur_1_115_702_clip_path)',
                                height: '100%',
                                width: '100%',
                            }}
                        ></div>
                    </foreignObject>
                    <g filter="url(#filter2_ddii_115_702)">
                        <mask
                            id="path-3-outside-1_115_702"
                            maskUnits="userSpaceOnUse"
                            x="54.6509"
                            y="56.2161"
                            width="474"
                            height="471"
                            fill="black"
                        >
                            <rect
                                fill="white"
                                x="54.6509"
                                y="56.2161"
                                width="474"
                                height="471"
                            />
                            <path d="M527.651 291.716C527.651 421.227 421.99 526.216 291.651 526.216C161.312 526.216 55.6509 421.227 55.6509 291.716C55.6509 162.205 161.312 57.2161 291.651 57.2161C421.99 57.2161 527.651 162.205 527.651 291.716Z" />
                        </mask>
                        <path
                            d="M527.651 291.716C527.651 421.227 421.99 526.216 291.651 526.216C161.312 526.216 55.6509 421.227 55.6509 291.716C55.6509 162.205 161.312 57.2161 291.651 57.2161C421.99 57.2161 527.651 162.205 527.651 291.716Z"
                            fill="white"
                            fillOpacity="0.1"
                            style={{ mixBlendMode: 'plus-lighter' }}
                        />
                        <g
                            clipPath="url(#paint2_angular_115_702_clip_path)"
                            mask="url(#path-3-outside-1_115_702)"
                        >
                            <g transform="matrix(0.236 0 0 0.2345 55.6509 57.2161)">
                                <foreignObject
                                    x="-2004.26"
                                    y="-2004.26"
                                    width="4008.53"
                                    height="4008.53"
                                >
                                    <div
                                        style={{
                                            background:
                                                'conic-gradient(from 90deg, rgba(255, 255, 255, 0.0351) 0deg, rgba(255, 255, 255, 0) 7.90716deg, rgba(255, 255, 255, 0.4) 97.9072deg, rgba(255, 255, 255, 0) 187.907deg, rgba(255, 255, 255, 0.4) 277.907deg, rgba(255, 255, 255, 0.0351) 360deg)',
                                            height: '100%',
                                            width: '100%',
                                            opacity: 1,
                                        }}
                                    ></div>
                                </foreignObject>
                            </g>
                        </g>
                        <path
                            d="M527.651 291.716H526.651C526.651 420.669 421.444 525.216 291.651 525.216V526.216V527.216C422.536 527.216 528.651 421.785 528.651 291.716H527.651ZM291.651 526.216V525.216C161.858 525.216 56.6509 420.669 56.6509 291.716H55.6509H54.6509C54.6509 421.785 160.765 527.216 291.651 527.216V526.216ZM55.6509 291.716H56.6509C56.6509 162.764 161.858 58.2161 291.651 58.2161V57.2161V56.2161C160.765 56.2161 54.6509 161.647 54.6509 291.716H55.6509ZM291.651 57.2161V58.2161C421.444 58.2161 526.651 162.764 526.651 291.716H527.651H528.651C528.651 161.647 422.536 56.2161 291.651 56.2161V57.2161Z"
                            style={{ mixBlendMode: 'plus-lighter' }}
                            mask="url(#path-3-outside-1_115_702)"
                        />
                    </g>

                    {/* left eye */}
                    <ellipse
                        cx="205.64"
                        cy="283.378"
                        rx="18.1404"
                        ry="24.5418"
                        transform="rotate(-2.00809 205.64 283.378)"
                        fill="black"
                    />
                    {/* noise */}
                    <ellipse
                        cx="289.774"
                        cy="325.616"
                        rx="9.78876"
                        ry="15.7508"
                        transform="rotate(-87.747 289.774 325.616)"
                        fill="#C76B9C"
                    />
                    {/* left eye */}
                    <ellipse
                        cx="380.64"
                        cy="283.378"
                        rx="18.1404"
                        ry="24.5418"
                        transform="rotate(-2.00809 380.64 283.378)"
                        fill="black"
                    />
                    <defs>
                        <filter
                            id="filter0_f_115_702"
                            x="15.9509"
                            y="118.516"
                            width="532.4"
                            height="478.4"
                            filterUnits="userSpaceOnUse"
                            colorInterpolationFilters="sRGB"
                        >
                            <feFlood
                                floodOpacity="0"
                                result="BackgroundImageFix"
                            />
                            <feBlend
                                mode="normal"
                                in="SourceGraphic"
                                in2="BackgroundImageFix"
                                result="shape"
                            />
                            <feGaussianBlur
                                stdDeviation="30.85"
                                result="effect1_foregroundBlur_115_702"
                            />
                        </filter>
                        <filter
                            id="filter1_f_115_702"
                            x="-88.0001"
                            y="-88.0001"
                            width="758.791"
                            height="686.813"
                            filterUnits="userSpaceOnUse"
                            colorInterpolationFilters="sRGB"
                        >
                            <feFlood
                                floodOpacity="0"
                                result="BackgroundImageFix"
                            />
                            <feBlend
                                mode="normal"
                                in="SourceGraphic"
                                in2="BackgroundImageFix"
                                result="shape"
                            />
                            <feGaussianBlur
                                stdDeviation="35.95"
                                result="effect1_foregroundBlur_115_702"
                            />
                        </filter>
                        <clipPath
                            id="bgblur_0_115_702_clip_path"
                            transform="translate(88.0001 88.0001)"
                        >
                            <ellipse
                                cx="291.395"
                                cy="255.406"
                                rx="219.5"
                                ry="183.5"
                                transform="rotate(-179.294 291.395 255.406)"
                            />
                        </clipPath>
                        <filter
                            id="filter2_ddii_115_702"
                            x="21.4573"
                            y="0.0100212"
                            width="546"
                            height="543"
                            filterUnits="userSpaceOnUse"
                            colorInterpolationFilters="sRGB"
                        >
                            <feFlood
                                floodOpacity="0"
                                result="BackgroundImageFix"
                            />
                            <feColorMatrix
                                in="SourceAlpha"
                                type="matrix"
                                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                result="hardAlpha"
                            />
                            <feMorphology
                                radius="8"
                                operator="erode"
                                in="SourceAlpha"
                                result="effect1_dropShadow_115_702"
                            />
                            <feOffset dx="0.467732" dy="-3.36767" />
                            <feGaussianBlur stdDeviation="6" />
                            <feColorMatrix
                                type="matrix"
                                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"
                            />
                            <feBlend
                                mode="plus-darker"
                                in2="BackgroundImageFix"
                                result="effect1_dropShadow_115_702"
                            />
                            <feColorMatrix
                                in="SourceAlpha"
                                type="matrix"
                                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                result="hardAlpha"
                            />
                            <feMorphology
                                radius="12"
                                operator="erode"
                                in="SourceAlpha"
                                result="effect2_dropShadow_115_702"
                            />
                            <feOffset dx="2.80639" dy="-20.206" />
                            <feGaussianBlur stdDeviation="24" />
                            <feColorMatrix
                                type="matrix"
                                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"
                            />
                            <feBlend
                                mode="plus-darker"
                                in2="effect1_dropShadow_115_702"
                                result="effect2_dropShadow_115_702"
                            />
                            <feBlend
                                mode="normal"
                                in="SourceGraphic"
                                in2="effect2_dropShadow_115_702"
                                result="shape"
                            />
                            <feColorMatrix
                                in="SourceAlpha"
                                type="matrix"
                                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                result="hardAlpha"
                            />
                            <feMorphology
                                radius="241"
                                operator="erode"
                                in="SourceAlpha"
                                result="effect3_innerShadow_115_702"
                            />
                            <feOffset dx="-0.306365" dy="2.20583" />
                            <feGaussianBlur stdDeviation="2.31" />
                            <feComposite
                                in2="hardAlpha"
                                operator="arithmetic"
                                k2="-1"
                                k3="1"
                            />
                            <feColorMatrix
                                type="matrix"
                                values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.15 0"
                            />
                            <feBlend
                                mode="plus-lighter"
                                in2="shape"
                                result="effect3_innerShadow_115_702"
                            />
                            <feColorMatrix
                                in="SourceAlpha"
                                type="matrix"
                                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                result="hardAlpha"
                            />
                            <feMorphology
                                radius="12"
                                operator="erode"
                                in="SourceAlpha"
                                result="effect4_innerShadow_115_702"
                            />
                            <feOffset dx="-0.540231" dy="3.88966" />
                            <feGaussianBlur stdDeviation="4.62" />
                            <feComposite
                                in2="hardAlpha"
                                operator="arithmetic"
                                k2="-1"
                                k3="1"
                            />
                            <feColorMatrix
                                type="matrix"
                                values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.15 0"
                            />
                            <feBlend
                                mode="plus-lighter"
                                in2="effect3_innerShadow_115_702"
                                result="effect4_innerShadow_115_702"
                            />
                        </filter>
                        <clipPath
                            id="bgblur_1_115_702_clip_path"
                            transform="translate(-21.4573 -0.0100212)"
                        >
                            <path d="M527.651 291.716C527.651 421.227 421.99 526.216 291.651 526.216C161.312 526.216 55.6509 421.227 55.6509 291.716C55.6509 162.205 161.312 57.2161 291.651 57.2161C421.99 57.2161 527.651 162.205 527.651 291.716Z" />
                        </clipPath>
                        <clipPath id="paint2_angular_115_702_clip_path">
                            <path
                                d="M527.651 291.716H526.651C526.651 420.669 421.444 525.216 291.651 525.216V526.216V527.216C422.536 527.216 528.651 421.785 528.651 291.716H527.651ZM291.651 526.216V525.216C161.858 525.216 56.6509 420.669 56.6509 291.716H55.6509H54.6509C54.6509 421.785 160.765 527.216 291.651 527.216V526.216ZM55.6509 291.716H56.6509C56.6509 162.764 161.858 58.2161 291.651 58.2161V57.2161V56.2161C160.765 56.2161 54.6509 161.647 54.6509 291.716H55.6509ZM291.651 57.2161V58.2161C421.444 58.2161 526.651 162.764 526.651 291.716H527.651H528.651C528.651 161.647 422.536 56.2161 291.651 56.2161V57.2161Z"
                                style={{ mixBlendMode: 'plus-lighter' }}
                                mask="url(#path-3-outside-1_115_702)"
                            />
                        </clipPath>
                        <radialGradient
                            id="paint0_radial_115_702"
                            cx="0"
                            cy="0"
                            r="1"
                            gradientUnits="userSpaceOnUse"
                            gradientTransform="translate(282.151 357.716) rotate(90) scale(177.5 177.5)"
                        >
                            <stop offset="0.408654" stopColor="#EEE3B9" />
                            <stop offset="0.673077" stopColor="#E1BEBE" />
                            <stop offset="0.913462" stopColor="#D395C3" />
                        </radialGradient>
                        <linearGradient
                            id="paint1_linear_115_702"
                            x1="291.395"
                            y1="71.9064"
                            x2="291.395"
                            y2="438.906"
                            gradientUnits="userSpaceOnUse"
                        >
                            <stop offset="0.00961538" stopColor="#95B1C4" />
                            <stop offset="1" stopColor="#BF8CCC" />
                        </linearGradient>
                    </defs>
                </svg>

                {/* left ear */}
                <svg
                    className="absolute -top-8 -left-10 size-64 -rotate-[20deg]"
                    viewBox="0 0 272 330"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="xMidYMid meet"
                >
                    <foreignObject
                        x="23.8874"
                        y="19.9166"
                        width="228.973"
                        height="266.621"
                    >
                        <div
                            style={{
                                backdropFilter: 'blur(7.58px)',
                                clipPath: 'url(#bgblur_0_115_699_clip_path)',
                                height: '100%',
                                width: '100%',
                            }}
                        ></div>
                    </foreignObject>
                    <g filter="url(#filter0_ddii_115_699)">
                        <mask
                            id="path-1-outside-1_115_699"
                            maskUnits="userSpaceOnUse"
                            x="38.473"
                            y="53.8191"
                            width="186.436"
                            height="203.828"
                            fill="black"
                        >
                            <rect
                                fill="white"
                                x="38.473"
                                y="53.8191"
                                width="186.436"
                                height="203.828"
                            />
                            <path d="M84.1307 106.423C82.1912 82.7729 111.207 69.9789 127.36 87.3615L208.317 174.477C220.017 187.068 215.817 207.436 200.091 214.371L128.854 245.782C113.127 252.717 95.2555 242.081 93.8508 224.951L84.1307 106.423Z" />
                        </mask>
                        <path
                            d="M84.1307 106.423C82.1912 82.7729 111.207 69.9789 127.36 87.3615L208.317 174.477C220.017 187.068 215.817 207.436 200.091 214.371L128.854 245.782C113.127 252.717 95.2555 242.081 93.8508 224.951L84.1307 106.423Z"
                            fill="white"
                            fillOpacity="0.1"
                            style={{ mixBlendMode: 'plus-lighter' }}
                        />
                        <g
                            clipPath="url(#paint0_angular_115_699_clip_path)"
                            mask="url(#path-1-outside-1_115_699)"
                        >
                            <g transform="matrix(0.0782322 -0.034496 0.0574933 0.130387 0 68.9919)">
                                <foreignObject
                                    x="-2011.7"
                                    y="-2011.7"
                                    width="4023.39"
                                    height="4023.39"
                                >
                                    <div
                                        style={{
                                            background:
                                                'conic-gradient(from 90deg, rgba(255, 255, 255, 0.209) 0deg, rgba(255, 255, 255, 0.4) 42.9837deg, rgba(255, 255, 255, 0) 132.984deg, rgba(255, 255, 255, 0.4) 222.984deg, rgba(255, 255, 255, 0) 312.984deg, rgba(255, 255, 255, 0.209) 360deg)',
                                            height: '100%',
                                            width: '100%',
                                            opacity: 1,
                                        }}
                                    ></div>
                                </foreignObject>
                            </g>
                        </g>
                        <path
                            d="M208.317 174.477L207.585 175.158L208.317 174.477ZM127.36 87.3615L126.628 88.0423L127.36 87.3615ZM84.1307 106.423L83.1341 106.505L84.1307 106.423ZM127.36 87.3615L126.628 88.0423L207.585 175.158L208.317 174.477L209.05 173.797L128.093 86.6808L127.36 87.3615ZM200.091 214.371L199.687 213.456L128.45 244.867L128.854 245.782L129.257 246.697L200.494 215.286L200.091 214.371ZM93.8508 224.951L94.8474 224.869L85.1274 106.341L84.1307 106.423L83.1341 106.505L92.8541 225.032L93.8508 224.951ZM128.854 245.782L128.45 244.867C113.353 251.524 96.196 241.314 94.8474 224.869L93.8508 224.951L92.8541 225.032C94.3151 242.847 112.902 253.909 129.257 246.697L128.854 245.782ZM208.317 174.477L207.585 175.158C218.817 187.245 214.784 206.799 199.687 213.456L200.091 214.371L200.494 215.286C216.849 208.074 221.218 186.891 209.05 173.797L208.317 174.477ZM127.36 87.3615L128.093 86.6808C111.293 68.6029 81.117 81.9086 83.1341 106.505L84.1307 106.423L85.1274 106.341C83.2655 83.6372 111.12 71.3549 126.628 88.0423L127.36 87.3615Z"
                            style={{ mixBlendMode: 'plus-lighter' }}
                            mask="url(#path-1-outside-1_115_699)"
                        />
                    </g>
                    <g filter="url(#filter1_f_115_699)">
                        <path
                            d="M84.1307 106.423C82.1912 82.7729 111.207 69.9789 127.36 87.3615L208.317 174.477C220.017 187.068 215.817 207.436 200.091 214.371L128.854 245.782C113.127 252.717 95.2555 242.081 93.8508 224.951L84.1307 106.423Z"
                            fill="url(#paint1_linear_115_699)"
                            style={{ mixBlendMode: 'plus-lighter' }}
                        />
                    </g>
                    <defs>
                        <filter
                            id="filter0_ddii_115_699"
                            x="23.8874"
                            y="19.9166"
                            width="228.973"
                            height="266.621"
                            filterUnits="userSpaceOnUse"
                            colorInterpolationFilters="sRGB"
                        >
                            <feFlood
                                floodOpacity="0"
                                result="BackgroundImageFix"
                            />
                            <feColorMatrix
                                in="SourceAlpha"
                                type="matrix"
                                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                result="hardAlpha"
                            />
                            <feOffset dx="-1.8584" dy="-1.732" />
                            <feGaussianBlur stdDeviation="6" />
                            <feColorMatrix
                                type="matrix"
                                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"
                            />
                            <feBlend
                                mode="plus-darker"
                                in2="BackgroundImageFix"
                                result="effect1_dropShadow_115_699"
                            />
                            <feColorMatrix
                                in="SourceAlpha"
                                type="matrix"
                                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                result="hardAlpha"
                            />
                            <feOffset dx="-11.1504" dy="-10.392" />
                            <feGaussianBlur stdDeviation="24" />
                            <feColorMatrix
                                type="matrix"
                                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"
                            />
                            <feBlend
                                mode="plus-darker"
                                in2="effect1_dropShadow_115_699"
                                result="effect2_dropShadow_115_699"
                            />
                            <feBlend
                                mode="normal"
                                in="SourceGraphic"
                                in2="effect2_dropShadow_115_699"
                                result="shape"
                            />
                            <feColorMatrix
                                in="SourceAlpha"
                                type="matrix"
                                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                result="hardAlpha"
                            />
                            <feOffset dx="1.21725" dy="1.13446" />
                            <feGaussianBlur stdDeviation="2.31" />
                            <feComposite
                                in2="hardAlpha"
                                operator="arithmetic"
                                k2="-1"
                                k3="1"
                            />
                            <feColorMatrix
                                type="matrix"
                                values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.15 0"
                            />
                            <feBlend
                                mode="plus-lighter"
                                in2="shape"
                                result="effect3_innerShadow_115_699"
                            />
                            <feColorMatrix
                                in="SourceAlpha"
                                type="matrix"
                                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                result="hardAlpha"
                            />
                            <feOffset dx="2.14645" dy="2.00046" />
                            <feGaussianBlur stdDeviation="4.62" />
                            <feComposite
                                in2="hardAlpha"
                                operator="arithmetic"
                                k2="-1"
                                k3="1"
                            />
                            <feColorMatrix
                                type="matrix"
                                values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.15 0"
                            />
                            <feBlend
                                mode="plus-lighter"
                                in2="effect3_innerShadow_115_699"
                                result="effect4_innerShadow_115_699"
                            />
                        </filter>
                        <clipPath
                            id="bgblur_0_115_699_clip_path"
                            transform="translate(-23.8874 -19.9166)"
                        >
                            <path d="M84.1307 106.423C82.1912 82.7729 111.207 69.9789 127.36 87.3615L208.317 174.477C220.017 187.068 215.817 207.436 200.091 214.371L128.854 245.782C113.127 252.717 95.2555 242.081 93.8508 224.951L84.1307 106.423Z" />
                        </clipPath>
                        <clipPath id="paint0_angular_115_699_clip_path">
                            <path
                                d="M208.317 174.477L207.585 175.158L208.317 174.477ZM127.36 87.3615L126.628 88.0423L127.36 87.3615ZM84.1307 106.423L83.1341 106.505L84.1307 106.423ZM127.36 87.3615L126.628 88.0423L207.585 175.158L208.317 174.477L209.05 173.797L128.093 86.6808L127.36 87.3615ZM200.091 214.371L199.687 213.456L128.45 244.867L128.854 245.782L129.257 246.697L200.494 215.286L200.091 214.371ZM93.8508 224.951L94.8474 224.869L85.1274 106.341L84.1307 106.423L83.1341 106.505L92.8541 225.032L93.8508 224.951ZM128.854 245.782L128.45 244.867C113.353 251.524 96.196 241.314 94.8474 224.869L93.8508 224.951L92.8541 225.032C94.3151 242.847 112.902 253.909 129.257 246.697L128.854 245.782ZM208.317 174.477L207.585 175.158C218.817 187.245 214.784 206.799 199.687 213.456L200.091 214.371L200.494 215.286C216.849 208.074 221.218 186.891 209.05 173.797L208.317 174.477ZM127.36 87.3615L128.093 86.6808C111.293 68.6029 81.117 81.9086 83.1341 106.505L84.1307 106.423L85.1274 106.341C83.2655 83.6372 111.12 71.3549 126.628 88.0423L127.36 87.3615Z"
                                style={{ mixBlendMode: 'plus-lighter' }}
                                mask="url(#path-1-outside-1_115_699)"
                            />
                        </clipPath>
                        <filter
                            id="filter1_f_115_699"
                            x="62.7381"
                            y="58.0112"
                            width="173.572"
                            height="211.218"
                            filterUnits="userSpaceOnUse"
                            colorInterpolationFilters="sRGB"
                        >
                            <feFlood
                                floodOpacity="0"
                                result="BackgroundImageFix"
                            />
                            <feBlend
                                mode="normal"
                                in="SourceGraphic"
                                in2="BackgroundImageFix"
                                result="shape"
                            />
                            <feGaussianBlur
                                stdDeviation="10.65"
                                result="effect1_foregroundBlur_115_699"
                            />
                        </filter>
                        <linearGradient
                            id="paint1_linear_115_699"
                            x1="78.2322"
                            y1="34.496"
                            x2="193.219"
                            y2="295.27"
                            gradientUnits="userSpaceOnUse"
                        >
                            <stop stopColor="#EDA5DD" />
                            <stop offset="1" stopColor="#BBB1EC" />
                        </linearGradient>
                    </defs>
                </svg>

                {/* left ear */}
                <svg
                    className="absolute -top-8 -right-10 size-64 rotate-[69deg]"
                    viewBox="0 0 272 330"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="xMidYMid meet"
                >
                    <foreignObject
                        x="23.8874"
                        y="19.9166"
                        width="228.973"
                        height="266.621"
                    >
                        <div
                            style={{
                                backdropFilter: 'blur(7.58px)',
                                clipPath: 'url(#bgblur_0_115_699_clip_path)',
                                height: '100%',
                                width: '100%',
                            }}
                        ></div>
                    </foreignObject>
                    <g filter="url(#filter0_ddii_115_699)">
                        <mask
                            id="path-1-outside-1_115_699"
                            maskUnits="userSpaceOnUse"
                            x="38.473"
                            y="53.8191"
                            width="186.436"
                            height="203.828"
                            fill="black"
                        >
                            <rect
                                fill="white"
                                x="38.473"
                                y="53.8191"
                                width="186.436"
                                height="203.828"
                            />
                            <path d="M84.1307 106.423C82.1912 82.7729 111.207 69.9789 127.36 87.3615L208.317 174.477C220.017 187.068 215.817 207.436 200.091 214.371L128.854 245.782C113.127 252.717 95.2555 242.081 93.8508 224.951L84.1307 106.423Z" />
                        </mask>
                        <path
                            d="M84.1307 106.423C82.1912 82.7729 111.207 69.9789 127.36 87.3615L208.317 174.477C220.017 187.068 215.817 207.436 200.091 214.371L128.854 245.782C113.127 252.717 95.2555 242.081 93.8508 224.951L84.1307 106.423Z"
                            fill="white"
                            fillOpacity="0.1"
                            style={{ mixBlendMode: 'plus-lighter' }}
                        />
                        <g
                            clipPath="url(#paint0_angular_115_699_clip_path)"
                            mask="url(#path-1-outside-1_115_699)"
                        >
                            <g transform="matrix(0.0782322 -0.034496 0.0574933 0.130387 0 68.9919)">
                                <foreignObject
                                    x="-2011.7"
                                    y="-2011.7"
                                    width="4023.39"
                                    height="4023.39"
                                >
                                    <div
                                        style={{
                                            background:
                                                'conic-gradient(from 90deg, rgba(255, 255, 255, 0.209) 0deg, rgba(255, 255, 255, 0.4) 42.9837deg, rgba(255, 255, 255, 0) 132.984deg, rgba(255, 255, 255, 0.4) 222.984deg, rgba(255, 255, 255, 0) 312.984deg, rgba(255, 255, 255, 0.209) 360deg)',
                                            height: '100%',
                                            width: '100%',
                                            opacity: 1,
                                        }}
                                    ></div>
                                </foreignObject>
                            </g>
                        </g>
                        <path
                            d="M208.317 174.477L207.585 175.158L208.317 174.477ZM127.36 87.3615L126.628 88.0423L127.36 87.3615ZM84.1307 106.423L83.1341 106.505L84.1307 106.423ZM127.36 87.3615L126.628 88.0423L207.585 175.158L208.317 174.477L209.05 173.797L128.093 86.6808L127.36 87.3615ZM200.091 214.371L199.687 213.456L128.45 244.867L128.854 245.782L129.257 246.697L200.494 215.286L200.091 214.371ZM93.8508 224.951L94.8474 224.869L85.1274 106.341L84.1307 106.423L83.1341 106.505L92.8541 225.032L93.8508 224.951ZM128.854 245.782L128.45 244.867C113.353 251.524 96.196 241.314 94.8474 224.869L93.8508 224.951L92.8541 225.032C94.3151 242.847 112.902 253.909 129.257 246.697L128.854 245.782ZM208.317 174.477L207.585 175.158C218.817 187.245 214.784 206.799 199.687 213.456L200.091 214.371L200.494 215.286C216.849 208.074 221.218 186.891 209.05 173.797L208.317 174.477ZM127.36 87.3615L128.093 86.6808C111.293 68.6029 81.117 81.9086 83.1341 106.505L84.1307 106.423L85.1274 106.341C83.2655 83.6372 111.12 71.3549 126.628 88.0423L127.36 87.3615Z"
                            style={{ mixBlendMode: 'plus-lighter' }}
                            mask="url(#path-1-outside-1_115_699)"
                        />
                    </g>
                    <g filter="url(#filter1_f_115_699)">
                        <path
                            d="M84.1307 106.423C82.1912 82.7729 111.207 69.9789 127.36 87.3615L208.317 174.477C220.017 187.068 215.817 207.436 200.091 214.371L128.854 245.782C113.127 252.717 95.2555 242.081 93.8508 224.951L84.1307 106.423Z"
                            fill="url(#paint1_linear_115_699)"
                            style={{ mixBlendMode: 'plus-lighter' }}
                        />
                    </g>
                    <defs>
                        <filter
                            id="filter0_ddii_115_699"
                            x="23.8874"
                            y="19.9166"
                            width="228.973"
                            height="266.621"
                            filterUnits="userSpaceOnUse"
                            colorInterpolationFilters="sRGB"
                        >
                            <feFlood
                                floodOpacity="0"
                                result="BackgroundImageFix"
                            />
                            <feColorMatrix
                                in="SourceAlpha"
                                type="matrix"
                                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                result="hardAlpha"
                            />
                            <feOffset dx="-1.8584" dy="-1.732" />
                            <feGaussianBlur stdDeviation="6" />
                            <feColorMatrix
                                type="matrix"
                                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"
                            />
                            <feBlend
                                mode="plus-darker"
                                in2="BackgroundImageFix"
                                result="effect1_dropShadow_115_699"
                            />
                            <feColorMatrix
                                in="SourceAlpha"
                                type="matrix"
                                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                result="hardAlpha"
                            />
                            <feOffset dx="-11.1504" dy="-10.392" />
                            <feGaussianBlur stdDeviation="24" />
                            <feColorMatrix
                                type="matrix"
                                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"
                            />
                            <feBlend
                                mode="plus-darker"
                                in2="effect1_dropShadow_115_699"
                                result="effect2_dropShadow_115_699"
                            />
                            <feBlend
                                mode="normal"
                                in="SourceGraphic"
                                in2="effect2_dropShadow_115_699"
                                result="shape"
                            />
                            <feColorMatrix
                                in="SourceAlpha"
                                type="matrix"
                                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                result="hardAlpha"
                            />
                            <feOffset dx="1.21725" dy="1.13446" />
                            <feGaussianBlur stdDeviation="2.31" />
                            <feComposite
                                in2="hardAlpha"
                                operator="arithmetic"
                                k2="-1"
                                k3="1"
                            />
                            <feColorMatrix
                                type="matrix"
                                values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.15 0"
                            />
                            <feBlend
                                mode="plus-lighter"
                                in2="shape"
                                result="effect3_innerShadow_115_699"
                            />
                            <feColorMatrix
                                in="SourceAlpha"
                                type="matrix"
                                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                result="hardAlpha"
                            />
                            <feOffset dx="2.14645" dy="2.00046" />
                            <feGaussianBlur stdDeviation="4.62" />
                            <feComposite
                                in2="hardAlpha"
                                operator="arithmetic"
                                k2="-1"
                                k3="1"
                            />
                            <feColorMatrix
                                type="matrix"
                                values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.15 0"
                            />
                            <feBlend
                                mode="plus-lighter"
                                in2="effect3_innerShadow_115_699"
                                result="effect4_innerShadow_115_699"
                            />
                        </filter>
                        <clipPath
                            id="bgblur_0_115_699_clip_path"
                            transform="translate(-23.8874 -19.9166)"
                        >
                            <path d="M84.1307 106.423C82.1912 82.7729 111.207 69.9789 127.36 87.3615L208.317 174.477C220.017 187.068 215.817 207.436 200.091 214.371L128.854 245.782C113.127 252.717 95.2555 242.081 93.8508 224.951L84.1307 106.423Z" />
                        </clipPath>
                        <clipPath id="paint0_angular_115_699_clip_path">
                            <path
                                d="M208.317 174.477L207.585 175.158L208.317 174.477ZM127.36 87.3615L126.628 88.0423L127.36 87.3615ZM84.1307 106.423L83.1341 106.505L84.1307 106.423ZM127.36 87.3615L126.628 88.0423L207.585 175.158L208.317 174.477L209.05 173.797L128.093 86.6808L127.36 87.3615ZM200.091 214.371L199.687 213.456L128.45 244.867L128.854 245.782L129.257 246.697L200.494 215.286L200.091 214.371ZM93.8508 224.951L94.8474 224.869L85.1274 106.341L84.1307 106.423L83.1341 106.505L92.8541 225.032L93.8508 224.951ZM128.854 245.782L128.45 244.867C113.353 251.524 96.196 241.314 94.8474 224.869L93.8508 224.951L92.8541 225.032C94.3151 242.847 112.902 253.909 129.257 246.697L128.854 245.782ZM208.317 174.477L207.585 175.158C218.817 187.245 214.784 206.799 199.687 213.456L200.091 214.371L200.494 215.286C216.849 208.074 221.218 186.891 209.05 173.797L208.317 174.477ZM127.36 87.3615L128.093 86.6808C111.293 68.6029 81.117 81.9086 83.1341 106.505L84.1307 106.423L85.1274 106.341C83.2655 83.6372 111.12 71.3549 126.628 88.0423L127.36 87.3615Z"
                                style={{ mixBlendMode: 'plus-lighter' }}
                                mask="url(#path-1-outside-1_115_699)"
                            />
                        </clipPath>
                        <filter
                            id="filter1_f_115_699"
                            x="62.7381"
                            y="58.0112"
                            width="173.572"
                            height="211.218"
                            filterUnits="userSpaceOnUse"
                            colorInterpolationFilters="sRGB"
                        >
                            <feFlood
                                floodOpacity="0"
                                result="BackgroundImageFix"
                            />
                            <feBlend
                                mode="normal"
                                in="SourceGraphic"
                                in2="BackgroundImageFix"
                                result="shape"
                            />
                            <feGaussianBlur
                                stdDeviation="10.65"
                                result="effect1_foregroundBlur_115_699"
                            />
                        </filter>
                        <linearGradient
                            id="paint1_linear_115_699"
                            x1="78.2322"
                            y1="34.496"
                            x2="193.219"
                            y2="295.27"
                            gradientUnits="userSpaceOnUse"
                        >
                            <stop stopColor="#EDA5DD" />
                            <stop offset="1" stopColor="#BBB1EC" />
                        </linearGradient>
                    </defs>
                </svg>

                {/* LEFT whiskers */}
                <svg
                    className="absolute -left-10 top-2/5 size-2/5"
                    viewBox="0 0 300 90"
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="xMidYMid meet"
                    aria-hidden="true"
                >
                    <defs>
                        <filter
                            id="whiskerSoftL"
                            x="-50%"
                            y="-50%"
                            width="200%"
                            height="200%"
                        >
                            <feGaussianBlur stdDeviation="0.8" />
                        </filter>
                    </defs>
                    <g
                        transform="translate(200,45)"
                        filter="url(#whiskerSoftL)"
                    >
                        <path
                            d="M6 -12 Q -60 -18 -150 -26"
                            stroke="#111"
                            strokeWidth="6"
                            strokeLinecap="round"
                            fill="none"
                        />
                        <path
                            d="M10   0 Q -62   0 -180    0"
                            stroke="#111"
                            strokeWidth="5"
                            strokeLinecap="round"
                            fill="none"
                        />
                        <path
                            d="M6   12 Q -58  20 -150   26"
                            stroke="#111"
                            strokeWidth="5"
                            strokeLinecap="round"
                            fill="none"
                        />
                    </g>
                </svg>

                {/* RIGHT whiskers */}
                <svg
                    className="absolute -right-10 top-2/5 size-2/5"
                    viewBox="0 0 300 90"
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="xMidYMid meet"
                    aria-hidden="true"
                >
                    <defs>
                        <filter
                            id="whiskerSoftR"
                            x="-50%"
                            y="-50%"
                            width="200%"
                            height="200%"
                        >
                            <feGaussianBlur stdDeviation="0.8" />
                        </filter>
                    </defs>
                    <g
                        transform="translate(100,45)"
                        filter="url(#whiskerSoftR)"
                    >
                        <path
                            d="M-10 -10 Q 60 -18 150 -26"
                            stroke="#111"
                            strokeWidth="6"
                            strokeLinecap="round"
                            fill="none"
                        />
                        <path
                            d="M-14   0 Q 62   0 180    0"
                            stroke="#111"
                            strokeWidth="5"
                            strokeLinecap="round"
                            fill="none"
                        />
                        <path
                            d="M-10  12 Q 58  20 150   26"
                            stroke="#111"
                            strokeWidth="5"
                            strokeLinecap="round"
                            fill="none"
                        />
                    </g>
                </svg>
            </div>
        </div>
    );
}
