import { ArrowLeft, Camera, AlertTriangle, Scan, X, Check } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { BottomNav } from './BottomNav';
import { Badge } from './ui/badge';
import { useState, useRef, useEffect } from 'react';

interface MedicationScannerScreenProps {
  onNavigate: (screen: string, data?: any) => void;
}

type ScannerState = 'idle' | 'camera' | 'review';

export function MedicationScannerScreen({ onNavigate }: MedicationScannerScreenProps) {
  const [scanned, setScanned] = useState(false);
  const [arMode, setArMode] = useState(false);
  const [scannerState, setScannerState] = useState<ScannerState>('idle');
  const [capturedImage, setCapturedImage] = useState<string | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    if (scannerState === 'camera') {
      const startCamera = async () => {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: 'environment' },
          });
          streamRef.current = stream;
          if (videoRef.current) videoRef.current.srcObject = stream;
        } catch (error) {
          console.error('Error accessing camera:', error);
          setScannerState('idle');
        }
      };
      startCamera();
    }

    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
      }
    };
  }, [scannerState]);

  const handleCapture = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0);
        const imageUrl = canvas.toDataURL('image/jpeg');
        setCapturedImage(imageUrl);

        if (streamRef.current) {
          streamRef.current.getTracks().forEach((track) => track.stop());
          streamRef.current = null;
        }

        setScannerState('review');
      }
    }
  };

  const handleRetake = () => {
    setCapturedImage(null);
    setScannerState('camera');
  };

  const handleUsePhoto = () => {
    setScanned(true);
    setScannerState('idle');
    setCapturedImage(null);
  };

  const handleStartScan = () => setScannerState('camera');

  return (
    <div className="flex flex-col h-full bg-[#EDEDED]">
      <div className="flex flex-col h-[100dvh] w-full overflow-hidden bg-[#EDEDED]">

        {/* HEADER */}
        <div className="bg-gradient-to-r from-[#284995] to-[#1a3570] text-white p-4 shadow-md">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => onNavigate('landing')}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/20 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <h2 className="text-white">Medication Scanner</h2>
            </div>

            {!scanned && scannerState === 'idle' && (
              <button
                onClick={() => {
                  setArMode(!arMode);
                  setScannerState('idle');
                }}
                className="flex items-center gap-2 px-3 py-1.5 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
              >
                <Scan className="w-4 h-4" />
                <span className="text-sm">{arMode ? 'Camera' : 'AR'}</span>
              </button>
            )}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4">

          {/* CAMERA VIEW */}
          {scannerState === 'camera' && (
            <div className="fixed inset-0 bg-black z-50 h-[100dvh] w-full overflow-hidden">
              <div className="flex-1 relative">
                <div className="absolute inset-0">
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    className="w-full h-full object-cover"
                  />

                  {/* Frame Overlay */}
                  <div className="absolute inset-0">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div
                        className="relative w-3/4 h-2/3 border-2 border-white rounded-lg"
                        style={{ boxShadow: '0 0 0 100vmax rgba(0,0,0,0.5)' }}
                      />
                    </div>

                    <div className="absolute top-20 left-0 right-0 text-center z-10">
                      <p className="text-white text-lg font-medium drop-shadow-lg">
                        Position medication label in frame
                      </p>
                    </div>
                  </div>

                  {/* Close Button */}
                  <button
                    onClick={() => {
                      if (streamRef.current) {
                        streamRef.current.getTracks().forEach((t) => t.stop());
                        streamRef.current = null;
                      }
                      setScannerState('idle');
                    }}
                    className="absolute top-4 right-4 z-50 w-12 h-12 rounded-full bg-black/40 hover:bg-black/60 flex items-center justify-center backdrop-blur-sm"
                  >
                    <X className="w-6 h-6 text-white" />
                  </button>
                </div>

                {/* SHUTTER BUTTON (CENTERED) */}
                <button
                  onClick={handleCapture}
                  className="fixed left-1/2 -translate-x-1/2 z-50 w-20 h-20 rounded-full bg-white border-4 border-gray-300 hover:scale-105 transition-transform shadow-lg"
                  style={{ bottom: 'calc(10vh - 20px)' }}
                >
                  <div className="w-full h-full rounded-full bg-white" />
                </button>
              </div>
            </div>
          )}

          {/* PHOTO REVIEW */}
          {scannerState === 'review' && capturedImage && (
            <div className="fixed inset-0 bg-black z-50 h-[100dvh] w-full overflow-hidden flex flex-col">
              <div className="flex-1 flex items-center justify-center bg-black overflow-hidden">
                <img src={capturedImage} className="max-w-full max-h-full object-contain" />
              </div>

              <div className="fixed bottom-0 left-0 right-0 bg-black/90 p-6 pb-8 z-50">
                <div className="flex gap-4 max-w-sm mx-auto">
                  <Button
                    onClick={handleRetake}
                    className="flex-1 h-14 rounded-xl bg-white text-gray-900 border-2 border-gray-300 hover:bg-gray-50"
                  >
                    <X className="w-5 h-5 mr-2" /> Retake
                  </Button>
                  <Button
                    onClick={handleUsePhoto}
                    className="flex-1 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-xl"
                  >
                    <Check className="w-5 h-5 mr-2" /> Use Photo
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* IDLE MODE */}
          {scannerState === 'idle' && !scanned && !arMode && (
            <div className="mb-6">
              <div className="relative bg-gray-800 rounded-2xl overflow-hidden aspect-square max-w-sm mx-auto shadow-lg">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-3/4 h-3/4">
                    <div className="absolute top-0 left-0 w-12 h-12 border-t-4 border-l-4 border-teal-400" />
                    <div className="absolute top-0 right-0 w-12 h-12 border-t-4 border-r-4 border-teal-400" />
                    <div className="absolute bottom-0 left-0 w-12 h-12 border-b-4 border-l-4 border-teal-400" />
                    <div className="absolute bottom-0 right-0 w-12 h-12 border-b-4 border-r-4 border-teal-400" />
                  </div>
                  <Camera className="w-16 h-16 text-gray-600 absolute" />
                </div>
                <p className="absolute bottom-6 left-0 right-0 text-center text-white">
                  Position medication label in frame
                </p>
              </div>

              <div className="mt-6 max-w-sm mx-auto">
                <Button
                  onClick={handleStartScan}
                  className="w-full h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl shadow-md"
                >
                  <Camera className="w-5 h-5 mr-2" />
                  Start Scan
                </Button>
              </div>
            </div>
          )}

        </div>
      </div>

      <BottomNav onNavigate={function (screen: string): void {
        throw new Error('Function not implemented.');
      } } activeScreen={''} />
      <canvas ref={canvasRef} className="hidden"></canvas>
    </div>
  );
}
