'use client'

import { useState, useEffect, useCallback } from 'react'

interface GalleryImage {
  url: string
  imgix_url: string
}

interface GalleryViewerProps {
  images: GalleryImage[]
  projectTitle: string
}

export default function GalleryViewer({ images, projectTitle }: GalleryViewerProps) {
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)

  const openFullscreen = (index: number) => {
    setCurrentIndex(index)
    setIsFullscreen(true)
  }

  const closeFullscreen = () => {
    setIsFullscreen(false)
  }

  const goToNext = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
  }, [images.length])

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)
  }, [images.length])

  const goToImage = (index: number) => {
    setCurrentIndex(index)
  }

  // Keyboard navigation
  useEffect(() => {
    if (!isFullscreen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Escape':
          closeFullscreen()
          break
        case 'ArrowLeft':
          goToPrevious()
          break
        case 'ArrowRight':
          goToNext()
          break
        default:
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isFullscreen, goToNext, goToPrevious])

  // Prevent body scroll when fullscreen is open
  useEffect(() => {
    if (isFullscreen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isFullscreen])

  const currentImage = images[currentIndex]
  const currentImageUrl = currentImage?.imgix_url 
    ? `${currentImage.imgix_url}?w=2000&h=1500&fit=max&auto=format,compress`
    : currentImage?.url

  return (
    <>
      {/* Gallery Grid */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Gallery</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((image, index) => {
            const imageUrl = image.imgix_url 
              ? `${image.imgix_url}?w=800&h=600&fit=crop&auto=format,compress`
              : image.url

            return (
              <button
                key={index}
                onClick={() => openFullscreen(index)}
                className="relative aspect-w-4 aspect-h-3 group cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-lg"
              >
                <img
                  src={imageUrl}
                  alt={`${projectTitle} - Image ${index + 1}`}
                  className="w-full h-64 object-cover rounded-lg shadow-md group-hover:shadow-lg transition-shadow duration-300"
                  width={800}
                  height={600}
                />
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity duration-300 rounded-lg flex items-center justify-center">
                  <svg 
                    className="w-12 h-12 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                  </svg>
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* Fullscreen Gallery Viewer */}
      {isFullscreen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-95 flex flex-col">
          {/* Header with close button */}
          <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between p-4 bg-gradient-to-b from-black/50 to-transparent">
            <div className="text-white text-sm">
              {currentIndex + 1} / {images.length}
            </div>
            <button
              onClick={closeFullscreen}
              className="text-white hover:text-gray-300 transition-colors p-2 rounded-full hover:bg-white/10"
              aria-label="Close fullscreen"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Main image area */}
          <div className="flex-1 flex items-center justify-center p-4 pt-20 pb-32">
            <img
              src={currentImageUrl}
              alt={`${projectTitle} - Image ${currentIndex + 1}`}
              className="max-w-full max-h-full object-contain"
            />
          </div>

          {/* Navigation arrows */}
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors p-3 rounded-full hover:bg-white/10"
            aria-label="Previous image"
          >
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors p-3 rounded-full hover:bg-white/10"
            aria-label="Next image"
          >
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Thumbnail strip */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide justify-center">
              {images.map((image, index) => {
                const thumbUrl = image.imgix_url 
                  ? `${image.imgix_url}?w=200&h=150&fit=crop&auto=format,compress`
                  : image.url

                return (
                  <button
                    key={index}
                    onClick={() => goToImage(index)}
                    className={`flex-shrink-0 transition-all duration-200 ${
                      index === currentIndex 
                        ? 'ring-2 ring-white scale-110' 
                        : 'opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={thumbUrl}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-20 h-16 object-cover rounded"
                    />
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      )}
    </>
  )
}