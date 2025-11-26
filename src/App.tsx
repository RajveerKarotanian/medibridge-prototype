import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LandingScreen } from './components/LandingScreen';
import { MedicalTranslatorScreen } from './components/MedicalTranslatorScreen';
import { MedicationScannerScreen } from './components/MedicationScannerScreen';
import { MedicationScheduleScreen } from './components/MedicationScheduleScreen';
import { HistoryScreen } from './components/HistoryScreen';
import { AlertsScreen } from './components/AlertsScreen';
import { ProfileScreen } from './components/ProfileScreen';
import { AllMedicationsScreen } from './components/AllMedicationsScreen';
import { MedicationDetailScreen } from './components/MedicationDetailScreen';
import { TranslationHistoryDetailScreen } from './components/TranslationHistoryDetailScreen';
import { CaretakerDashboardScreen } from './components/CaretakerDashboardScreen';
import { ConnectedDevicesScreen } from './components/ConnectedDevicesScreen';
import { DoctorAppointmentScreen } from './components/DoctorAppointmentScreen';
import { MedicationScanResultScreen } from './components/MedicationScanResultScreen';
import { AdherenceAnalyticsScreen } from './components/AdherenceAnalyticsScreen';
import { Toaster } from './components/ui/sonner';

type Screen = 'landing' | 'translator' | 'scanner' | 'schedule' | 'history' | 'alerts' | 'profile' | 'all-medications' | 'medication-detail' | 'translation-detail' | 'caretaker-dashboard' | 'connected-devices' | 'doctor-appointment' | 'scan-result' | 'adherence-analytics';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('landing');
  const [selectedMedication, setSelectedMedication] = useState<any>(null);
  const [selectedTranslation, setSelectedTranslation] = useState<any>(null);
  const [scannedMedication, setScannedMedication] = useState<any>(null);
  const [fontSize, setFontSize] = useState(16);

  const handleNavigate = (screen: string, data?: any) => {
    if (screen === 'medication-detail' && data) {
      setSelectedMedication(data);
    } else if (screen === 'translation-detail' && data) {
      setSelectedTranslation(data);
    } else if (screen === 'scan-result' && data) {
      setScannedMedication(data);
    }
    setCurrentScreen(screen as Screen);
  };

  const screenVariants = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 }
  };

  return (
    <div className="size-full flex items-center justify-center bg-gray-100" style={{ '--font-size': `${fontSize}px` } as React.CSSProperties}>
      {/* Responsive Frame - mobile on small screens, tablet on larger */}
      <div className="w-full max-w-md lg:max-w-2xl h-full md:h-[812px] lg:h-[1024px] md:rounded-3xl bg-white shadow-2xl overflow-hidden relative">
        <AnimatePresence mode="wait">
          {currentScreen === 'landing' && (
            <motion.div
              key="landing"
              variants={screenVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3 }}
              className="h-full"
            >
              <LandingScreen onNavigate={handleNavigate} fontSize={fontSize} setFontSize={setFontSize} />
            </motion.div>
          )}

          {currentScreen === 'translator' && (
            <motion.div
              key="translator"
              variants={screenVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3 }}
              className="h-full"
            >
              <MedicalTranslatorScreen onNavigate={handleNavigate} />
            </motion.div>
          )}

          {currentScreen === 'scanner' && (
            <motion.div
              key="scanner"
              variants={screenVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3 }}
              className="h-full"
            >
              <MedicationScannerScreen onNavigate={handleNavigate} />
            </motion.div>
          )}

          {currentScreen === 'schedule' && (
            <motion.div
              key="schedule"
              variants={screenVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3 }}
              className="h-full"
            >
              <MedicationScheduleScreen onNavigate={handleNavigate} />
            </motion.div>
          )}

          {currentScreen === 'history' && (
            <motion.div
              key="history"
              variants={screenVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3 }}
              className="h-full"
            >
              <HistoryScreen onNavigate={handleNavigate} />
            </motion.div>
          )}

          {currentScreen === 'alerts' && (
            <motion.div
              key="alerts"
              variants={screenVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3 }}
              className="h-full"
            >
              <AlertsScreen onNavigate={handleNavigate} />
            </motion.div>
          )}

          {currentScreen === 'profile' && (
            <motion.div
              key="profile"
              variants={screenVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3 }}
              className="h-full"
            >
              <ProfileScreen onNavigate={handleNavigate} />
            </motion.div>
          )}

          {currentScreen === 'all-medications' && (
            <motion.div
              key="all-medications"
              variants={screenVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3 }}
              className="h-full"
            >
              <AllMedicationsScreen onNavigate={handleNavigate} />
            </motion.div>
          )}

          {currentScreen === 'medication-detail' && (
            <motion.div
              key="medication-detail"
              variants={screenVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3 }}
              className="h-full"
            >
              <MedicationDetailScreen onNavigate={handleNavigate} medication={selectedMedication} />
            </motion.div>
          )}

          {currentScreen === 'translation-detail' && (
            <motion.div
              key="translation-detail"
              variants={screenVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3 }}
              className="h-full"
            >
              <TranslationHistoryDetailScreen onNavigate={handleNavigate} translation={selectedTranslation} />
            </motion.div>
          )}

          {currentScreen === 'caretaker-dashboard' && (
            <motion.div
              key="caretaker-dashboard"
              variants={screenVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3 }}
              className="h-full"
            >
              <CaretakerDashboardScreen onNavigate={handleNavigate} />
            </motion.div>
          )}

          {currentScreen === 'connected-devices' && (
            <motion.div
              key="connected-devices"
              variants={screenVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3 }}
              className="h-full"
            >
              <ConnectedDevicesScreen onNavigate={handleNavigate} />
            </motion.div>
          )}

          {currentScreen === 'doctor-appointment' && (
            <motion.div
              key="doctor-appointment"
              variants={screenVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3 }}
              className="h-full"
            >
              <DoctorAppointmentScreen onNavigate={handleNavigate} />
            </motion.div>
          )}

          {currentScreen === 'scan-result' && (
            <motion.div
              key="scan-result"
              variants={screenVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3 }}
              className="h-full"
            >
              <MedicationScanResultScreen onNavigate={handleNavigate} medication={scannedMedication} />
            </motion.div>
          )}

          {currentScreen === 'adherence-analytics' && (
            <motion.div
              key="adherence-analytics"
              variants={screenVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3 }}
              className="h-full"
            >
              <AdherenceAnalyticsScreen onNavigate={handleNavigate} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <Toaster />
    </div>
  );
}