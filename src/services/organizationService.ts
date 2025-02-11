import { UnitBasicInformation, RolesResponse, Announcements, StotteRegisterUrl, TilskuddsRegisterUrl } from '../types/organization';

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
  
  const [basicInfo, roles, announcements, stotteregisterurl, tilskuddsregisterurl] = await Promise.all([
    fetchData<UnitBasicInformation>('UnitBasicInformation', orgNumber),
    fetchData<RolesResponse>('Roller', orgNumber),
    fetchData<Announcements>('Kunngjoringer', orgNumber),
    fetchData<StotteRegisterUrl>('StotteregisteretUrl', orgNumber),
    fetchData<TilskuddsRegisterUrl>('TilskuddsregisteretUrl', orgNumber)
  ]);

  return {
    basicInfo: basicInfo || null,
    roles: roles || null,
    announcements: announcements || null,
    stotteregisterUrl : stotteregisterurl || null,
    tilskuddsregisterUrl : tilskuddsregisterurl || null
  };
}
