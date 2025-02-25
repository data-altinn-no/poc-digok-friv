import React from 'react';
import { Link, Paragraph } from '@digdir/designsystemet-react';
import { Announcements } from '../types/organization';

interface Props {
  data: Announcements;
}

export const AnnouncementsInformation: React.FC<Props> = ({ data }) => {
    if (!data) {
    return <Paragraph>Ingen kunngjøringer funnet</Paragraph>;
  }  
  return (
    <Link href={data} target="_blank" rel="noopener noreferrer" >
      Se kunngjøringer
    </Link>
  );
};
