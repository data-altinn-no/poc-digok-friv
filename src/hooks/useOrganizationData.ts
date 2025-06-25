import { useState } from 'react';
import {
  UnitBasicInformation,
  RolesResponse,
  Announcements,
  StotteRegisterUrl,
  TilskuddsRegisterUrl,
  AnnualFinancialReport,
  CertificateOfRegistration,
  CertificatePrintOut,
} from '../types/organization';
import { AnnualAccounts } from '../types/annualaccounts';
import { Rettsstiftelser } from '../types/rettsstiftelser';
import { getOrganizationData } from '../services/organizationService';
import { CertificateOfRegistrationInformation } from '../components/CertificateOfRegistration';
import { Grunndata } from '../types/complextype';

export type DataState<T> = {
  data: T | null;
  loading: boolean;
  error?: string;
};

export function useOrganizationData() {
  const [basicInfo, setBasicInfo] = useState<DataState<Grunndata>>({  data: null,  loading: false });  
  const [roles, setRoles] = useState<DataState<RolesResponse>>({ data: null, loading: false });
  const [announcements, setAnnouncements] = useState<DataState<Announcements>>({ data: null, loading: false });
  const [stotteregister, setStotteregister] = useState<DataState<StotteRegisterUrl>>({ data: null, loading: false });
  const [tilskudd, setTilskudd] = useState<DataState<TilskuddsRegisterUrl>>({ data: null, loading: false });
  const [aarsrapport, setAarsrapport] = useState<DataState<AnnualFinancialReport>>({ data: null, loading: false });
  const [firmaattest, setFirmaattest] = useState<DataState<CertificateOfRegistration>>({ data: null, loading: false });
  const [regnskap, setRegnskap] = useState<DataState<AnnualAccounts>>({ data: null, loading: false });
  const [registerutskrift, setRegisterutskrift] = useState<DataState<CertificatePrintOut>>({
    data: null,
    loading: false,
  });
  const [rettsstiftelser, setRettsstiftelser] = useState<DataState<Rettsstiftelser>>({ data: null, loading: false });
  const [error, setError] = useState<string | null>(null);

  const resetStates = (loading: boolean = false) => {
    const initialState = { data: null, loading, error: undefined };
    setBasicInfo(initialState);
    setRoles(initialState);
    setAnnouncements(initialState);
    setStotteregister(initialState);
    setTilskudd(initialState);
    setAarsrapport(initialState);
    setFirmaattest(initialState);
    setRegnskap(initialState);
    setRegisterutskrift(initialState);
    setRettsstiftelser(initialState);
    setError(null);
  };

  const handleError = (error: unknown) => {
    try {
      const errorMessage = extractErrorMessage(error);
      const jsonError = extractJsonError(errorMessage);
      const finalErrorMessage = jsonError?.description || errorMessage;

      const dataset = errorMessage.match(/Failed to fetch ([^:]+):/)?.[1]?.toLowerCase();

      const datasetHandlers: Record<string, (msg: string) => void> = {
        unitbasicinformation: (msg) => setBasicInfo((prev) => ({ ...prev, loading: false, error: msg })),
        roller: (msg) => setRoles((prev) => ({ ...prev, loading: false, error: msg })),
        kunngjoringer: (msg) => setAnnouncements((prev) => ({ ...prev, loading: false, error: msg })),
        stotteregistereturl: (msg) => setStotteregister((prev) => ({ ...prev, loading: false, error: msg })),
        tilskuddsregistereturl: (msg) => setTilskudd((prev) => ({ ...prev, loading: false, error: msg })),
        annualfinancialreportopen: (msg) => setAarsrapport((prev) => ({ ...prev, loading: false, error: msg })),
        firmaattest: (msg) => setFirmaattest((prev) => ({ ...prev, loading: false, error: msg })),
        regnskap: (msg) => setRegnskap((prev) => ({ ...prev, loading: false, error: msg })),
        registerutskrift: (msg) => setRegisterutskrift((prev) => ({ ...prev, loading: false, error: msg })),
        rettsstiftelser: (msg) => setRettsstiftelser((prev) => ({ ...prev, loading: false, error: msg })),
      };

      if (dataset && datasetHandlers[dataset]) {
        datasetHandlers[dataset](finalErrorMessage);
      } else {
        setError(finalErrorMessage);
      }
    } catch (fallbackError) {
      console.error('Error in handleError:', fallbackError);
      setError('An unexpected error occurred.');
    }
  };

  const extractErrorMessage = (error: unknown): string => {
    if (error instanceof Error) return error.message;
    if (typeof error === 'string') return error;
    return 'Unknown error occurred';
  };

  const extractJsonError = (errorMessage: string): any | null => {
    try {
      const jsonMatch = errorMessage.match(/{.*}/s);
      return jsonMatch ? JSON.parse(jsonMatch[0]) : null;
    } catch {
      return null;
    }
  };

  const fetchData = async (orgNumber: string) => {
    if (!orgNumber.trim()) {
      handleError('Vennligst skriv inn et organisasjonsnummer');
      return;
    }

    resetStates(true);

    try {
      const {
        subscribe,
        getBasicInfo,
        getRoles,
        getAnnouncements,
        getStotteregister,
        getTilskudd,
        getAarsrapport,
        getFirmaattest,
        getRegnskap,
        getRegisterutskrift,
        getRettsstiftelser,
      } = getOrganizationData(orgNumber);

      subscribe({
        onBasicInfo: (data) => {
          if (data?.unitbasic.IsInRegistryOfNonProfitOrganizations === false) {
            handleError('Ikke frivillig organisasjon!');
            return;
          } 
          setBasicInfo({ data, loading: false });
        },
        onRoles: (data) => setRoles({ data, loading: false }),
        onAnnouncements: (data) => setAnnouncements({ data, loading: false }),
        onStotteregister: (data) => setStotteregister({ data, loading: false }),
        onTilskudd: (data) => setTilskudd({ data, loading: false }),
        onAarsrapport: (data) => setAarsrapport({ data, loading: false }),
        onFirmaattest: (data) => setFirmaattest({ data, loading: false }),
        onRegnskap: (data) => setRegnskap({ data, loading: false }),
        onRegisterutskrift: (data) => setRegisterutskrift({ data, loading: false }),
        onRettsstiftelser: (data) => setRettsstiftelser({ data, loading: false }),
        onError: handleError,
      });

      await Promise.all([
        getBasicInfo(),
        getRoles(),
        getAnnouncements(),
        getStotteregister(),
        getTilskudd(),
        getAarsrapport(),
        getFirmaattest(),
        getRegnskap(),
        getRegisterutskrift(),
        getRettsstiftelser(),
      ]);
    } catch (err) {
      handleError('Error fetching data');
    }
  };

  return {
    states: {
      basicInfo,
      roles,
      announcements,
      stotteregister,
      tilskudd,
      aarsrapport,
      firmaattest,
      regnskap,
      registerutskrift,
      rettsstiftelser,
      error,
    },
    fetchData,
  };
}
