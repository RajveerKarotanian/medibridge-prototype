import { ArrowLeft, User, Languages, Bell, Shield, HelpCircle, Settings, ChevronRight, Users, Activity, Calendar } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { BottomNav } from './BottomNav';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Switch } from './ui/switch';

interface ProfileScreenProps {
  onNavigate: (screen: string) => void;
}

export function ProfileScreen({ onNavigate }: ProfileScreenProps) {
  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header */}
      <div className="bg-teal-600 text-white p-4 shadow-md">
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('landing')}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-teal-700 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h2 className="text-white">Profile</h2>
        </div>
      </div>

      {/* Profile Info */}
      <div className="bg-white p-6 shadow-sm">
        <div className="flex items-center gap-4">
          <Avatar className="w-20 h-20">
            <AvatarFallback className="bg-teal-600 text-white text-2xl">
              JD
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-gray-800">John Doe</h3>
            <p className="text-gray-600">john.doe@email.com</p>
            <button className="text-teal-600 hover:text-teal-700 mt-1">
              Edit Profile
            </button>
          </div>
        </div>
      </div>

      {/* Settings */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-20">
        {/* Caretaker Dashboard */}
        <Card className="shadow-sm">
          <CardContent className="p-0">
            <button 
              onClick={() => onNavigate('caretaker-dashboard')}
              className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
                  <Users className="w-5 h-5 text-indigo-600" />
                </div>
                <div className="text-left">
                  <p className="text-gray-800">Caretaker Dashboard</p>
                  <p className="text-gray-600">Manage patient care</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
          </CardContent>
        </Card>

        {/* Connected Devices */}
        <Card className="shadow-sm">
          <CardContent className="p-0">
            <button 
              onClick={() => onNavigate('connected-devices')}
              className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-cyan-100 flex items-center justify-center">
                  <Activity className="w-5 h-5 text-cyan-600" />
                </div>
                <div className="text-left">
                  <p className="text-gray-800">Connected Devices</p>
                  <p className="text-gray-600">Sync health devices</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
          </CardContent>
        </Card>

        {/* Doctor Appointments */}
        <Card className="shadow-sm">
          <CardContent className="p-0">
            <button 
              onClick={() => onNavigate('doctor-appointment')}
              className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-pink-600" />
                </div>
                <div className="text-left">
                  <p className="text-gray-800">Doctor Appointments</p>
                  <p className="text-gray-600">Schedule & manage visits</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
          </CardContent>
        </Card>

        {/* Language Settings */}
        <Card className="shadow-sm">
          <CardContent className="p-0">
            <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <Languages className="w-5 h-5 text-blue-600" />
                </div>
                <div className="text-left">
                  <p className="text-gray-800">Languages</p>
                  <p className="text-gray-600">English, Spanish</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card className="shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center">
                  <Bell className="w-5 h-5 text-teal-600" />
                </div>
                <div>
                  <p className="text-gray-800">Push Notifications</p>
                  <p className="text-gray-600">Medication reminders</p>
                </div>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        {/* Privacy */}
        <Card className="shadow-sm">
          <CardContent className="p-0">
            <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-purple-600" />
                </div>
                <div className="text-left">
                  <p className="text-gray-800">Privacy & Security</p>
                  <p className="text-gray-600">Manage your data</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
          </CardContent>
        </Card>

        {/* Accessibility */}
        <Card className="shadow-sm">
          <CardContent className="p-0">
            <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <Settings className="w-5 h-5 text-green-600" />
                </div>
                <div className="text-left">
                  <p className="text-gray-800">Accessibility</p>
                  <p className="text-gray-600">Text size, voice settings</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
          </CardContent>
        </Card>

        {/* Help & Support */}
        <Card className="shadow-sm">
          <CardContent className="p-0">
            <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                  <HelpCircle className="w-5 h-5 text-orange-600" />
                </div>
                <div className="text-left">
                  <p className="text-gray-800">Help & Support</p>
                  <p className="text-gray-600">FAQs, contact us</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
          </CardContent>
        </Card>

        {/* App Version */}
        <div className="text-center text-gray-500 py-4">
          <p className="text-sm">MediBridge v1.0.0</p>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNav onNavigate={onNavigate} activeScreen="profile" />
    </div>
  );
}