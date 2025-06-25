import React, { useState } from 'react';
import { Alert, Tabs, Spinner, Link } from '@digdir/designsystemet-react';
import { useOrganizationData } from '../hooks/useOrganizationData';
import { BasicInformation } from './BasicInformation';
import { RolesInformation } from './RolesInformation';
import { GrantArrangementsInformation } from './GrantArrangements';
import { GrantRegistry } from './GrantRegistry';
import { SubsidiesRegistry } from './SubsidiesRegistry';
import { AnnualFinancialReportInformation } from './AnnualFinancialReport';
import { CertificateOfRegistrationInformation } from './CertificateOfRegistration';
import { AnnualAccountsInformation } from './AnnualAccounts';
import { CertificatePrintOutInformation } from './CertificatePrintOut';
import { RettsstiftelserInformation } from './Rettsstiftelser';

interface OrganizationViewerProps {
  states: ReturnType<typeof useOrganizationData>['states'];
}

export function OrganizationViewer({ states }: OrganizationViewerProps) {
  const [activeTab, setActiveTab] = useState('basic');

  const {
    basicInfo,
    roles,
    stotteordninger,
    stotteregister,
    tilskudd,
    aarsrapport,
    firmaattest,
    regnskap,
    registerutskrift,
    rettsstiftelser,
    error,
  } = states;

  return (
    <div className="container" style={{ margin: 'auto', padding: '2rem' }}>
      {error && (
        <Alert severity="danger" style={{ margin: '1rem 0' }}>
          {error}
        </Alert>
      )}

      <Tabs defaultValue={activeTab} onChange={(newTab) => setActiveTab(newTab)} style={{ margin: 'auto' }}>
        <Tabs.List>
          <Tabs.Tab value="basic">Grunndata</Tabs.Tab>
          <Tabs.Tab value="roles">Roller</Tabs.Tab>
          <Tabs.Tab value="stotteordninger">Støtteordninger</Tabs.Tab>
          <Tabs.Tab value="regnskap">Årsregnskap</Tabs.Tab>
          <Tabs.Tab value="losore">Heftelser</Tabs.Tab>
          <Tabs.Tab value="frivreg">Frivillighetsregisteret</Tabs.Tab>
          <Tabs.Tab value="systemintegrasjon">Systemintegrasjon</Tabs.Tab>
          
          {/*
          Old tabs that may be removed
                    <Tabs.Tab value="stotteregister">Støtteregister</Tabs.Tab>
          <Tabs.Tab value="tilskudd">Tilskudd</Tabs.Tab>
          <Tabs.Tab value="aarsrapporter">Årsrapporter</Tabs.Tab>
          <Tabs.Tab value="firmaattest">Firmaattest</Tabs.Tab>
          <Tabs.Tab value="registerutskrift">Registerutskrift</Tabs.Tab>           
          */}


        </Tabs.List>

        <Tabs.Content value="basic">
          {basicInfo.loading ? (
            <div style={{ display: 'flex', justifyContent: 'center', margin: '1rem' }}>
              <Spinner size="xlarge" variant="interaction" title="Laster grunndata..." />
            </div>
          ) : basicInfo.error ? (
            <Alert severity="danger" style={{ margin: '1rem 0' }}>{basicInfo.error}</Alert>
          ) : (
            basicInfo.data && <BasicInformation data={basicInfo.data} />
          )}
        </Tabs.Content>

        <Tabs.Content value="roles">
          {roles.loading ? (
            <div style={{ display: 'flex', justifyContent: 'center', margin: '1rem' }}>
              <Spinner size="xlarge" variant="interaction" title="Laster roller..." />
            </div>
          ) : roles.error ? (
            <Alert severity="danger" style={{ margin: '1rem 0' }}>{roles.error}</Alert>
          ) : (
            roles.data && <RolesInformation data={roles.data} />
          )}
        </Tabs.Content>

        <Tabs.Content value="stotteordninger">
        {stotteordninger.loading ? (
            <div style={{ display: 'flex', justifyContent: 'center', margin: '1rem' }}>
              <Spinner size="xlarge" variant="interaction" title="Laster støtteordninger..." />
            </div>
          ) : stotteregister.error ? (
            <Alert severity="danger" style={{ margin: '1rem 0' }}>{stotteordninger.error}</Alert>
          ) : (
            stotteordninger.data && <GrantArrangementsInformation data={stotteordninger.data} />
          )}
        </Tabs.Content>

        <Tabs.Content value="stotteregister">
          {stotteregister.loading ? (
            <div style={{ display: 'flex', justifyContent: 'center', margin: '1rem' }}>
              <Spinner size="xlarge" variant="interaction" title="Laster støtteregister..." />
            </div>
          ) : stotteregister.error ? (
            <Alert severity="danger" style={{ margin: '1rem 0' }}>{stotteregister.error}</Alert>
          ) : (
            stotteregister.data && <GrantRegistry data={stotteregister.data} />
          )}
        </Tabs.Content>

        <Tabs.Content value="tilskudd">
          {tilskudd.loading ? (
            <div style={{ display: 'flex', justifyContent: 'center', margin: '1rem' }}>
              <Spinner size="xlarge" variant="interaction" title="Laster tilskudd..." />
            </div>
          ) : tilskudd.error ? (
            <Alert severity="danger" style={{ margin: '1rem 0' }}>{tilskudd.error}</Alert>
          ) : (
            tilskudd.data && <SubsidiesRegistry data={tilskudd.data} />
          )}
        </Tabs.Content>

        <Tabs.Content value="aarsrapporter">
          {aarsrapport.loading ? (
            <div style={{ display: 'flex', justifyContent: 'center', margin: '1rem' }}>
              <Spinner size="xlarge" variant="interaction" title="Laster årsrapporter..." />
            </div>
          ) : aarsrapport.error ? (
            <Alert severity="danger" style={{ margin: '1rem 0' }}>{aarsrapport.error}</Alert>
          ) : (
            aarsrapport.data && <AnnualFinancialReportInformation data={aarsrapport.data} />
          )}
        </Tabs.Content>

        <Tabs.Content value="firmaattest">
          {firmaattest.loading ? (
            <div style={{ display: 'flex', justifyContent: 'center', margin: '1rem' }}>
              <Spinner size="xlarge" variant="interaction" title="Laster firmaattest..." />
            </div>
          ) : firmaattest.error ? (
            <Alert severity="danger" style={{ margin: '1rem 0' }}>{firmaattest.error}</Alert>
          ) : (
            firmaattest.data && <CertificateOfRegistrationInformation data={firmaattest.data} />
          )}
        </Tabs.Content>

        <Tabs.Content value="regnskap">
          {regnskap.loading ? (
            <div style={{ display: 'flex', justifyContent: 'center', margin: '1rem' }}>
              <Spinner size="xlarge" variant="interaction" title="Laster regnskapstall..." />
            </div>
          ) : regnskap.error ? (
            <Alert severity="danger" style={{ margin: '1rem 0' }}>{regnskap.error}</Alert>
          ) : (
            regnskap.data && <AnnualAccountsInformation data={regnskap.data} />
          )}
        </Tabs.Content>

        <Tabs.Content value="registerutskrift">
          {registerutskrift.loading ? (
            <div style={{ display: 'flex', justifyContent: 'center', margin: '1rem' }}>
              <Spinner size="xlarge" variant="interaction" title="Laster registerutskrift..." />
            </div>
          ) : registerutskrift.error ? (
            <Alert severity="danger" style={{ margin: '1rem 0' }}>{registerutskrift.error}</Alert>
          ) : (
            registerutskrift.data && <CertificatePrintOutInformation data={registerutskrift.data} />
          )}
        </Tabs.Content>

        <Tabs.Content value="losore">
          {rettsstiftelser.loading ? (
            <div style={{ display: 'flex', justifyContent: 'center', margin: '1rem' }}>
              <Spinner size="xlarge" variant="interaction" title="Laster heftelser..." />
            </div>
          ) : rettsstiftelser.error ? (
            <Alert severity="danger" style={{ margin: '1rem 0' }}>{rettsstiftelser.error}</Alert>
          ) : (
            rettsstiftelser.data && <RettsstiftelserInformation data={rettsstiftelser.data} />
          )}
        </Tabs.Content>

        <Tabs.Content value="systemintegrasjon">
          {
            <p>
            Informasjon om hvordan du kommer i gang med å integrere ditt system med <Link href="https://data.altinn.no">data.altinn.no</Link><br></br>          

            For å ta bruk data.altinn.no må du:
            <ul>
              <li>Identifisere hvilke datasett du ønsker å bruke, og dermed hvilken tjeneste som er aktuell for deg.</li>
              <li>Registrere deg på utviklerportalen (du kan også velge preproduksjonsmiljøet hvor du kan bruke syntetiske data) og få tildelt en API-nøkkel (subscription key)</li>
              <li>Ta i bruk Maskinporten slik at du kan autentisere deg for tjenesten. For tilgang i produksjon til eventuelle scopes som kreves for tjenesten du ønsker å benytte må du kontakte oss.</li>
              <li>Se listen over datasett og ta utgangspunkt i eksemplene for å lage din integrasjon. Hvis du benytter .NET5 eller nyere anbefaler vi bruk av DAN SDK</li>
            </ul>
            </p>
          }
        </Tabs.Content>

        <Tabs.Content value="frivreg">
          {
            <p>
            <Link href="https://data.brreg.no/frivillighetsregisteret/api/frivillige-organisasjoner/totalbestand/csv" target="_blank" rel="noopener noreferrer">Totalbestand fra Frivillighetsregisteret</Link><br></br>
            <Link href="https://data.brreg.no/enhetsregisteret/api/dokumentasjon/no/index.html#tag/Frivillighetsregisteret" target="_blank" rel="noopener noreferrer">Forklaring på feltene i filen og dokumentasjonen</Link>
            </p>
          }
        </Tabs.Content>
      </Tabs>
    </div>
  );
}
