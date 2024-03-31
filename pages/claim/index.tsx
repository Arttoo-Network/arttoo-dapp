
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

export default function Component() {
  return (
    <div className="max-w-md mx-auto">
      <main className="py-4 px-3">
        <section className="flex items-center space-x-2 mb-4">
          <Avatar className="w-7 h-7">
            <AvatarImage alt="Yayoi Kusama" src="https://placehold.co/28x28" />
            <AvatarFallback>YK</AvatarFallback>
          </Avatar>
          <h2 className="text-lg font-semibold">Yayoi Kusama (1926)</h2>
        </section>
        <section className="mb-2 rounded-lg	bg-background-second py-4">
          <div className="text-center mt-2">
            <div className="flex pb-4 justify-center">
            <img
            alt="Infinite net [FKQS](2016)"
            height="290"
            src="https://placehold.co/223x290"
            width="223"
          />
            </div>
            <h3 className="text-sm font-semibold">Infinite net [FKQS](2016)</h3>
            <p className="text-xs">57 x 44 in</p>
          </div>
        </section>
        <section className="mb-4 px-2">
          <p className="text-xs leading-5	">
            Yayoi Kusama is a global cultural icon, admired for her installations and longtime exploration of minimalist
            abstractions, which began in the late 1950s.
          </p>
        </section>
        <section className="border-2 border-black	 py-3 px-2">
          <div className="flex justify-start items-center mb-4">
            <h3 className="text-lg font-semibold mr-1">Rewards</h3>
            <InfoIcon className="w-5 h-5 text-gray-400" />
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="bg-gray-200 rounded-full w-8 h-8" />
              <span className="font-bold">ARTOO</span>
            </div>
            <span className="text-lg font-bold">+1000</span>
          </div>
          <Button className="w-full h-12 mt-4 bg-black text-white py-2 border-2 border-purple-600">CLAIM</Button>
        </section>
      </main>
    </div>
  )
}

function InfoIcon(props) {
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
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4" />
      <path d="M12 8h.01" />
    </svg>
  )
}
