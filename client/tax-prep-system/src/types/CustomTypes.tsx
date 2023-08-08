
export interface UserInfoType {
    firstName: string;
    lastName: string;
    phone: string;
    streetAddr: string;
    city: string;
    state: string;
    zip: string;
    status: string;
  }
  
export interface UserActionType {
    type: string;
    value: string; // Change this type if any of the values are not strings
  }

export interface AuthState {
    ssn: string | null;
  }