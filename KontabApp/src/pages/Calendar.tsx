// src/pages/Calendar.tsx - VERSION I PLOTË
import React, { useMemo, useState } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Plus,
  Filter,
  X,
  Calendar as CalendarIcon, 
  AlertCircle, 
  Users,
  DollarSign,
  FileText,
  Bell,
  Grid3x3,
  CalendarDays,
  Circle
} from 'lucide-react';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import { useStore } from '../store/useStore';
import { CalendarEvent } from '@/types';

const Calendar: React.FC = () => {
  const { calendarEvents, clients, addCalendarEvent } = useStore();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<'month' | 'week' | 'day'>('month');
  const [filter, setFilter] = useState<string>('all');
  const [showAddEvent, setShowAddEvent] = useState(false);
  const [newEvent, setNewEvent] = useState<{
    title: string;
    description: string;
    startDate: Date;
    endDate?: Date;
    clientId: string;
    type: CalendarEvent['type'];
    priority: CalendarEvent['priority'];
  }>({
    title: '',
    description: '',
    startDate: new Date(),
    endDate: undefined,
    clientId: '',
    type: 'meeting' as const,
    priority: 'medium' as const,
  });

  // ========== DATA & CONSTANTS ==========
  const months = [
    'Janar', 'Shkurt', 'Mars', 'Prill', 'Maj', 'Qershor',
    'Korrik', 'Gusht', 'Shtator', 'Tetor', 'Nëntor', 'Dhjetor'
  ];

  const weekdays = [
    { key: 'di', label: 'Di', full: 'Diel' },
    { key: 'he', label: 'He', full: 'Hënë' },
    { key: 'ma', label: 'Ma', full: 'Martë' },
    { key: 'me', label: 'Me', full: 'Mërkurë' },
    { key: 'en', label: 'En', full: 'Enjte' },
    { key: 'pr', label: 'Pr', full: 'Premte' },
    { key: 'sh', label: 'Sh', full: 'Shtunë' }
  ];

  const eventTypes = [
    { value: 'all', label: 'Të gjitha', color: 'gray', icon: CalendarIcon },
    { value: 'tax_deadline', label: 'Afatet TVSH', color: 'red', icon: AlertCircle },
    { value: 'payment', label: 'Pagesa', color: 'green', icon: DollarSign },
    { value: 'meeting', label: 'Takime', color: 'blue', icon: Users },
    { value: 'report', label: 'Raporte', color: 'purple', icon: FileText },
    { value: 'reminder', label: 'Kujtesa', color: 'yellow', icon: Bell }
  ];

  // ========== HELPER FUNCTIONS ==========
  const toDateTimeLocal = (date: Date) => {
    const pad = (value: number) => String(value).padStart(2, '0');
    const year = date.getFullYear();
    const month = pad(date.getMonth() + 1);
    const day = pad(date.getDate());
    const hours = pad(date.getHours());
    const minutes = pad(date.getMinutes());
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  const getWeekNumber = (date: Date) => {
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
    const pastDaysOfYear = (date.getTime() - firstDayOfYear.getTime()) / 86400000;
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
  };
  const filteredEvents = useMemo(() => {
    return calendarEvents.filter(event => {
      if (filter === 'all') return true;
      return event.type === filter;
    });
  }, [calendarEvents, filter]);

  const monthEventsCount = useMemo(() => {
    return filteredEvents.filter(event =>
      new Date(event.startDate).getMonth() === currentDate.getMonth() &&
      new Date(event.startDate).getFullYear() === currentDate.getFullYear()
    ).length;
  }, [filteredEvents, currentDate]);

  const urgentEventsCount = useMemo(() => {
    return filteredEvents.filter(event => event.priority === 'high').length;
  }, [filteredEvents]);

  const upcomingEvents = useMemo(() => {
    const now = new Date();
    return filteredEvents
      .filter(event => new Date(event.startDate) > now)
      .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
      .slice(0, 5);
  }, [filteredEvents]);

  const upcomingEventsCount = useMemo(() => {
    const now = new Date();
    return filteredEvents.filter(event => new Date(event.startDate) > now).length;
  }, [filteredEvents]);

  const eventTypeStyles: Record<CalendarEvent['type'], { bg: string; text: string }> = {
    tax_deadline: { bg: 'bg-red-100', text: 'text-red-600' },
    payment: { bg: 'bg-green-100', text: 'text-green-600' },
    meeting: { bg: 'bg-blue-100', text: 'text-blue-600' },
    report: { bg: 'bg-purple-100', text: 'text-purple-600' },
    reminder: { bg: 'bg-yellow-100', text: 'text-yellow-600' },
  };

  const priorityStyles: Record<CalendarEvent['priority'], { border: string; bg: string; text: string; dot: string }> = {
    high: { border: 'border-red-400', bg: 'bg-red-50', text: 'text-red-700', dot: 'bg-red-500' },
    medium: { border: 'border-yellow-400', bg: 'bg-yellow-50', text: 'text-yellow-700', dot: 'bg-yellow-500' },
    low: { border: 'border-green-400', bg: 'bg-green-50', text: 'text-green-700', dot: 'bg-green-500' },
  };
  

  // ========== NAVIGATION FUNCTIONS ==========
  const goToPrevious = () => {
    const newDate = new Date(currentDate);
    
    if (view === 'month') {
      newDate.setMonth(newDate.getMonth() - 1);
    } else if (view === 'week') {
      newDate.setDate(newDate.getDate() - 7);
    } else {
      newDate.setDate(newDate.getDate() - 1);
    }
    
    setCurrentDate(newDate);
  };

  const goToNext = () => {
    const newDate = new Date(currentDate);
    
    if (view === 'month') {
      newDate.setMonth(newDate.getMonth() + 1);
    } else if (view === 'week') {
      newDate.setDate(newDate.getDate() + 7);
    } else {
      newDate.setDate(newDate.getDate() + 1);
    }
    
    setCurrentDate(newDate);
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  // ========== EVENT FUNCTIONS ==========
  const getEventsForDate = (date: Date) => {
    return filteredEvents.filter(event => {
      const eventDate = new Date(event.startDate);
      return (
        eventDate.getDate() === date.getDate() &&
        eventDate.getMonth() === date.getMonth() &&
        eventDate.getFullYear() === date.getFullYear()
      );
    });
  };

  const getEventsForWeek = (date: Date) => {
    const startOfWeek = new Date(date);
    startOfWeek.setDate(date.getDate() - date.getDay());
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    
    return filteredEvents.filter(event => {
      const eventDate = new Date(event.startDate);
      return eventDate >= startOfWeek && eventDate <= endOfWeek;
    });
  };

  const getClientName = (clientId: string) => {
    const client = clients.find(c => c.id === clientId);
    return client ? client.name : 'Klient i panjohur';
  };

  const getEventTypeInfo = (type: string) => {
    const typeInfo = eventTypes.find(t => t.value === type);
    return typeInfo || eventTypes[0];
  };

  // ========== VIEW RENDERERS ==========
  const renderMonthView = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDayOfMonth = getFirstDayOfMonth(year, month);
    
    const days = Array.from({ length: daysInMonth }, (_, i) => {
      const day = i + 1;
      const date = new Date(year, month, day);
      return { day, date, events: getEventsForDate(date) };
    });
    
    const emptyDays = Array.from({ length: firstDayOfMonth }, (_, i) => i);

    return (
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {/* Weekday Headers */}
        <div className="grid grid-cols-7 border-b border-gray-200">
          {weekdays.map((day) => (
            <div key={day.key} className="p-3 text-center text-sm font-medium text-gray-500">
              {day.label}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7">
          {/* Empty days */}
          {emptyDays.map((_, index) => (
            <div key={`empty-${index}`} className="h-32 p-2 border border-gray-200 bg-gray-50"></div>
          ))}

          {/* Days with events */}
          {days.map(({ day, date, events }) => {
            const isToday = date.toDateString() === new Date().toDateString();
            const isWeekend = date.getDay() === 0 || date.getDay() === 6;
            
            return (
              <div 
                key={`day-${day}`}
                className={`h-32 p-2 border border-gray-200 ${
                  isToday 
                    ? 'bg-primary-50 border-primary-200' 
                    : isWeekend 
                    ? 'bg-gray-50' 
                    : 'hover:bg-gray-50'
                }`}
              >
                <div className="flex justify-between items-center mb-1">
                  <span className={`text-sm font-medium ${
                    isToday ? 'text-primary-600' : 'text-gray-900'
                  }`}>
                    {day}
                  </span>
                  {events.length > 0 && (
                    <span className="text-xs font-medium text-gray-500">
                      {events.length}
                    </span>
                  )}
                </div>
                
                {/* Events for the day */}
                <div className="space-y-1 overflow-y-auto max-h-20">
                  {events.slice(0, 3).map((event) => {
                    const typeInfo = getEventTypeInfo(event.type);
                    const Icon = typeInfo.icon;
                    const priorityStyle = priorityStyles[event.priority];
                    
                    return (
                      <div
                        key={`event-${event.id}`}
                        className={`flex items-center space-x-1 text-xs p-1 rounded truncate border-l-2 ${priorityStyle.border} ${priorityStyle.bg}`}
                        title={`${event.title} - ${getClientName(event.clientId)}`}
                      >
                        <span className={`w-2 h-2 rounded-full ${priorityStyle.dot}`} />
                        <Icon className={`w-3 h-3 flex-shrink-0 ${priorityStyle.text}`} />
                        <span className="truncate">{event.title}</span>
                      </div>
                    );
                  })}
                  {events.length > 3 && (
                    <div className="text-xs text-gray-500 px-1">
                      +{events.length - 3} më shumë
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderWeekView = () => {
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
    
    const weekDays = Array.from({ length: 7 }, (_, i) => {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      return { 
        date, 
        events: getEventsForDate(date),
        weekday: weekdays[i]
      };
    });

    return (
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {/* Week Header */}
        <div className="grid grid-cols-7 border-b border-gray-200">
          {weekDays.map(({ date, events, weekday }) => {
            const isToday = date.toDateString() === new Date().toDateString();
            
            return (
              <div 
                key={`weekday-${date.getDate()}`}
                className={`p-3 text-center ${isToday ? 'bg-primary-50' : ''}`}
              >
                <div className="text-sm font-medium text-gray-500 mb-1">
                  {weekday.full}
                </div>
                <div className={`text-lg font-bold ${isToday ? 'text-primary-600' : 'text-gray-900'}`}>
                  {date.getDate()}
                </div>
                {events.length > 0 && (
                  <div className="mt-1">
                    <span className="text-xs font-medium text-primary-600">
                      {events.length} evente
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Week Events */}
        <div className="p-6">
          <div className="space-y-6">
            {weekDays.map(({ date, events, weekday }) => {
              if (events.length === 0) return null;

              return (
                <div key={`week-events-${date.getDate()}`} className="space-y-3">
                  <h4 className="font-medium text-gray-900 border-l-4 border-primary-500 pl-3">
                    {weekday.full}, {date.getDate()} {months[date.getMonth()]}
                  </h4>
                  <div className="space-y-2">
                    {events.map((event) => {
                      const typeInfo = getEventTypeInfo(event.type);
                      const Icon = typeInfo.icon;
                      const priorityStyle = priorityStyles[event.priority];
                      
                      return (
                        <div 
                          key={`week-event-${event.id}`}
                          className={`p-3 rounded-lg border-l-4 ${priorityStyle.border} ${priorityStyle.bg}`}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-1">
                                <Icon className="w-4 h-4" />
                                <p className="font-medium text-gray-900">{event.title}</p>
                              </div>
                              <p className="text-sm text-gray-600 mb-2">{event.description}</p>
                              <div className="flex items-center space-x-3 text-sm text-gray-500">
                                <span>{getClientName(event.clientId)}</span>
                                <span>•</span>
                                <span>{new Date(event.startDate).toLocaleTimeString('sq-AL', { 
                                  hour: '2-digit', 
                                  minute: '2-digit' 
                                })}</span>
                              </div>
                            </div>
                            <span className={`px-2 py-1 rounded text-xs font-medium ${
                              event.priority === 'high' ? 'bg-red-100 text-red-800' :
                              event.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-green-100 text-green-800'
                            }`}>
                              {event.priority === 'high' ? 'Urgjente' :
                               event.priority === 'medium' ? 'Normale' : 'Të ulëta'}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}

            {weekDays.every(day => day.events.length === 0) && (
              <div className="text-center py-8">
                <CalendarIcon className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">Nuk ka evente për këtë javë</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderDayView = () => {
    const dayEvents = getEventsForDate(currentDate);
    const timeSlots = Array.from({ length: 13 }, (_, i) => i + 8); // 8AM to 8PM

    return (
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {/* Day Header */}
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-xl font-bold text-gray-900">
            {currentDate.toLocaleDateString('sq-AL', { 
              weekday: 'long', 
              day: 'numeric', 
              month: 'long', 
              year: 'numeric' 
            })}
          </h3>
          <p className="text-gray-600 mt-1">
            {dayEvents.length} evente të planifikuara
          </p>
        </div>

        {/* Day Timeline */}
        <div className="divide-y divide-gray-200">
          {timeSlots.map((hour) => {
            const hourEvents = dayEvents.filter(event => 
              new Date(event.startDate).getHours() === hour
            );
            
            return (
              <div key={`hour-${hour}`} className="flex min-h-[80px]">
                {/* Time column */}
                <div className="w-20 p-4 border-r border-gray-200 flex-shrink-0">
                  <span className="text-sm font-medium text-gray-500">
                    {hour}:00
                  </span>
                </div>
                
                {/* Events column */}
                <div className="flex-1 p-4">
                  {hourEvents.map((event) => {
                    const typeInfo = getEventTypeInfo(event.type);
                    const Icon = typeInfo.icon;
                    const priorityStyle = priorityStyles[event.priority];
                    
                    return (
                      <div
                        key={`day-event-${event.id}`}
                        className={`p-3 rounded-lg mb-3 border-l-4 ${priorityStyle.border} ${priorityStyle.bg}`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-3">
                            <Icon className="w-5 h-5 mt-0.5" />
                            <div>
                              <p className="font-medium text-gray-900">{event.title}</p>
                              <p className="text-sm text-gray-600 mt-1">{event.description}</p>
                              <div className="flex items-center space-x-3 mt-2 text-sm text-gray-500">
                                <span>{getClientName(event.clientId)}</span>
                                <span>•</span>
                                <span>
                                  {new Date(event.startDate).toLocaleTimeString('sq-AL', { 
                                    hour: '2-digit', 
                                    minute: '2-digit' 
                                  })}
                                  {event.endDate && ` - ${new Date(event.endDate).toLocaleTimeString('sq-AL', { 
                                    hour: '2-digit', 
                                    minute: '2-digit' 
                                  })}`}
                                </span>
                              </div>
                            </div>
                          </div>
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            event.priority === 'high' ? 'bg-red-100 text-red-800' :
                            event.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-green-100 text-green-800'
                          }`}>
                            {event.priority === 'high' ? 'Urgjente' :
                             event.priority === 'medium' ? 'Normale' : 'Të ulëta'}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                  
                  {hourEvents.length === 0 && (
                    <div className="h-full flex items-center">
                      <span className="text-sm text-gray-400">Nuk ka evente</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {dayEvents.length === 0 && (
          <div className="p-8 text-center">
            <CalendarIcon className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">Nuk ka evente për këtë ditë</p>
            <Button 
              variant="outline" 
              className="mt-4"
              onClick={() => setShowAddEvent(true)}
            >
              Shto Event të Ri
            </Button>
          </div>
        )}
      </div>
    );
  };

  // ========== ADD EVENT MODAL ==========
  const handleAddEvent = () => {
    if (!newEvent.title.trim() || !newEvent.clientId) {
      alert('Ju lutem plotësoni titullin dhe klientin');
      return;
    }

    const event: CalendarEvent = {
      id: `event-${Date.now()}`,
      title: newEvent.title,
      description: newEvent.description,
      startDate: newEvent.startDate,
      endDate: newEvent.endDate,
      clientId: newEvent.clientId,
      type: newEvent.type,
      priority: newEvent.priority,
      status: 'pending',
      createdAt: new Date(),
      createdBy: 'acc1'
    };

    addCalendarEvent(event);
    setShowAddEvent(false);
    setNewEvent({
      title: '',
      description: '',
      startDate: new Date(),
      endDate: undefined,
      clientId: '',
      type: 'meeting',
      priority: 'medium',
    });
  };

  // ========== MAIN RENDER ==========
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Kalendari</h1>
          <p className="text-gray-600 mt-2">
            Menaxhoni afatet, takimet dhe detyrat me klientët
          </p>
        </div>
        <Button 
          variant="primary" 
          icon={Plus}
          onClick={() => setShowAddEvent(true)}
        >
          Shto Event
        </Button>
      </div>

      {/* Controls */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
          {/* Navigation */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <button
                onClick={goToPrevious}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              
              <h2 className="text-xl font-bold text-gray-900">
                {view === 'month' && `${months[currentDate.getMonth()]} ${currentDate.getFullYear()}`}
                {view === 'week' && `Javë ${getWeekNumber(currentDate)}, ${months[currentDate.getMonth()]} ${currentDate.getFullYear()}`}
                {view === 'day' && currentDate.toLocaleDateString('sq-AL', { 
                  day: 'numeric', 
                  month: 'long', 
                  year: 'numeric' 
                })}
              </h2>
              
              <button
                onClick={goToNext}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
            
            <Button variant="ghost" onClick={goToToday}>
              Sot
            </Button>
          </div>

          {/* View Switcher & Filters */}
          <div className="flex flex-wrap items-center gap-3">
            {/* View Switcher */}
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setView('month')}
                className={`flex items-center space-x-2 px-3 py-1.5 rounded-md transition-colors ${
                  view === 'month' 
                    ? 'bg-white text-gray-900 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Grid3x3 className="w-4 h-4" />
                <span className="hidden sm:inline">Muaj</span>
              </button>
              
              <button
                onClick={() => setView('week')}
                className={`flex items-center space-x-2 px-3 py-1.5 rounded-md transition-colors ${
                  view === 'week' 
                    ? 'bg-white text-gray-900 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <CalendarDays className="w-4 h-4" />
                <span className="hidden sm:inline">Javë</span>
              </button>
              
              <button
                onClick={() => setView('day')}
                className={`flex items-center space-x-2 px-3 py-1.5 rounded-md transition-colors ${
                  view === 'day' 
                    ? 'bg-white text-gray-900 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Circle className="w-4 h-4" />
                <span className="hidden sm:inline">Ditë</span>
              </button>
            </div>

            {/* Filter */}
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-400" />
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                {eventTypes.map(type => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Calendar View */}
      <div>
        {view === 'month' && renderMonthView()}
        {view === 'week' && renderWeekView()}
        {view === 'day' && renderDayView()}
      </div>

      {/* Stats & Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Stats */}
        <div className="lg:col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="text-sm font-medium text-gray-600">Eventet totale</div>
                <CalendarIcon className="w-5 h-5 text-primary-500" />
              </div>
              <div className="text-2xl font-bold text-gray-900">{filteredEvents.length}</div>
              <div className="text-sm text-gray-500 mt-1">Sipas filtrimit aktual</div>
            </div>
            
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="text-sm font-medium text-gray-600">Këtë muaj</div>
                <CalendarIcon className="w-5 h-5 text-green-500" />
              </div>
              <div className="text-2xl font-bold text-gray-900">
                {monthEventsCount}
              </div>
            </div>
            
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="text-sm font-medium text-gray-600">Urgjente</div>
                <AlertCircle className="w-5 h-5 text-red-500" />
              </div>
              <div className="text-2xl font-bold text-gray-900">
                {urgentEventsCount}
              </div>
            </div>
          </div>

          {/* Upcoming Events */}
          <div className="mt-6 bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Eventet e Ardhshme
            </h3>
            <div className="space-y-3">
              {upcomingEvents.map(event => {
                  const typeInfo = getEventTypeInfo(event.type);
                  const Icon = typeInfo.icon;
                  const typeStyle = eventTypeStyles[event.type];
                  
                  return (
                    <div 
                      key={`upcoming-${event.id}`}
                      className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-lg ${typeStyle.bg}`}>
                          <Icon className={`w-4 h-4 ${typeStyle.text}`} />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{event.title}</p>
                          <p className="text-sm text-gray-600">{getClientName(event.clientId)}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">
                          {new Date(event.startDate).toLocaleDateString('sq-AL')}
                        </p>
                        <p className="text-xs text-gray-500">
                          {new Date(event.startDate).toLocaleTimeString('sq-AL', { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </p>
                      </div>
                    </div>
                  );
                })}
              
              {upcomingEventsCount === 0 && (
                <div className="text-center py-4 text-gray-500">
                  Nuk ka evente të ardhshme
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Legend & Quick Info */}
        <div className="space-y-6">
          {/* Legend */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Legjenda
            </h3>
            <div className="space-y-3">
              {eventTypes.slice(1).map(type => {
                const Icon = type.icon;
                return (
                  <div key={type.value} className="flex items-center space-x-3">
                    <div className={`p-1.5 rounded ${type.color === 'red' ? 'bg-red-100' :
                      type.color === 'green' ? 'bg-green-100' :
                      type.color === 'blue' ? 'bg-blue-100' :
                      type.color === 'purple' ? 'bg-purple-100' :
                      'bg-yellow-100'
                    }`}>
                      <Icon className={`w-3 h-3 ${
                        type.color === 'red' ? 'text-red-600' :
                        type.color === 'green' ? 'text-green-600' :
                        type.color === 'blue' ? 'text-blue-600' :
                        type.color === 'purple' ? 'text-purple-600' :
                        'text-yellow-600'
                      }`} />
                    </div>
                    <span className="text-sm text-gray-700">{type.label}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Priority Info */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Prioritete
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-sm text-gray-700">Urgjente</span>
                </div>
                <span className="text-sm font-medium text-gray-900">
                  {filteredEvents.filter(e => e.priority === 'high').length}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <span className="text-sm text-gray-700">Normale</span>
                </div>
                <span className="text-sm font-medium text-gray-900">
                  {filteredEvents.filter(e => e.priority === 'medium').length}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-700">Të ulëta</span>
                </div>
                <span className="text-sm font-medium text-gray-900">
                  {filteredEvents.filter(e => e.priority === 'low').length}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Event Modal */}
      {showAddEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Shto Event të Ri</h2>
                <button
                  onClick={() => setShowAddEvent(false)}
                  className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <Input
                label="Titulli"
                placeholder="Shkruani titullin e eventit"
                value={newEvent.title}
                onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                required
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Përshkrimi
                </label>
                <textarea
                  value={newEvent.description}
                  onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
                  rows={3}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="Përshkrimi i eventit..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Data e Fillimit
                  </label>
                  <input
                    type="datetime-local"
                    value={toDateTimeLocal(newEvent.startDate)}
                    onChange={(e) => setNewEvent({...newEvent, startDate: new Date(e.target.value)})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Data e Përfundimit (opsionale)
                  </label>
                  <input
                    type="datetime-local"
                    value={newEvent.endDate ? toDateTimeLocal(newEvent.endDate) : ''}
                    onChange={(e) => setNewEvent({
                      ...newEvent,
                      endDate: e.target.value ? new Date(e.target.value) : undefined
                    })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Klienti
                  </label>
                  <select
                    value={newEvent.clientId}
                    onChange={(e) => setNewEvent({...newEvent, clientId: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                    required
                  >
                    <option value="">Zgjidhni klientin</option>
                    {clients.map(client => (
                      <option key={client.id} value={client.id}>
                        {client.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Lloji
                  </label>
                  <select
                    value={newEvent.type}
                    onChange={(e) => setNewEvent({...newEvent, type: e.target.value as any})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    {eventTypes.slice(1).map(type => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Prioriteti
                  </label>
                  <select
                    value={newEvent.priority}
                    onChange={(e) => setNewEvent({...newEvent, priority: e.target.value as any})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="low">Të ulëta</option>
                    <option value="medium">Normale</option>
                    <option value="high">Urgjente</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end space-x-3 pt-6 border-t border-gray-200">
                <Button
                  variant="ghost"
                  onClick={() => setShowAddEvent(false)}
                >
                  Anulo
                </Button>
                <Button
                  variant="primary"
                  onClick={handleAddEvent}
                >
                  Shto Event
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;