import { PhoneNumberFormat, PhoneNumberUtil } from "google-libphonenumber";

const phoneUtil = PhoneNumberUtil.getInstance();

export const parsePhoneNumber = (phoneNumber: string) => {
  try {
    const parsedPhoneNumber = phoneUtil.parse(phoneNumber);

    const regionCode = phoneUtil.getRegionCodeForNumber(parsedPhoneNumber);

    if (!regionCode) {
      throw new Error();
    }

    const phoneNumberFormat =
      "DE".toLowerCase() === regionCode.toLowerCase()
        ? PhoneNumberFormat.NATIONAL
        : PhoneNumberFormat.INTERNATIONAL;

    return phoneUtil.format(parsedPhoneNumber, phoneNumberFormat);
  } catch (error) {
    // tslint:disable-next-line:no-console
    console.warn("Could not format phone number", error);
    return phoneNumber;
  }
};
