import { ArrowLeft, Sparkles, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

interface AdherenceAnalyticsScreenProps {
  onNavigate: (screen: string) => void;
}

export function AdherenceAnalyticsScreen({ onNavigate }: AdherenceAnalyticsScreenProps) {
  // Data for the line chart - showing intake time drift
  const chartData = [
    { day: 'Mon', time: 8.0, timeLabel: '8:00 AM' },
    { day: 'Tue', time: 8.0, timeLabel: '8:00 AM' },
    { day: 'Wed', time: 8.0, timeLabel: '8:00 AM' },
    { day: 'Thu', time: 8.5, timeLabel: '8:30 AM' },
    { day: 'Fri', time: 9.0, timeLabel: '9:00 AM' },
    { day: 'Sat', time: 9.25, timeLabel: '9:15 AM' },
    { day: 'Sun', time: 9.5, timeLabel: '9:30 AM' },
  ];

  // Raw data list
  const rawData = [
    { date: 'Mon, Nov 13', time: '8:00 AM', isLate: false },
    { date: 'Tue, Nov 14', time: '8:00 AM', isLate: false },
    { date: 'Wed, Nov 15', time: '8:00 AM', isLate: false },
    { date: 'Thu, Nov 16', time: '8:30 AM', isLate: true },
    { date: 'Fri, Nov 17', time: '9:00 AM', isLate: true },
    { date: 'Sat, Nov 18', time: '9:15 AM', isLate: true },
    { date: 'Sun, Nov 19', time: '9:30 AM', isLate: true },
  ];

  // Custom tooltip for the chart
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 rounded-lg shadow-lg border-2 border-[#284995]">
          <p className="text-gray-900">{payload[0].payload.day}</p>
          <p className="text-[#284995]">{payload[0].payload.timeLabel}</p>
        </div>
      );
    }
    return null;
  };

  // Format Y-axis ticks to show time labels
  const formatYAxis = (value: number) => {
    const hour = Math.floor(value);
    const minutes = Math.round((value - hour) * 60);
    const period = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour > 12 ? hour - 12 : hour;
    return `${displayHour}:${minutes.toString().padStart(2, '0')} ${period}`;
  };

  return (
    <div className="flex flex-col h-full bg-[#EDEDED]">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#284995] to-[#1a3570] text-white p-4 shadow-md">
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('caretaker-dashboard')}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/20 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h2 className="text-white">Morning Meds Analysis</h2>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Line Chart - Intake Time Trend */}
        <Card className="shadow-md bg-white">
          <CardHeader>
            <CardTitle className="text-[#284995]">Intake Time Trend (Last 7 Days)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="w-full h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={chartData}
                  margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis
                    dataKey="day"
                    stroke="#6b7280"
                    style={{ fontSize: '14px' }}
                  />
                  <YAxis
                    domain={[7, 11]}
                    ticks={[7, 8, 9, 10, 11]}
                    tickFormatter={formatYAxis}
                    stroke="#6b7280"
                    style={{ fontSize: '12px' }}
                    label={{ value: 'Time', angle: -90, position: 'insideLeft', style: { fontSize: '14px', fill: '#6b7280' } }}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  {/* Risk Zone threshold line */}
                  <ReferenceLine
                    y={10}
                    stroke="#ef4444"
                    strokeDasharray="5 5"
                    strokeWidth={2}
                    label={{ value: 'Risk Zone', position: 'right', fill: '#ef4444', fontSize: 12 }}
                  />
                  {/* Main trend line */}
                  <Line
                    type="monotone"
                    dataKey="time"
                    stroke="#14b8a6"
                    strokeWidth={3}
                    dot={{ fill: '#14b8a6', r: 5 }}
                    activeDot={{ r: 7 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* AI Insight Box */}
        <Card className="shadow-md bg-blue-50 border-2 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="bg-blue-100 rounded-full p-2 mt-1">
                <Sparkles className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-blue-900 mb-2">Pattern Analysis</h3>
                <p className="text-gray-700">
                  Intake time has drifted +90 mins. This correlates with later sleep wake-up times 
                  detected by motion sensors.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Raw Data List */}
        <Card className="shadow-md bg-white">
          <CardHeader>
            <CardTitle className="text-[#284995]">Detailed Log</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {rawData.map((entry, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  {entry.isLate && (
                    <AlertCircle className="w-5 h-5 text-amber-500" />
                  )}
                  <div>
                    <p className="text-gray-900">{entry.date}</p>
                    <p className="text-gray-600">Atorvastatin</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`${entry.isLate ? 'text-amber-600' : 'text-gray-900'}`}>
                    {entry.time}
                  </p>
                  {entry.isLate && (
                    <p className="text-amber-600">+{Math.round((parseFloat(entry.time.split(':')[0]) + (entry.time.includes('30') ? 0.5 : 0) - 8) * 60)} mins late</p>
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
