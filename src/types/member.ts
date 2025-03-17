
export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface Member {
  id?: string;
  name: string;
  address: Address;
  photo?: string; // Base64 encoded image
  biometrics?: string; // Could be fingerprint data or other biometric identifiers
  createdAt?: Date;
}
