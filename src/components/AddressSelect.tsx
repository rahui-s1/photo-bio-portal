
import React, { useState } from "react";
import { Check, ChevronDown, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import type { Address } from "@/types/member";

interface AddressSelectProps {
  onSelect: (address: Address) => void;
  currentAddress?: Address;
}

// Mock addresses for demonstration
const mockAddresses: Address[] = [
  {
    street: "1 Infinite Loop",
    city: "Cupertino",
    state: "CA",
    zipCode: "95014",
    country: "USA"
  },
  {
    street: "One Apple Park Way",
    city: "Cupertino",
    state: "CA",
    zipCode: "95014",
    country: "USA"
  },
  {
    street: "1600 Amphitheatre Parkway",
    city: "Mountain View",
    state: "CA",
    zipCode: "94043",
    country: "USA"
  },
  {
    street: "2121 California St",
    city: "San Francisco",
    state: "CA",
    zipCode: "94115",
    country: "USA"
  },
  {
    street: "350 5th Ave",
    city: "New York",
    state: "NY",
    zipCode: "10118",
    country: "USA"
  }
];

const AddressSelect: React.FC<AddressSelectProps> = ({ onSelect, currentAddress }) => {
  const [open, setOpen] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<Address | undefined>(
    currentAddress
  );

  const handleSelect = (address: Address) => {
    setSelectedAddress(address);
    onSelect(address);
    setOpen(false);
  };

  const formatAddress = (address?: Address) => {
    if (!address) return "Select an address";
    return `${address.street}, ${address.city}, ${address.state} ${address.zipCode}`;
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between h-auto py-6 px-4"
        >
          <div className="flex items-start text-left">
            <MapPin className="h-5 w-5 mr-2 text-gray-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className={cn("text-sm font-medium", !selectedAddress && "text-gray-500")}>
                {selectedAddress ? selectedAddress.street : "Select an address"}
              </p>
              {selectedAddress && (
                <p className="text-sm text-gray-500">
                  {selectedAddress.city}, {selectedAddress.state} {selectedAddress.zipCode}
                </p>
              )}
            </div>
          </div>
          <ChevronDown className="h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0" align="start">
        <Command>
          <CommandInput placeholder="Search address..." className="h-9" />
          <CommandEmpty>No address found.</CommandEmpty>
          <CommandGroup className="max-h-[300px] overflow-auto">
            {mockAddresses.map((address, index) => (
              <CommandItem
                key={index}
                value={address.street}
                onSelect={() => handleSelect(address)}
                className="cursor-pointer py-3"
              >
                <div className="flex items-start text-left">
                  <MapPin className="h-5 w-5 mr-2 text-gray-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">{address.street}</p>
                    <p className="text-sm text-gray-500">
                      {address.city}, {address.state} {address.zipCode}
                    </p>
                  </div>
                </div>
                {selectedAddress?.street === address.street && (
                  <Check className="h-4 w-4 text-primary ml-auto" />
                )}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default AddressSelect;
