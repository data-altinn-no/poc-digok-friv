import React from 'react';
import { Table, Paragraph } from '@digdir/designsystemet-react';
import { RolesResponse } from '../types/organization';

interface Props {
  data: RolesResponse;
}

export const RolesInformation: React.FC<Props> = ({ data }) => {
  if (!data?.Roller?.length) {
    return <Paragraph>Ingen roller funnet</Paragraph>;
  }

  return (
    <Table>
      <Table.Head>
        <Table.Row>
          <Table.Cell>Navn</Table.Cell>
          <Table.Cell>Rolle</Table.Cell>
          <Table.Cell>Fødselsdato</Table.Cell>
          <Table.Cell>Organisasjonsnummer</Table.Cell>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        {data.Roller.map((role, index) => (
          <Table.Row key={index}>
            <Table.Cell>{role.Navn || '-'}</Table.Cell>
            <Table.Cell>{role.Beskrivelse || '-'}</Table.Cell>
            <Table.Cell>{role.Fodselsdato ? new Date(role.Fodselsdato).toLocaleDateString('nb-NO') : '-'}</Table.Cell>
            <Table.Cell>{role.Organisasjonsnummer || '-'}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};
