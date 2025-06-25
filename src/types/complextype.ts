import { Announcements, CertificateOfRegistration, UnitBasicInformation } from "./organization";

export interface Grunndata {
    unitbasic:  UnitBasicInformation;
    certofreg: CertificateOfRegistration;
    announcements: Announcements;
}
