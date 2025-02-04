export interface UnitBasicInformation {
  OrganizationNumber: number;
  OrganizationName: string;
  OrganizationForm: string;
  IndustryCode1: string;
  IndustryCode1Description: string;
  IndustryCode2: string;
  IndustryCode2Description: string;
  IndustryCode3: string;
  IndustryCode3Description: string;
  BusinessAddressStreet: string;
  BusinessAddressZip: string;
  BusinessAddressCity: string;
  PostalAddressStreet: string;
  PostalAddressZip: string;
  PostalAddressCity: string;
  PostalAddressCountryCode: string;
  CreatedInCentralRegisterForLegalEntities: string;
  Established: string;
  IsInRegisterOfBusinessEnterprises: boolean;
  IsInValueAddedTaxRegister: boolean;
  LatestFinacialStatement: number;
  NumberOfEmployees: number;
  IsBeingDissolved: boolean;
  IsUnderBankruptcy: boolean;
  IsBeingForciblyDissolved: boolean;
}

export interface Role {
  Navn: string | null;
  Beskrivelse: string | null;
  Fodselsdato: string | null;
  Organisasjonsnummer: string | null;
  Kode: string | null;
}

export interface RolesResponse {
  Roller: Role[];
}

export type Announcements = string;
export type StotteRegisterUrl = string;
export type TilskuddsRegisterUrl = string;
