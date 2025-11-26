import { ArrowLeft, Search, Calendar, Pill } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { BottomNav } from './BottomNav';
import { Input } from './ui/input';

interface HistoryScreenProps {
  onNavigate: (screen: string, data?: any) => void;
}

export function HistoryScreen({ onNavigate }: HistoryScreenProps) {
  const historyItems = [
    {
      id: 1,
      type: 'scan',
      medication: 'Atorvastatin',
      date: 'Oct 15, 2025',
      time: '2:30 PM',
      dosage: '10mg',
      frequency: '1 tablet daily',
      purpose: 'Lowers cholesterol',
      status: 'Active',
      sideEffects: 'Muscle pain, digestive problems',
      instructions: 'Take with food',
    },
    {
      id: 2,
      type: 'translation',
      session: 'Dr. Martinez Consultation',
      date: 'Oct 14, 2025',
      time: '10:15 AM',
    },
    {
      id: 3,
      type: 'scan',
      medication: 'Metformin',
      date: 'Oct 13, 2025',
      time: '4:45 PM',
      dosage: '500mg',
      frequency: '2 tablets daily',
      purpose: 'Controls blood sugar',
      status: 'Active',
      sideEffects: 'Nausea, diarrhea',
      instructions: 'Take with meals',
    },
    {
      id: 4,
      type: 'translation',
      session: 'Emergency Room Visit',
      date: 'Oct 12, 2025',
      time: '8:20 PM',
    },
  ];

  const handleItemClick = (item: any) => {
    if (item.type === 'scan') {
      onNavigate('medication-detail', {
        name: item.medication,
        dosage: item.dosage,
        frequency: item.frequency,
        purpose: item.purpose,
        status: item.status,
        time: item.time,
        sideEffects: item.sideEffects,
        instructions: item.instructions,
      });
    } else {
      onNavigate('translation-detail', item);
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#EDEDED]">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#284995] to-[#1a3570] text-white p-4 shadow-md">
        <div className="flex items-center gap-3 mb-3">
          <button
            onClick={() => onNavigate('landing')}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/20 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h2 className="text-white">History</h2>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search history..."
            className="pl-10 bg-white border-0 h-10"
          />
        </div>
      </div>

      {/* History List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 pb-20">
        {historyItems.map((item) => (
          <Card 
            key={item.id} 
            className="shadow-sm hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => handleItemClick(item)}
          >
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                {/* Icon */}
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                    item.type === 'scan'
                      ? 'bg-[#CADAFD]'
                      : 'bg-[#CADAFD]'
                  }`}
                >
                  {item.type === 'scan' ? (
                    <Pill className="w-6 h-6 text-[#284995]" />
                  ) : (
                    <svg
                      className="w-6 h-6 text-[#284995]"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12.87 15.07l-2.54-2.51.03-.03c1.74-1.94 2.98-4.17 3.71-6.53H17V4h-7V2H8v2H1v1.99h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z" />
                    </svg>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h4 className="text-gray-800 mb-1">
                    {item.type === 'scan' ? item.medication : item.session}
                  </h4>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar className="w-3 h-3" />
                    <span className="text-sm">{item.date} at {item.time}</span>
                  </div>
                  <div className="mt-2">
                    <span
                      className={`inline-block px-2 py-1 rounded-full text-xs ${
                        item.type === 'scan'
                          ? 'bg-[#CADAFD] text-[#284995]'
                          : 'bg-[#CADAFD] text-[#284995]'
                      }`}
                    >
                      {item.type === 'scan' ? 'Medication Scan' : 'Translation'}
                    </span>
                  </div>
                </div>

                {/* Arrow */}
                <div className="text-gray-400">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
                  </svg>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Bottom Navigation */}
      <BottomNav onNavigate={onNavigate} activeScreen="history" />
    </div>
  );
}
