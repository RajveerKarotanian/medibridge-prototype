import { ArrowLeft, Pill, Clock, AlertTriangle, Info } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';

interface MedicationDetailScreenProps {
  onNavigate: (screen: string) => void;
  medication: any;
}

export function MedicationDetailScreen({ onNavigate, medication }: MedicationDetailScreenProps) {
  if (!medication) {
    return (
      <div className="flex flex-col h-full bg-[#EDEDED] items-center justify-center">
        <p className="text-gray-600">No medication selected</p>
        <button
          onClick={() => onNavigate('history')}
          className="mt-4 px-4 py-2 bg-[#284995] text-white rounded-lg"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-[#EDEDED]">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#284995] to-[#1a3570] text-white p-4 shadow-md">
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('history')}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/20 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h2 className="text-white">Medication Details</h2>
        </div>
      </div>

      {/* Medication Card Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Main Info Card */}
        <Card className="shadow-lg">
          <CardHeader className="bg-gradient-to-r from-[#CADAFD] to-[#e5f0ff] pb-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-[#284995] flex items-center justify-center flex-shrink-0">
                <Pill className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1">
                <CardTitle className="text-gray-800 mb-1">{medication.name}</CardTitle>
                <p className="text-gray-600">{medication.dosage}</p>
                <Badge className="bg-[#284995] hover:bg-[#1a3570] text-white mt-2">
                  {medication.status}
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-4 space-y-3">
            <div>
              <h4 className="text-gray-700 mb-1 flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#284995]" />
                Dosage & Frequency
              </h4>
              <p className="text-gray-600 ml-6">{medication.frequency}</p>
              <p className="text-gray-600 ml-6">Time: {medication.time}</p>
            </div>
          </CardContent>
        </Card>

        {/* Purpose Card */}
        <Card className="shadow-md">
          <CardContent className="p-4">
            <h4 className="text-gray-700 mb-2 flex items-center gap-2">
              <Info className="w-4 h-4 text-[#284995]" />
              Purpose
            </h4>
            <p className="text-gray-600">{medication.purpose}</p>
          </CardContent>
        </Card>

        {/* Instructions Card */}
        <Card className="shadow-md">
          <CardContent className="p-4">
            <h4 className="text-gray-700 mb-2 flex items-center gap-2">
              <Info className="w-4 h-4 text-[#284995]" />
              Instructions
            </h4>
            <p className="text-gray-600">{medication.instructions || 'No instructions available'}</p>
          </CardContent>
        </Card>

        {/* Side Effects Card */}
        <Card className="shadow-md border-l-4 border-l-amber-500">
          <CardContent className="p-4">
            <h4 className="text-gray-700 mb-2 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              Possible Side Effects
            </h4>
            <p className="text-gray-600">{medication.sideEffects}</p>
          </CardContent>
        </Card>

        {/* Warnings Card - if available */}
        {medication.warnings && (
          <Card className="shadow-md border-2 border-red-500 bg-red-50">
            <CardContent className="p-4">
              <h4 className="text-red-900 mb-2 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-red-600" />
                Important Warnings
              </h4>
              <p className="text-red-800">{medication.warnings}</p>
            </CardContent>
          </Card>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3 pb-4">
          <button
            onClick={() => onNavigate('schedule')}
            className="flex-1 px-4 py-3 bg-[#284995] text-white rounded-lg hover:bg-[#1a3570] transition-colors"
          >
            View Schedule
          </button>
          <button
            onClick={() => onNavigate('history')}
            className="flex-1 px-4 py-3 bg-[#EDEDED] text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Back to History
          </button>
        </div>
      </div>
    </div>
  );
}