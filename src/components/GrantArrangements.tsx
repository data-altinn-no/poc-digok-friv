import React from 'react';
import { Link, Paragraph } from '@digdir/designsystemet-react';
import { OrgNumber } from '../types/organization';

interface Props {
  data: OrgNumber;
}

export const GrantArrangementsInformation: React.FC<Props> = ({ data }) => { 
  console.log("Orgnumber grantarrangements:" + data)  
  if (!data?.length) {
      return <Paragraph>Ikke noe organisasjonsnummer oppgitt!</Paragraph>;
    }
  return (   
      <div>
      <Link href={`https://stotte.brreg.no/nb/oppslag/stoettetildeling?searchField=${data}`} target="_blank" rel="noopener noreferrer">Støtteordninger</Link><br></br>
      <Link href={`https://tilskudd.dfo.no/mottaker/${data}`} target="_blank" rel="noopener noreferrer">Tilskuddsordninger</Link><br></br>
      <Link href={`https://stotte.brreg.no/nb/oppslag/stoettetildeling?searchField=${data}`} target="_blank" rel="noopener noreferrer">Tros- og livssynssamfunn</Link><br></br>
      </div>
      )     
};
