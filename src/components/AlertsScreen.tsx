import { ArrowLeft, Bell, Clock, AlertCircle, CheckCircle } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { BottomNav } from './BottomNav';
import { Badge } from './ui/badge';
import { useState } from 'react';
import { toast } from 'sonner@2.0.3';

interface AlertsScreenProps {
  onNavigate: (screen: string) => void;
}

export function AlertsScreen({ onNavigate }: AlertsScreenProps) {
  const [alerts, setAlerts] = useState([
    {
      id: 1,
      type: 'medication',
      title: 'Time to take Atorvastatin',
      message: '1 tablet - Take with food',
      time: '15 minutes ago',
      status: 'pending',
    },
    {
      id: 2,
      type: 'reminder',
      title: 'Upcoming appointment',
      message: 'Dr. Martinez - Tomorrow at 10:00 AM',
      time: '2 hours ago',
      status: 'pending',
    },
    {
      id: 3,
      type: 'medication',
      title: 'Metformin taken',
      message: 'Marked as completed',
      time: '5 hours ago',
      status: 'completed',
    },
    {
      id: 4,
      type: 'warning',
      title: 'Medication interaction alert',
      message: 'Avoid grapefruit with Atorvastatin',
      time: '1 day ago',
      status: 'warning',
    },
  ]);

  const handleMarkAsTaken = (alertId: number) => {
    setAlerts(alerts.map(alert => 
      alert.id === alertId 
        ? { ...alert, status: 'completed', message: 'Marked as completed' }
        : alert
    ));
    toast.success('Medication marked as taken');
  };

  const handleSnooze = (alertId: number) => {
    toast.info('Reminder snoozed for 15 minutes');
    // In a real app, this would schedule a new notification
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
            <h2 className="text-white">Alerts</h2>
          </div>
          <div className="relative">
            <Bell className="w-6 h-6" />
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-xs flex items-center justify-center">
              {alerts.filter(a => a.status === 'pending').length}
            </span>
          </div>
        </div>
      </div>

      {/* Alerts List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 pb-20">
        {alerts.map((alert) => (
          <Card
            key={alert.id}
            className={`shadow-sm hover:shadow-md transition-shadow ${
              alert.status === 'pending' ? 'border-l-4 border-l-[#284995]' : ''
            } ${alert.status === 'warning' ? 'border-l-4 border-l-amber-500' : ''}`}
          >
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                {/* Icon */}
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                    alert.status === 'completed'
                      ? 'bg-green-100'
                      : alert.status === 'warning'
                      ? 'bg-amber-100'
                      : 'bg-[#CADAFD]'
                  }`}
                >
                  {alert.status === 'completed' ? (
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  ) : alert.status === 'warning' ? (
                    <AlertCircle className="w-6 h-6 text-amber-600" />
                  ) : (
                    <Bell className="w-6 h-6 text-[#284995]" />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-1">
                    <h4 className="text-gray-800">{alert.title}</h4>
                    {alert.status === 'pending' && (
                      <Badge variant="default" className="bg-[#284995] hover:bg-[#1a3570] text-white ml-2">
                        New
                      </Badge>
                    )}
                  </div>
                  <p className="text-gray-600 mb-2">{alert.message}</p>
                  <div className="flex items-center gap-2 text-gray-500">
                    <Clock className="w-3 h-3" />
                    <span className="text-xs">{alert.time}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons for Pending */}
              {alert.status === 'pending' && alert.type === 'medication' && (
                <div className="flex gap-2 mt-3 pt-3 border-t border-gray-200">
                  <button 
                    onClick={() => handleMarkAsTaken(alert.id)}
                    className="flex-1 px-4 py-2 bg-[#284995] text-white rounded-lg hover:bg-[#1a3570] transition-colors"
                  >
                    Mark as Taken
                  </button>
                  <button 
                    onClick={() => handleSnooze(alert.id)}
                    className="flex-1 px-4 py-2 bg-[#EDEDED] text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    Snooze
                  </button>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Bottom Navigation */}
      <BottomNav onNavigate={onNavigate} activeScreen="alerts" />
    </div>
  );
}
