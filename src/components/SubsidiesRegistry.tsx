import React from 'react';
import { Link, Paragraph } from '@digdir/designsystemet-react';
import { TilskuddsRegisterUrl } from '../types/organization';

interface Props {
  data: TilskuddsRegisterUrl;
}

export const SubsidiesRegistry: React.FC<Props> = ({ data }) => {
    if (!data) {
    return <Paragraph>Ingen kunngjøringer funnet</Paragraph>;
  }
  console.log("Announcements data:" + JSON.stringify(data));
  return (
    <Link href={data} target="_blank" rel="noopener noreferrer" >
      Se tildelinger
    </Link>
  );
};
