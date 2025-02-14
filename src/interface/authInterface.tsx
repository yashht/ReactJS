import { store } from "../store";

export type AppDispatch = typeof store.dispatch;

export interface signInParams {
  email: string,
  password: string
}

export interface signInData {
  accesstoken: any
  refreshtoken: any
  role: any
  user: UserData
}

export interface UserData {
  _id: string
  fullName: string
  email: string
  phoneNumber: string
  driverPin: string
  isEmailVerified: boolean
  role: string
  isPhoneVerified: boolean
  deviceTokens: any[]
  hash: string
  salt: string
  status: string
  devicetokens: any[]
  isemailverified: boolean
  isphoneverified: boolean
  accesstoken: any
  refreshtoken: any
}

export interface signInErrorMessage {
  message?: string
}

export interface TokensInterface {
  accesstoken: any
  refreshtoken: any
}

export interface AuthSliceState {
  forgotResponse: any;
  isLogin: boolean;
  isLoading: boolean;
  tokens: TokensInterface;
  otp: string;
  phoneNumber: string;
  isAllowed: boolean;
  exploreApp: boolean;
  coordinate: object;
}

export interface signInResData {
  emailid: string,
  password: string
}

export interface forgotParams {
  email: string;
  otp: string;
}

export interface ForgotData {
  otp: string
  message: string
  data: ForgotUserData
}

export interface ForgotUserData {
  otp: string
  email: string
}

export interface forgotErrorMessage {
  message?: string
}

export interface forgotResData {
  message: string
  data: forgotResponce
}

export interface forgotResponce {
  email: string
  otp: string
  token: string
}

export interface Token {
  resetToken: ResetToken
  role: string
  token: string
}

export interface ResetToken {
  token: string
  expires: string
}


export interface resetParams {
  resetToken: string | null;
  password: string
}


export interface Root {
  message: string
  data: resetData
}

export interface resetData {
  accessToken: string
  refreshToken: string
  user: ResetUserData
}

export interface ResetUserData {
  _id: string
  fullName: string
  email: string
  phoneNumber: string
  driverPin: string
  isEmailVerified: boolean
  role: string
  isPhoneVerified: boolean
  deviceTokens: any[]
  __v: number
  hash: string
  salt: string
  status: string
  devicetokens: any[]
  isemailverified: boolean
  isphoneverified: boolean
}

export interface resetErrorMessage {
  message?: string
}
export interface IhookFrom {
  name: string;
  validate: IValidate
}
export interface IValidate {
  required?: Irequired;
  pattern?: IPattern;
}
export interface Irequired {
  value?: boolean
}
export interface IPattern {
  value?: string | RegExp;
  message?: string
}

export interface IAxiosResponse {
  message: string;
  data?: any;
}
export interface ErrorInterface {
  message: string;
}


export interface ILoginForm {
  email: IhookFrom
  password: IhookFrom
}

export interface IotpInterface {
  otp: IhookFrom
}

export interface IForgotForm {
  email: IhookFrom
}

export interface forgotData {
  email: string
  expireTime: Date
}

export interface setPasswordParams {
  setPassToken: string | undefined,
  password: string
}

export interface setPassErrorMessage {
  message?: string
}


export interface resetForm {
  password: {
    name: string;
    validate: {
      required: {
        value: boolean;
      };
      validate: {
        hasUppercase: (value: string) => boolean | "";
        hasLowerCase: (value: string) => boolean | "";
        hasNumbers: (value: string) => boolean | "";
        hasSpecialChar: (value: string) => boolean | "";
        length: (value: string) => boolean | "";
      };
      maxLength: {
        value: number;
        message: string;
      };
    };
  };
  confirmpassword: {
    name: string;
    validate: {
      required: {
        value: boolean;
      };
      maxLength: {
        value: number;
        message: string;
      };
    };
  };
}


export interface setPasswordData {
  message: string
  data: setPasswordResponce
}

export interface setPasswordResponce {
  _id: string
  email: string
  role: string
  createdAt: string
  updatedAt: string
  __v: number
}

