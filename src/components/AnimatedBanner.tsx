"use client"

import { motion } from "framer-motion"

export default function AnimatedBanner() {
  return (
    <div className="relative w-full h-[400px] overflow-hidden bg-gradient-to-b from-sky-300 to-sky-400">
      {/* Background curved shapes */}
      <div className="absolute inset-0">
        <svg
          viewBox="0 0 1200 300"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
          preserveAspectRatio="none"
        >
          <path d="M0 100C200 150 400 80 600 100C800 120 1000 90 1200 100V300H0V100Z" fill="rgba(255,255,255,0.1)" />
          <path d="M0 150C200 200 400 130 600 150C800 170 1000 140 1200 150V300H0V150Z" fill="rgba(255,255,255,0.05)" />
        </svg>
      </div>

      {/* Heading */}
      <div className="relative z-10 flex items-center justify-center w-full h-40 pt-8">
        <h1 className="text-4xl md:text-5xl font-bold text-white text-center px-4">Your pick of rides at low prices</h1>
      </div>

      {/* Buildings */}
      <div className="absolute bottom-[100px] left-0 right-0 h-[200px] flex items-end justify-between px-4">
        <img
          src="/placeholder.svg?height=180&width=100"
          height={180}
          width={100}
          alt="Building"
          className="h-[180px] w-auto"
        />
        <img
          src="/placeholder.svg?height=150&width=80"
          height={150}
          width={80}
          alt="Building"
          className="h-[150px] w-auto"
        />
        <img
          src="/placeholder.svg?height=200&width=120"
          height={200}
          width={120}
          alt="Building"
          className="h-[200px] w-auto"
        />
        <img
          src="/placeholder.svg?height=170&width=90"
          height={170}
          width={90}
          alt="Building"
          className="h-[170px] w-auto"
        />
        <img
          src="/placeholder.svg?height=190&width=110"
          height={190}
          width={110}
          alt="Building"
          className="h-[190px] w-auto"
        />
      </div>

      {/* Road */}
      <div className="absolute bottom-0 w-full h-[100px] bg-gray-800">
        {/* Road markings */}
        <div className="absolute top-1/2 left-0 w-full h-2 flex justify-between">
          <motion.div
            initial={{ x: "0%" }}
            animate={{ x: "-100%" }}
            transition={{
              duration: 10,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
            className="flex"
          >
            {[...Array(20)].map((_, i) => (
              <div key={i} className="w-20 h-2 bg-white mr-12" />
            ))}
          </motion.div>
        </div>
        {/* Road gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-800/0 via-gray-800/0 to-gray-900" />
      </div>

      {/* Animated vehicles */}
      <div className="absolute bottom-[20px] left-0 w-full overflow-hidden">
        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: "100%" }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
          className="flex gap-32"
        >
          <div className="relative w-32 h-20">
            <img
              src="/images/sedan.png"
              alt="Car"
              width={60}
              height={80}
              className="w-full h-full transform scale-x-[-1]"
            />
          </div>
          <div className="relative w-48 h-24">
            <img
              src="/placeholder.svg?height=96&width=96"
              alt="Bus"
              width={96}
              height={96}
              className="w-full h-full transform scale-x-[-1]"
            />
          </div>
          <div className="relative w-32 h-20">
            <img
              src="/placeholder.svg?height=80&width=80"
              alt="Car"
              width={80}
              height={80}
              className="w-full h-full transform scale-x-[-1]"
            />
          </div>
        </motion.div>
      </div>
    </div>
  )
}

