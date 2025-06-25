import React from 'react';
import { Link, Paragraph } from '@digdir/designsystemet-react';
import { AnnualAccounts, AnnualAccountsWithLink } from '../types/annualaccounts';
import { Table } from '@digdir/designsystemet-react';

interface Props {
  data: AnnualAccountsWithLink;
}

export const AnnualAccountsInformation: React.FC<Props> = ({ data }) => {
    if (!data) {
    return <Paragraph>Ingen regnskapstall funnet!</Paragraph>;
  } 
     
  return (
    <Table>
      <Table.Body>
        {data.Accounts.sort().map((item, index) => (
          <React.Fragment key={index}>
            <Table.Row>
              <Table.Cell colSpan={2}>
                <h3>
                  Regnskapsperiode:{" "}
                  {new Date(item.regnskapsperiode.fraDato).toLocaleDateString()}{" "}
                  -{" "}
                  {new Date(item.regnskapsperiode.tilDato).toLocaleDateString()}
                </h3>
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Valutakode</Table.Cell>
              <Table.Cell>{item.valuta}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell colSpan={2}>
                <h4>ResultatRegnskap</h4>
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Sum driftsinntekter</Table.Cell>
              <Table.Cell>
                {
                  item.resultatregnskapResultat.driftsresultat
                    .driftsinntekter.sumDriftsinntekter
                }
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Resultat før skatt</Table.Cell>
              <Table.Cell>
                {
                  item.resultatregnskapResultat
                    .ordinaertResultatFoerSkattekostnad
                }
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Årsresultat</Table.Cell>
              <Table.Cell>{item.resultatregnskapResultat.aarsresultat}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell colSpan={2}>
                <h4>Balanseregnskap</h4>
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Sum eiendeler</Table.Cell>
              <Table.Cell>{item.eiendeler.sumEiendeler}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Sum egenkapital</Table.Cell>
              <Table.Cell>
                {item.egenkapitalGjeld.egenkapital.sumEgenkapital}
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Sum gjeld</Table.Cell>
              <Table.Cell>{item.egenkapitalGjeld.gjeldOversikt.sumGjeld}</Table.Cell>
            </Table.Row>
          </React.Fragment>
        ))}
       <Table.Row><Table.Cell>{ data.Links.Year1 }</Table.Cell><Table.Cell><Link target="_blank" href={ data.Links.Year1PdfUrl}>Lenke til årrapport i PDF</Link></Table.Cell></Table.Row> 
       <Table.Row><Table.Cell>{ data.Links.Year2 }</Table.Cell><Table.Cell><Link target="_blank" href={ data.Links.Year2PdfUrl}>Lenke til årrapport i PDF</Link></Table.Cell></Table.Row> 
       <Table.Row><Table.Cell>{ data.Links.Year3 }</Table.Cell><Table.Cell><Link target="_blank" href={ data.Links.Year3PdfUrl}>Lenke til årrapport i PDF</Link></Table.Cell></Table.Row> 
      </Table.Body>
    </Table>
  );
};