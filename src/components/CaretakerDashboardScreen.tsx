import { ArrowLeft, CheckCircle, Clock, AlertCircle, Bell, Brain, Phone, FileText } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { BottomNav } from './BottomNav';
import { Switch } from './ui/switch';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { useState } from 'react';
import { toast } from 'sonner@2.0.3';

interface CaretakerDashboardScreenProps {
  onNavigate: (screen: string) => void;
}

// Circular Progress Ring Component
function CircularProgress({ percentage, size = 200 }: { percentage: number; size?: number }) {
  const strokeWidth = 16;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#FEF3C7"
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#F59E0B"
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      <div className="absolute text-center">
        <div className="text-amber-600">{percentage}%</div>
        <div className="text-gray-600">Adherence</div>
      </div>
    </div>
  );
}

export function CaretakerDashboardScreen({ onNavigate }: CaretakerDashboardScreenProps) {
  const [isCaretakerView, setIsCaretakerView] = useState(true);
  const [takenMedications, setTakenMedications] = useState<Set<number>>(new Set());

  const medications = [
    { name: 'Atorvastatin', time: '8:00 AM', status: 'pending' },
    { name: 'Metformin', time: '8:00 AM', status: 'pending' },
    { name: 'Lisinopril', time: '2:00 PM', status: 'pending' },
    { name: 'Aspirin', time: '8:00 PM', status: 'pending' },
  ];

  const activityLog = [
    { action: 'Took Atorvastatin', time: 'Today, 8:05 AM', status: 'success' },
    { action: 'Took Metformin', time: 'Today, 8:05 AM', status: 'success' },
    { action: 'Missed Lisinopril', time: 'Yesterday, 2:00 PM', status: 'missed' },
    { action: 'Took Aspirin', time: 'Yesterday, 8:10 PM', status: 'success' },
    { action: 'Took Atorvastatin', time: 'Yesterday, 8:03 AM', status: 'success' },
  ];

  const handleMarkTaken = (index: number) => {
    setTakenMedications(prev => new Set([...prev, index]));
    toast.success('Medication marked as taken', {
      description: `${medications[index].name} logged successfully`,
    });
  };

  const handleSendReminder = (index: number) => {
    toast.success('Reminder sent', {
      description: `Notification sent for ${medications[index].name}`,
      icon: <Bell className="w-4 h-4" />,
    });
  };

  return (
    <div className="flex flex-col h-full bg-[#EDEDED]">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#284995] to-[#1a3570] text-white p-4 shadow-md">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('landing')}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/20 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h2 className="text-white">Care Dashboard</h2>
          </div>
        </div>

        {/* View Toggle */}
        <div className="bg-white/10 rounded-xl p-3 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <span className="text-white">Patient View</span>
            <Switch
              checked={isCaretakerView}
              onCheckedChange={setIsCaretakerView}
              className="data-[state=checked]:bg-[#CADAFD]"
            />
            <span className="text-white">Caretaker View</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-4 pb-20 space-y-4">
        {isCaretakerView ? (
          <>
            {/* Overall Wellness Status */}
            <Card className="shadow-md border-2 border-amber-200 bg-white">
              <CardHeader className="pb-3">
                <CardTitle className="text-[#284995] text-center">Overall Wellness Status</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center">
                <CircularProgress percentage={84} size={200} />
                <div className="mt-4 text-center">
                  <div className="flex items-center justify-center gap-2 text-amber-600">
                    <AlertCircle className="w-5 h-5" />
                    <span>Downward Trend this week</span>
                  </div>
                  <p className="text-gray-600 mt-2">84% Adherence Score</p>
                </div>
              </CardContent>
            </Card>

            {/* AI Insights & Predictions */}
            <Card className="shadow-md bg-white">
              <CardHeader>
                <CardTitle className="text-[#284995]">AI Insights & Predictions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-amber-50 border-2 border-amber-300 rounded-xl p-4">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="bg-amber-100 rounded-full p-2">
                      <Brain className="w-5 h-5 text-amber-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-amber-900 mb-2">Irregular Pattern Detected</h3>
                      <p className="text-gray-700">
                        Patient's morning intake has shifted 90 minutes later for the last 3 days. 
                        This often precedes missed doses.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3 mt-4">
                    <Button
                      className="flex-1 bg-[#284995] hover:bg-[#1a3570] text-white rounded-xl h-12"
                      onClick={() => toast.success('Calling patient...', { icon: <Phone className="w-4 h-4" /> })}
                    >
                      <Phone className="w-4 h-4 mr-2" />
                      Call Patient Now
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1 border-2 border-[#284995] text-[#284995] hover:bg-[#284995] hover:text-white rounded-xl h-12"
                      onClick={() => onNavigate('adherence-analytics')}
                    >
                      <FileText className="w-4 h-4 mr-2" />
                      View Detailed Logs
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Medication Tracker */}
            <Card className="shadow-md bg-white">
              <CardHeader>
                <CardTitle className="text-[#284995]">Medication Tracker</CardTitle>
                <p className="text-gray-600">Today's Schedule</p>
              </CardHeader>
              <CardContent className="space-y-3">
                {medications.map((med, idx) => {
                  const isTaken = takenMedications.has(idx);
                  return (
                    <div
                      key={idx}
                      className={`rounded-xl p-4 flex items-center justify-between transition-all ${
                        isTaken 
                          ? 'bg-green-100 border-2 border-green-300' 
                          : 'bg-[#CADAFD]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        {isTaken ? (
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        ) : (
                          <Clock className="w-5 h-5 text-[#284995]" />
                        )}
                        <div>
                          <p className={isTaken ? 'text-green-900 line-through' : 'text-gray-900'}>
                            {med.name}
                          </p>
                          <p className={isTaken ? 'text-green-700' : 'text-gray-700'}>
                            {med.time}
                          </p>
                        </div>
                      </div>
                      {isTaken ? (
                        <Badge className="bg-green-600 text-white">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Taken
                        </Badge>
                      ) : (
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            className="bg-green-600 hover:bg-green-700 text-white rounded-lg h-9 px-3"
                            onClick={() => handleMarkTaken(idx)}
                          >
                            Mark Taken
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-[#284995] text-[#284995] hover:bg-[#284995] hover:text-white rounded-lg h-9 px-3"
                            onClick={() => handleSendReminder(idx)}
                          >
                            <Bell className="w-4 h-4" />
                          </Button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </CardContent>
            </Card>

            {/* Recent Activity Log */}
            <Card className="shadow-md bg-white">
              <CardHeader>
                <CardTitle className="text-[#284995]">Recent Activity Log</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {activityLog.map((activity, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="mt-0.5">
                      {activity.status === 'success' ? (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      ) : (
                        <AlertCircle className="w-5 h-5 text-amber-600" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-900">{activity.action}</p>
                      <p className="text-gray-600">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </>
        ) : (
          /* Patient View - Simplified */
          <>
            <Card className="shadow-md bg-white">
              <CardHeader>
                <CardTitle className="text-[#284995]">My Medications Today</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {medications.map((med, idx) => {
                  const isTaken = takenMedications.has(idx);
                  return (
                    <div
                      key={idx}
                      className={`rounded-xl p-4 flex items-center justify-between transition-all ${
                        isTaken 
                          ? 'bg-green-100 border-2 border-green-300' 
                          : 'bg-[#CADAFD]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        {isTaken ? (
                          <CheckCircle className="w-6 h-6 text-green-600" />
                        ) : (
                          <Clock className="w-6 h-6 text-[#284995]" />
                        )}
                        <div>
                          <p className={isTaken ? 'text-green-900 line-through' : 'text-gray-900'}>
                            {med.name}
                          </p>
                          <p className={isTaken ? 'text-green-700' : 'text-gray-700'}>
                            {med.time}
                          </p>
                        </div>
                      </div>
                      {isTaken ? (
                        <Badge className="bg-green-600 text-white px-4 py-2">
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Taken
                        </Badge>
                      ) : (
                        <Button
                          size="lg"
                          className="bg-green-600 hover:bg-green-700 text-white rounded-xl h-12 px-6"
                          onClick={() => handleMarkTaken(idx)}
                        >
                          Taken
                        </Button>
                      )}
                    </div>
                  );
                })}
              </CardContent>
            </Card>

            <Card className="shadow-md bg-green-50 border-2 border-green-200">
              <CardContent className="p-6 text-center">
                <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-3" />
                <p className="text-green-900">You're doing great!</p>
                <p className="text-green-700">{takenMedications.size} medication{takenMedications.size !== 1 ? 's' : ''} taken today</p>
              </CardContent>
            </Card>
          </>
        )}
      </div>

      {/* Bottom Navigation */}
      <BottomNav onNavigate={onNavigate} activeScreen="profile" />
    </div>
  );
}