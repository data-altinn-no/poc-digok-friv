import React from 'react';
import { Table, Paragraph } from '@digdir/designsystemet-react';
import { Lottstift } from '../types/complextype';

interface Props {
  data: Lottstift;
}

export const LottstiftInformation: React.FC<Props> = ({ data }) => {
  if (!data) {
    return <Paragraph>Ingen data funnet</Paragraph>;
  }

  return (
    <Table>     
      <Table.Body> 
        <Table.Row>
          <Table.Cell>Frivillighet vurdert:</Table.Cell>
          <Table.Cell>{ data.volunteerEvaluationYear }</Table.Cell>    
        </Table.Row>   
        <Table.Row>
          <Table.Cell>Er frivillig:</Table.Cell>
          <Table.Cell> { data.isVolunteer == false ? "Nei" : "Ja" }</Table.Cell>    
        </Table.Row>
        <Table.Row>
          <Table.Cell>MVA-vurdert:</Table.Cell>
          <Table.Cell>{ data.vatCompensatedYear }</Table.Cell>
          </Table.Row>
          <Table.Row>
          <Table.Cell>MVA-kompensert:</Table.Cell>
          <Table.Cell>{ data.isVatCompensated == false ? "Nei" : "Ja" }</Table.Cell>         
        </Table.Row>           
       { /* <Table.Row>
          <Table.Cell>{ JSON.stringify(data) }</Table.Cell>         
        </Table.Row>   */}
      </Table.Body>
    </Table>
  );
};
