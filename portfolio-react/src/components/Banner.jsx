export default function Banner() {
  return (
    <div className="relative w-full overflow-hidden bg-[#1a0533] min-h-[300px] md:min-h-[400px] flex items-center">
      {/* Background gradient orbs */}
      <div className="absolute w-[600px] h-[600px] rounded-full bg-purple-700/30 blur-[100px] -top-40 -left-40" />
      <div className="absolute w-[500px] h-[500px] rounded-full bg-purple-500/20 blur-[100px] -bottom-32 -right-20" />
      <div className="absolute w-[400px] h-[400px] rounded-full bg-purple-800/25 blur-[90px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center gap-8 md:gap-16 py-8">
        {/* Left side - Photo circle */}
        <div className="flex-shrink-0">
          <div className="w-44 h-44 md:w-56 md:h-56 rounded-full border-4 border-white/20 shadow-2xl overflow-hidden bg-purple-900/50 flex items-center justify-center">
            <img
              src="/creative.png"
              alt="Ankit"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Right side - Text */}
        <div className="text-center md:text-left">
          <p className="font-['Caveat',cursive] text-4xl md:text-6xl text-white leading-tight">
            Ram Ram!
          </p>
          <h1 className="font-['Bebas_Neue',sans-serif] text-5xl md:text-7xl lg:text-8xl text-white tracking-wide mt-1 leading-none"
              style={{ textShadow: '2px 2px 0px rgba(0,0,0,0.3), 4px 4px 0px rgba(120,80,200,0.3)' }}>
            I&apos;M ANKIT
          </h1>
        </div>
      </div>
    </div>
  )
}
