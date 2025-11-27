import { ArrowLeft, AlertTriangle, Clock, Droplets, Moon, Thermometer, Activity } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { BottomNav } from './BottomNav';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface MedicationScanResultScreenProps {
  onNavigate: (screen: string, data?: any) => void;
  medication?: any;
}

export function MedicationScanResultScreen({ onNavigate, medication }: MedicationScanResultScreenProps) {
  // Use medication data if provided, otherwise use default Tylenol data
  const medicationData = medication || {
    name: 'Tylenol Extra Strength Rapid Release',
    dosage: 'Acetaminophen 500mg Tablets',
    frequency: 'Every 6 hours as needed',
    time: 'As needed',
    status: 'Active',
    purpose: 'Temporary relief of minor aches and pains, and to reduce fever',
    sideEffects: 'Nausea, allergic reaction (rash, itching, swelling), stomach pain',
    warnings: 'Do not exceed 6 tablets in 24 hours. Risk of severe liver damage with overdose. Avoid alcohol while using this product.',
    instructions: 'Take 2 tablets every 6 hours as needed. Do not take more than 6 tablets in 24 hours.'
  };

  const sideEffects = [
    { name: 'Nausea', icon: Droplets, severity: 'uncommon' },
    { name: 'Allergic Reaction', icon: AlertTriangle, severity: 'rare' },
    { name: 'Stomach Pain', icon: Activity, severity: 'uncommon' },
    { name: 'Rash/Itching', icon: Thermometer, severity: 'rare' },
  ];

  return (
    <div className="flex flex-col h-full bg-[#EDEDED]">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#284995] to-[#1a3570] text-white p-4 shadow-md">
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('scanner')}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/20 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h2 className="text-white">Scan Results</h2>
        </div>
      </div>

      {/* Main Content - Scrollable */}
      <div className="flex-1 overflow-y-auto pb-20">
        {/* Pill Bottle Photo - Top Half */}
        <div className="relative h-64 lg:h-80 bg-gradient-to-br from-gray-100 to-gray-200">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1655313719848-23d645684e4a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2F0aW9uJTIwcGlsbCUyMGJvdHRsZXxlbnwxfHx8fDE3NjM1NzQwODR8MA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Medication bottle"
            className="w-full h-full object-cover"
          />
          {/* Overlay Badge */}
          <div className="absolute top-4 left-4">
            <Badge className="bg-[#284995] text-white px-4 py-2">
              <Activity className="w-4 h-4 mr-2" />
              Scanned Successfully
            </Badge>
          </div>
        </div>

        {/* Detail Sheet - Bottom Half */}
        <div className="bg-white rounded-t-3xl -mt-6 relative z-10 shadow-2xl">
          <div className="p-6 space-y-6">
            {/* Medication Name */}
            <div>
              <h3 className="text-[#284995] mb-1">{medicationData.name}</h3>
              <p className="text-gray-600">{medicationData.dosage}</p>
            </div>

            {/* RED ALERT - FIXED COLORS */}
            {/* Changed bg-red-600 to hex code to force color */}
            <div className="bg-[#DC2626] text-white rounded-xl p-5 shadow-lg border-4 border-[#991B1B]">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-8 h-8 flex-shrink-0 mt-1 text-white" />
                <div>
                  <p className="mb-2 font-bold text-white">LIVER DAMAGE WARNING</p>
                  <p className="text-white/90">
                    {medicationData.warnings}
                  </p>
                </div>
              </div>
            </div>

            {/* Safety Status Section */}
            <Card className="border-2 border-amber-300 bg-amber-50">
              <CardContent className="p-5">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-amber-600 flex items-center justify-center">
                    <Activity className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <p className="text-amber-900">Safety Information</p>
                    <p className="text-amber-700">Important Guidelines</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-amber-600 mt-2"></div>
                    <p className="text-amber-900 flex-1">
                      Do not take more than directed (maximum 6 tablets in 24 hours)
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-amber-600 mt-2"></div>
                    <p className="text-amber-900 flex-1">
                      Avoid alcohol consumption while taking this medication
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-amber-600 mt-2"></div>
                    <p className="text-amber-900 flex-1">
                      Consult doctor if pain persists for more than 10 days
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Dosage Information */}
            <Card className="border-2 border-[#CADAFD]">
              <CardContent className="p-5">
                <div className="flex items-center gap-3 mb-3">
                  <Clock className="w-6 h-6 text-[#284995]" />
                  <p className="text-[#284995]">Dosage Instructions</p>
                </div>
                <p className="text-gray-900 mb-2">{medicationData.instructions}</p>
              </CardContent>
            </Card>

            {/* Common Side Effects with Icons */}
            <Card className="border-2 border-gray-200">
              <CardContent className="p-5">
                <p className="text-[#284995] mb-4">Common Side Effects</p>
                
                <div className="grid grid-cols-2 gap-3">
                  {sideEffects.map((effect, idx) => {
                    const Icon = effect.icon;
                    return (
                      <div
                        key={idx}
                        className={`rounded-xl p-4 border-2 ${
                          effect.severity === 'common' 
                            ? 'bg-red-50 border-red-200' 
                            : effect.severity === 'uncommon'
                            ? 'bg-amber-50 border-amber-200'
                            : 'bg-blue-50 border-blue-200'
                        }`}
                      >
                        <div className={`w-12 h-12 rounded-full mb-3 flex items-center justify-center ${
                          effect.severity === 'common' 
                            ? 'bg-red-100' 
                            : effect.severity === 'uncommon'
                            ? 'bg-amber-100'
                            : 'bg-blue-100'
                        }`}>
                          <Icon className={`w-7 h-7 ${
                            effect.severity === 'common' 
                              ? 'text-red-600' 
                              : effect.severity === 'uncommon'
                              ? 'text-amber-600'
                              : 'text-blue-600'
                          }`} />
                        </div>
                        <p className="text-gray-900 mb-1">{effect.name}</p>
                        <Badge 
                          variant="secondary"
                          className={
                            effect.severity === 'common' 
                              ? 'bg-red-200 text-red-900' 
                              : effect.severity === 'uncommon'
                              ? 'bg-amber-200 text-amber-900'
                              : 'bg-blue-200 text-blue-900'
                          }
                        >
                          {effect.severity}
                        </Badge>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <p className="text-gray-700">
                    Contact your doctor if side effects persist or worsen
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-2">
              <Button
                onClick={() => onNavigate('scanner')}
                variant="outline"
                className="flex-1 h-14 rounded-xl border-2 border-[#284995] text-[#284995]"
              >
                Scan Another
              </Button>
              <Button
                onClick={() => onNavigate('schedule')}
                className="flex-1 h-14 bg-teal-600 hover:bg-teal-700 text-white rounded-xl"
              >
                Add to Schedule
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNav onNavigate={onNavigate} activeScreen="scanner" />
    </div>
  );
}