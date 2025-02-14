import Pages404 from "../pages/404/404";
import SignInContainer from "../pages/auth/signIn/signInContainer";
import ForgotPasswordContainer from "../pages/auth/forgotPassword/forgotPasswordContainer";
import OTPVerificationContainer from "../pages/auth/otpVerification/otpVerificationContainer";
import ResetPasswordContainer from "../pages/auth/resetPassword/resetPasswordContainer";
import SetPasswordContainer from "../pages/auth/setPassword/setPasswordContainer";

import DashboardContainer from "../pages/dashboard/dashboardContainer";
// import ChangePasswordContainer from "../pages/profile/changePassword/changePasswordContainer";
// import EditProfileContainer from "../pages/profile/editProfile/editProfileContainer";
// import NotificationsContainer from "../pages/notifications/notificationsContainer";
// import SupportStaffContainer from "../pages/supportStaffManagement/supportStaffContainer";
// import CauseManagementContainer from "../pages/causeManagement/causeManagementContainer";
// import CategoryManagementContainer from "../pages/categoryManagement/categoryManagementContainer";
// import ProgramContainer from "../pages/program/programContainer";
// import FinanceContainer from "../pages/finance/financeContainer";
// import DonorsContainer from "../pages/donorManagement/donors/donorsContainer";
// import OrganisationsListContainer from "../pages/organisation/organisationsList/organisationsListContainer";
// import OrganisationDetailContainer from "../pages/organisation/organisationDetails/organisationDetailContainer";
// import AddEditprogramContainer from "../pages/program/addEditprogram/addEditprogramContainer";

/**
 * Array of objects representing routes that are protected by authentication.
 * Each object contains a path and the corresponding element to render.
 */
const authProtectedRoutes = [
  { path: "/dashboard", element: <DashboardContainer /> },

];

/**
 * Array of public routes with their corresponding paths and elements.
 * @type {Array<{ path: string, element: JSX.Element }>}
 */
const publicRoutes = [
  { path: "/", element: <SignInContainer /> },
  { path: "/sign", element: <SignInContainer /> },
  { path: "/forgotpassword", element: <ForgotPasswordContainer /> },
  { path: "/otp", element: <OTPVerificationContainer /> },
  { path: "/resetpassword", element: <ResetPasswordContainer /> },
  { path: "/setpassword/:token", element: <SetPasswordContainer /> },
  { path: "/*", element: <Pages404 /> },
];

export { authProtectedRoutes, publicRoutes };
