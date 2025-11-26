import { ArrowLeft, Activity, Watch, Heart, Droplet, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { BottomNav } from './BottomNav';
import { Switch } from './ui/switch';
import { Badge } from './ui/badge';
import { useState } from 'react';

interface ConnectedDevicesScreenProps {
  onNavigate: (screen: string) => void;
}

export function ConnectedDevicesScreen({ onNavigate }: ConnectedDevicesScreenProps) {
  const [devices, setDevices] = useState([
    { name: 'Insulin Pump', icon: Droplet, connected: true, syncing: true },
    { name: 'Smart Watch', icon: Watch, connected: true, syncing: false },
    { name: 'Blood Pressure Monitor', icon: Heart, connected: false, syncing: false },
  ]);

  const toggleSync = (index: number) => {
    setDevices(devices.map((device, i) => 
      i === index ? { ...device, syncing: !device.syncing } : device
    ));
  };

  return (
    <div className="flex flex-col h-full bg-[#EDEDED]">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#284995] to-[#1a3570] text-white p-4 shadow-md">
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('profile')}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/20 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h2 className="text-white">Connected Devices</h2>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-4 pb-20 space-y-4">
        {/* Devices List */}
        <Card className="shadow-md bg-white">
          <CardHeader>
            <CardTitle className="text-[#284995]">Your Devices</CardTitle>
            <p className="text-gray-600">Manage device connections and data sync</p>
          </CardHeader>
          <CardContent className="space-y-3">
            {devices.map((device, idx) => {
              const Icon = device.icon;
              return (
                <div
                  key={idx}
                  className={`rounded-xl p-4 border-2 ${
                    device.connected 
                      ? 'bg-blue-50 border-blue-200' 
                      : 'bg-gray-50 border-gray-200'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        device.connected 
                          ? 'bg-[#284995]' 
                          : 'bg-gray-400'
                      }`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="text-gray-900">{device.name}</p>
                        <Badge 
                          variant={device.connected ? "default" : "secondary"}
                          className={device.connected ? "bg-green-600" : ""}
                        >
                          {device.connected ? 'Connected' : 'Not Connected'}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  {device.connected && (
                    <div className="flex items-center justify-between bg-white rounded-lg p-3 border border-blue-200">
                      <span className="text-gray-700">Sync Data</span>
                      <Switch
                        checked={device.syncing}
                        onCheckedChange={() => toggleSync(idx)}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Daily Schedule with Auto-logged Badge */}
        <Card className="shadow-md bg-white">
          <CardHeader>
            <CardTitle className="text-[#284995]">Daily Schedule</CardTitle>
            <p className="text-gray-600">Medications and device-tracked entries</p>
          </CardHeader>
          <CardContent className="space-y-3">
            {/* Auto-logged Insulin */}
            <div className="bg-[#CADAFD] rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <Droplet className="w-5 h-5 text-[#284995]" />
                  <div>
                    <p className="text-gray-900">Insulin Dose</p>
                    <p className="text-gray-700">6:30 AM</p>
                  </div>
                </div>
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <Badge className="bg-[#284995] text-white">
                <Activity className="w-3 h-3 mr-1" />
                Auto-logged by Device
              </Badge>
            </div>

            {/* Manual Entry */}
            <div className="bg-gray-50 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="text-gray-900">Metformin</p>
                  <p className="text-gray-700">8:00 AM</p>
                </div>
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <Badge variant="secondary">
                Manual Entry
              </Badge>
            </div>

            {/* Another Auto-logged */}
            <div className="bg-[#CADAFD] rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <Heart className="w-5 h-5 text-[#284995]" />
                  <div>
                    <p className="text-gray-900">Blood Pressure Check</p>
                    <p className="text-gray-700">9:15 AM</p>
                  </div>
                </div>
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div className="flex items-center justify-between">
                <Badge className="bg-[#284995] text-white">
                  <Activity className="w-3 h-3 mr-1" />
                  Auto-logged by Device
                </Badge>
                <span className="text-gray-700">120/80 mmHg</span>
              </div>
            </div>

            {/* Manual Entry */}
            <div className="bg-gray-50 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="text-gray-900">Atorvastatin</p>
                  <p className="text-gray-700">2:00 PM</p>
                </div>
                <div className="w-6 h-6 rounded-full border-2 border-gray-400"></div>
              </div>
              <Badge variant="secondary">
                Pending
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Sync Info */}
        <Card className="shadow-md bg-blue-50 border-2 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <Activity className="w-5 h-5 text-[#284995] mt-0.5" />
              <div>
                <p className="text-[#284995] mb-1">Automatic Sync Active</p>
                <p className="text-gray-700">Your connected devices will automatically log data to your schedule. Manual entries will be marked separately.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Navigation */}
      <BottomNav onNavigate={onNavigate} activeScreen="profile" />
    </div>
  );
}
