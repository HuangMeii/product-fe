'use client';
import { useState, useEffect, useRef } from 'react';
import { motion, PanInfo } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

const cards = [
  {
    id: 1,
    title: 'Crystal Cave',
    imageUrl: 'https://images.unsplash.com/photo-1504208434309-cb69f4fe52b0?auto=format&fit=crop&w=500&q=80',
  },
  {
    id: 2,
    title: 'Sunset Peaks',
    imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=500&q=80',
  },
  {
    id: 3,
    title: 'Dream Garden',
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=500&q=80',
  },
];

export default function Carousel() {
  const [index, setIndex] = useState(1);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const delay = 4000;

  const goNext = () => setIndex((i) => (i + 1) % cards.length);
  const goPrev = () => setIndex((i) => (i - 1 + cards.length) % cards.length);

  const onDragEnd = (e: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.x < -50) goNext();
    if (info.offset.x > 50) goPrev();
  };

  useEffect(() => {
    timeoutRef.current = setTimeout(goNext, delay);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [index]);

  return (
    <div className="relative w-full bg-[#949292] flex flex-col items-center justify-center py-10">
      <div className="relative w-[90%] md:w-[70%] h-[400px] flex items-center justify-center overflow-hidden">
        <motion.div
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          onDragEnd={onDragEnd}
          className="flex w-full h-full items-center justify-center"
        >
          {cards.map((card, i) => {
            const offset = (i - index + cards.length) % cards.length;
            const distance = offset === 0 ? 0 : offset === 1 ? 50 : -50;
            const scale = offset === 0 ? 1 : 0.8;
            const opacity = offset === 0 ? 1 : 0.5;

            return (
              <motion.div
                key={card.id}
                animate={{
                  x: `${distance}%`,
                  scale,
                  opacity,
                  zIndex: offset === 0 ? 10 : 1,
                }}
                transition={{ type: 'spring', stiffness: 250, damping: 30 }}
                className="absolute rounded-3xl overflow-hidden shadow-2xl"
              >
                <Image
                  src={card.imageUrl}
                  alt={card.title}
                  width={400}
                  height={400}
                  className="w-[300px] md:w-[400px] h-[400px] object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent text-white font-semibold text-lg">
                  {card.title}
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Nút điều hướng */}
        <button
          onClick={goPrev}
          className="absolute left-5 bg-white/10 hover:bg-white/20 text-white rounded-full p-2 backdrop-blur-sm"
        >
          <ChevronLeft size={28} />
        </button>
        <button
          onClick={goNext}
          className="absolute right-5 bg-white/10 hover:bg-white/20 text-white rounded-full p-2 backdrop-blur-sm"
        >
          <ChevronRight size={28} />
        </button>
      </div>

      {/* Dấu chấm hiển thị vị trí */}
      <div className="flex gap-2 mt-6">
        {cards.map((_, i) => (
          <div
            key={i}
            className={`w-3 h-3 rounded-full transition-all ${
              i === index ? 'bg-pink-100 w-6' : 'bg-gray-500'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
