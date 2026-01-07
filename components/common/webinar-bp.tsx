'use client'

import * as React from 'react'
import { format, isToday } from 'date-fns'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { cn } from '@/lib/utils'
import { DayItem, generateMockData } from '@/mocks/web-mock'

const WebinarBP = () => {
  const [selectedDay, setSelectedDay] = React.useState<DayItem | null>(null)
  const [isDialogOpen, setIsDialogOpen] = React.useState(false)
  const days = React.useMemo(() => generateMockData(), [])
  const today = new Date()

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

  return (
    <div className="w-full py-8 px-4 sm:px-6 lg:px-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Weekly Schedule View
        </h2>
        <p className="text-muted-foreground text-sm">
          Scroll horizontally to view all days in {format(today, 'MMMM yyyy')}
        </p>
      </div>

      {/* Horizontal scrollable container */}
      <div className="relative">
        {/* Scrollable list */}
        <div
          ref={scrollContainerRef}
          className={cn(
            'overflow-x-auto scrollbar-hide pb-4 select-none',
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
          <div className="flex gap-4 min-w-max">
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
                      'w-full h-48 rounded-lg border-2 transition-all duration-300',
                      'flex flex-col items-center justify-center p-4',
                      'relative overflow-hidden',
                      isDragging ? 'cursor-grabbing' : hasEvent ? 'cursor-pointer hover:shadow-lg hover:scale-105' : 'cursor-default',
                      // Color scheme:
                      // - Current day with event: blue (cyan)
                      // - Current day without event: gray
                      // - Day with event: white
                      // - Day without event: gray
                      isCurrentDay && hasEvent
                        ? 'bg-cyan-500 border-cyan-600 text-white shadow-lg ring-2 ring-cyan-300 ring-offset-2'
                        : hasEvent
                          ? 'bg-white border-border hover:border-cyan-500 text-card-foreground'
                          : 'bg-gray-200 border-gray-300 text-gray-600'
                    )}
                  >
                    {/* Current day indicator */}
                    {isCurrentDay && (
                      <div className="absolute top-2 right-2">
                        <span className={cn(
                          'text-xs font-bold px-2 py-1 rounded-full',
                          hasEvent 
                            ? 'bg-white text-cyan-600' 
                            : 'bg-gray-400 text-white'
                        )}>
                          Today
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
                          ? 'text-white/80'
                          : hasEvent
                            ? 'text-muted-foreground'
                            : 'text-gray-500'
                      )}>
                        {format(day.date, 'EEE')}
                      </div>
                      <div className={cn(
                        'text-2xl font-bold mb-2',
                        isCurrentDay && hasEvent 
                          ? 'text-white' 
                          : hasEvent 
                            ? 'text-foreground' 
                            : 'text-gray-600'
                      )}>
                        {format(day.date, 'd')}
                      </div>
                      {hasEvent ? (
                        <>
                          <div className={cn(
                            'text-xs font-medium mb-1 px-2 py-1 rounded',
                            isCurrentDay 
                              ? 'bg-white/20 text-white' 
                              : 'bg-cyan-100 text-cyan-700'
                          )}>
                            {day.type}
                          </div>
                          <div className={cn(
                            'text-xs truncate w-full mt-1',
                            isCurrentDay && hasEvent 
                              ? 'text-white/90' 
                              : 'text-muted-foreground'
                          )}>
                            {day.title}
                          </div>
                          <div className={cn(
                            'text-xs mt-2',
                            isCurrentDay && hasEvent 
                              ? 'text-white/80' 
                              : 'text-muted-foreground'
                          )}>
                            {day.instructor}
                          </div>
                        </>
                      ) : (
                        <div className="text-xs mt-2 text-gray-500">
                          No event
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
                            : 'text-foreground'
                        )}>
                          {day.title}
                        </div>
                      </div>
                    )}
                  </button>
                </div>
              )
            })}
          </div>
        </div>

        {/* Scroll indicators (optional visual cues) */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-8 h-16 bg-gradient-to-r from-background to-transparent pointer-events-none opacity-0 sm:opacity-100" />
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-8 h-16 bg-gradient-to-l from-background to-transparent pointer-events-none opacity-0 sm:opacity-100" />
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
                  {format(selectedDay.date, 'EEEE, MMMM d, yyyy')}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6 mt-4">
                {/* Type and Category */}
                {selectedDay.type && selectedDay.category && (
                  <div className="flex flex-wrap gap-3">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-cyan-100 text-cyan-700">
                      {selectedDay.type}
                    </span>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-700">
                      {selectedDay.category}
                    </span>
                  </div>
                )}

                {/* Description */}
                <div>
                  <h3 className="text-lg font-semibold mb-2">Description</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {selectedDay.description}
                  </p>
                </div>

                {/* Activities */}
                {selectedDay.activities.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Activities</h3>
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

                {/* Preparation */}
                {selectedDay.preparation && (
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Preparation</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {selectedDay.preparation}
                    </p>
                  </div>
                )}

                {/* Instructor */}
                {selectedDay.instructor && (
                  <div className="pt-4 border-t">
                    <h3 className="text-lg font-semibold mb-2">Instructor</h3>
                    <p className="text-foreground font-medium">
                      {selectedDay.instructor}
                    </p>
                  </div>
                )}
              </div>
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
