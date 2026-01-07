import { format, getDaysInMonth, startOfMonth, eachDayOfInterval, getDay } from 'date-fns'

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
}

// Event template uses the same structure but with optional date as string
type EventTemplate = Omit<DayItem, 'date'> & {
  date?: string // Date as string format: 'YYYY-MM-DD' or leave undefined for auto-generated
}

// Event data templates
// You can manually set the date property as a string (format: 'YYYY-MM-DD'), or leave it undefined to use auto-generated weekend dates
const eventTemplates: EventTemplate[] = [
  {
    date: undefined, // Set date as string, e.g., '2024-01-06' for January 6, 2024, or leave undefined for auto-generated
    title: 'Weekend Workshop: Advanced Techniques',
    type: 'Workshop',
    category: 'Technical',
    description: 'Join us for an intensive weekend workshop covering advanced techniques and best practices. This hands-on session will help you master complex concepts and apply them in real-world scenarios.',
    activities: [
      'Activity 1: Advanced concept introduction',
      'Activity 2: Hands-on practice with real examples',
      'Activity 3: Group collaboration and problem-solving',
      'Activity 4: Q&A and knowledge sharing session'
    ],
    preparation: 'Before attending, please review the provided materials and complete the pre-workshop assignments. Ensure you have a stable internet connection and a quiet workspace for optimal learning experience.',
    instructor: 'Dr. Sarah Johnson'
  },
  {
    date: undefined, // Set date as string, e.g., '2024-01-13' for January 13, 2024
    title: 'Weekend Lecture: Industry Insights',
    type: 'Lecture',
    category: 'Business',
    description: 'An insightful lecture session focusing on current industry trends and future outlook. Learn from industry experts and gain valuable perspectives on business strategies and market dynamics.',
    activities: [
      'Activity 1: Industry overview presentation',
      'Activity 2: Case study analysis',
      'Activity 3: Interactive discussion forum',
      'Activity 4: Networking and Q&A'
    ],
    preparation: 'Please review the industry reports and case studies provided. Come prepared with questions and be ready to engage in meaningful discussions with peers and instructors.',
    instructor: 'Prof. Michael Chen'
  },
  {
    date: undefined, // Set date as string, e.g., '2024-01-20' for January 20, 2024
    title: 'Weekend Hands-on: Practical Application',
    type: 'Hands-on',
    category: 'Development',
    description: 'A practical hands-on session where you will work on real projects and apply the concepts you have learned. Get personalized feedback and guidance from experienced instructors.',
    activities: [
      'Activity 1: Project setup and environment configuration',
      'Activity 2: Guided coding exercises',
      'Activity 3: Code review and optimization',
      'Activity 4: Project presentation and feedback'
    ],
    preparation: 'Make sure you have all required software and tools installed. Review the project requirements and come prepared to code. Have your development environment ready before the session starts.',
    instructor: 'Ms. Emily Rodriguez'
  },
  {
    date: undefined, // Set date as string, e.g., '2024-01-21' for January 21, 2024
    title: 'Weekend Discussion: Best Practices',
    type: 'Discussion',
    category: 'Design',
    description: 'An interactive discussion session focusing on design best practices and creative problem-solving approaches. Share ideas, get feedback, and learn from the community.',
    activities: [
      'Activity 1: Design principles overview',
      'Activity 2: Portfolio review and critique',
      'Activity 3: Collaborative design challenge',
      'Activity 4: Peer feedback and discussion'
    ],
    preparation: 'Prepare your portfolio or design samples to share. Review design principles and be ready to participate actively in discussions and collaborative activities.',
    instructor: 'Dr. James Wilson'
  },
  {
    date: undefined, // Set date as string, e.g., '2024-01-27' for January 27, 2024
    title: 'Weekend Q&A: Expert Panel',
    type: 'Q&A',
    category: 'Marketing',
    description: 'An exclusive Q&A session with industry experts. Get your questions answered and learn from the experiences of seasoned professionals in the field.',
    activities: [
      'Activity 1: Expert introductions and topics overview',
      'Activity 2: Open Q&A session',
      'Activity 3: Panel discussion on hot topics',
      'Activity 4: Networking and follow-up resources'
    ],
    preparation: 'Prepare your questions in advance. Review the expert profiles and topics that will be covered. Come ready to engage and learn from the panel discussion.',
    instructor: 'Ms. Lisa Anderson'
  }
]

