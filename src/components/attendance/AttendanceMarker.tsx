import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Camera, CheckCircle, XCircle, Circle, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';

interface AttendanceMarkerProps {
  onAttendanceMarked: () => void;
  isAttendanceMarked: boolean;
}

export type ScanStage = 'initial' | 'scanning' | 'success' | 'error';

const AttendanceMarker: React.FC<AttendanceMarkerProps> = ({
  onAttendanceMarked,
  isAttendanceMarked
}) => {
  const { user } = useAuth();
  const [faceScanOpen, setFaceScanOpen] = useState(false);
  const [scanStage, setScanStage] = useState<ScanStage>('initial');
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const isComponentActive = useRef(true);
  const hasScanStarted = useRef(false); // 🔐 prevent duplicate scan triggers

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user' }
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error('Error accessing camera:', err);
      setScanStage('error');
      toast.error('Camera access error', {
        description: 'Unable to access your camera. Please check permissions.'
      });
    }
  };

  useEffect(() => {
    isComponentActive.current = true;

    if (faceScanOpen && scanStage === 'initial' && !hasScanStarted.current) {
      startScanFlow();
    }

    return () => {
      isComponentActive.current = false;
      stopCamera();
    };
  }, [faceScanOpen]);

  const startScanFlow = async () => {
    hasScanStarted.current = true;
    setScanStage('scanning');
    await startCamera();

    if (!user?.email) {
      toast.error('Authentication error', {
        description: 'User information not available. Please log in again.'
      });
      setScanStage('error');
      return;
    }

    try {
      const response = await fetch('http://localhost:8081/start-recognition', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `email=${encodeURIComponent(user.email)}`
      });

      if (!response.ok) throw new Error('Backend trigger failed');

      // Wait 10 seconds before polling
      await new Promise(resolve => setTimeout(resolve, 1000));

      const checkRes = await fetch(`http://localhost:8081/check?email=${encodeURIComponent(user.email)}`);
      const data = await checkRes.json();

      if (data.marked && isComponentActive.current) {
        setScanStage('success');
        onAttendanceMarked();
        toast.success('Attendance marked!', {
          description: `Marked at ${new Date().toLocaleTimeString()}`
        });
      } else {
        setScanStage('error');
        toast.error('Face not recognized', {
          description: 'Please try again with better lighting or face position.'
        });
      }

    } catch (err) {
      console.error('Recognition error:', err);
      if (isComponentActive.current) {
        setScanStage('error');
        toast.error('Error during scan');
      }
    } finally {
      stopCamera();
      setTimeout(() => {
        if (isComponentActive.current) {
          setFaceScanOpen(false);
          setScanStage('initial');
          hasScanStarted.current = false; // ♻️ reset for next open
        }
      }, 300);
    }
  };

  const handleDialogChange = (open: boolean) => {
    if (!open) {
      stopCamera();
      setScanStage('initial');
      hasScanStarted.current = false;
    }
    setFaceScanOpen(open);
  };

  // Render different content based on scan stage
  const renderScanContent = () => {
    switch (scanStage) {
      case 'initial':
        return (
          <div className="flex flex-col items-center py-8">
            <div className="mb-6 p-4 rounded-full bg-slate-100">
              <Camera className="h-16 w-16 text-slate-500" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Face Scan Required</h3>
            <p className="text-slate-500 text-center mb-6">
              Please ensure good lighting and position your face within the frame.
            </p>
            <Button onClick={startScanFlow}>Start Face Scan</Button>
          </div>
        );
        
      case 'scanning':
        return (
          <div className="flex flex-col items-center py-6">
            <div className="relative w-full max-w-sm aspect-video bg-slate-900 rounded-lg overflow-hidden mb-4">
              <video 
                ref={videoRef} 
                className="w-full h-full object-cover" 
                autoPlay 
                playsInline 
                muted 
              />
              <div className="absolute inset-0 border-4 border-blue-500 rounded-lg animate-pulse" />
            </div>
            <div className="flex items-center gap-2 text-blue-500">
              <Loader2 className="h-5 w-5 animate-spin" />
              <span>Scanning your face...</span>
            </div>
          </div>
        );
        
      case 'success':
        return (
          <div className="flex flex-col items-center py-8">
            <div className="mb-6 p-4 rounded-full bg-green-100">
              <CheckCircle className="h-16 w-16 text-green-500" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Attendance Marked!</h3>
            <p className="text-slate-500 text-center">
              Your attendance has been successfully recorded.
            </p>
          </div>
        );
        
      case 'error':
        return (
          <div className="flex flex-col items-center py-8">
            <div className="mb-6 p-4 rounded-full bg-red-100">
              <XCircle className="h-16 w-16 text-red-500" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Face Scan Failed</h3>
            <p className="text-slate-500 text-center mb-6">
              We couldn't recognize your face. Please ensure good lighting and proper positioning.
            </p>
            <Button onClick={startScanFlow}>Try Again</Button>
          </div>
        );
    }
  };

  return (
    <Dialog open={faceScanOpen} onOpenChange={handleDialogChange}>
      <DialogTrigger asChild>
        <Button 
          variant={isAttendanceMarked ? "outline" : "default"}
          className={cn(
            "flex gap-2 items-center transition-all",
            isAttendanceMarked && "bg-green-50 text-green-600 hover:bg-green-100 hover:text-green-700"
          )}
          disabled={scanStage === 'scanning'}
        >
          {isAttendanceMarked ? (
            <>
              <CheckCircle className="h-4 w-4" />
              <span>Attendance Marked</span>
            </>
          ) : (
            <>
              <Circle className="h-4 w-4" />
              <span>Mark Attendance</span>
            </>
          )}
        </Button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Attendance Verification</DialogTitle>
          <DialogDescription>
            We use face recognition to verify your identity and mark attendance.
          </DialogDescription>
        </DialogHeader>
        
        {renderScanContent()}
        
        <DialogFooter className="flex flex-col-reverse sm:flex-row sm:justify-end gap-2">
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => handleDialogChange(false)}
            disabled={scanStage === 'scanning'}
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AttendanceMarker;