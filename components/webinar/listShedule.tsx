"use client"

import { useState } from "react"
import { format } from "date-fns"
import { Calendar, Video, User, FileText, Users } from "lucide-react"
import { cn } from "@/lib/utils"

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
    title: `Webinar: “SỰ THẬT VỀ THỊ TRƯỜNG LAO ĐỘNG THỜI AI: CẢNH BÁO NHÓM NGÀNH SẼ "BIẾN MẤT" VÀO NĂM 2030”`,
    isCompleted: false, 
    isComingSoon: false,
    dateTime: "19:45 | Thứ Tư, Ngày 16 tháng 01 năm 2026",
    format: "Trực tuyến qua ứng dụng Zoom",
    speaker: "Thông tin đang được cập nhật",
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
    title: "Webinar: Lộ trình học marketing mới trong kỷ nguyên AI (30/1)",
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
    title: `Webinar: “SỰ THẬT VỀ THỊ TRƯỜNG LAO ĐỘNG THỜI AI: CẢNH BÁO NHÓM NGÀNH SẼ "BIẾN MẤT" VÀO NĂM 2030”
EP 2: Tài chính & Kế toán  (07/02)`,
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
    <section className="w-full py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-white via-blue-50 to-blue-100">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-blue-900 mb-2">
            THAM KHẢO NGAY LỊCH TRÌNH CHUỖI WEBINAR CỦA HONGLINGEDU
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Side - List of Webinars */}
          <div className="space-y-4">
            {webinarData.map((webinar) => (
              <button
                key={webinar.id}
                onClick={() => setSelectedWebinar(webinar)}
                className={cn(
                  "w-full text-left p-4 rounded-lg border-2 transition-all duration-300",
                  "hover:shadow-lg hover:scale-[1.02]",
                  selectedWebinar?.id === webinar.id
                    ? "bg-blue-600 border-blue-700 text-white shadow-lg"
                    : webinar.isCompleted
                      ? "bg-white border-gray-300 text-gray-700 hover:border-blue-400"
                      : "bg-white border-blue-500 text-gray-900 hover:border-blue-600"
                )}
              >
                <div className="flex items-start gap-3">
                  <Calendar
                    className={cn(
                      "w-5 h-5 mt-0.5 shrink-0",
                      selectedWebinar?.id === webinar.id ? "text-white" : "text-blue-600"
                    )}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-semibold">
                        {format(webinar.date, "dd/MM/yyyy")}
                      </span>
                      {webinar.isCompleted && (
                        <span
                          className={cn(
                            "text-xs px-2 py-0.5 rounded",
                            selectedWebinar?.id === webinar.id
                              ? "bg-white/20 text-white"
                              : "bg-gray-200 text-gray-600"
                          )}
                        >
                          (Sự kiện đã kết thúc)
                        </span>
                      )}
                    </div>
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
              </button>
            ))}
          </div>

          {/* Right Side - Webinar Details */}
          <div className="lg:sticky lg:top-8 lg:h-fit">
            {selectedWebinar && (
              <div className="bg-white border-2 border-blue-600 rounded-lg p-6 shadow-lg">
                {selectedWebinar.id === "1" ? (
                  <>
                    <h3 className="text-xl font-bold text-gray-900 mb-6">{selectedWebinar.title}</h3>

                    <div className="space-y-4">
                      {/* Date & Time */}
                      <div className="flex items-start gap-3">
                        <Calendar className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
                        <div>
                          <p className="text-sm font-semibold text-gray-700 mb-1">Ngày & giờ:</p>
                          <p className="text-sm text-gray-600">{selectedWebinar.dateTime}</p>
                        </div>
                      </div>

                      {/* Format */}
                      <div className="flex items-start gap-3">
                        <Video className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
                        <div>
                          <p className="text-sm font-semibold text-gray-700 mb-1">Hình thức:</p>
                          <p className="text-sm text-gray-600">{selectedWebinar.format}</p>
                        </div>
                      </div>

                      {/* Speaker */}
                      <div className="flex items-start gap-3">
                        <User className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
                        <div>
                          <p className="text-sm font-semibold text-gray-700 mb-1">Diễn giả:</p>
                          <p className="text-sm text-gray-600">{selectedWebinar.speaker}</p>
                        </div>
                      </div>

                      {/* Main Content */}
                      <div className="flex items-start gap-3">
                        <FileText className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-gray-700 mb-2">
                            {selectedWebinar.mainContent.title}:
                          </p>
                          <ul className="space-y-2">
                            {selectedWebinar.mainContent.items.map((item, index) => (
                              <li key={index} className="text-sm text-gray-600 flex items-start gap-2">
                                <span className="text-blue-600 mt-1">•</span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Target Audience */}
                      <div className="flex items-start gap-3">
                        <Users className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
                        <div>
                          <p className="text-sm font-semibold text-gray-700 mb-1">
                            Đối tượng nên tham gia:
                          </p>
                          <p className="text-sm text-gray-600">{selectedWebinar.targetAudience}</p>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                      <Calendar className="w-10 h-10 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{selectedWebinar.title}</h3>
                    <p className="text-lg font-semibold text-blue-600 mb-4">Sắp ra mắt</p>
                    <p className="text-sm text-gray-600">
                      Thông tin chi tiết về webinar này sẽ sớm được cập nhật. Vui lòng quay lại sau!
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ListSchedule