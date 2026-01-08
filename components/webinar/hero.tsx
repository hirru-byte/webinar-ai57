"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form"
import { Gift, Loader2 } from "lucide-react"
import { useState, useEffect, useMemo } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useToast } from "@/hooks/use-toast"
import WebinarBP from "../common/webinar-bp"
import Image from "next/image"

const formSchema = z.object({
  name: z.string().min(2, "Tên phải có ít nhất 2 ký tự"),
  organization: z.string().min(2, "Đơn vị công tác phải có ít nhất 2 ký tự"),
  phone: z.string().min(10, "Số điện thoại không hợp lệ").regex(/^[0-9+\-\s()]+$/, "Số điện thoại chỉ được chứa số và ký tự đặc biệt"),
  email: z.string().email("Email không hợp lệ"),
  referralCode: z.string().optional(),
  role: z.string().min(1, "Vui lòng chọn bạn là ai"),
  topic: z.string().min(1, "Vui lòng chọn chủ đề bạn quan tâm"),
  question: z.string().optional(),
})

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
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      organization: "",
      phone: "",
      email: "",
      referralCode: "",
      role: "",
      topic: "",
      question: "",
    },
  })

  useEffect(() => {
    setMounted(true)
  }, [])

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    try {
      const response = await fetch("/api/submit-form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Có lỗi xảy ra khi gửi form")
      }

      toast({
        title: "Đăng ký thành công!",
        description: "Cảm ơn bạn đã đăng ký. Chúng tôi sẽ liên hệ với bạn sớm nhất.",
      })

      form.reset()
    } catch (error) {
      console.error("Error submitting form:", error)
      toast({
        title: "Đăng ký thất bại",
        description: error instanceof Error ? error.message : "Có lỗi xảy ra. Vui lòng thử lại sau.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="registration-form" className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white py-8 sm:py-12 lg:py-20 relative overflow-hidden flex flex-col items-center justify-center lg:min-h-screen">
      {/* <WebinarBP /> */}
      <Image src="/hero-bg.jpeg" alt="bg-webinar" width={1000} height={1000} className="absolute top-0 left-0 w-full h-full object-cover object-start opacity-10" />
      <div className="absolute top-0 right-0 w-[250px] h-[250px] sm:w-[400px] sm:h-[400px] lg:w-[500px] lg:h-[500px] bg-blue-400/20 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-0 left-0 w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] lg:w-[400px] lg:h-[400px] bg-white/10 rounded-full blur-3xl animate-float delay-500"></div>
      <div className="absolute top-1/2 left-1/4 w-16 h-16 sm:w-24 sm:h-24 lg:w-32 lg:h-32 bg-blue-300/20 rounded-full blur-2xl animate-bounce-soft"></div>
      <div className="absolute top-1/4 right-1/4 w-12 h-12 sm:w-20 sm:h-20 lg:w-24 lg:h-24 border border-white/20 rounded-full animate-rotate-slow"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-12 flex flex-col lg:flex-row gap-4 sm:gap-6 items-center relative z-10">
        {/* Left Side - Event Info */}
        <div className="space-y-6 sm:space-y-8 animate-fadeInLeft">
  <div className="space-y-1 sm:space-y-2">
    <p className="text-blue-200 font-semibold text-[10px] sm:text-sm uppercase tracking-wider">
      Thời gian: 16 tháng 1, 2026
    </p>
    <p className="text-blue-200 font-semibold text-[10px] sm:text-sm uppercase tracking-wider delay-100">
      Giờ: 8:00 tối (GMT+7)
    </p>
  </div>

  <div className="space-y-3 sm:space-y-4 delay-200">
    <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-pretty leading-snug sm:leading-tight">
      SỰ THẬT VỀ THỊ TRƯỜNG LAO ĐỘNG THỜI AI: CẢNH BÁO 5 NHÓM NGÀNH SẼ "BIẾN MẤT" VÀO NĂM 2030:
      <span className="block text-blue-300 text-2xl sm:text-3xl lg:text-4xl mt-1">
        EP01: NGÀNH MARKETING
      </span>
    </h2>
  </div>

  <div className="space-y-2 sm:space-y-4 delay-300">
    <h3 className="text-white font-bold uppercase tracking-wider text-[11px] sm:text-base">
      Webinar Bắt Đầu Sau:
    </h3>

    <div className="flex gap-2 sm:gap-4">
      {[
        { value: mounted ? timeLeft.days : 0, label: "NGÀY" },
        { value: mounted ? timeLeft.hours : 0, label: "GIỜ" },
        { value: mounted ? timeLeft.minutes : 0, label: "PHÚT" },
        { value: mounted ? timeLeft.seconds : 0, label: "GIÂY" },
      ].map((item, idx) => (
        <div
          key={idx}
          className="border border-white/30 px-2 sm:px-5 py-1.5 sm:py-3
                     text-center bg-white/10 backdrop-blur-sm rounded-lg sm:rounded-xl
                     hover:bg-white/20 hover:border-white/50 transition-all duration-300
                     min-w-[50px] sm:min-w-[80px]"
        >
          <p className="text-[18px] sm:text-3xl font-bold tabular-nums">
            {String(item.value).padStart(2, "0")}
          </p>
          <p className="text-[9px] sm:text-xs text-blue-200 font-semibold mt-0.5 sm:mt-1">
            {item.label}
          </p>
        </div>
      ))}
    </div>
  </div>
</div>


        {/* Right Side - Registration Form */}
        <div className="max-w-lg w-full bg-white/95 backdrop-blur-md border-l-4 border-blue-500 p-4 sm:p-5 rounded-lg sm:rounded-xl shadow-2xl animate-fadeInRight hover:shadow-blue-500/30 transition-all duration-500 hover-lift">
          <div className="text-center mb-3 sm:mb-4">
            <h3 className="text-blue-900 font-bold text-[16px] sm:text-xl mb-1">Đăng Ký Tham Gia</h3>
            <p className="text-blue-600 text-[11px] sm:text-xs">Điền thông tin để nhận vé miễn phí</p>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2.5 sm:space-y-3">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="delay-100">
                    <FormLabel className="text-blue-700 text-[11px] sm:text-xs font-semibold">Tên Của Bạn</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Nhập tên của bạn"
                        className="bg-blue-50 text-blue-900 border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 h-8 sm:h-9 text-[13px] sm:text-sm"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-[10px] sm:text-xs" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="organization"
                render={({ field }) => (
                  <FormItem className="delay-200">
                    <FormLabel className="text-blue-700 text-[11px] sm:text-xs font-semibold">Đơn vị công tác</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Nhập đơn vị công tác"
                        className="bg-blue-50 text-blue-900 border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 h-8 sm:h-9 text-[13px] sm:text-sm"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-[10px] sm:text-xs" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem className="delay-600">
                    <FormLabel className="text-blue-700 text-[11px] sm:text-xs font-semibold">Bạn là</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="w-full bg-blue-50 text-blue-900 border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 h-8 sm:h-9 text-[13px] sm:text-sm">
                          <SelectValue placeholder="Bạn đang làm gì?" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="hoc-sinh">Học sinh</SelectItem>
                        <SelectItem value="sinh-vien">Sinh viên</SelectItem>
                        <SelectItem value="phu-huynh">Phụ huynh</SelectItem>
                        <SelectItem value="da-di-lam">Đã đi làm</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-[10px] sm:text-xs" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem className="delay-300">
                    <FormLabel className="text-blue-700 text-[11px] sm:text-xs font-semibold">Số Điện Thoại</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Nhập số điện thoại"
                        className="bg-blue-50 text-blue-900 border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 h-8 sm:h-9 text-[13px] sm:text-sm"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-[10px] sm:text-xs" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="delay-400">
                    <FormLabel className="text-blue-700 text-[11px] sm:text-xs font-semibold">Email Của Bạn</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Nhập email của bạn"
                        className="bg-blue-50 text-blue-900 border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 h-8 sm:h-9 text-[13px] sm:text-sm"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-[10px] sm:text-xs" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="referralCode"
                render={({ field }) => (
                  <FormItem className="delay-500">
                    <FormLabel className="text-blue-700 text-[11px] sm:text-xs font-semibold mb-1 flex items-center gap-1.5 sm:gap-2">
                      <Gift className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                      Mã Giới Thiệu
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Nhập mã giới thiệu (nếu có)"
                        className="bg-blue-50 text-blue-900 border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 h-8 sm:h-9 text-[13px] sm:text-sm"
                        {...field}
                      />
                    </FormControl>
                    {/* <FormDescription className="text-xs text-blue-500 mt-0.5">
                      Nhập mã để nhận ưu đãi đặc biệt
                    </FormDescription> */}
                    <FormMessage className="text-[10px] sm:text-xs" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="topic"
                render={({ field }) => (
                  <FormItem className="delay-700">
                    <FormLabel className="text-blue-700 text-[11px] sm:text-xs font-semibold">Chủ đề bạn quan tâm</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="w-full bg-blue-50 text-blue-900 border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 h-8 sm:h-9 text-[13px] sm:text-sm">
                          <SelectValue placeholder="Chọn chủ đề" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="webinar-23-1">Webinar: Cách tư duy chiến lược, xây dựng kế hoạch marketing với AI (23/1)</SelectItem>
                        <SelectItem value="webinar-30-1">Webinar: Lộ trình học marketing mới trong kỷ nguyên AI (30/1)</SelectItem>
                        <SelectItem value="nganh-nghe-bien-mat">Các nhóm ngành nghề sẽ biến mất trong kỷ nguyên AI trước năm 2030.</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-[10px] sm:text-xs" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="question"
                render={({ field }) => (
                  <FormItem className="delay-800">
                    <FormLabel className="text-blue-700 text-[11px] sm:text-xs font-semibold">Câu hỏi của bạn về chủ đề</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Nhập câu hỏi của bạn về chủ đề bạn quan tâm"
                        className="bg-blue-50 text-blue-900 border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 text-[13px] sm:text-sm min-h-16 sm:min-h-20"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-[10px] sm:text-xs" />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r cursor-pointer from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white mt-3 sm:mt-4 py-3 sm:py-4 text-[13px] sm:text-sm font-semibold shadow-lg hover:shadow-blue-500/50 transform hover:scale-[1.02] transition-all duration-300 delay-900 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-3 w-3 sm:h-4 sm:w-4 animate-spin" />
                    Đang gửi...
                  </>
                ) : (
                  "Đăng Ký Ngay"
                )}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </section>
  )
}
