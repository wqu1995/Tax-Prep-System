
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

  export interface UserDto {
    social: string;
    firstName: string;
    lastName: string;
    email: string;
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

  interface UserInfoAction {
    type: string;
    value?: string | UserDto; // Adjust the type according to your payload needs
  }
export type UserAction =
    | { type: 'setPhone'; value: string }
    | { type: 'setAddr'; value: string }
    | { type: 'setCity'; value: string }
    | { type: 'setState'; value: string }
    | { type: 'setZip'; value: string }
    | { type: 'setStatus'; value: string }
    | { type: 'set'; value: UserDto }
    | { type: 'reset' };

export interface AuthState {
    ssn: string | null;
    firstName: string | null;
    lastName: string | null;
  }