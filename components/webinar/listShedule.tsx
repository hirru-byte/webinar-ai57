"use client"

import { useState } from "react"
import { format } from "date-fns"
import { Calendar, Video, User, FileText, Users } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import AvatarComponent from "../common/avatar"
import Image from "next/image"

interface WebinarItem {
  id: string
  date: Date
  title: string
  isCompleted: boolean
  dateTime: string
  format: string
  speaker: string
  mainContent: {
    title: string
    items: string[]
  }
  targetAudience: string,
  isComingSoon: boolean
}

const webinarData: WebinarItem[] = [
  {
    id: "1",
    date: new Date("2026-01-16"),
    title: `Webinar: “SỰ THẬT VỀ THỊ TRƯỜNG LAO ĐỘNG THỜI AI: CẢNH BÁO NHÓM NGÀNH SẼ "BIẾN MẤT" VÀO NĂM 2030 - EP 1: ngành Marketing”`,
    isCompleted: false,
    isComingSoon: false,
    dateTime: "20:00 | Thứ Sáu, Ngày 16 tháng 01 năm 2026",
    format: "Webinar",
    speaker: "Lê Thanh Hưng",
    mainContent: {
      title: "Nội dung chính",
      items: [
        "Tổng quan tác động của AI lên ngành Marketing",
        "Dẫn chứng thực tế về nguy cơ AI thay thế các vị trí Marketing (content, hình ảnh, video, ads…)",
        "Phân tích Marketing sẽ “đổi dạng” như thế nào trong thời đại AI (công việc nào mất – công việc nào còn – kỹ năng nào bắt buộc)",
        "Demo thực tế workflow Marketing khi có AI, so sánh trước và sau AI",
        "Giải pháp thích nghi và liên hệ chương trình AI57 như một lộ trình AI phổ cập cho người làm Marketing",
      ],
    },
    targetAudience: "Học sinh Trung học Phổ Thông, Người đang làm trong ngành Marketing, Chủ doanh nghiệp, Sinh viên ngành Marketing...",
  },
  {
    id: "2",
    date: new Date("2026-01-23"),
    title: "Webinar: Cách tư duy chiến lược, xây dựng kế hoạch marketing với AI",
    isCompleted: false,
    isComingSoon: true,
    dateTime: "19:45 | Thứ Năm, Ngày 23 tháng 01 năm 2026",
    format: "Trực tuyến qua ứng dụng Zoom",
    speaker: "Thông tin đang được cập nhật",
    mainContent: {
      title: "Nội dung chính",
      items: [
        "Tổng quan về ngành Digital & Social Media Marketing",
        "Các kỹ năng và kiến thức cần thiết trong ngành",
        "Cơ hội việc làm và xu hướng phát triển",
      ],
    },
    targetAudience: "Học sinh Trung học Phổ Thông quan tâm tìm hiểu và dự định ứng tuyển",
  },
  {
    id: "3",
    date: new Date("2026-01-30"),
    title: "Webinar: Lộ trình học marketing mới trong kỷ nguyên AI",
    isCompleted: false,
    isComingSoon: true,
    dateTime: "19:45 | Thứ Tư, Ngày 30 tháng 01 năm 2026",
    format: "Trực tuyến qua ứng dụng Zoom",
    speaker: "Thông tin đang được cập nhật",
    mainContent: {
      title: "Nội dung chính",
      items: [
        "Giới thiệu về chương trình Dự bị Đại học Quốc tế (IFP)",
        "Lợi ích và cơ hội sau khi hoàn thành chương trình",
        "Quy trình đăng ký và yêu cầu đầu vào",
      ],
    },
    targetAudience: "Học sinh Trung học Phổ Thông quan tâm tìm hiểu và dự định ứng tuyển",
  },
  {
    id: "4",
    date: new Date("2026-02-07"),
    title: `Webinar: “SỰ THẬT VỀ THỊ TRƯỜNG LAO ĐỘNG THỜI AI: CẢNH BÁO NHÓM NGÀNH SẼ "BIẾN MẤT" VÀO NĂM 2030 - EP 2: Tài chính & Kế toán`,
    isCompleted: false,
    isComingSoon: true,
    dateTime: "19:45 | Thứ Năm, Ngày 07 tháng 02 năm 2026",
    format: "Trực tuyến qua ứng dụng Zoom",
    speaker: "Thông tin đang được cập nhật",
    mainContent: {
      title: "Nội dung chính",
      items: [
        "Giới thiệu về ngành Đồ họa Game và cơ hội nghề nghiệp",
        "Chương trình đào tạo và các môn học chuyên ngành",
        "Portfolio và kỹ năng cần thiết để thành công trong ngành",
      ],
    },
    targetAudience: "Học sinh Trung học Phổ Thông quan tâm tìm hiểu và dự định ứng tuyển",
  },

]

