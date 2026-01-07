"use client"

import Image from "next/image"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

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
    <section className="bg-white py-16 px-4 relative">

      <div className="max-w-7xl mx-auto">
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">DIỄN GIẢ WEBINAR</h2>
          <motion.p
            className="text-gray-600 mb-6"
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Giới thiệu về diễn giả và kinh nghiệm của họ.
          </motion.p>
          <motion.div
            className="w-20 h-1 bg-blue-500"
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
          />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Speaker Image & Badges */}
          <motion.div
            className="relative "
            initial={{ opacity: 0, scale: 0.9, x: -30 }}
            whileInView={{ opacity: 1, scale: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-200 rounded-full blur-3xl animate-float z-10"></div>
            <motion.div
              whileHover={{ boxShadow: "0 20px 40px rgba(0,0,0,0.15)" }}
              transition={{ duration: 0.3 }}
              className="rounded-xl relative z-20"
            >
              <Image
                src="/tml.png"
                alt="hung"
                width={400}
                height={400}
                className="w-full h-full object-cover shadow-lg rounded-xl"
              />
            </motion.div>
          </motion.div>

          <div className="space-y-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSpeaker}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.4 }}
              >
                <motion.h3
                  className="text-4xl font-bold text-gray-900 mb-2"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                >
                  {currentSpeaker.name}
                </motion.h3>
                <motion.p
                  className="text-blue-500 text-lg font-semibold mb-4"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                >
                  {currentSpeaker.title}
                </motion.p>
                <motion.p
                  className="text-gray-600 leading-relaxed"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                >
                  {currentSpeaker.bio}
                </motion.p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
