export type staffListDataRes = staffListRes[]


export interface staffDataRes {
  message: string
  data: staffResponce[]
}

export interface staffResponce {
  _id: string
  sID: string
  personalDetails: PersonalDetails
  status: string
  invitedOn?: string
  createdAt: string
  updatedAt: string
  __v: number
  invitedBy?: string
  signinData: SigninData
  staffListData: staffDataRes
  image: string
}

export interface PersonalDetails {
  name: string
  email: string
}

export interface SigninData {
  _id: string
  email: string
  role: string
  createdAt: string
  updatedAt: string
  __v: number
  hash?: string
}
export interface staffListRes {
  _id: string,
  sID: string,
  personalDetails: {
    name: string,
    email: string
  },
  status: string,
  invitedOn: string,
  createdAt: string,
  updatedAt: string,
  invitedBy: string,
  signinData: siginData[]
}

export interface siginData {
  _id: string,
  email: string,
  role: string,
  createdAt: string,
  updatedAt: string,
  hash: string
}


export interface addData {
  name: string,
  email: string
  action?: string
  PayloadAction?: any
}

export interface editData {
  name: string,
  email: string,
  action?: string,
  PayloadAction?: any,
  id: string
}

export interface changeStatus {
  id: string | undefined,
  status?: string
}

export interface sendStaff {
  sID: string,
}


export interface addStaffData {
  message: string
  data: addStaffResponce
}

export interface addStaffResponce {
  sID: string
  personalDetails: PersonalDetails
  status: string
  invitedOn: string
  _id: string
  createdAt: string
  updatedAt: string
  __v: number
}

export interface PersonalDetails {
  name: string
  email: string
}

export interface addErrorStaff {
  message?: string
}

export interface updateStaffData {
  message: string
  data: updateStaffResponce
}

export interface updateStaffResponce {
  _id: string
  sID: string
  personalDetails: PersonalDetails
  status: string
  invitedOn: string
  createdAt: string
  updatedAt: string
  __v: number
  invitedBy: string
}

export interface PersonalDetails {
  name: string
  email: string
}

export interface updateErrorStaff {
  message?: string
}


export interface deleteStaffData {
  message: string
  data: deleteStaffResponce
}

export interface deleteStaffResponce {
  _id: string
  sID: string
  personalDetails: PersonalDetails
  status: string
  invitedOn: string
  createdAt: string
  updatedAt: string
  __v: number
  invitedBy: string
}

export interface PersonalDetails {
  name: string
  email: string
}

export interface deleteErrorStaff {
  message?: string
}

export interface enableStaffData {
  message: string
  data: enableStaffResponce
}

export interface enableStaffResponce {
  _id: string
  sID: string
  personalDetails: PersonalDetails
  status: string
  invitedOn: string
  createdAt: string
  updatedAt: string
  __v: number
  invitedBy: string
}

export interface PersonalDetails {
  name: string
  email: string
  profileImage: string
}

export interface enableErrorStaff {
  message?: string
}


export interface resendInviteData {
  message: string
  data: resendInviteRes
}

export interface resendInviteRes {
  _id: string
  sID: string
  personalDetails: PersonalDetails
  status: string
  invitedOn: string
  createdAt: string
  updatedAt: string
  __v: number
  invitedBy: string
}

export interface PersonalDetails {
  name: string
  email: string
}

export interface resendInviteErrorStaff {
  message?: string
}


export type addEditStaffForm = {
  name: {
    name: string;
    validate: {
      required: {
        value: boolean;
      };
      pattern: {
        value: RegExp;
        message: string;
      };
      maxLength: {
        value: number;
        message: string;
      };
    };
  };
  email: {
    name: string;
    validate: {
      required: {
        value: boolean;
      };
      pattern: {
        value: RegExp;
        message: string;
      };
      maxLength: {
        value: number;
        message: string;
      };
    };
  };
};

export interface updateStaffFunctionRes {
  _id: string
  sID: string
  personalDetails: PersonalDetails
  status: string
  invitedOn: string
  createdAt: string
  updatedAt: string
  __v: number
  invitedBy: string
}

export interface supportStaffFormValue {
  name: string;
  email: string;
  // Add other properties as needed
}

export interface SupportStaffParams {
  name: string;
  email: string;
  status?: string;
  id?: string;
  // Add other properties as needed
}


export interface submitResendBtn {
  sID: string;
  // Add other properties as needed
}


export interface deletePersonalDetails {
  name: string;
  // Add other properties as needed
}

export interface deleteModelFunction {
  _id: string;
  personalDetails?: deletePersonalDetails;
  // Add other properties as needed
}

export interface staffTableColumn {
  label: React.ReactNode;
  key: string;
  filter: false | ((values: string, onChange: (item: string) => void) => React.ReactNode);
  sorting: boolean;
}


export interface staffFormData {
  // Define the structure of your form data here
  // For example:
  name: string;
  age: number;
  // Add other fields as needed
}
