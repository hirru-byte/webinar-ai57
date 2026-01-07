"use client"

import Image from "next/image"
import { useState } from "react"

export default function Speaker() {
  const [activeSpeaker, setActiveSpeaker] = useState<"hung">("hung")

  const speakers = {
    hung: {
      name: "Lê Thanh Hưng",
      title: `Admin group " Bình dân học AI"`,
      bio: `Nhóm sinh hoạt cộng đồng của dự án "Bình dân học Al" - Dự án xã hội với mục tiêu phổ cập kiến thức, kĩ năng điều khiến các dạng phần mềm Trí tuệ nhân tạo hiện đại để phục vụ cuộc sống. Dự án dành cho mọi người dân Việt Nam.`,
    },
   
  }

  const currentSpeaker = speakers[activeSpeaker]

  return (
    <section className="bg-white py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">DIỄN GIẢ WEBINAR</h2>
          <p className="text-gray-600 mb-6">Giới thiệu về diễn giả và kinh nghiệm của họ.</p>
          <div className="w-20 h-1 bg-blue-500"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Speaker Image & Badges */}
          <div className="relative">
            <Image src="/tml.png" alt="hung" width={500} height={500} className="w-full h-full object-cover shadow-lg rounded-lg" />
          </div>

          <div className="space-y-4">
            <div key={activeSpeaker} className="animate-in fade-in slide-in-from-right-4 duration-700">
              <h3 className="text-4xl font-bold text-gray-900 mb-2">{currentSpeaker.name}</h3>
              <p className="text-blue-500 text-lg font-semibold mb-4">{currentSpeaker.title}</p>
              <p className="text-gray-600 leading-relaxed">{currentSpeaker.bio}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
