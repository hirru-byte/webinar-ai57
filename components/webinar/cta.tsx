"use client"

import { Button } from "@/components/ui/button"
import { Instagram, Facebook, Linkedin, Twitter, Phone, MapPin } from "lucide-react"

export default function CTA() {
  const scrollToForm = () => {
    const formElement = document.getElementById("registration-form")
    if (formElement) {
      formElement.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  return (
    <section className="bg-white py-20 px-4 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-72 h-72 bg-blue-100 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-50 rounded-full blur-3xl animate-float delay-300"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center animate-fadeInUp">
          {/* Left */}
          <div className="space-y-6">
            <p className="text-blue-600 uppercase text-sm font-semibold tracking-wider animate-fadeInLeft">
              Tham gia các sự kiện webinar để tìm hiểu thêm về AI
            </p>
            <h2 className="text-5xl lg:text-6xl font-bold text-blue-900 animate-fadeInLeft delay-100">
              Tham Gia Ngay.
            </h2>
          </div>

          {/* Right */}
          <div className="flex lg:justify-end animate-fadeInRight">
            <Button onClick={scrollToForm} className="bg-gradient-to-r cursor-pointer from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-10 py-7 text-xl shadow-xl hover:shadow-blue-500/40 transform hover:scale-105 transition-all duration-300">
              Đăng Ký Ngay
              <span className="ml-2">→</span>
            </Button>
          </div>
        </div>

        {/* Contact Info */}
        <div className="mt-20 border-t border-blue-100 pt-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-xl transition-all duration-300 delay-100">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-6 h-6 text-blue-600" />
              </div>
              <p className="text-blue-600 text-sm mb-2">Điện Thoại</p>
              <p className="text-blue-900 font-bold text-lg">0325 194 889</p>
              <p className="text-blue-900 font-bold text-lg">099 696 3399</p>
            </div>
            <div className="text-center p-6 rounded-xl transition-all duration-300 delay-200">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-6 h-6 text-blue-600" />
              </div>
              <p className="text-blue-600 text-sm mb-2">Địa Chỉ</p>
              <p className="text-blue-900 font-bold">1 Ngụy Như Kom Tum, Thanh Xuân, Hà Nội</p>
              <p className="text-blue-900 font-bold">support@honglinheducation.vn</p>
            </div>
            <div className="text-center p-6 rounded-xl transition-all duration-300 delay-300">
              <p className="text-blue-600 text-sm mb-4">Theo Dõi Chúng Tôi</p>
              <div className="flex justify-center gap-4 cursor-pointer">
                {[
                  // { icon: <Instagram className="w-5 h-5" />, name: "Instagram" },
                  { icon: <Facebook className="w-5 h-5" />, name: "Facebook", href: "https://www.facebook.com/AIfiftyseven" },
                  // { icon: <Linkedin className="w-5 h-5" />, name: "LinkedIn" },
                  // { icon: <Twitter className="w-5 h-5" />, name: "Twitter" },
                ].map((social) => (
                  <div
                    key={social.name}
                    onClick={() => window.open(social.href, '_blank')}
                    className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 cursor-pointer hover:bg-blue-600 hover:text-white transition-all duration-300 transform hover:scale-110 hover:rotate-6"
                  >
                    {social.icon}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
