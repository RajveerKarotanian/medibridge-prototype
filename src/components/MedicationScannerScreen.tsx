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
      {/* -----------------------------------------------------------------------
          CAMERA STATE (FULLSCREEN)
         ----------------------------------------------------------------------- */}
      {scannerState === 'camera' && (
        <div className="fixed inset-0 z-50 bg-black">
          {/* 1. BACKGROUND VIDEO */}
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* 2. DARK OVERLAY WITH CUTOUT (Rebuilt using Flexbox to avoid collapse) */}
          <div className="absolute inset-0 flex flex-col pointer-events-none">
            {/* Top Dark Area */}
            <div className="flex-1 bg-black/50 w-full"></div>
            
            {/* Middle Area (Left Dark | Clear Frame | Right Dark) */}
            <div className="flex w-full h-[300px] sm:h-[400px]">
              <div className="flex-1 bg-black/50"></div>
              
              {/* THE SCANNING FRAME */}
              <div className="relative w-[300px] sm:w-[400px] border-2 border-white rounded-xl bg-transparent shadow-[0_0_0_9999px_rgba(0,0,0,0.5)]">
                 {/* Corner Markers */}
                 <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-teal-400 -mt-[2px] -ml-[2px]"></div>
                 <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-teal-400 -mt-[2px] -mr-[2px]"></div>
                 <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-teal-400 -mb-[2px] -ml-[2px]"></div>
                 <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-teal-400 -mb-[2px] -mr-[2px]"></div>
              </div>

              <div className="flex-1 bg-black/50"></div>
            </div>

            {/* Bottom Dark Area */}
            <div className="flex-1 bg-black/50 w-full flex items-start justify-center pt-8">
               <p className="text-white text-lg font-medium drop-shadow-md">Position medication in frame</p>
            </div>
          </div>

          {/* 3. SHUTTER BUTTON CONTAINER */}
          {/* This sits ON TOP of everything (z-50) and is fixed to the bottom/right */}
          <div className="fixed inset-0 z-[60] pointer-events-none">
             {/* PORTRAIT: We align to the bottom center.
                 LANDSCAPE: We align to the right center.
             */}
             <div className="
                absolute 
                /* Portrait Positioning */
                bottom-12 left-0 right-0 flex justify-center items-center
                /* Landscape Positioning Overrides */
                landscape:bottom-0 landscape:top-0 landscape:left-auto landscape:right-8 landscape:flex-col landscape:justify-center
             ">
                <button
                  onClick={handleCapture}
                  className="
                    pointer-events-auto cursor-pointer
                    w-20 h-20 rounded-full bg-white border-[4px] border-gray-400 
                    shadow-xl hover:scale-105 active:scale-95 transition-transform
                    flex items-center justify-center
                  "
                >
                  <div className="w-16 h-16 rounded-full border-[2px] border-black/20"></div>
                </button>
             </div>

             {/* EXIT BUTTON */}
             <button
                onClick={() => {
                  if (streamRef.current) streamRef.current.getTracks().forEach(t => t.stop());
                  setScannerState('idle');
                }}
                className="absolute top-8 right-6 pointer-events-auto p-3 bg-black/40 rounded-full text-white"
             >
                <X size={24} />
             </button>
          </div>
        </div>
      )}

      {/* -----------------------------------------------------------------------
          REVIEW STATE
         ----------------------------------------------------------------------- */}
      {scannerState === 'review' && capturedImage && (
        <div className="fixed inset-0 z-50 bg-black flex flex-col">
          <div className="flex-1 flex items-center justify-center p-4">
            <img src={capturedImage} alt="Captured" className="max-w-full max-h-full object-contain" />
          </div>
          
          <div className="bg-black/80 p-6 flex gap-4 justify-center pb-12">
            <Button onClick={handleRetake} className="bg-white text-black hover:bg-gray-200">
               <X className="mr-2 h-4 w-4" /> Retake
            </Button>
            <Button onClick={handleUsePhoto} className="bg-teal-600 text-white hover:bg-teal-700">
               <Check className="mr-2 h-4 w-4" /> Use Photo
            </Button>
          </div>
        </div>
      )}

      {/* -----------------------------------------------------------------------
          IDLE STATE (Dashboard)
         ----------------------------------------------------------------------- */}
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
                <button onClick={() => setArMode(!arMode)} className="flex items-center gap-2 px-3 py-1.5 bg-white/20 rounded-lg text-sm">
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
                <Button onClick={handleStartScan} className="w-full h-14 text-lg bg-blue-600 hover:bg-blue-700 rounded-xl shadow-lg">
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
                  <Button onClick={handleStartScan} className="w-full h-14 text-lg bg-teal-600 hover:bg-teal-700 rounded-xl shadow-lg">
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