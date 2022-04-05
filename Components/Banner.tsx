import React from 'react'

function Banner() {
  return (
    <div className="flex justify-between border-b-[1px] border-black bg-blue-200 pt-20 pb-20">
      {/* Left */}
      <div className="px-4 md:px-6">
        <h1 className="pr-8 pb-8 font-serif text-6xl md:pr-6 md:text-8xl">
          Stay curious.
        </h1>
        <h2 className="font-serif text-xl md:font-semibold">
          Discover stories, thinking, and expertise from writers on any topic.
        </h2>
      </div>

      {/* Right */}
      <img
        className="hidden h-80 w-full object-contain md:inline"
        alt=""
        src="/banner.png"
      ></img>
    </div>
  )
}

export default Banner
