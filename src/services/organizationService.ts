import {
  UnitBasicInformation,
  RolesResponse,
  Announcements,
  StotteRegisterUrl,
  TilskuddsRegisterUrl,
  AnnualFinancialReport,
  CertificateOfRegistration,
  CertificatePrintOut,
  OrgNumber,
} from '../types/organization';
import { AnnualAccounts, AnnualAccountsWithLink } from '../types/annualaccounts';
import { Rettsstiftelser } from '../types/rettsstiftelser';
import { Grunndata, Lottstift } from '../types/complextype';

const API_URL = 'https://test-api.data.altinn.no/v1/opendata';
const subscriptionKey = '65b2e5975b7b41a091fd182a9e72445a';

async function fetchData<T>(endpoint: string, orgNumber: string): Promise<T | null> {
  const headers: HeadersInit = {
    Accept: 'application/json',
  };

  if (subscriptionKey) {
    headers['Ocp-apim-subscription-key'] = subscriptionKey;
  }

  try {
    const encodedOrgNumber = encodeURIComponent(orgNumber.trim());
    const response = await fetch(`${API_URL}/${endpoint}/${encodedOrgNumber}`, {
      method: 'GET',
      headers,
    });

    if (!response.ok) {
      const text = await response.text();
      const error = `Failed to fetch ${endpoint}: ${text || `HTTP error! status: ${response.status}`}`;
      throw new Error(error);
    }

    const text = await response.text();

    if (!text) {
      console.warn(`Empty response from ${endpoint}`);
      return null;
    }

    return JSON.parse(text);
  } catch (error) {
    console.error(`Error fetching ${endpoint}:`, error);
    throw error;
  }
}

type DataCallbacks = {
  onBasicInfo?: (data: Grunndata | null) => void;
  onRoles?: (data: RolesResponse | null) => void;
  onStotteordninger?: (data: OrgNumber | null) => void;
  onStotteregister?: (data: StotteRegisterUrl | null) => void;
  onTilskudd?: (data: TilskuddsRegisterUrl | null) => void;
  onAarsrapport?: (data: AnnualFinancialReport | null) => void;
  onFirmaattest?: (data: CertificateOfRegistration | null) => void;
  onRegnskap?: (data: AnnualAccountsWithLink | null) => void;
  onRegisterutskrift?: (data: CertificatePrintOut | null) => void;
  onRettsstiftelser?: (data: Rettsstiftelser | null) => void;
  onLottstift?: (data: Lottstift | null) => void;
  onComplete?: () => void;
  onError?: (error: any) => void;
};

export function getOrganizationData(orgNumber: string) {
  let callbacks: DataCallbacks = {};

  const subscribe = (newCallbacks: DataCallbacks) => {
    callbacks = { ...callbacks, ...newCallbacks };
  };

  const getBasicInfo = async () => {
    try {     
      const data: any = {};
      data.unitbasic = await fetchData<UnitBasicInformation>('UnitBasicInformation', orgNumber);
      data.certofreg = await fetchData<CertificateOfRegistration>('CertificateOfRegistrationOpen', orgNumber);
      data.announcements = await fetchData<Announcements>('Kunngjoringer', orgNumber);
      data.volOrg = await fetchData<FrivilligOrganisasjon>('FrivilligOrganisasjon', orgNumber);
      callbacks.onBasicInfo?.(data);      
      return data;
    } catch (error) {
      callbacks.onError?.(error);
      return null;
    }
  };

  const getRoles = async () => {
    try {
      const data = await fetchData<RolesResponse>('Roller', orgNumber);
      callbacks.onRoles?.(data);
      return data;
    } catch (error) {
      callbacks.onError?.(error);
      return null;
    }
  };

  const getStotteordninger = async () => {
    try {
      const data = orgNumber;
      callbacks.onStotteordninger?.(data);
      return data;
    } catch (error) {
      callbacks.onError?.(error);
      return null;
    }
  };

  const getStotteregister = async () => {
    try {
      const data = await fetchData<StotteRegisterUrl>('StotteregisteretUrl', orgNumber);
      callbacks.onStotteregister?.(data);
      return data;
    } catch (error) {
      callbacks.onError?.(error);
      return null;
    }
  };

  const getTilskudd = async () => {
    try {
      const data = await fetchData<TilskuddsRegisterUrl>('TilskuddsregisteretUrl', orgNumber);
      callbacks.onTilskudd?.(data);
      return data;
    } catch (error) {
      callbacks.onError?.(error);
      return null;
    }
  };

  const getAarsrapport = async () => {
    try {
      const data = await fetchData<AnnualFinancialReport>('AnnualFinancialReportOpen', orgNumber);
      callbacks.onAarsrapport?.(data);
      return data;
    } catch (error) {
      callbacks.onError?.(error);
      return null;
    }
  };

  const getFirmaattest = async () => {
    try {
      const data = await fetchData<CertificateOfRegistration>('UnitBasicInformation', orgNumber);
      callbacks.onFirmaattest?.(data);
      return data;
    } catch (error) {
      callbacks.onError?.(error);
      return null;
    }
  };

  const getRegnskap = async () => {
    try {
      const data: any = {};
      data.Accounts = await fetchData<AnnualAccounts>('RegnskapsregisteretOpen', orgNumber);
      data.Links = await fetchData<CertificateOfRegistration>('AnnualFinancialReportOpen', orgNumber);
      callbacks.onRegnskap?.(data);
      return data;
    } catch (error) {
      callbacks.onError?.(error);
      return null;
    }
  };

  const getRegisterutskrift = async () => {
    try {
      const data = await fetchData<CertificatePrintOut>('Registerutskrift', orgNumber);
      callbacks.onRegisterutskrift?.(data);
      return data;
    } catch (error) {
      callbacks.onError?.(error);
      return null;
    }
  };

  const getRettsstiftelser = async () => {
    try {
      const data = await fetchData<Rettsstiftelser>('RettsstiftelserVirksomhetOpen', '810304642');
      callbacks.onRettsstiftelser?.(data);
      return data;
    } catch (error) {
      callbacks.onError?.(error);
      return null;
    }
  };

    const getLotteristift = async () => {
    try {
      const data = await fetchData<Lottstift>('VolunteerOrganisations', orgNumber);
      callbacks.onLottstift?.(data);
      return data;
    } catch (error) {
      callbacks.onError?.(error);
      return null;
    }
  };

  return {
    subscribe,
    getBasicInfo,
    getRoles,
    getStotteordninger,
    getStotteregister,
    getTilskudd,
    getAarsrapport,
    getFirmaattest,
    getRegnskap,
    getRegisterutskrift,
    getRettsstiftelser,
    getLotteristift
  };
}
