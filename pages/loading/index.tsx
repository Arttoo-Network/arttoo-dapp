export default function Component() {
  return (
    <div className="bg-black text-white flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-6xl font-bold mb-4">ARTTOO</h1>
      <img
        alt="Artistic content"
        className="mb-4"
        height="400"
        src="/placeholder.svg"
        style={{
          aspectRatio: "768/400",
          height: "400px",
          objectFit: "cover",
          width: "768px",
        }}
        width="768"
      />
      <h2 className="text-5xl font-bold mb-4">HUNTING</h2>
      <div className="flex items-center justify-center">
        <SunIcon className="h-8 w-8 text-[#00FFA3]" />
        <span className="ml-2">First on Solana</span>
      </div>
    </div>
  )
}

function SunIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="m4.93 4.93 1.41 1.41" />
      <path d="m17.66 17.66 1.41 1.41" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="m6.34 17.66-1.41 1.41" />
      <path d="m19.07 4.93-1.41 1.41" />
    </svg>
  )
}
