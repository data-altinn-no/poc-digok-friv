import React from 'react';
import { Link, Paragraph } from '@digdir/designsystemet-react';
import { StotteRegisterUrl } from '../types/organization';

interface Props {
  data: StotteRegisterUrl;
}

export const GrantRegistry: React.FC<Props> = ({ data }) => {
    if (!data) {
    return <Paragraph>Oppslag mot data.altinn.no feilet</Paragraph>;
  }
  console.log("Stotteregister data:" + JSON.stringify(data));
  return (
    <Link href={data} target="_blank" rel="noopener noreferrer" >
      Se oppføringer
    </Link>
  );
};
