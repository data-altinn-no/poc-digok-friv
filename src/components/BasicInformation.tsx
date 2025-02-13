import React from 'react';
import { Table } from '@digdir/designsystemet-react';
import { UnitBasicInformation } from '../types/organization';

interface Props {
  data: UnitBasicInformation;
}

export const BasicInformation: React.FC<Props> = ({ data }) => {
  return (
    <Table>
      <Table.Body>
        <Table.Row>
          <Table.Cell>Organisasjonsnummer</Table.Cell>
          <Table.Cell>{data.OrganizationNumber}</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Navn</Table.Cell>
          <Table.Cell>{data.OrganizationName}</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Organisasjonsform</Table.Cell>
          <Table.Cell>{data.OrganizationForm}</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Besøksadresse</Table.Cell>
          <Table.Cell>
            {data.BusinessAddressStreet}
            <br />
            {data.BusinessAddressZip} {data.BusinessAddressCity}
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Postadresse</Table.Cell>
          <Table.Cell>
            {data.PostalAddressStreet}
            <br />
            {data.PostalAddressZip} {data.PostalAddressCity}
            <br />
            {data.PostalAddressCountryCode}
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>E-post</Table.Cell>
          <Table.Cell>{data.Email }</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Hjemmeside</Table.Cell>
          <Table.Cell>{data.HomePage }</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Næringskoder</Table.Cell>
          <Table.Cell>
            {data.IndustryCode1} - {data.IndustryCode1Description}
            {data.IndustryCode2 && (
              <>
                <br />
                {data.IndustryCode2} - {data.IndustryCode2Description}
              </>
            )}
            {data.IndustryCode3 && (
              <>
                <br />
                {data.IndustryCode3} - {data.IndustryCode3Description}
              </>
            )}
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Sektor</Table.Cell>
          <Table.Cell>{data.SectorCode + " - " + data.SectorCodeDescription }</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Har ansatte</Table.Cell>
          <Table.Cell>{data.NumberOfEmployees == undefined ? "Ikke oppgitt" : data.NumberOfEmployees > 0 ? "Ja" : "Nei" }</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Antall ansatte</Table.Cell>
          <Table.Cell>{data.NumberOfEmployees}</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Stiftelsesdato</Table.Cell>
          <Table.Cell>{ data.Established == undefined ? "Ikke oppgitt" : new Date(data.Established).toLocaleDateString() }</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Status</Table.Cell>
          <Table.Cell>
            {data.IsBeingDissolved && <div>Under avvikling</div>}
            {data.IsUnderBankruptcy && <div>Under konkursbehandling</div>}
            {data.IsBeingForciblyDissolved && <div>Under tvangsavvikling</div>}
            {!data.IsBeingDissolved && !data.IsUnderBankruptcy && !data.IsBeingForciblyDissolved && 
              <div>Aktiv</div>
            }
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Registrert i frivillighetsregisteret</Table.Cell>
          <Table.Cell>
            {data.IsInRegistryOfNonProfitOrganizations == undefined ? "Nei" : "Ja"}          
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Dato registrert i frivillighetsregisteret</Table.Cell>
          <Table.Cell>
            { data.CreatedInNonProfitRegistry === undefined ? "Ikke oppgitt" : new Date(data.CreatedInNonProfitRegistry).toLocaleDateString() }          
          </Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  );
};
