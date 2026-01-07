"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Gift } from "lucide-react"
import { useState, useEffect, useMemo } from "react"
import WebinarBP from "../common/webinar-bp"

function useCountdown(targetDate: Date) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  // Use timestamp to avoid dependency issues with Date object
  const targetTimestamp = targetDate.getTime()

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date()
      const difference = targetTimestamp - now.getTime()

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        })
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [targetTimestamp])

  return timeLeft
}

export default function Hero() {
  const webinarDate = useMemo(() => new Date("2026-01-16T13:00:00Z"), [])
  const timeLeft = useCountdown(webinarDate)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white py-20 px-4 relative overflow-hidden">
      <WebinarBP />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-400/20 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-white/10 rounded-full blur-3xl animate-float delay-500"></div>
      <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-blue-300/20 rounded-full blur-2xl animate-bounce-soft"></div>
      <div className="absolute top-1/4 right-1/4 w-24 h-24 border border-white/20 rounded-full animate-rotate-slow"></div>

      <div className="max-w-8xl  grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left Side - Event Info */}
        <div className="space-y-8 animate-fadeInLeft">
          <div className="space-y-2">
            <p className="text-blue-200 font-semibold text-sm uppercase tracking-wider animate-fadeInUp">
              Thời gian: 16 tháng 1, 2026
            </p>
            <p className="text-blue-200 font-semibold text-sm uppercase tracking-wider animate-fadeInUp delay-100">
              Giờ: 8:00 tối (GMT+7)
            </p>
          </div>

          <div className="space-y-4 animate-fadeInUp delay-200">
            <h2 className="text-5xl lg:text-6xl font-bold text-pretty leading-tight">
            SỰ THẬT VỀ THỊ TRƯỜNG LAO ĐỘNG THỜI AI: CẢNH BÁO 5 NHÓM NGÀNH SẼ "BIẾN MẤT" VÀO NĂM 2030: 
              <span className="block text-blue-300">EP01: NGÀNH MARKETING</span>
            </h2>
          </div>

          <div className="space-y-4 animate-fadeInUp delay-300">
            <h3 className="text-white font-bold uppercase tracking-wider">Webinar Bắt Đầu Sau:</h3>
            <div className="flex gap-4">
              {[
                { value: mounted ? timeLeft.days : 0, label: "NGÀY" },
                { value: mounted ? timeLeft.hours : 0, label: "GIỜ" },
                { value: mounted ? timeLeft.minutes : 0, label: "PHÚT" },
                { value: mounted ? timeLeft.seconds : 0, label: "GIÂY" },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="border-2 border-white/30 px-5 py-3 text-center bg-white/10 backdrop-blur-sm rounded-xl hover:bg-white/20 hover:border-white/50 transition-all duration-300 hover:scale-110 animate-pulse-glow hover-lift min-w-[80px]"
                >
                  <p className="text-3xl font-bold tabular-nums">{String(item.value).padStart(2, "0")}</p>
                  <p className="text-xs text-blue-200 font-semibold mt-1">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side - Registration Form */}
        <div className="bg-white/95 backdrop-blur-md border-l-4 border-blue-500 p-5 rounded-xl shadow-2xl animate-fadeInRight hover:shadow-blue-500/30 transition-all duration-500 hover-lift">
          <div className="text-center mb-4">
            <h3 className="text-blue-900 font-bold text-xl mb-1">Đăng Ký Tham Gia</h3>
            <p className="text-blue-600 text-xs">Điền thông tin để nhận vé miễn phí</p>
          </div>
          <form className="space-y-3">
            <div className="animate-fadeInUp delay-100">
              <label className="text-blue-700 text-xs font-semibold block mb-1">Tên Của Bạn</label>
              <Input
                placeholder="Nhập tên của bạn"
                className="bg-blue-50 text-blue-900 border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 h-9 text-sm"
              />
            </div>
            <div className="animate-fadeInUp delay-200">
              <label className="text-blue-700 text-xs font-semibold block mb-1">Tên Công Ty</label>
              <Input
                placeholder="Nhập tên công ty"
                className="bg-blue-50 text-blue-900 border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 h-9 text-sm"
              />
            </div>
            <div className="animate-fadeInUp delay-300">
              <label className="text-blue-700 text-xs font-semibold block mb-1">Số Điện Thoại</label>
              <Input
                placeholder="Nhập số điện thoại"
                className="bg-blue-50 text-blue-900 border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 h-9 text-sm"
              />
            </div>
            <div className="animate-fadeInUp delay-400">
              <label className="text-blue-700 text-xs font-semibold block mb-1">Email Của Bạn</label>
              <Input
                type="email"
                placeholder="Nhập email của bạn"
                className="bg-blue-50 text-blue-900 border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 h-9 text-sm"
              />
            </div>
            <div className="animate-fadeInUp delay-500">
              <label className="text-blue-700 text-xs font-semibold mb-1 flex items-center gap-2">
                <Gift className="w-3 h-3" />
                Mã Giới Thiệu
              </label>
              <Input
                placeholder="Nhập mã giới thiệu (nếu có)"
                className="bg-blue-50 text-blue-900 border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 h-9 text-sm"
              />
              <p className="text-xs text-blue-500 mt-0.5">Nhập mã để nhận ưu đãi đặc biệt</p>
            </div>
            <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white mt-4 py-4 text-sm font-semibold shadow-lg hover:shadow-blue-500/50 transform hover:scale-[1.02] transition-all duration-300 animate-fadeInUp delay-600">
              Đăng Ký Ngay
            </Button>
          </form>
        </div>
      </div>
    </section>
  )
}