// Mock data as a list of objects - one event per week on weekend (Saturday or Sunday)
export const generateMockData = (): DayItem[] => {
  const today = new Date()
  const year = today.getFullYear()
  const month = today.getMonth()
  const daysInMonth = getDaysInMonth(today)
  const startDate = startOfMonth(today)
  
  // Get all days in the month
  const allDays = eachDayOfInterval({
    start: startDate,
    end: new Date(year, month, daysInMonth)
  })

  // Group days by calendar week and select weekend days for events
  // Calculate week number based on days since start of month
  const weekEvents: Date[] = []
  const weekMap: Map<number, Date[]> = new Map()
  
  // Group days by week (each week starts on Sunday)
  allDays.forEach((date) => {
    const dayOfWeek = getDay(date) // 0 = Sunday, 6 = Saturday
    const daysSinceStart = Math.floor((date.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))
    const weekNumber = Math.floor(daysSinceStart / 7)
    
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      if (!weekMap.has(weekNumber)) {
        weekMap.set(weekNumber, [])
      }
      weekMap.get(weekNumber)!.push(date)
    }
  })
  
  // For each week, randomly select Saturday or Sunday
  weekMap.forEach((weekendDays) => {
    if (weekendDays.length > 0) {
      const selectedDay = weekendDays.length > 1
        ? weekendDays[Math.floor(Math.random() * weekendDays.length)]
        : weekendDays[0]
      weekEvents.push(selectedDay)
    }
  })

  // Create the list of day items
  const dayItems: DayItem[] = []
  let eventIndex = 0

  // First, handle templates with manually set dates (as strings)
  const manualEventDates = new Set<number>()
  eventTemplates.forEach((template) => {
    if (template.date !== undefined && template.date !== null) {
      const templateDate = new Date(template.date) // Parse string date
      // Check if the date is valid and within the current month
      if (
        !isNaN(templateDate.getTime()) &&
        templateDate.getFullYear() === year &&
        templateDate.getMonth() === month
      ) {
        manualEventDates.add(templateDate.getTime())
      }
    }
  })

  allDays.forEach((date) => {
    const dateTime = date.getTime()
    
    // Check if this date has a manually set event
    const hasManualEvent = manualEventDates.has(dateTime)
    
    // Check if this date has an auto-generated event
    const hasAutoEvent = weekEvents.some(eventDate => eventDate.getTime() === dateTime)
    
    // Check if this date has any event
    const hasEvent = hasManualEvent || hasAutoEvent

    if (hasManualEvent) {
      // Find the template with this date
      const template = eventTemplates.find(t => {
        if (t.date === undefined || t.date === null) return false
        const templateDate = new Date(t.date) // Parse string date
        return !isNaN(templateDate.getTime()) && templateDate.getTime() === dateTime
      })
      
      if (template) {
        const { date: templateDate, ...templateWithoutDate } = template
        dayItems.push({
          date,
          ...templateWithoutDate,
          title: `${format(date, 'EEEE')} - ${template.title}`,
          activities: [...template.activities]
        })
      }
    } else if (hasAutoEvent) {
      // This day has an auto-generated event - use event template
      const template = eventTemplates[eventIndex % eventTemplates.length]
      // Skip templates that have manually set dates
      const availableTemplates = eventTemplates.filter(t => !t.date)
      const templateToUse = availableTemplates.length > 0 
        ? availableTemplates[eventIndex % availableTemplates.length]
        : template
      
      const { date: templateDate, ...templateWithoutDate } = templateToUse
      dayItems.push({
        date,
        ...templateWithoutDate,
        title: `${format(date, 'EEEE')} - ${templateToUse.title}`,
        activities: [...templateToUse.activities]
      })
      eventIndex++
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
        instructor: ''
      })
    }
  })

  return dayItems
}
