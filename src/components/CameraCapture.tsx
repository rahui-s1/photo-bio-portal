
import React, { useRef, useState, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Camera, X } from "lucide-react";

interface CameraCaptureProps {
  onCapture: (photoData: string) => void;
  currentPhoto?: string;
}

const CameraCapture: React.FC<CameraCaptureProps> = ({ onCapture, currentPhoto }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [hasPhoto, setHasPhoto] = useState(!!currentPhoto);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user", width: 1280, height: 720 },
        audio: false,
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        videoRef.current.onloadedmetadata = () => {
          videoRef.current?.play();
        };
      }
      
      setStream(mediaStream);
      setIsCameraActive(true);
    } catch (error) {
      console.error("Error accessing camera:", error);
    }
  };

  const stopCamera = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
      setIsCameraActive(false);
    }
  }, [stream]);

  const takePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      
      // Set canvas dimensions to match video
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      // Draw the video frame to the canvas
      const context = canvas.getContext("2d");
      if (context) {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        // Convert canvas to data URL
        const photoData = canvas.toDataURL("image/jpeg", 0.8);
        onCapture(photoData);
        setHasPhoto(true);
        stopCamera();
      }
    }
  };

  const clearPhoto = () => {
    onCapture("");
    setHasPhoto(false);
  };

  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [stream]);

  return (
    <Card className="overflow-hidden">
      <div className="relative">
        {!isCameraActive && !hasPhoto && (
          <div className="flex flex-col items-center justify-center p-8 gap-4 border border-dashed border-gray-200 rounded-md bg-gray-50 h-[300px]">
            <Camera className="h-12 w-12 text-gray-400" />
            <p className="text-sm text-gray-500">No photo captured</p>
            <Button onClick={startCamera} className="mt-2">
              Activate Camera
            </Button>
          </div>
        )}
        
        {isCameraActive && (
          <div className="relative w-full h-[300px] bg-black">
            <video 
              ref={videoRef} 
              className="w-full h-full object-cover"
              playsInline
              muted
            />
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
              <Button 
                variant="secondary" 
                size="icon" 
                onClick={stopCamera} 
                className="rounded-full bg-white/80 backdrop-blur-sm hover:bg-white/90"
              >
                <X className="h-5 w-5" />
              </Button>
              <Button 
                onClick={takePhoto} 
                size="icon" 
                className="rounded-full bg-white backdrop-blur-sm"
              >
                <div className="h-12 w-12 rounded-full border-2 border-gray-300 flex items-center justify-center">
                  <div className="h-10 w-10 rounded-full bg-white" />
                </div>
              </Button>
            </div>
          </div>
        )}
        
        {hasPhoto && !isCameraActive && (
          <div className="relative w-full h-[300px]">
            {currentPhoto ? (
              <img 
                src={currentPhoto} 
                alt="Captured" 
                className="w-full h-full object-cover" 
              />
            ) : null}
            <div className="absolute bottom-4 right-4 flex gap-2">
              <Button 
                variant="secondary" 
                size="sm" 
                onClick={clearPhoto} 
                className="rounded-full bg-white/80 backdrop-blur-sm hover:bg-white/90"
              >
                <X className="h-4 w-4 mr-1" /> Remove
              </Button>
              <Button 
                size="sm" 
                onClick={() => {
                  clearPhoto();
                  setTimeout(startCamera, 100);
                }} 
                className="rounded-full"
              >
                <Camera className="h-4 w-4 mr-1" /> Retake
              </Button>
            </div>
          </div>
        )}
        
        <canvas ref={canvasRef} className="hidden" />
      </div>
    </Card>
  );
};

export default CameraCapture;
