import { Announcements, CertificateOfRegistration, UnitBasicInformation } from "./organization";

export interface Grunndata {
    unitbasic:  UnitBasicInformation;
    certofreg: CertificateOfRegistration;
    announcements: Announcements;
    volOrg: FrivilligOrganisasjon;
}


export type LottstiftOld = Volunteer[]

export interface Volunteer {
  evidenceValueName: string
  source: string
  timestamp: string
  value: any
  valueType: string
}

export interface Lottstift {
  organizationNumber: string
  volunteerEvaluationYear: number
  isVolunteer: boolean
  vatCompensatedYear: number
  isVatCompensated: boolean
}
