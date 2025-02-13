import React from 'react';
import { Link, Paragraph } from '@digdir/designsystemet-react';
import { CertificatePrintOut } from '../types/organization';
import { Table } from '@digdir/designsystemet-react';

interface Props {
  data: CertificatePrintOut;
}

export const CertificatePrintOutInformation: React.FC<Props> = ({ data }) => {
    if (!data) {
    return <Paragraph>Ingen utskrift funnet!</Paragraph>;
  }
  
  return (
    <Table>
    <Table.Body>
      <Table.Row>              
        <Table.Cell><Link href={data} target="_blank" rel="noopener noreferrer">Registerutskrift i pdf-format</Link></Table.Cell>
      </Table.Row>      
    </Table.Body>
    </Table>
  );
};
