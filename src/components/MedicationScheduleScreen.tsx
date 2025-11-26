import { ArrowLeft, Bell, Plus, Edit, Trash2, Clock, AlertCircle, ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { BottomNav } from './BottomNav';
import { useState } from 'react';

interface MedicationScheduleScreenProps {
  onNavigate: (screen: string) => void;
}

export function MedicationScheduleScreen({ onNavigate }: MedicationScheduleScreenProps) {
  const [activeTab, setActiveTab] = useState<'schedule' | 'reminders'>('schedule');
  const [currentDate, setCurrentDate] = useState(new Date(2025, 9, 17)); // October 17, 2025

  const previousDay = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() - 1);
    setCurrentDate(newDate);
  };

  const nextDay = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + 1);
    setCurrentDate(newDate);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };

  const formatShortDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div className="flex flex-col h-full bg-[#EDEDED]">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#284995] to-[#1a3570] text-white p-4 shadow-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('landing')}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/20 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h2 className="text-white">Medication Schedule</h2>
          </div>
          <div className="relative">
            <Bell className="w-6 h-6" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-xs flex items-center justify-center">
              2
            </span>
          </div>
        </div>
      </div>

      {/* Tab Buttons - More Clear */}
      <div className="bg-white border-b border-gray-200 p-2 flex gap-2">
        <button
          onClick={() => setActiveTab('schedule')}
          className={`flex-1 py-3 px-4 rounded-lg transition-all ${
            activeTab === 'schedule'
              ? 'bg-[#284995] text-white shadow-md'
              : 'bg-[#EDEDED] text-gray-600 hover:bg-gray-300'
          }`}
        >
          <CalendarIcon className="w-5 h-5 mx-auto mb-1" />
          <span className="text-sm">Schedule</span>
        </button>
        <button
          onClick={() => setActiveTab('reminders')}
          className={`flex-1 py-3 px-4 rounded-lg transition-all ${
            activeTab === 'reminders'
              ? 'bg-[#284995] text-white shadow-md'
              : 'bg-[#EDEDED] text-gray-600 hover:bg-gray-300'
          }`}
        >
          <Bell className="w-5 h-5 mx-auto mb-1" />
          <span className="text-sm">Reminders</span>
        </button>
      </div>

      {activeTab === 'schedule' ? (
        <div className="flex-1 flex flex-col">
          {/* Date Switcher */}
          <div className="bg-white p-3 border-b border-gray-200 flex items-center justify-between">
            <button 
              onClick={previousDay}
              className="p-2 rounded-lg hover:bg-[#EDEDED] transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
            <div className="text-center">
              <p className="text-gray-700">{formatDate(currentDate)}</p>
              <p className="text-xs text-gray-500">Today's medications</p>
            </div>
            <button 
              onClick={nextDay}
              className="p-2 rounded-lg hover:bg-[#EDEDED] transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Medication List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 pb-20">
            <h3 className="text-gray-700 mb-3">{formatShortDate(currentDate)} Schedule</h3>

            {/* Medication 1 */}
            <Card className="shadow-md border-l-4 border-l-[#284995]">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h4 className="text-gray-800 mb-1">Atorvastatin</h4>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span>9:00 AM</span>
                    </div>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-[#CADAFD] flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-[#284995]"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M4.22 11.29l1.06 1.06L7 10.59V20h2V10.59l1.72 1.72 1.06-1.06L8.5 8l-3.28 3.29zM13 4v2h7v2h-7v2h7v2h-7v2h7v8h-7v-2h5V6h-5z" />
                    </svg>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-[#CADAFD] text-[#284995] rounded-lg hover:bg-[#b5c9fc] transition-colors">
                    <Edit className="w-4 h-4" />
                    Edit
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors">
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </button>
                </div>
              </CardContent>
            </Card>

            {/* Medication 2 */}
            <Card className="shadow-md border-l-4 border-l-[#284995]">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h4 className="text-gray-800 mb-1">Metformin</h4>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span>7:00 PM</span>
                    </div>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-[#CADAFD] flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-[#284995]"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M4.22 11.29l1.06 1.06L7 10.59V20h2V10.59l1.72 1.72 1.06-1.06L8.5 8l-3.28 3.29zM13 4v2h7v2h-7v2h7v2h-7v2h7v8h-7v-2h5V6h-5z" />
                    </svg>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-[#CADAFD] text-[#284995] rounded-lg hover:bg-[#b5c9fc] transition-colors">
                    <Edit className="w-4 h-4" />
                    Edit
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors">
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </button>
                </div>
              </CardContent>
            </Card>

            {/* Add Medication Button */}
            <Button className="w-full h-14 bg-[#284995] hover:bg-[#1a3570] text-white rounded-2xl shadow-md mt-4 mb-2">
              <Plus className="w-5 h-5 mr-2" />
              Add Medication
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col">
          <div className="flex-1 overflow-y-auto p-4 space-y-3 pb-20">
            <h3 className="text-gray-700 mb-3">Active Reminders</h3>

            {/* Reminder 1 */}
            <Card className="shadow-md border-l-4 border-l-orange-500">
              <CardContent className="p-4">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                    <Bell className="w-6 h-6 text-orange-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-gray-800 mb-1">Daily Medication Reminder</h4>
                    <p className="text-gray-600">Atorvastatin - 9:00 AM daily</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Clock className="w-3 h-3 text-gray-500" />
                      <span className="text-xs text-gray-500">Repeats daily</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-[#CADAFD] text-[#284995] rounded-lg hover:bg-[#b5c9fc] transition-colors">
                    <Edit className="w-4 h-4" />
                    Edit
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors">
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </button>
                </div>
              </CardContent>
            </Card>

            {/* Reminder 2 */}
            <Card className="shadow-md border-l-4 border-l-purple-500">
              <CardContent className="p-4">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                    <Bell className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-gray-800 mb-1">Evening Dose Reminder</h4>
                    <p className="text-gray-600">Metformin - 7:00 PM daily</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Clock className="w-3 h-3 text-gray-500" />
                      <span className="text-xs text-gray-500">Repeats daily</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-[#CADAFD] text-[#284995] rounded-lg hover:bg-[#b5c9fc] transition-colors">
                    <Edit className="w-4 h-4" />
                    Edit
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors">
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </button>
                </div>
              </CardContent>
            </Card>

            {/* Reminder 3 - Appointment */}
            <Card className="shadow-md border-l-4 border-l-green-500">
              <CardContent className="p-4">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                    <AlertCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-gray-800 mb-1">Doctor Appointment</h4>
                    <p className="text-gray-600">Dr. Martinez - Oct 16, 10:00 AM</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Clock className="w-3 h-3 text-gray-500" />
                      <span className="text-xs text-gray-500">One-time</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-[#CADAFD] text-[#284995] rounded-lg hover:bg-[#b5c9fc] transition-colors">
                    <Edit className="w-4 h-4" />
                    Edit
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors">
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </button>
                </div>
              </CardContent>
            </Card>

            {/* Add Reminder Button */}
            <Button className="w-full h-14 bg-[#284995] hover:bg-[#1a3570] text-white rounded-2xl shadow-md mt-4 mb-2">
              <Plus className="w-5 h-5 mr-2" />
              Add Reminder
            </Button>
          </div>
        </div>
      )}

      {/* Bottom Navigation */}
      <BottomNav onNavigate={onNavigate} activeScreen="schedule" />
    </div>
  );
}
