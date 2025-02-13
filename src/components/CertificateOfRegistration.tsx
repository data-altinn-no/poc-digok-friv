import React from 'react';
import { Link, Paragraph } from '@digdir/designsystemet-react';
import { CertificateOfRegistration } from '../types/organization';
import { Table } from '@digdir/designsystemet-react';

interface Props {
  data: CertificateOfRegistration;
}

export const CertificateOfRegistrationInformation: React.FC<Props> = ({ data }) => {
    if (!data) {
    return <Paragraph>Ingen firmaattest funnet!</Paragraph>;
  }
  
  return (
    <Table>
    <Table.Body>
      <Table.Row>              
        <Table.Cell><Link href={data} target="_blank" rel="noopener noreferrer">Firmaattest i pdf-format</Link></Table.Cell>
      </Table.Row>      
    </Table.Body>
    </Table>
  );
};
