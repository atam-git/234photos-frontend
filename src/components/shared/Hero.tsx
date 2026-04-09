'use client'

import { Search } from 'lucide-react'

const features = [
  'Millions of free stock photos',
  'High-quality illustrations & vectors',
  'Royalty-free videos & music',
]

export function Hero() {
  return (
    <div className="px-8 pt-8">
      <div className="relative overflow-hidden rounded-2xl">
        <div className="max-w-[1920px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Left Section - SVG Background */}
            <div className="relative bg-white py-16 px-8 lg:px-12 overflow-hidden">
              {/* SVG Background */}
              <div className="absolute inset-0 overflow-hidden">
                <img 
                  src="/hero-background.jpeg" 
                  alt="" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Right Section - Dark Background */}
            <div className="bg-[#2D2D2D] py-16 px-8 lg:px-12 flex items-center">
              <div className="w-full">
                <h3 className="text-2xl lg:text-3xl font-bold text-white mb-6">
                  Discover millions of free stock photos, videos & more
                </h3>
                
                {/* Features List with checkmark icons */}
                <div className="space-y-3 mb-8">
                  {features.map((feature) => (
                    <div key={feature} className="flex items-center gap-3">
                      <div className="flex-shrink-0">
                        <svg 
                          width="18" 
                          height="19" 
                          viewBox="0 0 18 19" 
                          fill="none" 
                          xmlns="http://www.w3.org/2000/svg"
                          className="text-white"
                        >
                          <path 
                            fillRule="evenodd" 
                            clipRule="evenodd" 
                            d="M9 0.5C4.02944 0.5 0 4.52944 0 9.5C0 14.4706 4.02944 18.5 9 18.5C13.9706 18.5 18 14.4706 18 9.5C18 7.11305 17.0518 4.82387 15.364 3.13604C13.6761 1.44821 11.3869 0.5 9 0.5ZM9.00002 16.7C5.02357 16.7 1.80002 13.4764 1.80002 9.49996C1.80002 5.52351 5.02357 2.29996 9.00002 2.29996C12.9765 2.29996 16.2 5.52351 16.2 9.49996C16.2 11.4095 15.4415 13.2409 14.0912 14.5911C12.7409 15.9414 10.9096 16.7 9.00002 16.7ZM11.808 6.34096C11.983 6.16944 12.263 6.16944 12.438 6.34096L12.888 6.81796C12.9732 6.90245 13.0211 7.01747 13.0211 7.13745C13.0211 7.25744 12.9732 7.37246 12.888 7.45695L7.83 12.515C7.74834 12.602 7.63433 12.6513 7.515 12.6513C7.39567 12.6513 7.28166 12.602 7.2 12.515L5.085 10.382C4.99981 10.2975 4.95189 10.1824 4.95189 10.0625C4.95189 9.94247 4.99981 9.82745 5.085 9.74296L5.562 9.26595C5.64366 9.17895 5.75767 9.12959 5.877 9.12959C5.99633 9.12959 6.11034 9.17895 6.192 9.26595L7.542 10.607L11.808 6.34096Z" 
                            fill="currentColor"
                          />
                        </svg>
                      </div>
                      <span className="text-white text-base">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Search Bar */}
                <form className="mb-2">
                  <div className="flex items-center bg-white rounded-md overflow-hidden">
                    <button
                      type="submit"
                      className="p-3.5 hover:bg-gray-50 transition-colors"
                      aria-label="Search for free Images, Videos, Music & more"
                    >
                      <Search className="w-5 h-5 text-gray-600" />
                    </button>
                    <input
                      type="search"
                      placeholder="Search for free Images, Videos, Music & more"
                      className="flex-1 py-3.5 px-2 bg-transparent border-none outline-none text-[#2D2D2D] placeholder:text-gray-500"
                      autoComplete="off"
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
