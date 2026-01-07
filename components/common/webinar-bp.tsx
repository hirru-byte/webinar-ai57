'use client'

import * as React from 'react'
import { format, isToday } from 'date-fns'
import { Calendar, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { DayItem, generateMockData } from '@/mocks/web-mock'
import { vi } from 'date-fns/locale'

const WebinarBP = () => {
  const [selectedDay, setSelectedDay] = React.useState<DayItem | null>(null)
  const [isDialogOpen, setIsDialogOpen] = React.useState(false)
  const days = React.useMemo(() => generateMockData(), [])
  const today = new Date()
  // Get the month from the first day item (which represents the month being displayed)
  const displayMonth = days.length > 0 ? days[0].date : today

  // Drag to scroll state
  const scrollContainerRef = React.useRef<HTMLDivElement>(null)
  const dayRefs = React.useRef<(HTMLDivElement | null)[]>([])
  const [isDragging, setIsDragging] = React.useState(false)
  const [startX, setStartX] = React.useState(0)
  const [scrollLeft, setScrollLeft] = React.useState(0)
  const [hasDragged, setHasDragged] = React.useState(false)
  const animationFrameRef = React.useRef<number | null>(null)

  // Center current day on mount
  React.useEffect(() => {
    if (!scrollContainerRef.current) return

    const currentDayIndex = days.findIndex(day => isToday(day.date))
    if (currentDayIndex === -1) return

    const currentDayElement = dayRefs.current[currentDayIndex]
    if (!currentDayElement) return

    // Wait for layout to be ready
    const timeoutId = setTimeout(() => {
      if (!scrollContainerRef.current || !currentDayElement) return

      const container = scrollContainerRef.current
      const containerRect = container.getBoundingClientRect()
      const elementRect = currentDayElement.getBoundingClientRect()
      
      // Calculate scroll position to center the element
      const scrollPosition =
        currentDayElement.offsetLeft -
        containerRect.width / 2 +
        elementRect.width / 2

      container.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      })
    }, 100)

    return () => clearTimeout(timeoutId)
  }, [days])

  const handleDayClick = (day: DayItem) => {
    // Prevent opening dialog if user was dragging
    if (hasDragged) {
      setHasDragged(false)
      return
    }
    setSelectedDay(day)
    setIsDialogOpen(true)
  }

  // Mouse drag handlers with smooth scrolling
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!scrollContainerRef.current) return
    // Cancel any ongoing animation
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current)
    }
    setIsDragging(true)
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft)
    setScrollLeft(scrollContainerRef.current.scrollLeft)
    setHasDragged(false)
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !scrollContainerRef.current) return
    e.preventDefault()
    
    const x = e.pageX - scrollContainerRef.current.offsetLeft
    const walk = (x - startX) * 1.5 // Reduced multiplier for smoother feel
    
    // Use requestAnimationFrame for smooth scrolling
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current)
    }
    
    animationFrameRef.current = requestAnimationFrame(() => {
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollLeft = scrollLeft - walk
      }
    })
    
    setHasDragged(true)
  }

  const handleMouseUp = () => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current)
    }
    setIsDragging(false)
  }

  const handleMouseLeave = () => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current)
    }
    setIsDragging(false)
  }

  // Touch drag handlers for mobile with smooth scrolling
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!scrollContainerRef.current) return
    // Cancel any ongoing animation
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current)
    }
    setIsDragging(true)
    setStartX(e.touches[0].pageX - scrollContainerRef.current.offsetLeft)
    setScrollLeft(scrollContainerRef.current.scrollLeft)
    setHasDragged(false)
  }

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging || !scrollContainerRef.current) return
    const x = e.touches[0].pageX - scrollContainerRef.current.offsetLeft
    const walk = (x - startX) * 1.5 // Reduced multiplier for smoother feel
    
    // Use requestAnimationFrame for smooth scrolling
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current)
    }
    
    animationFrameRef.current = requestAnimationFrame(() => {
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollLeft = scrollLeft - walk
      }
    })
    
    setHasDragged(true)
  }

  const handleTouchEnd = () => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current)
    }
    setIsDragging(false)
  }

  // Cleanup animation frame on unmount
  React.useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [])

  // Scroll handlers
  const handleScrollLeft = () => {
    if (!scrollContainerRef.current) return
    const scrollAmount = scrollContainerRef.current.clientWidth * 0.7
    scrollContainerRef.current.scrollBy({
      left: -scrollAmount,
      behavior: 'smooth'
    })
  }

  const handleScrollRight = () => {
    if (!scrollContainerRef.current) return
    const scrollAmount = scrollContainerRef.current.clientWidth * 0.7
    scrollContainerRef.current.scrollBy({
      left: scrollAmount,
      behavior: 'smooth'
    })
  }

  // Find and scroll to latest event
  const scrollToLatestEvent = () => {
    if (!scrollContainerRef.current || days.length === 0) return

    // Find the last day with an event (has type and category)
    let latestEventIndex = -1
    for (let i = days.length - 1; i >= 0; i--) {
      if (days[i].type !== '' && days[i].category !== '') {
        latestEventIndex = i
        break
      }
    }

    if (latestEventIndex === -1) return

    const latestEventElement = dayRefs.current[latestEventIndex]
    if (!latestEventElement) return

    const container = scrollContainerRef.current
    const containerRect = container.getBoundingClientRect()
    const elementRect = latestEventElement.getBoundingClientRect()
    
    // Calculate scroll position to center the element
    const scrollPosition =
      latestEventElement.offsetLeft -
      containerRect.width / 2 +
      elementRect.width / 2

    container.scrollTo({
      left: scrollPosition,
      behavior: 'smooth'
    })
  }

  return (
    <div className="w-full pb-8 z-50 relative">
      <div className="mb-6 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl lg:text-4xl font-bold text-pretty leading-tight text-white">
              Các sự kiện webinar trong {format(displayMonth, 'MMMM yyyy', { locale: vi })}
            </h2>
            {/* Scroll buttons */}
            <div className="flex items-center gap-2">
              <Button
                onClick={handleScrollLeft}
                variant="outline"
                size="icon"
                className=" bg-white/10 border-white/20 text-white hover:bg-white/80 h-10 w-10 cursor-pointer"
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>
              <Button
                onClick={handleScrollRight}
                variant="outline"
                size="icon"
                className=" bg-white/10 border-white/20 text-white hover:bg-white/80 h-10 w-10 cursor-pointer"
                aria-label="Scroll right"
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
          </div>
          {/* <div className="flex items-center gap-2">
            <Button
              onClick={scrollToLatestEvent}
              variant="outline"
              size="sm"
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              <ArrowRight className="w-4 h-4 mr-2" />
              Sự kiện mới nhất
            </Button>
          </div> */}
        </div>
      </div>

      {/* Horizontal scrollable container */}
      <div className="relative">
        

        {/* Fade overlays - left side */}
        <div className="absolute left-0 top-0 bottom-4 w-24 bg-gradient-to-r from-blue-900/50 to-transparent pointer-events-none z-10" />
        
        {/* Fade overlays - right side */}
        <div className="absolute right-0 top-0 bottom-4 w-16 bg-gradient-to-l from-blue-700/50 to-transparent pointer-events-none z-10" />
        
        {/* Scrollable list */}
        <div
          ref={scrollContainerRef}
          className={cn(
            'overflow-x-auto scrollbar-hide pb-4 select-none px-4',
            'scroll-smooth',
            isDragging ? 'cursor-grabbing' : 'cursor-grab',
            'active:cursor-grabbing'
          )}
          style={{
            scrollBehavior: isDragging ? 'auto' : 'smooth'
          }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="flex gap-4 min-w-max py-6">
            {days.map((day, index) => {
              const isCurrentDay = isToday(day.date)
              const hasEvent = day.type !== '' && day.category !== ''
              
              return (
                <div
                  key={index}
                  ref={(el) => {
                    dayRefs.current[index] = el
                  }}
                  className={cn(
                    'group relative shrink-0 w-[calc((100vw-4rem)/7)] min-w-[140px] max-w-[200px]',
                    'sm:w-[calc((100vw-6rem)/7)] sm:min-w-[160px]',
                    'md:w-[calc((100vw-8rem)/7)] md:min-w-[180px]',
                    'lg:min-w-[200px]'
                  )}
                >
                  {/* Day Card */}
                  <button
                    onClick={() => hasEvent && handleDayClick(day)}
                    className={cn(
                      'w-full h-32 rounded-lg border-2 transition-all duration-300',
                      'flex flex-col items-center justify-center p-4',
                      'relative ',
                      isDragging ? 'cursor-grabbing' : hasEvent ? 'cursor-pointer hover:shadow-lg hover:scale-105' : 'cursor-default',
                      // Color scheme:
                      // - Current day with event: vibrant cyan/blue gradient
                      // - Current day without event: muted gray with border
                      // - Day with event: light cyan background with colored border
                      // - Day without event: gray
                      isCurrentDay && hasEvent
                        ? 'bg-gradient-to-br from-cyan-500 via-blue-500 to-blue-600 border-blue-400 text-white shadow-2xl ring-4 ring-blue-400/50 ring-offset-2'
                        : isCurrentDay
                          ? 'bg-gray-300 border-gray-400 text-gray-700 shadow-md'
                          : hasEvent
                            ? 'bg-gradient-to-br from-blue-200 to-blue-300 border-2 border-blue-400 hover:border-blue-500 text-card-foreground shadow-md'
                            : 'bg-gray-200 border-gray-300 text-gray-600'
                    )}
                  >
                    {/* Current day indicator */}
                    {isCurrentDay && (
                      <div className="absolute -top-4 right-1/2 transform translate-x-1/2 z-40">
                        <span className={cn(
                          'text-xs text-nowrap font-bold px-2.5 py-1 rounded-full shadow-lg',
                          hasEvent 
                            ? 'bg-white text-blue-600 border-blue-400' 
                            : 'bg-white text-gray-700 border-gray-600'
                        )}>
                          Hôm nay
                        </span>
                      </div>
                    )}

                    {/* Default view - shows all info */}
                    <div className={cn(
                      'flex flex-col items-center justify-center h-full w-full text-center',
                      hasEvent && 'group-hover:hidden'
                    )}>
                      <div className={cn(
                        'text-xs font-semibold mb-1',
                        isCurrentDay && hasEvent
                          ? 'text-white/90'
                          : isCurrentDay
                            ? 'text-gray-700'
                            : hasEvent
                              ? 'text-blue-700'
                              : 'text-gray-500'
                      )}>
                        {format(day.date, 'EEE', { locale: vi })}
                      </div>
                      <div className={cn(
                        'text-2xl font-bold mb-2',
                        isCurrentDay && hasEvent 
                          ? 'text-white' 
                          : isCurrentDay
                            ? 'text-gray-800'
                            : hasEvent 
                              ? 'text-blue-800' 
                              : 'text-gray-600'
                      )}>
                        {format(day.date, 'd')}
                      </div>
                      {hasEvent ? (
                        <>
                          <div className={cn(
                            'text-xs font-medium mb-1 px-2 py-1 rounded',
                            isCurrentDay 
                              ? 'bg-white/30 text-white border-white/20' 
                              : 'bg-blue-500 text-white font-semibold'
                          )}>
                            {day.type}
                          </div>
                          <div className={cn(
                            'text-xs truncate w-full mt-1 font-medium',
                            isCurrentDay && hasEvent 
                              ? 'text-white' 
                              : 'text-blue-900'
                          )}>
                            {day.title}
                          </div>
                          {/* <div className={cn(
                            'text-xs mt-2',
                            isCurrentDay && hasEvent 
                              ? 'text-white/90' 
                              : 'text-cyan-800'
                          )}>
                            {day.instructor}
                          </div> */}
                        </>
                      ) : (
                        <div className="text-xs mt-2 text-gray-500">
                          Không có sự kiện
                        </div>
                      )}
                    </div>

                    {/* Hover view - shows only title (only for items with events) */}
                    {hasEvent && (
                      <div className="hidden group-hover:flex flex-col items-center justify-center h-full w-full text-center">
                        <div className={cn(
                          'text-sm font-semibold px-2',
                          isCurrentDay && hasEvent 
                            ? 'text-white' 
                            : 'text-blue-900'
                        )}>
                          {day.title.length > 30 ? day.title.slice(0, 50) + '...' : day.title}
                        </div>
                      </div>
                    )}
                  </button>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Detail Dialog/Modal */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          {selectedDay && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl">
                  {selectedDay.title}
                </DialogTitle>
                <DialogDescription>
                  {format(selectedDay.date, 'EEEE, d MMMM, yyyy', { locale: vi })}
                </DialogDescription>
              </DialogHeader>

              {selectedDay.isComingSoon ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                    <Calendar className="w-10 h-10 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{selectedDay.title}</h3>
                  <p className="text-lg font-semibold text-blue-600 mb-4">Sắp ra mắt</p>
                  <p className="text-sm text-gray-600">
                    Thông tin chi tiết về webinar này sẽ sớm được cập nhật. Vui lòng quay lại sau!
                  </p>
                </div>
              ) : (
                <div className="space-y-6 mt-4">
                  {/* Type and Category */}
                  {selectedDay.type && selectedDay.category && (
                    <div className="flex flex-wrap gap-3">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-cyan-100 text-cyan-700">
                        {selectedDay.type}
                      </span>
                      {/* <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-700">
                        {selectedDay.category}
                      </span> */}
                    </div>
                  )}

                  {/* Description */}
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Mô tả</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {selectedDay.description}
                    </p>
                  </div>

                  {/* Activities */}
                  {selectedDay.activities.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Nội dung</h3>
                      <ul className="space-y-2">
                        {selectedDay.activities.map((activity, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-cyan-500 mt-1">•</span>
                            <span className="text-muted-foreground">{activity}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                 

                  {/* Instructor */}
                  {selectedDay.instructor && (
                    <div className="pt-4 border-t">
                      <h3 className="text-lg font-semibold mb-2">Giảng viên</h3>
                      <p className="text-foreground font-medium">
                        {selectedDay.instructor}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </DialogContent>
      </Dialog>

      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  )
}

export default WebinarBP
