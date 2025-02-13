import React from 'react';
import { Link, Paragraph } from '@digdir/designsystemet-react';
import { AnnualFinancialReport } from '../types/organization';
import { Table } from '@digdir/designsystemet-react';

interface Props {
  data: AnnualFinancialReport;
}

export const AnnualFinancialReportInformation: React.FC<Props> = ({ data }) => {
    if (!data) {
    return <Paragraph>Ingen årsrapporter funnet</Paragraph>;
  }
  
  return (
    <Table>
    <Table.Body>
      <Table.Row>       
        <Table.Cell>{data.Year1}</Table.Cell>
        <Table.Cell><Link href={data.Year1PdfUrl} target="_blank" rel="noopener noreferrer">Årsrapport i pdf-format</Link></Table.Cell>
      </Table.Row>
      <Table.Row>       
        <Table.Cell>{data.Year2}</Table.Cell>
        <Table.Cell><Link href={data.Year2PdfUrl} target="_blank" rel="noopener noreferrer">Årsrapport i pdf-format</Link></Table.Cell>
      </Table.Row>
      <Table.Row>       
        <Table.Cell>{data.Year3}</Table.Cell>
        <Table.Cell><Link href={data.Year3PdfUrl} target="_blank" rel="noopener noreferrer">Årsrapport i pdf-format</Link></Table.Cell>
      </Table.Row>
    </Table.Body>
    </Table>
  );
};