const ListSchedule = () => {
  const [selectedWebinar, setSelectedWebinar] = useState<WebinarItem | null>(
    webinarData.find((w) => !w.isCompleted) || webinarData[webinarData.length - 1]
  )

  return (
    <section className="w-full py-24  bg-gradient-to-br from-white via-blue-50 to-blue-100 relative">
      <Image src="/white-bg.jpg" alt="webinar-bg" width={1000} height={1000} className="w-full h-full object-cover absolute object-top top-0 left-0 z-10" />
      <div className="max-w-7xl mx-auto z-20 px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl lg:text-4xl font-bold mb-2 text-center leading-tight">
            THAM KHẢO NGAY <span className="text-blue-600">LỊCH TRÌNH CHUỖI WEBINAR</span> CỦA HONGLINHEDUCATION
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 ">
          {/* Left Side - List of Webinars */}
          <div className="space-y-4 relative">

            {webinarData.map((webinar, index) => (
              (
                <motion.div
                  key={webinar.id}
                  className="flex items-center justify-end gap-4 relative"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <motion.div
                    className="flex items-center justify-end gap-2 min-w-[100px]"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <span className="text-sm">
                      {format(webinar.date, "dd/MM/yyyy")}
                    </span>
                    <Calendar className="w-6 h-6 text-blue-600 mt-0.5 shrink-0 fill-white" />

                  </motion.div>
                  {index !== webinarData.length - 1 && (
                    <div className="absolute left-12 top-26 w-[80px] border border-dashed border-gray-300 rotate-90" />
                  )}
                  <motion.button
                    onClick={() => setSelectedWebinar(webinar)}
                    className={cn(
                      "w-full text-left p-3 h-24 rounded-lg border-2 transition-all duration-300 cursor-pointer",
                      selectedWebinar?.id === webinar.id
                        ? "bg-blue-600 border-blue-700 text-white shadow-lg"
                        : webinar.isCompleted
                          ? "bg-white border-gray-300 text-gray-700 hover:border-blue-400"
                          : "bg-white border-blue-500 text-gray-900 hover:border-blue-600"
                    )}
                    whileHover={{ scale: 1.02, boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <div className="flex items-start gap-3">

                      <div className="flex-1 min-w-0">

                        <p
                          className={cn(
                            "text-sm font-medium leading-snug",
                            selectedWebinar?.id === webinar.id ? "text-white" : "text-gray-900"
                          )}
                        >
                          {webinar.title}
                        </p>
                      </div>
                    </div>
                  </motion.button>
                </motion.div>
              )
            ))}
          </div>

          {/* Right Side - Webinar Details */}
          <div className="lg:sticky lg:top-8 lg:h-fit relative overflow-hidden">
            <Image src="/white-caro-bg.svg" alt="webinar-bg" width={1000} height={1000} className="w-full h-full object-cover opacity-10  absolute top-0 left-0 z-10" />
            <AnimatePresence mode="wait">
              {selectedWebinar && (
                <motion.div
                  key={selectedWebinar.id}
                  className=" border-2 border-blue-600 rounded-lg p-6 shadow-lg relative z-20"
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -20 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  {selectedWebinar.id === "1" ? (
                    <>
                      <motion.div
                        className="space-y-4"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ delay: 0.2, duration: 0.4 }}
                      >
                        {/* Date & Time */}
                        <motion.div
                          className="flex items-start gap-3"
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true, amount: 0.2 }}
                          transition={{ delay: 0.3, duration: 0.3 }}
                        >
                          <Calendar className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
                          <p className="text-sm font-semibold text-gray-700 mb-1">Ngày & giờ:</p>
                          <p className="text-sm text-gray-600">{selectedWebinar.dateTime}</p>
                        </motion.div>

                        {/* Format */}
                        <motion.div
                          className="flex items-start gap-3"
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true, amount: 0.2 }}
                          transition={{ delay: 0.4, duration: 0.3 }}
                        >
                          <Video className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
                          <p className="text-sm font-semibold text-gray-700 mb-1">Hình thức:</p>
                          <p className="text-sm text-gray-600">{selectedWebinar.format}</p>
                        </motion.div>

                        {/* Speaker */}
                        <motion.div
                          className="flex items-start gap-3"
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true, amount: 0.2 }}
                          transition={{ delay: 0.5, duration: 0.3 }}
                        >
                          <User className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
                          <div>
                            <p className="text-sm font-semibold text-gray-700 mb-1">Diễn giả:</p>
                            <AvatarComponent
                              name={selectedWebinar.speaker}
                              description="Admin group 'Bình dân học AI'"
                              imageSrc="/tml.png"
                            />
                          </div>
                        </motion.div>

                        {/* Main Content */}
                        <motion.div
                          className="flex items-start gap-3"
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true, amount: 0.2 }}
                          transition={{ delay: 0.6, duration: 0.3 }}
                        >
                          <FileText className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
                          <div className="flex-1">
                            <p className="text-sm font-semibold text-gray-700 mb-2">
                              {selectedWebinar.mainContent.title}:
                            </p>
                            <ul className="space-y-2">
                              {selectedWebinar.mainContent.items.map((item, index) => (
                                <motion.li
                                  key={index}
                                  className="text-sm text-gray-600 flex items-start gap-2"
                                  initial={{ opacity: 0, x: -10 }}
                                  whileInView={{ opacity: 1, x: 0 }}
                                  viewport={{ once: true, amount: 0.2 }}
                                  transition={{ delay: 0.7 + index * 0.1, duration: 0.3 }}
                                >
                                  <span className="text-blue-600 mt-1">•</span>
                                  <span>{item}</span>
                                </motion.li>
                              ))}
                            </ul>
                          </div>
                        </motion.div>

                        {/* Target Audience */}
                        <motion.div
                          className="flex items-start gap-3"
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true, amount: 0.2 }}
                          transition={{ delay: 0.9, duration: 0.3 }}
                        >
                          <Users className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
                          <div>
                            <p className="text-sm font-semibold text-gray-700 mb-1">
                              Đối tượng nên tham gia:
                            </p>
                            <p className="text-sm text-gray-600">{selectedWebinar.targetAudience}</p>
                          </div>
                        </motion.div>
                      </motion.div>
                    </>
                  ) : (
                    <motion.div
                      className="flex flex-col items-center justify-center py-12 text-center"
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{ delay: 0.2, duration: 0.4 }}
                    >
                      <motion.div
                        className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mb-4"
                        animate={{ rotate: [0, 5, -5, 0] }}
                        transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                      >
                        <Calendar className="w-10 h-10 text-blue-600" />
                      </motion.div>
                      <motion.h3
                        className="text-xl font-bold text-gray-900 mb-2"
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ delay: 0.3, duration: 0.3 }}
                      >
                        {selectedWebinar.title}
                      </motion.h3>
                      <motion.p
                        className="text-lg font-semibold text-blue-600 mb-4"
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ delay: 0.4, duration: 0.3 }}
                      >
                        Sắp ra mắt
                      </motion.p>
                      <motion.p
                        className="text-sm text-gray-600"
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ delay: 0.5, duration: 0.3 }}
                      >
                        Thông tin chi tiết về webinar này sẽ sớm được cập nhật. Vui lòng quay lại sau!
                      </motion.p>
                    </motion.div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 w-full h-20 bg-linear-to-b from-transparent to-white z-20" />
    </section>
  )
}

export default ListSchedule