
import React from "react";
import MemberForm from "@/components/MemberForm";
import { Member } from "@/types/member";
import { toast } from "@/components/ui/use-toast";

const Index = () => {
  const handleSubmit = async (member: Member) => {
    // Here you would typically send the data to your Django backend
    console.log("Submitting member data:", member);
    
    // Simulate an API call
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        console.log("Member data submitted successfully");
        toast({
          title: "Success",
          description: "Member application submitted successfully",
        });
        resolve();
      }, 2000);
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-10 space-y-4">
          <h1 className="text-3xl font-semibold tracking-tight">Member Application</h1>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Complete this application to register a new member. We'll need some basic information, a photo, and biometric data.
          </p>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <MemberForm onSubmit={handleSubmit} />
        </div>
      </div>
    </div>
  );
};

export default Index;
