export const baseUserUrl = "user-service";

export const createUserUrl = `${baseUserUrl}/auth/signup`;
export const createOtpUrl = `${baseUserUrl}/auth/number/otp`;
export const setNumberUrl = `${baseUserUrl}/user/verify/number`;
export const reGenerateOtpUrl = `${baseUserUrl}/user/number/otp`;
export const pushInterestedRoomUrl = `${baseUserUrl}/interestedrooms`;
export const updateEmailAndPhoneUrl = `${baseUserUrl}/user/email-and-phone`;
export const updateOrSetPasswordUrl = `${baseUserUrl}/auth/verify/password`;
export const createEmailOrNumberOtpUrl = `${baseUserUrl}/auth/email-number/otp`;
