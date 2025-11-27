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
    <div className="flex flex-col h-full w-full bg-[#EDEDED] relative">
      
      {/* =======================================================================
          CAMERA STATE (FULLSCREEN OVERLAY)
         ======================================================================= */}
      {scannerState === 'camera' && (
        <div className="fixed inset-0 z-[9999] bg-black">
          
          {/* 1. BACKGROUND VIDEO */}
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="absolute inset-0 w-full h-full object-cover z-0"
          />

          {/* 2. FLEX LAYOUT CONTAINER (The Structure) */}
          {/* This ensures items are physically spaced Top -> Middle -> Bottom */}
          <div className="absolute inset-0 z-10 flex flex-col pointer-events-none">
            
            {/* --- TOP SECTION: TEXT & EXIT BUTTON --- */}
            <div className="h-24 flex items-end justify-center relative pb-2 bg-gradient-to-b from-black/50 to-transparent">
               {/* Text */}
               <p className="text-white text-lg font-medium drop-shadow-md px-4 py-1 bg-black/20 rounded-full backdrop-blur-sm border border-white/10">
                  Position medication in frame
               </p>

               {/* Exit Button (Top Left as requested) */}
               <button
                  onClick={() => {
                    if (streamRef.current) streamRef.current.getTracks().forEach(t => t.stop());
                    setScannerState('idle');
                  }}
                  className="absolute top-8 left-6 pointer-events-auto p-3 rounded-full bg-black/40 text-white backdrop-blur-md border border-white/20 active:scale-95 transition-transform"
               >
                  <X size={24} />
               </button>
            </div>

            {/* --- MIDDLE SECTION: THE FRAME --- */}
            {/* flex-1 pushes the top and bottom sections apart, centering this div */}
            <div className="flex-1 flex items-center justify-center p-8">
               <div className="relative w-full max-w-xs aspect-[3/4] sm:w-80 sm:h-96 border-4 border-white/30 rounded-2xl shadow-[0_0_0_9999px_rgba(0,0,0,0.5)]">
                  {/* Corner Brackets (White & Thick) */}
                  <div className="absolute top-0 left-0 w-12 h-12 border-t-[6px] border-l-[6px] border-white -mt-[3px] -ml-[3px] rounded-tl-lg"></div>
                  <div className="absolute top-0 right-0 w-12 h-12 border-t-[6px] border-r-[6px] border-white -mt-[3px] -mr-[3px] rounded-tr-lg"></div>
                  <div className="absolute bottom-0 left-0 w-12 h-12 border-b-[6px] border-l-[6px] border-white -mb-[3px] -ml-[3px] rounded-bl-lg"></div>
                  <div className="absolute bottom-0 right-0 w-12 h-12 border-b-[6px] border-r-[6px] border-white -mb-[3px] -mr-[3px] rounded-br-lg"></div>
               </div>
            </div>

            {/* --- BOTTOM SECTION: SHUTTER BUTTON --- */}
            {/* pointer-events-auto ensures the button area captures clicks */}
            <div className="h-40 flex items-start justify-center pt-4 bg-gradient-to-t from-black/60 to-transparent pointer-events-auto">
               <button
                  onClick={handleCapture}
                  className="
                    w-20 h-20 rounded-full bg-white border-[4px] border-gray-300
                    shadow-2xl hover:scale-105 active:scale-95 transition-all
                    flex items-center justify-center cursor-pointer
                  "
                  aria-label="Take Picture"
               >
                 <div className="w-16 h-16 rounded-full border-[2px] border-black/10"></div>
               </button>
            </div>

          </div>
        </div>
      )}


      {/* =======================================================================
          REVIEW STATE
         ======================================================================= */}
      {scannerState === 'review' && capturedImage && (
        <div className="fixed inset-0 z-[9999] bg-black flex flex-col">
          <div className="flex-1 flex items-center justify-center p-4 bg-black">
            <img src={capturedImage} alt="Captured" className="max-w-full max-h-full object-contain" />
          </div>
          
          <div className="bg-black/80 p-6 pb-12 flex gap-4 justify-center">
            <Button onClick={handleRetake} className="flex-1 h-12 max-w-[160px] bg-white text-black hover:bg-gray-200 rounded-full font-bold">
               <X className="mr-2 h-4 w-4" /> Retake
            </Button>
            <Button onClick={handleUsePhoto} className="flex-1 h-12 max-w-[160px] bg-teal-600 text-white hover:bg-teal-700 rounded-full font-bold">
               <Check className="mr-2 h-4 w-4" /> Use Photo
            </Button>
          </div>
        </div>
      )}


      {/* =======================================================================
          IDLE STATE (Dashboard)
         ======================================================================= */}
      {scannerState === 'idle' && (
        <>
          <div className="bg-gradient-to-r from-[#284995] to-[#1a3570] text-white p-4 shadow-md">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button onClick={() => onNavigate('landing')} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/20">
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <h2 className="text-white font-semibold">Medication Scanner</h2>
              </div>
              {!scanned && (
                <button onClick={() => setArMode(!arMode)} className="flex items-center gap-2 px-3 py-1.5 bg-white/20 rounded-lg text-sm transition-colors hover:bg-white/30">
                  <Scan className="w-4 h-4" /> {arMode ? 'Camera' : 'AR'}
                </button>
              )}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 flex flex-col items-center">
            {!scanned && !arMode && (
              <div className="w-full max-w-sm mt-8 space-y-8">
                <div className="relative aspect-square bg-gray-800 rounded-3xl overflow-hidden shadow-2xl flex items-center justify-center">
                   {/* Fake Viewfinder Graphic */}
                   <div className="w-3/4 h-3/4 border-4 border-gray-600 rounded-2xl relative">
                      <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-teal-400 -mt-1 -ml-1"></div>
                      <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-teal-400 -mt-1 -mr-1"></div>
                      <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-teal-400 -mb-1 -ml-1"></div>
                      <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-teal-400 -mb-1 -mr-1"></div>
                   </div>
                   <Camera className="absolute w-16 h-16 text-gray-500" />
                   <p className="absolute bottom-8 text-white/80 font-medium">Ready to scan</p>
                </div>
                <Button onClick={handleStartScan} className="w-full h-14 text-lg bg-blue-600 hover:bg-blue-700 rounded-xl shadow-lg transition-transform active:scale-95">
                   <Camera className="mr-2 h-6 w-6" /> Start Camera
                </Button>
              </div>
            )}

            {!scanned && arMode && (
               <div className="w-full max-w-sm mt-8 space-y-8 text-center">
                  <div className="relative aspect-square bg-gradient-to-br from-blue-900 to-purple-900 rounded-3xl overflow-hidden shadow-2xl flex items-center justify-center">
                     <div className="absolute inset-0 opacity-20 grid grid-cols-6 grid-rows-6">
                        {[...Array(36)].map((_, i) => <div key={i} className="border border-teal-500/50"></div>)}
                     </div>
                     <Scan className="w-24 h-24 text-teal-400 animate-pulse relative z-10" />
                     <Badge className="absolute top-4 right-4 bg-teal-500">AR Active</Badge>
                  </div>
                  <Button onClick={handleStartScan} className="w-full h-14 text-lg bg-teal-600 hover:bg-teal-700 rounded-xl shadow-lg transition-transform active:scale-95">
                     <Scan className="mr-2 h-6 w-6" /> Scan with AR
                  </Button>
               </div>
            )}

            {scanned && (
              <Card className="w-full max-w-sm shadow-xl border-t-4 border-teal-500 animate-in slide-in-from-bottom-10">
                 <CardHeader className="bg-teal-50">
                    <CardTitle className="flex items-center gap-2 text-teal-900">
                       <div className="p-2 bg-teal-600 rounded-full text-white"><Check size={20} /></div>
                       Atorvastatin
                    </CardTitle>
                 </CardHeader>
                 <CardContent className="space-y-4 pt-6">
                    <div className="space-y-1">
                       <p className="text-sm font-semibold text-gray-500">Purpose</p>
                       <p className="text-lg">Lowers Cholesterol</p>
                    </div>
                    <div className="space-y-1">
                       <p className="text-sm font-semibold text-gray-500">Dosage</p>
                       <p className="text-lg">1 Tablet Daily</p>
                    </div>
                    <div className="bg-amber-50 p-3 rounded-lg border border-amber-200 flex gap-3">
                       <AlertTriangle className="text-amber-600 shrink-0" />
                       <div className="text-sm text-amber-900">
                          <span className="font-bold">Warning:</span> Avoid grapefruit juice.
                       </div>
                    </div>
                    <div className="flex gap-3 pt-2">
                       <Button variant="outline" onClick={() => setScanned(false)} className="flex-1 h-12">Scan Again</Button>
                       <Button 
                         className="flex-1 h-12 bg-teal-600 hover:bg-teal-700"
                         onClick={() => onNavigate('scan-result', { name: 'Atorvastatin' })}
                       >
                         Details
                       </Button>
                    </div>
                 </CardContent>
              </Card>
            )}
          </div>
          <BottomNav onNavigate={onNavigate} activeScreen="scanner" />
        </>
      )}

      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
}