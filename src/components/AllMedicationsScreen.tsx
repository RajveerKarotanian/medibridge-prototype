import { ArrowLeft, Pill, Plus } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { BottomNav } from './BottomNav';

interface AllMedicationsScreenProps {
  onNavigate: (screen: string, data?: any) => void;
}

export function AllMedicationsScreen({ onNavigate }: AllMedicationsScreenProps) {
  const medications = [
    {
      id: 1,
      name: 'Atorvastatin',
      dosage: '10mg',
      frequency: '1 tablet daily',
      purpose: 'Lowers cholesterol',
      status: 'Active',
      time: '9:00 AM',
      sideEffects: 'Muscle pain, digestive problems',
      instructions: 'Take with food',
    },
    {
      id: 2,
      name: 'Metformin',
      dosage: '500mg',
      frequency: '2 tablets daily',
      purpose: 'Controls blood sugar',
      status: 'Active',
      time: '7:00 PM',
      sideEffects: 'Nausea, diarrhea',
      instructions: 'Take with meals',
    },
    {
      id: 3,
      name: 'Lisinopril',
      dosage: '10mg',
      frequency: '1 tablet daily',
      purpose: 'Controls blood pressure',
      status: 'Active',
      time: '8:00 AM',
      sideEffects: 'Dizziness, dry cough',
      instructions: 'Take at the same time daily',
    },
    {
      id: 4,
      name: 'Omeprazole',
      dosage: '20mg',
      frequency: '1 capsule daily',
      purpose: 'Reduces stomach acid',
      status: 'Active',
      time: '7:30 AM',
      sideEffects: 'Headache, stomach pain',
      instructions: 'Take before breakfast',
    },
  ];

  return (
    <div className="flex flex-col h-full bg-[#EDEDED]">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#284995] to-[#1a3570] text-white p-4 shadow-md">
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('landing')}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/20 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h2 className="text-white">All Medications</h2>
        </div>
      </div>

      {/* Medications List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 pb-20">
        {medications.map((med) => (
          <Card
            key={med.id}
            className="shadow-md hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => onNavigate('medication-detail', med)}
          >
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-start gap-3 flex-1">
                  <div className="w-12 h-12 rounded-full bg-[#CADAFD] flex items-center justify-center flex-shrink-0">
                    <Pill className="w-6 h-6 text-[#284995]" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-gray-800">{med.name}</h4>
                    <p className="text-gray-600">
                      {med.dosage} - {med.frequency}
                    </p>
                  </div>
                </div>
                <Badge variant="outline" className="text-[#284995] border-[#284995]">
                  {med.status}
                </Badge>
              </div>
              <p className="text-gray-600 mt-2">
                <span className="text-[#284995]">Purpose:</span> {med.purpose}
              </p>
              <div className="flex items-center gap-2 mt-2">
                <div className="w-2 h-2 rounded-full bg-[#284995]"></div>
                <span className="text-gray-600">{med.time}</span>
              </div>
            </CardContent>
          </Card>
        ))}

        {/* Add Medication Button */}
        <Button
          onClick={() => onNavigate('scanner')}
          variant="outline"
          className="w-full border-dashed border-2 border-gray-400 hover:border-[#284995] hover:bg-[#CADAFD] text-gray-600 hover:text-[#284995] h-16"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add New Medication
        </Button>
      </div>

      {/* Bottom Navigation */}
      <BottomNav onNavigate={onNavigate} activeScreen="schedule" />
    </div>
  );
}
