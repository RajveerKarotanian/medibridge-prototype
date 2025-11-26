import { ArrowLeft, Languages, User, Stethoscope } from 'lucide-react';
import { Card, CardContent } from './ui/card';

interface TranslationHistoryDetailScreenProps {
  onNavigate: (screen: string) => void;
  translation: any;
}

export function TranslationHistoryDetailScreen({ onNavigate, translation }: TranslationHistoryDetailScreenProps) {
  if (!translation) {
    return (
      <div className="flex flex-col h-full bg-[#EDEDED] items-center justify-center">
        <p className="text-gray-600">No translation session selected</p>
        <button
          onClick={() => onNavigate('history')}
          className="mt-4 px-4 py-2 bg-[#284995] text-white rounded-lg"
        >
          Go Back
        </button>
      </div>
    );
  }

  // Mock conversation data
  const conversation = [
    {
      id: 1,
      speaker: 'patient',
      english: 'Hello doctor, I have been feeling dizzy',
      french: 'Bonjour docteur, je me sens étourdi',
    },
    {
      id: 2,
      speaker: 'doctor',
      english: 'How long have you been experiencing this?',
      french: 'Depuis combien de temps ressentez-vous cela?',
    },
    {
      id: 3,
      speaker: 'patient',
      english: 'About three days',
      french: 'Environ trois jours',
    },
    {
      id: 4,
      speaker: 'doctor',
      english: 'Are you taking your blood pressure medication?',
      french: 'Prenez-vous vos médicaments contre l\'hypertension?',
    },
    {
      id: 5,
      speaker: 'patient',
      english: 'Yes, every morning',
      french: 'Oui, tous les matins',
    },
  ];

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
          <div className="flex-1">
            <h2 className="text-white">{translation.session}</h2>
            <p className="text-sm text-white/80">{translation.date} at {translation.time}</p>
          </div>
        </div>
      </div>

      {/* Session Info */}
      <div className="bg-white p-4 shadow-sm border-b border-gray-200">
        <div className="flex items-center gap-2 text-gray-700">
          <Languages className="w-5 h-5 text-[#284995]" />
          <span>English ↔ French</span>
        </div>
      </div>

      {/* Conversation History */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {conversation.map((message) => (
          <Card
            key={message.id}
            className={`shadow-sm ${
              message.speaker === 'patient'
                ? 'ml-0 mr-8 bg-[#CADAFD]'
                : 'ml-8 mr-0 bg-white'
            }`}
          >
            <CardContent className="p-3">
              <div className="flex items-start gap-2 mb-2">
                {message.speaker === 'patient' ? (
                  <div className="w-8 h-8 rounded-full bg-[#284995] flex items-center justify-center flex-shrink-0">
                    <User className="w-4 h-4 text-white" />
                  </div>
                ) : (
                  <div className="w-8 h-8 rounded-full bg-[#284995] flex items-center justify-center flex-shrink-0">
                    <Stethoscope className="w-4 h-4 text-white" />
                  </div>
                )}
                <div className="flex-1">
                  <p className="text-xs text-gray-500 mb-1">
                    {message.speaker === 'patient' ? 'Patient' : 'Doctor'}
                  </p>
                  <p className="text-gray-800 mb-1">{message.english}</p>
                  <p className="text-gray-600 text-sm italic">{message.french}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="p-4 bg-white border-t border-gray-200">
        <button
          onClick={() => onNavigate('history')}
          className="w-full px-4 py-3 bg-[#284995] text-white rounded-lg hover:bg-[#1a3570] transition-colors"
        >
          Back to History
        </button>
      </div>
    </div>
  );
}
