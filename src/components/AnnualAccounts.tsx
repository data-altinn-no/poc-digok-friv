import React from 'react';
import { Paragraph } from '@digdir/designsystemet-react';
import { AnnualAccounts } from '../types/annualaccounts';
import { Table } from '@digdir/designsystemet-react';

interface Props {
  data: AnnualAccounts;
}

export const AnnualAccountsInformation: React.FC<Props> = ({ data }) => {
    if (!data) {
    return <Paragraph>Ingen regnskapstall funnet!</Paragraph>;
  } 
     
      return data.sort().map(item => (         
            <Table>
            <Table.Body>
              <Table.Row>
                <Table.Cell><h3>Regnskapsperiode: {new Date(item.regnskapsperiode.fraDato).toLocaleDateString() + " - " + new Date(item.regnskapsperiode.tilDato).toLocaleDateString() }</h3></Table.Cell>               
              </Table.Row>           
              <Table.Row>              
                <Table.Cell>Valutakode</Table.Cell>
                <Table.Cell>{item.valuta }</Table.Cell>
              </Table.Row>
              <Table.Row><Table.Cell><h4>ResultatRegnskap</h4></Table.Cell></Table.Row>       
              <Table.Row>              
                <Table.Cell>Sum driftsinntekter</Table.Cell>
                <Table.Cell>{ item.resultatregnskapResultat.driftsresultat.driftsinntekter.sumDriftsinntekter }</Table.Cell>
              </Table.Row>    
              <Table.Row>              
                <Table.Cell>Resultat før skatt</Table.Cell>
                <Table.Cell>{ item.resultatregnskapResultat.ordinaertResultatFoerSkattekostnad }</Table.Cell>
              </Table.Row> 
              <Table.Row>              
                <Table.Cell>Årsresultat</Table.Cell>
                <Table.Cell>{ item.resultatregnskapResultat.aarsresultat }</Table.Cell>
              </Table.Row> 
              <Table.Row>
                <Table.Cell><h4>Balanseregnskap</h4></Table.Cell>               
              </Table.Row>   
              <Table.Row>              
                <Table.Cell>Sum eiendeler</Table.Cell>
                <Table.Cell>{ item.eiendeler.sumEiendeler }</Table.Cell>
              </Table.Row> 
              <Table.Row>              
                <Table.Cell>Sum egenkapital</Table.Cell>
                <Table.Cell>{ item.egenkapitalGjeld.egenkapital.sumEgenkapital }</Table.Cell>
              </Table.Row> 
              <Table.Row>              
                <Table.Cell>Sum gjeld</Table.Cell>
                <Table.Cell>{ item.egenkapitalGjeld.gjeldOversikt.sumGjeld }</Table.Cell>
              </Table.Row> 
              <Table.Row><Table.Cell><br></br></Table.Cell></Table.Row>
            </Table.Body>
            </Table>
          )        
      )
   };
