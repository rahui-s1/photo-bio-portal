import React, { useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { Member, Address } from "@/types/member";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import CameraCapture from "./CameraCapture";
import BiometricCapture from "./BiometricCapture";
import AddressSelect from "./AddressSelect";
import { motion } from "framer-motion";
import { ChevronDown, PlusCircle } from "lucide-react";

interface MemberFormProps {
  onSubmit: (member: Member) => void;
  initialData?: Member;
}

const MemberForm: React.FC<MemberFormProps> = ({ onSubmit, initialData }) => {
  const [name, setName] = useState(initialData?.name || "");
  const [address, setAddress] = useState<Address | undefined>(initialData?.address);
  const [photo, setPhoto] = useState<string | undefined>(initialData?.photo);
  const [biometrics, setBiometrics] = useState<string | undefined>(initialData?.biometrics);
  const [currentSection, setCurrentSection] = useState<"basic" | "photo" | "biometrics">("basic");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name) {
      toast({
        title: "Error",
        description: "Name is required",
        variant: "destructive",
      });
      return;
    }
    
    if (!address) {
      toast({
        title: "Error",
        description: "Address is required",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const memberData: Member = {
        id: initialData?.id,
        name,
        address,
        photo,
        biometrics,
        createdAt: initialData?.createdAt || new Date(),
      };
      
      await onSubmit(memberData);
      
      toast({
        title: "Success",
        description: "Member information saved successfully",
      });
      
      if (!initialData) {
        setName("");
        setAddress(undefined);
        setPhoto(undefined);
        setBiometrics(undefined);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Error",
        description: "Failed to save member information",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const progressPercentage = () => {
    let progress = 0;
    if (name) progress += 20;
    if (address) progress += 20;
    if (photo) progress += 30;
    if (biometrics) progress += 30;
    return progress;
  };

  const FormSection = ({ 
    title, 
    isActive, 
    isCompleted, 
    onClick, 
    children 
  }: { 
    title: string; 
    isActive: boolean; 
    isCompleted: boolean; 
    onClick: () => void; 
    children: React.ReactNode; 
  }) => (
    <div className={`border rounded-lg overflow-hidden transition-all duration-300 ${isActive ? "shadow-sm" : ""}`}>
      <div 
        className={`flex items-center justify-between p-4 cursor-pointer ${isActive ? "bg-secondary/50" : "bg-white"}`}
        onClick={onClick}
      >
        <div className="flex items-center gap-3">
          <div className={`h-8 w-8 rounded-full flex items-center justify-center ${
            isCompleted 
              ? "bg-primary/10 text-primary" 
              : isActive 
                ? "bg-secondary text-foreground" 
                : "bg-gray-100 text-gray-400"
          }`}>
            {isCompleted ? "✓" : <PlusCircle className="h-5 w-5" />}
          </div>
          <h3 className="font-medium">{title}</h3>
        </div>
        <ChevronDown className={`h-5 w-5 transition-transform duration-300 ${isActive ? "rotate-180" : ""}`} />
      </div>
      
      <motion.div 
        initial={false}
        animate={{ height: isActive ? "auto" : 0, opacity: isActive ? 1 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="overflow-hidden"
      >
        <div className="p-4 border-t bg-white">
          {children}
        </div>
      </motion.div>
    </div>
  );

  return (
    <div className="max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="relative pt-1 mb-8">
          <div className="h-2 w-full bg-gray-100 rounded-full">
            <div 
              className="h-2 bg-primary rounded-full transition-all duration-500"
              style={{ width: `${progressPercentage()}%` }}
            />
          </div>
          <p className="text-sm text-gray-500 mt-2 text-right">
            Profile completion: {progressPercentage()}%
          </p>
        </div>
        
        <FormSection 
          title="Basic Information" 
          isActive={currentSection === "basic"} 
          isCompleted={!!name && !!address}
          onClick={() => setCurrentSection("basic")}
        >
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                placeholder="Enter full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-12"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <AddressSelect 
                onSelect={setAddress} 
                currentAddress={address} 
              />
            </div>
          </div>
        </FormSection>
        
        <FormSection 
          title="Photo Capture" 
          isActive={currentSection === "photo"} 
          isCompleted={!!photo}
          onClick={() => setCurrentSection("photo")}
        >
          <div className="space-y-4">
            <p className="text-sm text-gray-500">
              Please take a clear photo for identification purposes.
            </p>
            
            <CameraCapture 
              onCapture={(photoData) => setPhoto(photoData)} 
              currentPhoto={photo}
            />
          </div>
        </FormSection>
        
        <FormSection 
          title="Biometric Data" 
          isActive={currentSection === "biometrics"} 
          isCompleted={!!biometrics}
          onClick={() => setCurrentSection("biometrics")}
        >
          <div className="space-y-4">
            <p className="text-sm text-gray-500">
              Capture biometric data for enhanced security.
            </p>
            
            <BiometricCapture 
              onCapture={(data) => setBiometrics(data)}
              hasBiometrics={!!biometrics}
            />
          </div>
        </FormSection>
        
        <div className="pt-6">
          <Button 
            type="submit" 
            className="w-full h-12 text-base"
            disabled={isSubmitting || !name || !address}
          >
            {isSubmitting ? "Saving..." : "Save Member Information"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default MemberForm;
