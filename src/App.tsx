import React, { useState } from 'react';
import '@digdir/designsystemet-theme/brand/brreg/tokens.css';
import '@digdir/designsystemet-css';
import { Heading, Alert, Tabs } from '@digdir/designsystemet-react';

import { UnitBasicInformation, RolesResponse, Announcements } from './types/organization';
import { getOrganizationData } from './services/organizationService';
import { BasicInformation } from './components/BasicInformation';
import { RolesInformation } from './components/RolesInformation';
import { AnnouncementsInformation } from './components/AnnouncementsInformation';
import { SearchForm } from './components/SearchForm';

const brregPrimaryColor = '#133349';

function App() {
  const [orgNumber, setOrgNumber] = useState('');
  const [basicInfo, setBasicInfo] = useState<UnitBasicInformation | null>(null);
  const [roles, setRoles] = useState<RolesResponse | null>(null);
  const [announcements, setAnnouncements] = useState<Announcements | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('basic');

  const handleSearch = async () => {
    try {
      const data = await getOrganizationData(orgNumber, false);
      setBasicInfo(data.basicInfo);
      setRoles(data.roles);
      setAnnouncements(data.announcements);
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
        </Tabs.List>
        <Tabs.Content value="basic">{basicInfo && <BasicInformation data={basicInfo} />}</Tabs.Content>
        <Tabs.Content value="roles">{roles && <RolesInformation data={roles} />}</Tabs.Content>
        <Tabs.Content value="announcements">
          {announcements && <AnnouncementsInformation data={announcements} />}
        </Tabs.Content>
      </Tabs>
    </div>
  );
}

export default App;
