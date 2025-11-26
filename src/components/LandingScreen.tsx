import React, { useState } from 'react';
import { Mic, Type, Bell, Languages, Clock, Pill, Plus } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet';
import logo from '../assets/c2ec26e9729de313688a96d37dc96cda542f9a54.png';

interface LandingScreenProps {
  onNavigate: (screen: string) => void;
  fontSize: number;
  setFontSize: (size: number) => void;
}

export function LandingScreen({ onNavigate, fontSize, setFontSize }: LandingScreenProps) {
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>(['en', 'fr']);
  const [showNotifications, setShowNotifications] = useState(false);

  const availableLanguages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'zh', name: '中文', flag: '🇨🇳' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦' },
  ];

  const toggleLanguage = (code: string) => {
    if (selectedLanguages.includes(code)) {
      if (selectedLanguages.length > 1) {
        setSelectedLanguages(selectedLanguages.filter(l => l !== code));
      }
    } else {
      setSelectedLanguages([...selectedLanguages, code]);
    }
  };

  const notifications = [
    {
      id: 1,
      title: 'Time to take Atorvastatin',
      message: '1 tablet - 9:00 AM',
      time: '15 min ago',
      type: 'medication',
    },
    {
      id: 2,
      title: 'Upcoming appointment',
      message: 'Dr. Martinez - Tomorrow 10:00 AM',
      time: '2 hours ago',
      type: 'appointment',
    },
  ];

  const primaryLang = selectedLanguages[0] || 'en';

  const translations: Record<string, Record<string, string>> = {
    en: {
      title: 'MediBridge',
      subtitle: 'Breaking language barriers in healthcare',
      myMedications: 'My Medications',
      todaySchedule: "Today's Schedule",
      recentScans: 'Recent Scans',
      viewAll: 'View All',
      morning: 'Morning',
      evening: 'Evening',
      addMedication: 'Add Medication',
      scanMedication: 'Scan Medication',
      translator: 'Translator',
      home: 'Home',
      history: 'History',
      alerts: 'Alerts',
      profile: 'Profile',
      daily: 'Daily',
      purpose: 'Purpose',
      cholesterol: 'Lowers cholesterol',
      diabetes: 'Controls blood sugar',
      accessibility: 'Text Size',
      voice: 'Voice',
      notifications: 'Notifications',
      languages: 'Languages',
    },
    fr: {
      title: 'MediBridge',
      subtitle: 'Briser les barrières linguistiques en santé',
      myMedications: 'Mes Médicaments',
      todaySchedule: 'Programme du jour',
      recentScans: 'Analyses récentes',
      viewAll: 'Voir tout',
      morning: 'Matin',
      evening: 'Soir',
      addMedication: 'Ajouter un médicament',
      scanMedication: 'Scanner un médicament',
      translator: 'Traducteur',
      home: 'Accueil',
      history: 'Historique',
      alerts: 'Alertes',
      profile: 'Profil',
      daily: 'Quotidien',
      purpose: 'Objectif',
      cholesterol: 'Réduit le cholestérol',
      diabetes: 'Contrôle la glycémie',
      accessibility: 'Taille du texte',
      voice: 'Voix',
      notifications: 'Notifications',
      languages: 'Langues',
    },
    es: {
      title: 'MediBridge',
      subtitle: 'Rompiendo barreras lingüísticas en salud',
      myMedications: 'Mis Medicamentos',
      todaySchedule: 'Horario de Hoy',
      recentScans: 'Escaneos Recientes',
      viewAll: 'Ver Todo',
      morning: 'Mañana',
      evening: 'Tarde',
      addMedication: 'Agregar Medicamento',
      scanMedication: 'Escanear Medicamento',
      translator: 'Traductor',
      home: 'Inicio',
      history: 'Historial',
      alerts: 'Alertas',
      profile: 'Perfil',
      daily: 'Diario',
      purpose: 'Propósito',
      cholesterol: 'Reduce el colesterol',
      diabetes: 'Controla el azúcar en sangre',
      accessibility: 'Tamaño de texto',
      voice: 'Voz',
      notifications: 'Notificaciones',
      languages: 'Idiomas',
    },
  };

  const t = translations[primaryLang] || translations.en;

  const cycleFontSize = () => {
    // Cycle through: 16 (default) -> 18 (medium) -> 20 (large) -> back to 16
    if (fontSize === 16) {
      setFontSize(18);
    } else if (fontSize === 18) {
      setFontSize(20);
    } else {
      setFontSize(16); // Reset to default
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#EDEDED]">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#284995] to-[#1a3570] text-white p-4 shadow-md">
        <div className="flex items-center justify-between mb-3">
          {/* Logo and Title */}
          <div className="flex items-center gap-3">
            <img 
              src={logo} 
              alt="MediBridge Logo" 
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <h1 className="text-white">{t.title}</h1>
              <p className="text-xs text-white/80">{t.subtitle}</p>
            </div>
          </div>

          {/* Notification Bell */}
          <Sheet open={showNotifications} onOpenChange={setShowNotifications}>
            <SheetTrigger asChild>
              <button className="relative p-2 rounded-full hover:bg-white/20 transition-colors">
                <Bell className="w-6 h-6" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80 sm:w-96 bg-white">
              <SheetHeader>
                <SheetTitle>{t.notifications}</SheetTitle>
                <SheetDescription>View your medication reminders and appointments</SheetDescription>
              </SheetHeader>
              <div className="mt-6 space-y-3">
                {notifications.map((notif) => (
                  <div key={notif.id} className="p-3 bg-[#CADAFD] rounded-lg">
                    <h4 className="text-gray-800 mb-1">{notif.title}</h4>
                    <p className="text-gray-600 mb-1">{notif.message}</p>
                    <p className="text-xs text-gray-500">{notif.time}</p>
                  </div>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Language Selector and Accessibility */}
        <div className="flex gap-2 items-center flex-wrap">
          {/* Multi-Language Selector */}
          <Sheet>
            <SheetTrigger asChild>
              <button className="flex items-center gap-2 px-3 py-1.5 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                <Languages className="w-4 h-4" />
                <span className="text-xs">{selectedLanguages.map(l => l.toUpperCase()).join(', ')}</span>
              </button>
            </SheetTrigger>
            <SheetContent side="bottom" className="bg-white h-[400px]">
              <SheetHeader>
                <SheetTitle>{t.languages}</SheetTitle>
                <SheetDescription>Select the languages you want to use</SheetDescription>
              </SheetHeader>
              <div className="mt-6 grid grid-cols-2 gap-3">
                {availableLanguages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => toggleLanguage(lang.code)}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      selectedLanguages.includes(lang.code)
                        ? 'border-[#284995] bg-[#CADAFD]'
                        : 'border-gray-300 bg-white'
                    }`}
                  >
                    <span className="text-2xl mb-1 block">{lang.flag}</span>
                    <span className="text-sm">{lang.name}</span>
                  </button>
                ))}
              </div>
            </SheetContent>
          </Sheet>

          {/* Accessibility Button */}
          <button 
            onClick={cycleFontSize}
            className="flex items-center gap-2 px-3 py-1.5 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
          >
            <Type className="w-4 h-4" />
            <span className="text-xs">
              {fontSize === 16 ? 'A' : fontSize === 18 ? 'A+' : 'A++'}
            </span>
          </button>

          {/* Voice Button */}
          <button className="flex items-center gap-2 px-3 py-1.5 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
            <Mic className="w-4 h-4" />
            <span className="text-xs">{t.voice}</span>
          </button>
        </div>
      </div>

      {/* Main Content - Compact Widgets */}
      <div className="flex-1 overflow-y-auto p-3 lg:p-4 space-y-3 pb-20">
        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-2">
          <Button
            onClick={() => onNavigate('scanner')}
            className="h-16 lg:h-20 bg-[#284995] hover:bg-[#1a3570] text-white rounded-xl shadow-md flex flex-col items-center justify-center gap-1"
          >
            <Pill className="w-5 h-5 lg:w-6 lg:h-6" />
            <span className="text-sm">{t.scanMedication}</span>
          </Button>
          <Button
            onClick={() => onNavigate('translator')}
            className="h-16 lg:h-20 bg-[#284995] hover:bg-[#1a3570] text-white rounded-xl shadow-md flex flex-col items-center justify-center gap-1"
          >
            <Languages className="w-5 h-5 lg:w-6 lg:h-6" />
            <span className="text-sm">{t.translator}</span>
          </Button>
        </div>

        {/* Today's Schedule */}
        <Card className="shadow-md">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-gray-800 text-base">
                <Clock className="w-4 h-4 text-[#284995]" />
                {t.todaySchedule}
              </CardTitle>
              <button
                onClick={() => onNavigate('schedule')}
                className="text-[#284995] hover:text-[#1a3570] text-sm"
              >
                {t.viewAll}
              </button>
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            {/* Schedule Item 1 */}
            <div className="flex items-center gap-2 p-2 bg-[#CADAFD] rounded-lg">
              <div className="w-8 h-8 rounded-full bg-[#284995] flex items-center justify-center flex-shrink-0">
                <Pill className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-gray-800 text-sm truncate">Atorvastatin</h4>
                <p className="text-gray-600 text-xs">9:00 AM</p>
              </div>
              <Badge className="bg-green-100 text-green-700 hover:bg-green-100 text-xs">
                {t.morning}
              </Badge>
            </div>

            {/* Schedule Item 2 */}
            <div className="flex items-center gap-2 p-2 bg-[#CADAFD] rounded-lg">
              <div className="w-8 h-8 rounded-full bg-[#284995] flex items-center justify-center flex-shrink-0">
                <Pill className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-gray-800 text-sm truncate">Metformin</h4>
                <p className="text-gray-600 text-xs">7:00 PM</p>
              </div>
              <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-100 text-xs">
                {t.evening}
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* My Medications Summary */}
        <Card className="shadow-md">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-gray-800 text-base">
                <Pill className="w-4 h-4 text-[#284995]" />
                {t.myMedications}
              </CardTitle>
              <button
                onClick={() => onNavigate('all-medications')}
                className="text-[#284995] hover:text-[#1a3570] text-sm"
              >
                {t.viewAll}
              </button>
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            {/* Medication Card 1 */}
            <div className="border border-gray-200 rounded-lg p-2 hover:shadow-sm transition-shadow">
              <div className="flex items-start justify-between mb-1">
                <div>
                  <h4 className="text-gray-800 text-sm">Atorvastatin</h4>
                  <p className="text-gray-600 text-xs">10mg - 1 tablet {t.daily}</p>
                </div>
                <Badge variant="outline" className="text-[#284995] border-[#284995] text-xs">
                  Active
                </Badge>
              </div>
              <p className="text-gray-600 text-xs mt-1">
                <span className="text-[#284995]">{t.purpose}:</span> {t.cholesterol}
              </p>
            </div>

            {/* Medication Card 2 */}
            <div className="border border-gray-200 rounded-lg p-2 hover:shadow-sm transition-shadow">
              <div className="flex items-start justify-between mb-1">
                <div>
                  <h4 className="text-gray-800 text-sm">Metformin</h4>
                  <p className="text-gray-600 text-xs">500mg - 2 tablets {t.daily}</p>
                </div>
                <Badge variant="outline" className="text-[#284995] border-[#284995] text-xs">
                  Active
                </Badge>
              </div>
              <p className="text-gray-600 text-xs mt-1">
                <span className="text-[#284995]">{t.purpose}:</span> {t.diabetes}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Recent Scans */}
        <Card className="shadow-md">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-gray-800 text-base">
                <svg className="w-4 h-4 text-[#284995]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9.5 6.5v3h-3v-3h3M11 5H5v6h6V5zm-1.5 9.5v3h-3v-3h3M11 13H5v6h6v-6zm6.5-6.5v3h-3v-3h3M19 5h-6v6h6V5zm-6 8h1.5v1.5H13V13zm1.5 1.5H16V16h-1.5v-1.5zM16 13h1.5v1.5H16V13zm-3 3h1.5v1.5H13V16zm1.5 1.5H16V19h-1.5v-1.5zM16 16h1.5v1.5H16V16zm1.5-1.5H19V16h-1.5v-1.5zm0 3H19V19h-1.5v-1.5z" />
                </svg>
                {t.recentScans}
              </CardTitle>
              <button
                onClick={() => onNavigate('history')}
                className="text-[#284995] hover:text-[#1a3570] text-sm"
              >
                {t.viewAll}
              </button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2 overflow-x-auto pb-1">
              {/* Scan Card 1 */}
              <div className="min-w-[120px] border border-gray-200 rounded-lg p-2 bg-gradient-to-br from-[#CADAFD] to-[#e5f0ff]">
                <div className="w-8 h-8 rounded-full bg-[#284995] flex items-center justify-center mb-1">
                  <Pill className="w-4 h-4 text-white" />
                </div>
                <h5 className="text-gray-800 text-sm mb-0.5">Atorvastatin</h5>
                <p className="text-xs text-gray-600">Oct 15</p>
              </div>

              {/* Scan Card 2 */}
              <div className="min-w-[120px] border border-gray-200 rounded-lg p-2 bg-gradient-to-br from-[#CADAFD] to-[#e5f0ff]">
                <div className="w-8 h-8 rounded-full bg-[#284995] flex items-center justify-center mb-1">
                  <Pill className="w-4 h-4 text-white" />
                </div>
                <h5 className="text-gray-800 text-sm mb-0.5">Metformin</h5>
                <p className="text-xs text-gray-600">Oct 13</p>
              </div>

              {/* Add New Scan */}
              <button
                onClick={() => onNavigate('scanner')}
                className="min-w-[120px] border-2 border-dashed border-gray-300 rounded-lg p-2 flex flex-col items-center justify-center hover:border-[#284995] hover:bg-[#CADAFD] transition-colors"
              >
                <Plus className="w-6 h-6 text-gray-400 mb-1" />
                <p className="text-xs text-gray-600">Scan New</p>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Navigation */}
      <div className="h-16 bg-white border-t border-gray-200 flex items-center justify-around px-6">
        <button className="flex flex-col items-center gap-1 text-[#284995]">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
          </svg>
          <span className="text-xs">{t.home}</span>
        </button>
        <button
          onClick={() => onNavigate('history')}
          className="flex flex-col items-center gap-1 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
          </svg>
          <span className="text-xs">{t.history}</span>
        </button>
        <button
          onClick={() => onNavigate('alerts')}
          className="flex flex-col items-center gap-1 text-gray-400 hover:text-gray-600 transition-colors relative"
        >
          <Bell className="w-6 h-6" />
          <span className="absolute top-0 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
          <span className="text-xs">{t.alerts}</span>
        </button>
        <button
          onClick={() => onNavigate('profile')}
          className="flex flex-col items-center gap-1 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
          </svg>
          <span className="text-xs">{t.profile}</span>
        </button>
      </div>
    </div>
  );
}
