import React from 'react';
import { Paragraph } from '@digdir/designsystemet-react';
import { Formuesgode, Rettsstiftelser } from '../types/rettsstiftelser';
import { Table } from '@digdir/designsystemet-react';

interface Props {
  data: Rettsstiftelser;
}

export const RettsstiftelserInformation: React.FC<Props> = ({ data }) => {
    if (!data) {
    return <Paragraph>Ingen regnskapstall funnet!</Paragraph>;
  } 
     
      return data.rettsstiftelse.sort().map(item => (         
            <Table>
              <Table.HeaderCell>Disse dataene hentes fra testvirksomhet ulik den man søker på</Table.HeaderCell>
            <Table.Body>
              <Table.Row>
                <Table.Cell><h4>Heftelsestype</h4></Table.Cell>
                <Table.Cell><h4>{item.typeBeskrivelse}</h4></Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Innkomsttidspunkt</Table.Cell>
                <Table.Cell>{new Date(item.innkomsttidspunkt).toLocaleDateString()}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Status</Table.Cell>
                <Table.Cell>{ capitalizeFirstLetter(item.statusBeskrivelse) }</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Panthaver</Table.Cell>
                <Table.Cell>{ item.rolle[0].rolleinnehaver.organisasjonsnummer }</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Formuesgoder</Table.Cell>
              </Table.Row>              
              { item.formuesgode.map((subItem) => (<tr className='fds-table__row'><td className='fds-table__cell'>- {subItem.typeBeskrivelse}</td></tr> ))}            
               <Table.Row>
                <Table.Cell>Kravbeløp</Table.Cell>
              </Table.Row>            
              { item.krav?.belop?.map((krav) => (<tr className='fds-table__row'><td className='fds-table__cell'>- { krav.belop + " " + krav.valuta} </td></tr>)) }
              <Table.Row><Table.Cell>Påtegning</Table.Cell></Table.Row>
             { item.paategning?.map((item) => (<tr className='fds-table__row'><td className='fds-table__cell'>- { JSON.stringify(item)} </td></tr>)) }
             <Table.Row><br></br><br></br></Table.Row>
            </Table.Body>
            </Table>
          )        
      )
   };

   function capitalizeFirstLetter(val: string) {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}


   /*Følgende informasjonselement på den enkelte rettsstiftelse/heftelse formidles i tjenesten:
	Type heftelse/rettsstiftelse
	Innkomsttidspunkt
	Rettsstiftelsen er (Status)
	Pantsetter
	Formuesgode
	Krav
	Beløp
	Påtegning
*/
