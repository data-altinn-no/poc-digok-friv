import React from 'react';
import { Table, Link } from '@digdir/designsystemet-react';
import { Announcements, CertificateOfRegistration, UnitBasicInformation } from '../types/organization';
import { Grunndata } from '../types/complextype';


interface Props {
  data: Grunndata;
}

export const BasicInformation: React.FC<Props> = ({ data }) => {
  return (
    <Table>
      <Table.Body>
        <Table.Row>
          <Table.Cell>Organisasjonsnummer</Table.Cell>
          <Table.Cell>{data.unitbasic.OrganizationNumber}</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Navn</Table.Cell>
          <Table.Cell>{data.unitbasic.OrganizationName}</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Organisasjonsform</Table.Cell>
          <Table.Cell>{data.unitbasic.OrganizationForm}</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Besøksadresse</Table.Cell>
          <Table.Cell>
            {data.unitbasic.BusinessAddressStreet}
            <br />
            {data.unitbasic.BusinessAddressZip} {data.unitbasic.BusinessAddressCity}
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Postadresse</Table.Cell>
          <Table.Cell>
            {data.unitbasic.PostalAddressStreet}
            <br />
            {data.unitbasic.PostalAddressZip} {data.unitbasic.PostalAddressCity}
            <br />
            {data.unitbasic.PostalAddressCountryCode}
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>E-post</Table.Cell>
          <Table.Cell>{data.unitbasic.Email }</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Hjemmeside</Table.Cell>
          <Table.Cell>{data.unitbasic.HomePage }</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Næringskoder</Table.Cell>
          <Table.Cell>
            {data.unitbasic.IndustryCode1} - {data.unitbasic.IndustryCode1Description}
            {data.unitbasic.IndustryCode2 && (
              <>
                <br />
                {data.unitbasic.IndustryCode2} - {data.unitbasic.IndustryCode2Description}
              </>
            )}
            {data.unitbasic.IndustryCode3 && (
              <>
                <br />
                {data.unitbasic.IndustryCode3} - {data.unitbasic.IndustryCode3Description}
              </>
            )}
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Sektor</Table.Cell>
          <Table.Cell>{data.unitbasic.SectorCode + " - " + data.unitbasic.SectorCodeDescription }</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Har ansatte</Table.Cell>
          <Table.Cell>{data.unitbasic.NumberOfEmployees == undefined ? "Ikke oppgitt" : data.unitbasic.NumberOfEmployees > 0 ? "Ja" : "Nei" }</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Antall ansatte</Table.Cell>
          <Table.Cell>{data.unitbasic.NumberOfEmployees}</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Stiftelsesdato</Table.Cell>
          <Table.Cell>{ data.unitbasic.Established == undefined ? "Ikke oppgitt" : new Date(data.unitbasic.Established).toLocaleDateString() }</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Status</Table.Cell>
          <Table.Cell>
            {data.unitbasic.IsBeingDissolved && <div>Under avvikling</div>}
            {data.unitbasic.IsUnderBankruptcy && <div>Under konkursbehandling</div>}
            {data.unitbasic.IsBeingForciblyDissolved && <div>Under tvangsavvikling</div>}
            {!data.unitbasic.IsBeingDissolved && !data.unitbasic.IsUnderBankruptcy && !data.unitbasic.IsBeingForciblyDissolved && 
              <div>Aktiv</div>
            }
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Registrert i frivillighetsregisteret</Table.Cell>
          <Table.Cell>
            {data.unitbasic.IsInRegistryOfNonProfitOrganizations == undefined ? "Nei" : "Ja"}          
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Dato registrert i frivillighetsregisteret</Table.Cell>
          <Table.Cell>
            { data.unitbasic.CreatedInNonProfitRegistry === undefined ? "Ikke oppgitt" : new Date(data.unitbasic.CreatedInNonProfitRegistry).toLocaleDateString() }          
          </Table.Cell>
        </Table.Row>
        <Table.Row><Table.Cell>Kontonummer</Table.Cell><Table.Cell>{ data.volOrg.kontonummer == undefined ? ""  : data.volOrg.kontonummer }</Table.Cell></Table.Row>
        <Table.Row><Table.Cell>Grasrotandel</Table.Cell><Table.Cell>{ data.volOrg.grasrotandel?.deltarI == undefined || data.volOrg.grasrotandel.deltarI == false ? "Nei" : "Ja" }</Table.Cell></Table.Row>
        <Table.Row><Table.Cell>Kategori</Table.Cell><Table.Cell>{ data.volOrg.icnpoKategorier?.map(k => k.kategori).join(', ') }</Table.Cell></Table.Row>
        <Table.Row><Table.Cell>Påtatt regnskapsrapportering</Table.Cell><Table.Cell>{ data.volOrg.regnskapsrapportering?.harPaatattSegRapporteringsplikt == undefined || data.volOrg.regnskapsrapportering?.harPaatattSegRapporteringsplikt == false ? "Nei" : "Ja" }</Table.Cell></Table.Row>
        <Table.Row><Table.Cell>Påtatt å melde vedtekter</Table.Cell><Table.Cell>{ data.volOrg.vedtekter?.frivilligRegistrerteVedtekter == undefined || data.volOrg.vedtekter?.frivilligRegistrerteVedtekter == false ? "Nei" : "Ja" } </Table.Cell></Table.Row>
        <Table.Row><Table.Cell>Siste oppdatering av vedtekter</Table.Cell><Table.Cell>{ data.volOrg.vedtekter?.sistOppdaterteVedtekter == undefined ? "Ingen" : data.volOrg.vedtekter?.sistOppdaterteVedtekter  }</Table.Cell></Table.Row>
        <Table.Row><Table.Cell></Table.Cell></Table.Row>
        <Table.Row><Table.Cell><Link href={data.certofreg} target="_blank" rel="noopener noreferrer">Firmaattest i pdf-format</Link></Table.Cell><Table.Cell></Table.Cell></Table.Row>
        <Table.Row><Table.Cell><Link href={data.announcements} target="_blank" rel="noopener noreferrer" >Se kunngjøringer på brreg.no</Link></Table.Cell><Table.Cell></Table.Cell></Table.Row>
        <Table.Row><Table.Cell><Link href={"https://www.vg.no"} target="_blank" rel="noopener noreferrer">Vedtekter</Link></Table.Cell><Table.Cell></Table.Cell></Table.Row>
        <Table.Row><Table.Cell><Link href={"https://www.vg.no"} target="_blank" rel="noopener noreferrer">Registerutskrift i pdf-format</Link></Table.Cell><Table.Cell></Table.Cell></Table.Row>
      </Table.Body>
    </Table>
  );
};
