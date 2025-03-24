import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { Sun, Moon, Sunrise, Sunset, Clock, Calendar as CalendarIcon, Star, Compass } from 'lucide-react';

// Mock data for Panchang calculations
// In a real app, these would be calculated using proper astronomical algorithms
const PANCHANG_DATA = {
  tithi: {
    name: 'Shukla Paksha Panchami',
    endTime: '17:23',
    nextTithi: 'Shukla Paksha Shashti'
  },
  nakshatra: {
    name: 'Rohini',
    endTime: '19:45',
    nextNakshatra: 'Mrigashira'
  },
  yoga: {
    name: 'Shubha',
    endTime: '15:30',
    nextYoga: 'Shukla'
  },
  karana: {
    name: 'Bava',
    endTime: '17:23',
    nextKarana: 'Balava'
  },
  sunTimings: {
    sunrise: '06:15',
    sunset: '18:30',
    moonrise: '14:20',
    moonset: '02:45'
  },
  rahu: {
    start: '10:30',
    end: '12:00'
  },
  yama: {
    start: '12:00',
    end: '13:30'
  },
  gulika: {
    start: '14:30',
    end: '16:00'
  },
  auspiciousPeriods: [
    { name: 'Abhijit Muhurat', start: '11:45', end: '12:30' },
    { name: 'Amrit Kaal', start: '17:20', end: '18:50' }
  ],
  inauspiciousPeriods: [
    { name: 'Rahu Kaal', start: '10:30', end: '12:00' },
    { name: 'Yamaganda', start: '12:00', end: '13:30' }
  ]
};

export function PanchangPage() {
  const [date, setDate] = useState<Date>(new Date());
  const [view, setView] = useState<'daily' | 'monthly'>('daily');
  
  return (
    <div className="container py-12">
      <div className="space-y-4 mb-8">
        <h1 className="text-4xl font-bold tracking-tight">Panchang</h1>
        <p className="text-muted-foreground text-lg">
          Hindu calendar and auspicious timings based on Vedic astrology
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Date Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalendarIcon className="h-5 w-5 text-primary" />
                Select Date
              </CardTitle>
              <CardDescription>
                View Panchang details for any date
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(date) => date && setDate(date)}
                  className="rounded-md border"
                />
                <p className="mt-4 text-lg font-medium">
                  Selected Date: {format(date, 'EEEE, MMMM d, yyyy')}
                </p>
              </div>
            </CardContent>
          </Card>
          
          {/* Main Panchang Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Tithi */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Moon className="h-5 w-5 text-primary" />
                  Tithi
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="text-xl font-medium">{PANCHANG_DATA.tithi.name}</div>
                  <div className="text-sm text-muted-foreground">
                    Ends at {PANCHANG_DATA.tithi.endTime}
                  </div>
                  <div className="text-sm">
                    Next Tithi: {PANCHANG_DATA.tithi.nextTithi}
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Nakshatra */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-primary" />
                  Nakshatra
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="text-xl font-medium">{PANCHANG_DATA.nakshatra.name}</div>
                  <div className="text-sm text-muted-foreground">
                    Ends at {PANCHANG_DATA.nakshatra.endTime}
                  </div>
                  <div className="text-sm">
                    Next Nakshatra: {PANCHANG_DATA.nakshatra.nextNakshatra}
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Yoga */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Compass className="h-5 w-5 text-primary" />
                  Yoga
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="text-xl font-medium">{PANCHANG_DATA.yoga.name}</div>
                  <div className="text-sm text-muted-foreground">
                    Ends at {PANCHANG_DATA.yoga.endTime}
                  </div>
                  <div className="text-sm">
                    Next Yoga: {PANCHANG_DATA.yoga.nextYoga}
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Karana */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  Karana
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="text-xl font-medium">{PANCHANG_DATA.karana.name}</div>
                  <div className="text-sm text-muted-foreground">
                    Ends at {PANCHANG_DATA.karana.endTime}
                  </div>
                  <div className="text-sm">
                    Next Karana: {PANCHANG_DATA.karana.nextKarana}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Sun and Moon Timings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sun className="h-5 w-5 text-primary" />
                Sun and Moon Timings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <Sunrise className="h-4 w-4 text-amber-500" />
                    Sunrise
                  </div>
                  <div className="text-lg">{PANCHANG_DATA.sunTimings.sunrise}</div>
                </div>
                
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <Sunset className="h-4 w-4 text-amber-500" />
                    Sunset
                  </div>
                  <div className="text-lg">{PANCHANG_DATA.sunTimings.sunset}</div>
                </div>
                
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <Moon className="h-4 w-4" />
                    Moonrise
                  </div>
                  <div className="text-lg">{PANCHANG_DATA.sunTimings.moonrise}</div>
                </div>
                
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <Moon className="h-4 w-4" />
                    Moonset
                  </div>
                  <div className="text-lg">{PANCHANG_DATA.sunTimings.moonset}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-6">
          {/* Auspicious Timings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-600">
                <Sun className="h-5 w-5" />
                Auspicious Periods
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {PANCHANG_DATA.auspiciousPeriods.map((period, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <div className="font-medium">{period.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {period.start} - {period.end}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          {/* Inauspicious Timings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-600">
                <Clock className="h-5 w-5" />
                Inauspicious Periods
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {PANCHANG_DATA.inauspiciousPeriods.map((period, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <div className="font-medium">{period.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {period.start} - {period.end}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          {/* Special Timings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                Special Timings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="font-medium mb-1">Rahu Kaal</div>
                  <div className="text-sm text-muted-foreground">
                    {PANCHANG_DATA.rahu.start} - {PANCHANG_DATA.rahu.end}
                  </div>
                </div>
                
                <div>
                  <div className="font-medium mb-1">Yamaganda</div>
                  <div className="text-sm text-muted-foreground">
                    {PANCHANG_DATA.yama.start} - {PANCHANG_DATA.yama.end}
                  </div>
                </div>
                
                <div>
                  <div className="font-medium mb-1">Gulika</div>
                  <div className="text-sm text-muted-foreground">
                    {PANCHANG_DATA.gulika.start} - {PANCHANG_DATA.gulika.end}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <div className="mt-12 bg-muted/30 rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4">Understanding Panchang</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium mb-2">What is Panchang?</h4>
            <p className="text-muted-foreground">
              Panchang is a Hindu calendar and almanac that follows traditional units of Indian timekeeping. It is used to determine auspicious times for various activities, including religious ceremonies, starting new ventures, and important life events.
            </p>
          </div>
          
          <div>
            <h4 className="font-medium mb-2">The Five Elements</h4>
            <p className="text-muted-foreground">
              Panchang consists of five elements: Tithi (lunar day), Nakshatra (lunar mansion), Yoga (auspicious period), Karana (half of a lunar day), and Vara (day of the week). These elements together help determine the most favorable times for different activities.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}