/**
 * Constant object containing various regular expressions, local storage keys, session storage keys,
 * general keys, causes, upload thumbnail valid extensions, and Google Maps API key.
 */
const Constant = {
  REGEX: {
    EMAIL:
      /^$|^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(?:[a-zA-Z]{2}|com|org|net|edu|gov|mil|biz|info|mobi|name|aero|asia|jobs|museum)$/i,
    UPPERCASE: /[A-Z]/g,
    LOWERCASE: /[a-z]/g,
    NUMBER: /[0-9]/,
    NUMERIC: /^\d*\.?\d*$/,
    // NAME: /^[A-Za-z]+$/,
    NAME: /^[ a-zA-Z.'\-\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u024F-\u024F\u1E00-\u1EFF]+$/,
    NUMONLY: /^\d*$/,
    SPECIAL_CHARECTERS: /[!@#$%^&*(),.?":{}|<>]/,
    ALPHANUMERIC: /^[a-zA-Z0-9\s\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u024F]+$/i,
  },
  LOCALSTORAGEKEYS: {
    REFRESHTOKEN: "refreshToken",
    ACCESSTOKEN: "accessToken",
    USER_ROLE: "userRole",
    ADMIN: "Admin",
    RESET_PASS: "resetPass",
  },
  SESSIONSTORAGEKEYS: {
    REMEMBER_ME: "gftl_rememberMe",
    GFTL_EMAIL: "gftl_email",
    GFTL_PASSWORD: "gftl_password",
    EXPIRE_TIME: "expireTime",
    OTP: "otp",
    RESET_TOKEN: "resetToken",
    RESENDOTP: "resendOtp",
    REFETCH_PAGE_DATA: "refetchData",
  },
  GENERALKEYS: {
    INACTIVE: "inactive",
    ADD: "add",
    ACTIVE: "active",
    INVITED: "invited",
  },
  CAUSE: {
    EMPOWERING_PEOPLE: "Empowering People",
    BASIC_NEEDS: "Basic Needs",
    CLIMATE_CHANGE: "Climate Change",
  },
  UPLOAD_THUMBNAIL_VALID: {
    PNG: ".png",
    JPG: ".jpg",
    JPEG: ".jpeg",
    SVG: ".svg",
    WEBP: ".webp",
  },
  GOOGLEMAPAPI: {
    APIKEY: "",
  },
};
export default Constant;
