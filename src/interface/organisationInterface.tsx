
// Organisation Details
export interface ownerDetails {
  name?: string;
  email: string;
  countryCode?: string;
  phone?: string;
  address?: string;
  profileImage?: string;
}
export interface representativeDetails {
  name?: string;
  email?: string;
  countryCode?: string;
  phone?: string;
  address?: string;
  profileImage?: string;
}

export interface organisation {
  _id: string;
  sID: string;
  title: string;
  registrationNo: string;
  image: string;
  postCode: string;
  mission?: string;
  revenuePercentage: number;
  ownerDetails: ownerDetails;
  representativeDetails: representativeDetails;
  status: string;
  invitedBy: string;
  invitedOn: string;
  media: any[]; // You can define the type for media if needed
  isRecommanded: boolean; // Note: "Recommanded" might be a typo, should it be "Recommended"?
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

// Get org query params
interface filters {
  status?: string[],
  title?: string,
  invitedOn?: { start: Date }
}
export interface orgQueryParamsPayload {
  page: number; // Add the 'page' property here
  filters?: filters; // Add other properties as needed
};

export interface addOrgParams {
  title: string;
  registrationNo: string;
  image?: string;
  address?: string;
  mission?: string;
  postCode: string;
  revenuePercentage: number;
  name?: string;
  email: string;
  phone?: string;
  countryCode?: string;
  action?: string
  PayloadAction?: any
}

export interface editOrgParams {
  title: string;
  registrationNo: string;
  image?: string;
  address?: string;
  mission?: string;
  postCode: string;
  revenuePercentage: number;
  name?: string;
  email: string;
  phone?: string;
  countryCode?: string;
  action?: string,
  PayloadAction?: any,
  id: string
}

export interface changeStatus {
  id: string | undefined,
  status?: string
}

export interface resendInviteOrg {
  sID: string,
}

export interface errorResponse {
  message?: string
}

export interface listOrgData {
  data: { list: organisation[], totalCount: number }
}
export interface addOrgData {
  message: string
  data: organisation
}

export interface updateOrgData {
  message: string
  data: organisation
}

export interface deleteOrgData {
  message: string
  data: organisation
}

export interface enableOrgData {
  message: string
  data: organisation
}

export interface resendInviteData {
  message: string
  data: organisation
}
