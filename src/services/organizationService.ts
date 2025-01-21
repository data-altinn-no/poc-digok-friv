import { UnitBasicInformation, RolesResponse, Announcements } from '../types/organization';

const API_URL = process.env.API_URL;
const subscriptionKey = process.env.SUBSCRIPTION_KEY;

async function fetchData<T>(endpoint: string, orgNumber: string): Promise<T | null> {
  const headers: HeadersInit = {
    Accept: 'application/json',
  };

  if (subscriptionKey) {
    headers['Ocp-apim-subscription-key'] = subscriptionKey;
  }

  try {
    const response = await fetch(`${API_URL}/${endpoint}/${orgNumber}`, {
      method: 'GET',
      headers,
    });

    if (!response.ok) {
      const text = await response.text();
      console.warn(`Failed to fetch ${endpoint}: ${text || `HTTP error! status: ${response.status}`}`);
      return null;
    }

    const text = await response.text();

    if (!text) {
      console.warn(`Empty response from ${endpoint}`);
      return null;
    }

    return JSON.parse(text);
  } catch (error) {
    console.error(`Error fetching ${endpoint}:`, error);
    return null;
  }
}

export async function getOrganizationData(orgNumber: string, useMock: boolean = false) {
  if (useMock) {
    return {
      basicInfo: {
        OrganizationNumber: 123456789,
        OrganizationName: 'Example Organization AS',
        OrganizationForm: 'AS',
        IndustryCode1: '6201',
        IndustryCode1Description: 'Computer programming activities',
        IndustryCode2: '6202',
        IndustryCode2Description: 'Computer consultancy activities',
        IndustryCode3: '6311',
        IndustryCode3Description: 'Data processing, hosting and related activities',
        BusinessAddressStreet: 'Main Street 1',
        BusinessAddressZip: '1234',
        BusinessAddressCity: 'Oslo',
        PostalAddressStreet: 'P.O. Box 5678',
        PostalAddressZip: '1234',
        PostalAddressCity: 'Oslo',
        PostalAddressCountryCode: 'NO',
        CreatedInCentralRegisterForLegalEntities: '2001-05-15T12:00:00Z',
        Established: '2001-01-01T12:00:00Z',
        IsInRegisterOfBusinessEnterprises: true,
        IsInValueAddedTaxRegister: true,
        LatestFinacialStatement: 2022,
        NumberOfEmployees: 50,
        IsBeingDissolved: false,
        IsUnderBankruptcy: false,
        IsBeingForciblyDissolved: false,
      },
      roles: {
        Roller: [
          {
            Navn: 'John Doe',
            Beskrivelse: 'CEO',
            Fodselsdato: '1990-01-01',
            Organisasjonsnummer: '123456789',
            Kode: '1',
          },
        ],
      },
      announcements: {
        Url: 'https://example.com/announcements',
      },
    };
  }

  const [basicInfo, roles, announcements] = await Promise.all([
    fetchData<UnitBasicInformation>('UnitBasicInformation', orgNumber),
    fetchData<RolesResponse>('Roller', orgNumber),
    fetchData<Announcements>('Kunngjoringer', orgNumber),
  ]);

  return {
    basicInfo: basicInfo || null,
    roles: roles || null,
    announcements: announcements || null,
  };
}
