import { ArrowLeft, Calendar, Clock, MapPin, Phone, Mail, CheckCircle, ChevronRight } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { BottomNav } from './BottomNav';
import { Button } from './ui/button';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Badge } from './ui/badge';
import { useState } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from './ui/dialog';

interface DoctorAppointmentScreenProps {
  onNavigate: (screen: string) => void;
}

export function DoctorAppointmentScreen({ onNavigate }: DoctorAppointmentScreenProps) {
  const [step, setStep] = useState<'profile' | 'slots' | 'success'>('profile');
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const timeSlots = [
    { day: 'Today', time: '2:00 PM', available: true },
    { day: 'Today', time: '3:30 PM', available: true },
    { day: 'Tomorrow', time: '9:00 AM', available: true },
    { day: 'Tomorrow', time: '10:30 AM', available: true },
    { day: 'Tomorrow', time: '2:00 PM', available: true },
    { day: 'Friday', time: '11:00 AM', available: true },
    { day: 'Friday', time: '3:00 PM', available: true },
  ];

  const handleBookAppointment = () => {
    setShowSuccessModal(true);
    setTimeout(() => {
      setShowSuccessModal(false);
      setStep('profile');
      setSelectedSlot(null);
    }, 3000);
  };

  return (
    <div className="flex flex-col h-full bg-[#EDEDED]">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#284995] to-[#1a3570] text-white p-4 shadow-md">
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              if (step === 'slots') {
                setStep('profile');
              } else {
                onNavigate('landing');
              }
            }}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/20 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h2 className="text-white">
            {step === 'profile' && 'Book Appointment'}
            {step === 'slots' && 'Select Time Slot'}
          </h2>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-4 pb-20">
        {/* Step 1: Doctor Profile */}
        {step === 'profile' && (
          <div className="max-w-2xl mx-auto space-y-4">
            <Card className="shadow-lg bg-white border-2 border-[#CADAFD]">
              <CardContent className="p-6">
                {/* Doctor Info */}
                <div className="flex items-start gap-4 mb-6">
                  <Avatar className="w-24 h-24 border-4 border-[#CADAFD]">
                    <AvatarFallback className="bg-[#284995] text-white">
                      DS
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="text-[#284995] mb-1">Dr. Sarah Johnson</h3>
                    <p className="text-gray-700 mb-2">Family Medicine Specialist</p>
                    <div className="flex flex-wrap gap-2">
                      <Badge className="bg-[#284995]">15+ years experience</Badge>
                      <Badge variant="secondary">Multilingual</Badge>
                    </div>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3 p-3 bg-[#CADAFD] rounded-lg">
                    <MapPin className="w-5 h-5 text-[#284995]" />
                    <div>
                      <p className="text-gray-900">Medical Center Downtown</p>
                      <p className="text-gray-700">123 Main Street, Suite 400</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 bg-[#CADAFD] rounded-lg">
                    <Phone className="w-5 h-5 text-[#284995]" />
                    <p className="text-gray-900">(555) 123-4567</p>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 bg-[#CADAFD] rounded-lg">
                    <Mail className="w-5 h-5 text-[#284995]" />
                    <p className="text-gray-900">dr.johnson@medcenter.com</p>
                  </div>
                </div>

                {/* Specialties */}
                <div className="mb-6">
                  <p className="text-[#284995] mb-2">Specializations:</p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="border-[#284995] text-[#284995]">
                      Chronic Disease Management
                    </Badge>
                    <Badge variant="outline" className="border-[#284995] text-[#284995]">
                      Elderly Care
                    </Badge>
                    <Badge variant="outline" className="border-[#284995] text-[#284995]">
                      Medication Review
                    </Badge>
                  </div>
                </div>

                {/* Languages */}
                <div className="mb-6">
                  <p className="text-[#284995] mb-2">Languages Spoken:</p>
                  <p className="text-gray-700">English, Spanish, French, Mandarin</p>
                </div>

                {/* View Availability Button */}
                <Button
                  onClick={() => setStep('slots')}
                  className="w-full h-14 bg-[#284995] hover:bg-[#1a3570] text-white rounded-xl"
                >
                  View Availability
                  <ChevronRight className="w-5 h-5 ml-2" />
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Step 2: Time Slots */}
        {step === 'slots' && (
          <div className="max-w-2xl mx-auto space-y-4">
            <Card className="shadow-md bg-white">
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-4">
                  <Calendar className="w-6 h-6 text-[#284995]" />
                  <div>
                    <p className="text-[#284995]">Select Your Preferred Time</p>
                    <p className="text-gray-600">Available slots with Dr. Johnson</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Time Slot Cards */}
            <div className="space-y-3">
              {timeSlots.map((slot, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedSlot(`${slot.day}, ${slot.time}`)}
                  className={`w-full p-5 rounded-xl border-2 transition-all ${
                    selectedSlot === `${slot.day}, ${slot.time}`
                      ? 'bg-[#284995] border-[#284995] shadow-lg scale-[1.02]'
                      : 'bg-white border-[#CADAFD] hover:border-[#284995] hover:shadow-md'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`w-14 h-14 rounded-full flex items-center justify-center ${
                        selectedSlot === `${slot.day}, ${slot.time}`
                          ? 'bg-white/20'
                          : 'bg-[#CADAFD]'
                      }`}>
                        <Clock className={`w-7 h-7 ${
                          selectedSlot === `${slot.day}, ${slot.time}`
                            ? 'text-white'
                            : 'text-[#284995]'
                        }`} />
                      </div>
                      <div className="text-left">
                        <p className={selectedSlot === `${slot.day}, ${slot.time}` ? 'text-white' : 'text-gray-900'}>
                          {slot.day}
                        </p>
                        <p className={selectedSlot === `${slot.day}, ${slot.time}` ? 'text-white' : 'text-gray-700'}>
                          {slot.time}
                        </p>
                      </div>
                    </div>
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      selectedSlot === `${slot.day}, ${slot.time}`
                        ? 'bg-white border-white'
                        : 'border-gray-400'
                    }`}>
                      {selectedSlot === `${slot.day}, ${slot.time}` && (
                        <CheckCircle className="w-6 h-6 text-[#284995]" />
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Book Button */}
            {selectedSlot && (
              <Button
                onClick={handleBookAppointment}
                className="w-full h-14 bg-green-600 hover:bg-green-700 text-white rounded-xl"
              >
                Confirm Appointment
              </Button>
            )}
          </div>
        )}
      </div>

      {/* Success Modal */}
      <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
        <DialogContent className="max-w-sm">
          <DialogTitle className="sr-only">Appointment Confirmation</DialogTitle>
          <DialogDescription className="sr-only">
            Your appointment has been successfully scheduled with Dr. Sarah Johnson
          </DialogDescription>
          <div className="text-center py-8">
            <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-16 h-16 text-green-600" />
            </div>
            <h3 className="text-green-900 mb-3">Appointment Confirmed</h3>
            <p className="text-gray-700 mb-2">Your appointment has been scheduled for:</p>
            <p className="text-[#284995]">{selectedSlot}</p>
            <p className="text-gray-700 mt-4 mb-6">Added to Calendar</p>
            <div className="flex items-center gap-2 justify-center text-gray-600">
              <Calendar className="w-5 h-5" />
              <span>Calendar notification sent</span>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Bottom Navigation */}
      <BottomNav onNavigate={onNavigate} activeScreen="profile" />
    </div>
  );
}