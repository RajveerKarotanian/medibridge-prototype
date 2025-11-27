import { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Camera, AlertTriangle, Scan, X, Check } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { BottomNav } from './BottomNav';
import { Badge } from './ui/badge';

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

  // Initialize camera when entering camera state
  useEffect(() => {
    if (scannerState === 'camera') {
      const startCamera = async () => {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: 'environment' }
          });
          streamRef.current = stream;
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        } catch (error) {
          console.error('Error accessing camera:', error);
          setScannerState('idle');
        }
      };
      startCamera();
    }

    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
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
          streamRef.current.getTracks().forEach(track => track.stop());
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

  const handleStartScan = () => {
    setScannerState('camera');
  };

  return (
    <div className="flex flex-col h-full w-full overflow-hidden bg-[#EDEDED] relative">
      {/* Camera State - Full Screen Overlay */}
      {scannerState === 'camera' && (
        <div className="fixed inset-0 h-[100dvh] w-full z-50 bg-black">
          {/* Video Element */}
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="w-full h-full object-cover"
          />
          
          {/* Overlay with transparent cutout */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Focus cutout box */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div 
                className="relative w-3/4 h-2/3 border-2 border-white rounded-lg"
                style={{
                  boxShadow: '0 0 0 100vmax rgba(0, 0, 0, 0.5)'
                }}
              ></div>
            </div>
            
            {/* Instruction text */}
            <div className="absolute top-20 left-0 right-0 text-center z-10">
              <p className="text-white text-lg font-medium drop-shadow-lg">Position medication label in frame</p>
            </div>
          </div>

          {/* --- FIXED SHUTTER BUTTON --- */}
          {/* pointer-events-auto ensures it's clickable even if overlay is above it */}
          <button
            onClick={handleCapture}
            className="
              fixed z-[100] cursor-pointer pointer-events-auto
              w-20 h-20 sm:w-24 sm:h-24 
              rounded-full bg-white border-[4px] border-gray-600 
              shadow-2xl hover:scale-110 active:scale-95 transition-all
              
              /* PORTRAIT: BOTTOM CENTER */
              left-1/2 
              -translate-x-1/2 
              bottom-12 

              /* LANDSCAPE: RIGHT CENTER */
              landscape:bottom-auto 
              landscape:left-auto 
              landscape:translate-x-0 
              landscape:top-1/2 
              landscape:-translate-y-1/2 
              landscape:right-8
            "
            aria-label="Capture photo"
          >
            <div className="w-full h-full rounded-full bg-white flex items-center justify-center shadow-inner ring-2 ring-gray-300">
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full border-[3px] border-gray-600"></div>
            </div>
          </button>

          {/* Exit button */}
          <button
            onClick={() => {
              if (streamRef.current) {
                streamRef.current.getTracks().forEach(track => track.stop());
                streamRef.current = null;
              }
              setScannerState('idle');
            }}
            className="fixed top-8 right-6 z-[100] p-3 rounded-full bg-black/60 hover:bg-black/80 flex items-center justify-center transition-colors backdrop-blur-sm border border-white/20 cursor-pointer pointer-events-auto"
          >
            <X className="w-6 h-6 text-white" />
          </button>
        </div>
      )}

      {/* Review State */}
      {scannerState === 'review' && capturedImage && (
        <div className="fixed inset-0 h-[100dvh] w-full z-50 bg-black flex flex-col">
          <div className="flex-1 relative flex items-center justify-center bg-black overflow-hidden">
            <img
              src={capturedImage}
              alt="Captured medication"
              className="max-w-full max-h-full object-contain"
            />
          </div>

          <button
            onClick={() => {
              setCapturedImage(null);
              setScannerState('idle');
            }}
            className="fixed top-8 right-6 z-50 p-3 rounded-full bg-black/40 hover:bg-black/60 flex items-center justify-center transition-colors backdrop-blur-sm"
          >
            <X className="w-6 h-6 text-white" />
          </button>

          <div className="fixed bottom-12 left-0 right-0 w-full p-6 bg-gradient-to-t from-black/90 via-black/70 to-transparent z-[60]">
            <div className="flex justify-center gap-4 max-w-sm mx-auto">
              <Button
                onClick={handleRetake}
                className="flex-1 h-14 rounded-xl bg-white text-gray-900 border-2 border-gray-300 hover:bg-gray-50"
              >
                <X className="w-5 h-5 mr-2" />
                Retake
              </Button>
              <Button
                onClick={handleUsePhoto}
                className="flex-1 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-xl"
              >
                <Check className="w-5 h-5 mr-2" />
                Use Photo
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Normal Layout */}
      {scannerState === 'idle' && (
        <>
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
              {!scanned && (
                <button
                  onClick={() => setArMode(!arMode)}
                  className="flex items-center gap-2 px-3 py-1.5 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
                >
                  <Scan className="w-4 h-4" />
                  <span className="text-sm">{arMode ? 'Camera' : 'AR'}</span>
                </button>
              )}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            {!scanned && !arMode && (
              <div className="mb-6">
                <div className="relative bg-gray-800 rounded-2xl overflow-hidden aspect-square max-w-sm mx-auto shadow-lg">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative w-3/4 h-3/4">
                      <div className="absolute top-0 left-0 w-12 h-12 border-t-4 border-l-4 border-teal-400"></div>
                      <div className="absolute top-0 right-0 w-12 h-12 border-t-4 border-r-4 border-teal-400"></div>
                      <div className="absolute bottom-0 left-0 w-12 h-12 border-b-4 border-l-4 border-teal-400"></div>
                      <div className="absolute bottom-0 right-0 w-12 h-12 border-b-4 border-r-4 border-teal-400"></div>
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
                    Scan Medication
                  </Button>
                </div>
              </div>
            )}

            {!scanned && arMode && (
              <div className="mb-6">
                <div className="relative bg-gradient-to-br from-blue-900 to-purple-900 rounded-2xl overflow-hidden aspect-square max-w-sm mx-auto shadow-lg">
                  <div className="absolute inset-0 opacity-30">
                    <div className="grid grid-cols-8 grid-rows-8 h-full w-full">
                      {Array.from({ length: 64 }).map((_, i) => (
                        <div key={i} className="border border-teal-400"></div>
                      ))}
                    </div>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative w-2/3 h-2/3 border-2 border-teal-400 rounded-lg animate-pulse">
                      <div className="absolute -top-1 -left-1 w-6 h-6 border-t-4 border-l-4 border-white rounded-tl"></div>
                      <div className="absolute -top-1 -right-1 w-6 h-6 border-t-4 border-r-4 border-white rounded-tr"></div>
                      <div className="absolute -bottom-1 -left-1 w-6 h-6 border-b-4 border-l-4 border-white rounded-bl"></div>
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 border-b-4 border-r-4 border-white rounded-br"></div>
                      <div className="absolute top-0 left-0 w-full h-1 bg-teal-400 animate-scan"></div>
                    </div>
                  </div>
                  <div className="absolute top-4 left-4 right-4">
                    <Badge className="bg-teal-500 text-white">AR Mode Active</Badge>
                  </div>
                  <p className="absolute bottom-6 left-0 right-0 text-center text-white">Move device to detect medication</p>
                </div>
                <div className="mt-6 max-w-sm mx-auto space-y-3">
                  <Button
                    onClick={handleStartScan}
                    className="w-full h-14 bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700 text-white rounded-2xl shadow-md"
                  >
                    <Scan className="w-5 h-5 mr-2" />
                    Scan with AR
                  </Button>
                  <div className="bg-blue-50 rounded-lg p-3 text-sm text-blue-900">
                    <p className="mb-1">💡 AR Tips:</p>
                    <ul className="space-y-1 text-xs text-blue-700">
                      <li>• Point at medication label</li>
                      <li>• Keep device steady</li>
                      <li>• Ensure good lighting</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {scanned && (
              <div className="space-y-4 max-w-sm mx-auto">
                <Card className="shadow-lg border-2 border-teal-200">
                  <CardHeader className="bg-gradient-to-r from-teal-50 to-blue-50">
                    <CardTitle className="flex items-center gap-2 text-teal-800">
                      <div className="w-10 h-10 rounded-full bg-teal-600 flex items-center justify-center">
                        <Check className="w-6 h-6 text-white" />
                      </div>
                      Atorvastatin
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6 space-y-4">
                    <div>
                      <p className="text-teal-700 mb-1">Purpose:</p>
                      <p className="text-gray-700">Lowers cholesterol</p>
                    </div>
                    <div>
                      <p className="text-teal-700 mb-1">Dosage:</p>
                      <p className="text-gray-700">1 tablet daily</p>
                    </div>
                    <div>
                      <p className="text-teal-700 mb-1">Side Effects:</p>
                      <p className="text-gray-700">Possible muscle pain or fatigue</p>
                    </div>
                    <div className="bg-amber-50 border border-amber-300 rounded-lg p-3">
                      <div className="flex items-start gap-2">
                        <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-amber-900 mb-1">Warning:</p>
                          <p className="text-amber-800">Avoid grapefruit juice</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <div className="flex gap-3">
                  <Button onClick={() => setScanned(false)} variant="outline" className="flex-1 h-12 rounded-xl border-2 border-gray-300">Scan Again</Button>
                  <Button onClick={() => onNavigate('scan-result', { name: 'Atorvastatin' })} className="flex-1 h-12 bg-teal-600 hover:bg-teal-700 text-white rounded-xl">View Details</Button>
                </div>
              </div>
            )}
          </div>
          <BottomNav onNavigate={onNavigate} activeScreen="scanner" />
        </>
      )}
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
}