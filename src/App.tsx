import React, { useState } from 'react';
import '@digdir/designsystemet-theme/brand/brreg/tokens.css';
import '@digdir/designsystemet-css';
import { Heading, Alert, Tabs } from '@digdir/designsystemet-react';

import { UnitBasicInformation, RolesResponse, Announcements, StotteRegisterUrl, TilskuddsRegisterUrl, AnnualFinancialReport, CertificateOfRegistration, CertificatePrintOut } from './types/organization';
import { AnnualAccounts } from './types/annualaccounts';
import { getOrganizationData } from './services/organizationService';
import { BasicInformation } from './components/BasicInformation';
import { RolesInformation } from './components/RolesInformation';
import { AnnouncementsInformation } from './components/AnnouncementsInformation';
import { SearchForm } from './components/SearchForm';
import { GrantRegistry } from './components/GrantRegistry';
import { SubsidiesRegistry } from "./components/SubsidiesRegistry"
import { AnnualFinancialReportInformation } from './components/AnnualFinancialReport';
import { CertificateOfRegistrationInformation } from './components/CertificateOfRegistration';
import { AnnualAccountsInformation } from './components/AnnualAccounts';
import { CertificatePrintOutInformation } from './components/CertificatePrintOut'
import { Rettsstiftelser } from './types/rettsstiftelser';
import { RettsstiftelserInformation } from './components/Rettsstiftelser';

const brregPrimaryColor = '#133349';

function App() {
  const [orgNumber, setOrgNumber] = useState('');
  const [basicInfo, setBasicInfo] = useState<UnitBasicInformation | null>(null);
  const [roles, setRoles] = useState<RolesResponse | null>(null);
  const [announcements, setAnnouncements] = useState<Announcements | null>(null);
  const [stotteregister, setStotteregister] = useState<StotteRegisterUrl | null>(null);
  const [tilskudd, setTilskudd] = useState<TilskuddsRegisterUrl | null>(null);
  const [aarsrapport, setAarsrapport] = useState<AnnualFinancialReport | null>(null);
  const [firmaattest, setFirmaattest] = useState<CertificateOfRegistration | null>(null);
  const [regnskap, setRegnskap] = useState<AnnualAccounts | null>(null);
  const [registerutskrift, setRegisterutskrift] = useState<CertificatePrintOut | null>(null);
  const [rettsstiftelser, setRettsstiftelser] = useState<Rettsstiftelser | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('basic');

  const handleSearch = async () => {
    try {     
      const data = await getOrganizationData(orgNumber, false);

      if (data.basicInfo?.IsInRegistryOfNonProfitOrganizations == undefined || data.basicInfo.IsInRegistryOfNonProfitOrganizations === false)
      {
        //Simple inf
        setError("Ikke frivillig organisasjon!")        
        return;
      }
      setBasicInfo(data.basicInfo);      
      setRoles(data.roles);
      setAnnouncements(data.announcements);
      setStotteregister(data.stotteregisterUrl);
      setTilskudd(data.tilskuddsregisterUrl);
      setAarsrapport(data.aarsrapporter);
      setFirmaattest(data.firmaattest);
      setRegnskap(data.regnskap);
      setRegisterutskrift(data.registerutskrift);
      setRettsstiftelser(data.rettsstiftelser);
      setError(null);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div
      className="container"
      style={{
        margin: '0',
        padding: '0',
        justifyContent: 'center',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <header
        style={{
          backgroundColor: brregPrimaryColor,
          textAlign: 'center',
          padding: '20px 20px 0 20px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          margin: '0 ',
          gap: 2,
        }}
      >
        <img src="/BR_logo-bokmaal_hvit.png" alt="Logo" style={{ height: '30px' }} />
        <Heading size="large" level={1} spacing style={{ color: 'white' }}>
          Virksomhetsinformasjon
        </Heading>

        <SearchForm
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: 2,
          }}
          orgNumber={orgNumber}
          onOrgNumberChange={setOrgNumber}
          onSearch={handleSearch}
        />
      </header>

      {error && (
        <Alert severity="danger" style={{ marginBottom: '1rem' }}>
          {error}
        </Alert>
      )}

      <Tabs
        defaultValue={activeTab}
        onChange={(newTab) => setActiveTab(newTab)}
        style={{ margin: '0 auto', width: '800px' }}
      >
        <Tabs.List>
          <Tabs.Tab value="basic">Grunndata</Tabs.Tab>
          <Tabs.Tab value="roles">Roller</Tabs.Tab>
          <Tabs.Tab value="announcements">Kunngjøringer</Tabs.Tab>
          <Tabs.Tab value="stotteregister">Støtteregister</Tabs.Tab>
          <Tabs.Tab value="tilskudd">Tilskudd.no</Tabs.Tab>
          <Tabs.Tab value="aarsrapporter">Årsrapporter</Tabs.Tab>
          <Tabs.Tab value="firmaattest">Firmaattest</Tabs.Tab>
          <Tabs.Tab value="regnskap">Regnskapstall</Tabs.Tab>
          <Tabs.Tab value="registerutskrift">Registerutskrift</Tabs.Tab>
          <Tabs.Tab value="losore">Heftelser</Tabs.Tab>
        </Tabs.List>
        <Tabs.Content value="basic">{basicInfo && <BasicInformation data={basicInfo} />}</Tabs.Content>
        <Tabs.Content value="roles">{roles && <RolesInformation data={roles} />}</Tabs.Content>
        <Tabs.Content value="announcements">{announcements && <AnnouncementsInformation data={announcements} />}</Tabs.Content>
        <Tabs.Content value="stotteregister">{stotteregister && <GrantRegistry data={stotteregister} />}</Tabs.Content>
        <Tabs.Content value="tilskudd">{tilskudd && <SubsidiesRegistry data={tilskudd} />}</Tabs.Content>
        <Tabs.Content value="aarsrapporter">{aarsrapport && <AnnualFinancialReportInformation data={aarsrapport} />}</Tabs.Content>
        <Tabs.Content value="firmaattest">{firmaattest && <CertificateOfRegistrationInformation data={firmaattest} />}</Tabs.Content>
        <Tabs.Content value="regnskap">{regnskap && <AnnualAccountsInformation data={regnskap} />}</Tabs.Content>
        <Tabs.Content value="registerutskrift">{registerutskrift && <CertificatePrintOutInformation data={registerutskrift} />}</Tabs.Content>
        <Tabs.Content value="losore">{rettsstiftelser && <RettsstiftelserInformation data={rettsstiftelser} />}</Tabs.Content>
      </Tabs>
    </div>
  );
}

export default App;
