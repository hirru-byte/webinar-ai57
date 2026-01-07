"use client"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function Header() {
  const scrollToForm = () => {
    const formElement = document.getElementById("registration-form")
    if (formElement) {
      formElement.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 shadow-xl">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3 animate-fadeInLeft">
          {/* <div>
            <Image src="/logo-text.png" alt="logo" width={120} height={120} />
          </div> */}
        </div>
        <Button 
          onClick={scrollToForm}
          className="bg-white hover:bg-blue-50 text-blue-600 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 animate-fadeInRight"
        >
          Đăng Ký Ngay
        </Button>
      </div>
    </header>
  )
}
