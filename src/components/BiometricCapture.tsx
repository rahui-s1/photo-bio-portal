
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Fingerprint, CheckCircle2, XCircle } from "lucide-react";

interface BiometricCaptureProps {
  onCapture: (biometricData: string) => void;
  hasBiometrics: boolean;
}

const BiometricCapture: React.FC<BiometricCaptureProps> = ({ onCapture, hasBiometrics }) => {
  const [isCapturing, setIsCapturing] = useState(false);
  const [captureProgress, setCaptureProgress] = useState(0);
  
  const simulateBiometricCapture = () => {
    setIsCapturing(true);
    setCaptureProgress(0);
    
    // Simulate a progressive capture
    const interval = setInterval(() => {
      setCaptureProgress((prev) => {
        const next = prev + 20;
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            const mockBiometricData = `biometric_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
            onCapture(mockBiometricData);
            setIsCapturing(false);
          }, 500);
          return 100;
        }
        return next;
      });
    }, 500);
  };
  
  const clearBiometrics = () => {
    onCapture("");
  };

  return (
    <Card className="overflow-hidden">
      <div className="p-6 flex flex-col items-center gap-3">
        {!hasBiometrics && !isCapturing ? (
          <>
            <div className="h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center">
              <Fingerprint className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="font-medium text-lg">Biometric Verification</h3>
            <p className="text-gray-500 text-sm text-center max-w-xs">
              Capture biometric data to enhance security and streamline future identification.
            </p>
            <Button onClick={simulateBiometricCapture} className="mt-2">
              Capture Biometrics
            </Button>
          </>
        ) : isCapturing ? (
          <>
            <div className="relative h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
              <Fingerprint className={`h-8 w-8 text-primary animate-pulse`} />
            </div>
            <h3 className="font-medium text-lg">Scanning Biometrics</h3>
            <div className="w-full max-w-xs bg-gray-100 rounded-full h-2.5 mt-2">
              <div 
                className="bg-primary h-2.5 rounded-full transition-all duration-500" 
                style={{ width: `${captureProgress}%` }} 
              />
            </div>
            <p className="text-gray-500 text-sm text-center mt-1">
              Please hold still while we capture your biometrics...
            </p>
          </>
        ) : (
          <>
            <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle2 className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="font-medium text-lg">Biometrics Captured</h3>
            <p className="text-gray-500 text-sm text-center max-w-xs">
              Your biometric data has been successfully captured and secured.
            </p>
            <Button variant="outline" onClick={clearBiometrics} className="mt-2">
              Clear Biometrics
            </Button>
          </>
        )}
      </div>
    </Card>
  );
};

export default BiometricCapture;
