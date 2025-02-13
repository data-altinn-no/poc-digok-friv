import React, { useState } from 'react';
import '@digdir/designsystemet-theme/brand/brreg/tokens.css';
import '@digdir/designsystemet-css';
import { OrganizationViewer } from './components/OrganizationViewer';
import { Heading } from '@digdir/designsystemet-react';
import { SearchForm } from './components/SearchForm';
import { useOrganizationData } from './hooks/useOrganizationData';

function App() {
  const [orgNumber, setOrgNumber] = useState('');
  const { states, fetchData } = useOrganizationData();

  const brregPrimaryColor = '#133349';

  const handleSearch = () => {
    if (!orgNumber.trim()) return;
    fetchData(orgNumber);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
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
          onKeyDown={handleKeyPress}
        />
      </header>
      <OrganizationViewer states={states} />
    </div>
  );
}

export default App;
