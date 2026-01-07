import { format, getDaysInMonth, startOfMonth, eachDayOfInterval } from 'date-fns'

// Type definition for day item data
// Base type with optional date for templates, required date for final DayItem
export interface DayItem {
  date: Date
  title: string
  type: string
  category: string
  description: string
  activities: string[]
  preparation: string
  instructor: string
  isComingSoon: boolean
}

// Event template uses the same structure but with required date as string
type EventTemplate = Omit<DayItem, 'date'> & {
  date: string // Date as string format: 'YYYY-MM-DD' - required, events can be on any day of the week
}

// Event data templates
// Set the date property as a string (format: 'YYYY-MM-DD') for any day of the week (Monday through Sunday)
const eventTemplates: EventTemplate[] = [
  {
    date: '2026-01-16', // Set date as string, e.g., '2026-01-16' for January 16, 2026 (Friday)
    title: 'Webinar: “SỰ THẬT VỀ THỊ TRƯỜNG LAO ĐỘNG THỜI AI: CẢNH BÁO NHÓM NGÀNH SẼ "BIẾN MẤT" VÀO NĂM 2030”',
    type: 'Webinar',
    category: 'Technical',
    description: 'Sự thật về thị trường lao động thời AI: Cảnh báo nhóm ngành sẽ "biến mất" vào năm 2030',
    activities: [
      "Tổng quan tác động của AI lên ngành Marketing",
        "Dẫn chứng thực tế về nguy cơ AI thay thế các vị trí Marketing (content, hình ảnh, video, ads…)",
        "Phân tích Marketing sẽ “đổi dạng” như thế nào trong thời đại AI (công việc nào mất – công việc nào còn – kỹ năng nào bắt buộc)",
        "Demo thực tế workflow Marketing khi có AI, so sánh trước và sau AI",
        "Giải pháp thích nghi và liên hệ chương trình AI57 như một lộ trình AI phổ cập cho người làm Marketing",
    ],
    preparation: 'Đăng ký tham gia và theo dõi webinar.',
    instructor: 'Lê Thanh Hưng',
    isComingSoon: false,
  },
  {
    date: '2026-01-23', // Set date as string, e.g., '2026-01-23' for January 23, 2026
    title: 'Webinar: Cách tư duy chiến lược, xây dựng kế hoạch marketing với AI',
    type: 'Webinar',
    category: 'Technical',
    description: 'An insightful lecture session focusing on current industry trends and future outlook. Learn from industry experts and gain valuable perspectives on business strategies and market dynamics.',
    activities: [
      'Activity 1: Industry overview presentation',
      'Activity 2: Case study analysis',
      'Activity 3: Interactive discussion forum',
      'Activity 4: Networking and Q&A'
    ],
    preparation: 'Please review the industry reports and case studies provided. Come prepared with questions and be ready to engage in meaningful discussions with peers and instructors.',
    instructor: 'Prof. Michael Chen',
    isComingSoon: true,
  },
  {
    date: '2026-01-30', // Set date as string, e.g., '2026-01-30' for January 30, 2026
    title: 'Webinar: Lộ trình học marketing mới trong kỷ nguyên AI (30/1)',
    type: 'Webinar',
    category: 'Development',
    description: 'A practical hands-on session where you will work on real projects and apply the concepts you have learned. Get personalized feedback and guidance from experienced instructors.',
    activities: [
      'Activity 1: Project setup and environment configuration',
      'Activity 2: Guided coding exercises',
      'Activity 3: Code review and optimization',
      'Activity 4: Project presentation and feedback'
    ],
    preparation: 'Make sure you have all required software and tools installed. Review the project requirements and come prepared to code. Have your development environment ready before the session starts.',
    instructor: 'Ms. Emily Rodriguez',
    isComingSoon: true,
  },
  
]

// Mock data as a list of objects - only includes events with manually specified dates
// Events can be on any day of the week (Monday through Sunday)
// The calendar will show the month that contains events (or current month if no events)
export const generateMockData = (): DayItem[] => {
  const today = new Date()
  
  // Find the month that contains events (use earliest event month, or current month if no events)
  let targetYear = today.getFullYear()
  let targetMonth = today.getMonth()
  
  // Parse all event dates and find the earliest one
  // Normalize dates to midnight local time to avoid timezone issues
  const eventDates: Date[] = []
  eventTemplates.forEach((template) => {
    const templateDate = new Date(template.date)
    if (!isNaN(templateDate.getTime())) {
      // Normalize to midnight local time
      const normalizedDate = new Date(
        templateDate.getFullYear(),
        templateDate.getMonth(),
        templateDate.getDate()
      )
      eventDates.push(normalizedDate)
    }
  })
  
  // If we have events, use the month of the earliest event
  if (eventDates.length > 0) {
    const earliestEvent = eventDates.reduce((earliest, current) => 
      current < earliest ? current : earliest
    )
    targetYear = earliestEvent.getFullYear()
    targetMonth = earliestEvent.getMonth()
  }
  
  const daysInMonth = getDaysInMonth(new Date(targetYear, targetMonth, 1))
  const startDate = startOfMonth(new Date(targetYear, targetMonth, 1))
  
  // Get all days in the target month
  const allDays = eachDayOfInterval({
    start: startDate,
    end: new Date(targetYear, targetMonth, daysInMonth)
  })

  // Create a map of event dates from templates
  // Normalize dates to midnight local time for accurate comparison
  const eventDatesMap = new Map<string, EventTemplate>()
  eventTemplates.forEach((template) => {
    const templateDate = new Date(template.date) // Parse string date
    // Normalize to midnight local time
    const normalizedDate = new Date(
      templateDate.getFullYear(),
      templateDate.getMonth(),
      templateDate.getDate()
    )
    // Check if the date is valid and within the target month
    if (
      !isNaN(normalizedDate.getTime()) &&
      normalizedDate.getFullYear() === targetYear &&
      normalizedDate.getMonth() === targetMonth
    ) {
      // Use date string as key (YYYY-MM-DD format) for reliable matching
      const dateKey = `${normalizedDate.getFullYear()}-${String(normalizedDate.getMonth() + 1).padStart(2, '0')}-${String(normalizedDate.getDate()).padStart(2, '0')}`
      eventDatesMap.set(dateKey, template)
    }
  })

  // Create the list of day items
  const dayItems: DayItem[] = []

  allDays.forEach((date) => {
    // Normalize date to midnight for comparison
    const normalizedDate = new Date(date.getFullYear(), date.getMonth(), date.getDate())
    const dateKey = `${normalizedDate.getFullYear()}-${String(normalizedDate.getMonth() + 1).padStart(2, '0')}-${String(normalizedDate.getDate()).padStart(2, '0')}`
    const template = eventDatesMap.get(dateKey)

    if (template) {
      // This day has an event - use the template
      const { date: templateDate, ...templateWithoutDate } = template
      dayItems.push({
        date,
        ...templateWithoutDate,
        title: `${template.title}`,
        activities: [...template.activities]
      })
    } else {
      // This day has no event - create empty/default day item
      dayItems.push({
        date,
        title: format(date, 'EEEE, MMMM d'),
        type: '',
        category: '',
        description: 'No scheduled events for this day.',
        activities: [],
        preparation: '',
        instructor: '',
        isComingSoon: true,
      })
    }
  })

  return dayItems
}
