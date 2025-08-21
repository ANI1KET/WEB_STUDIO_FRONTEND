export const baseUserUrl = "user-service";

export const generateOtpUrl = `${baseUserUrl}/auth/otp`;
export const createUserUrl = `${baseUserUrl}/auth/signup`;
export const generateUserOtpUrl = `${baseUserUrl}/user/otp`;
export const createOtpUrl = `${baseUserUrl}/auth/number/otp`;
export const updatePasswordUrl = `${baseUserUrl}/auth/password`;
export const updateNumberUrl = `${baseUserUrl}/user/verify/number`;
export const pushInterestedRoomUrl = `${baseUserUrl}/interestedrooms`;
export const updateEmailAndPhoneUrl = `${baseUserUrl}/user/email-and-phone`;
