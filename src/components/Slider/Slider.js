import React, { useState, useEffect, useRef } from 'react';

import bg1 from '../../assets/images/bg_1.jpg';
import bg2 from '../../assets/images/bg_2.jpg';
import bg3 from '../../assets/images/bg_3.jpg';
import bg4 from '../../assets/images/bg_4.jpg';
import bg5 from '../../assets/images/bg_5.jpg';

const Slider = () => {
    const images = [bg1, bg2, bg3, bg4, bg5];

    const [currentIndex, setCurrentIndex] = useState(1); // Bắt đầu từ 1 vì ta sẽ clone thêm ảnh đầu và cuối
    const [isTransitioning, setIsTransitioning] = useState(false);
    const sliderRef = useRef(null);

    const cloneImages = [images[images.length - 1], ...images, images[0]]; // Clone thêm ảnh đầu và cuối

    const handleTransitionEnd = () => {
        setIsTransitioning(false);
        if (currentIndex === 0) {
            setCurrentIndex(images.length); // Quay về ảnh cuối cùng mà không có hiệu ứng
        }
        if (currentIndex === images.length + 1) {
            setCurrentIndex(1); // Quay về ảnh đầu mà không có hiệu ứng
        }
    };

    const nextItem = () => {
        if (isTransitioning) return;
        setCurrentIndex((prevIndex) => prevIndex + 1);
        setIsTransitioning(true);
    };

    const prevItem = () => {
        if (isTransitioning) return;
        setCurrentIndex((prevIndex) => prevIndex - 1);
        setIsTransitioning(true);
    };

    useEffect(() => {
        const nextButton = document.querySelector('[data-carousel-next]');
        const prevButton = document.querySelector('[data-carousel-prev]');

        nextButton.addEventListener('click', nextItem);
        prevButton.addEventListener('click', prevItem);

        return () => {
            nextButton.removeEventListener('click', nextItem);
            prevButton.removeEventListener('click', prevItem);
        };
    }, [prevItem, nextItem]);

    const slideStyle = {
        transform: `translateX(-${currentIndex * 100}%)`,
        transition: isTransitioning ? 'transform 0.7s ease-in-out' : 'none',
        display: 'flex',
        width: '100%',
    };

    return (
        <div id="controls-carousel" className="relative w-full" data-carousel="static">
            <div
                className="relative h-96 overflow-hidden border "
                style={{ height: '600px' }}
                ref={sliderRef}
                onTransitionEnd={handleTransitionEnd} 
            >
                <div className="flex h-full w-1/2" style={slideStyle}>
                    {cloneImages.map((img, index) => (
                        <div key={index} className="w-full flex-shrink-0 h-full">
                            <img
                                src={img}
                                className="w-full h-full object-cover object-center"
                            />
                        </div>
                    ))}
                </div>
            </div>
            <button type="button" className="absolute top-0 start-0 z-1 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-prev>
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                    <svg className="w-4 h-4 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4" />
                    </svg>
                    <span className="sr-only">Previous</span>
                </span>
            </button>
            <button type="button" className="absolute top-0 end-0 z-1 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-next>
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                    <svg className="w-4 h-4 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                    </svg>
                    <span className="sr-only">Next</span>
                </span>
            </button>
        </div>
    );
}

export default Slider;
