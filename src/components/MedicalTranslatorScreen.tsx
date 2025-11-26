import { ArrowLeft, Mic, Heart, Brain } from 'lucide-react';
import { Button } from './ui/button';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import { BottomNav } from './BottomNav';
import { useState } from 'react';

interface MedicalTranslatorScreenProps {
  onNavigate: (screen: string) => void;
}

export function MedicalTranslatorScreen({ onNavigate }: MedicalTranslatorScreenProps) {
  const [simplifyTerms, setSimplifyTerms] = useState(false);

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
          <h2 className="text-white">Real-Time Translator</h2>
        </div>
      </div>

      {/* Simplify Toggle */}
      <div className="bg-white p-4 border-b border-gray-200 shadow-sm">
        <div className="flex items-center justify-between">
          <Label htmlFor="simplify" className="flex items-center gap-2">
            <Brain className="w-4 h-4 text-[#284995]" />
            Simplify medical terms
          </Label>
          <Switch
            id="simplify"
            checked={simplifyTerms}
            onCheckedChange={setSimplifyTerms}
          />
        </div>
        {simplifyTerms && (
          <div className="mt-3 p-3 bg-[#CADAFD] rounded-lg border border-[#284995]/30">
            <div className="flex items-center gap-2 mb-1">
              <Heart className="w-4 h-4 text-red-500" />
              <span className="text-gray-700">Example:</span>
            </div>
            <p className="text-gray-600 ml-6">
              <span className="line-through">Hypertension</span> → <strong>High blood pressure</strong>
            </p>
          </div>
        )}
      </div>

      {/* Chat Interface */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-24">
        {/* Doctor Message */}
        <div className="flex flex-col items-start">
          <div className="bg-white rounded-2xl rounded-tl-sm p-4 max-w-[80%] shadow-sm border border-gray-200">
            <p className="mb-1 text-[#284995] opacity-70">Doctor says:</p>
            <p className="text-gray-800">"Do you have any history of hypertension?"</p>
          </div>
          <div className="mt-2 ml-2 text-gray-600 italic">
            <p>"¿Tiene algún historial de hipertensión?"</p>
          </div>
        </div>

        {/* Patient Message */}
        <div className="flex flex-col items-end">
          <div className="bg-[#CADAFD] rounded-2xl rounded-tr-sm p-4 max-w-[80%] shadow-sm">
            <p className="mb-1 text-[#284995] opacity-70">Patient says:</p>
            <p className="text-gray-800">"Sí, tomo medicamentos para la presión arterial."</p>
          </div>
          <div className="mt-2 mr-2 text-gray-600 italic">
            <p>"Yes, I take medication for blood pressure."</p>
          </div>
        </div>

        {/* Doctor Message */}
        <div className="flex flex-col items-start">
          <div className="bg-white rounded-2xl rounded-tl-sm p-4 max-w-[80%] shadow-sm border border-gray-200">
            <p className="mb-1 text-[#284995] opacity-70">Doctor says:</p>
            <p className="text-gray-800">
              {simplifyTerms ? '"What is your high blood pressure reading?"' : '"What is your current blood pressure reading?"'}
            </p>
          </div>
          <div className="mt-2 ml-2 text-gray-600 italic">
            <p>"¿Cuál es su lectura de presión arterial actual?"</p>
          </div>
        </div>

        {/* Patient Message */}
        <div className="flex flex-col items-end">
          <div className="bg-[#CADAFD] rounded-2xl rounded-tr-sm p-4 max-w-[80%] shadow-sm">
            <p className="mb-1 text-[#284995] opacity-70">Patient says:</p>
            <p className="text-gray-800">"Aproximadamente 130 sobre 85."</p>
          </div>
          <div className="mt-2 mr-2 text-gray-600 italic">
            <p>"Approximately 130 over 85."</p>
          </div>
        </div>
      </div>

      {/* Voice Translation Button */}
      <div className="p-4 pb-2 bg-white border-t border-gray-200 shadow-lg">
        <Button className="w-full h-12 bg-[#284995] hover:bg-[#1a3570] text-white rounded-2xl shadow-md">
          <Mic className="w-5 h-5 mr-2" />
          Voice Translation
        </Button>
      </div>

      {/* Bottom Navigation */}
      <BottomNav onNavigate={onNavigate} activeScreen="translator" />
    </div>
  );
}
