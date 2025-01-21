import React from 'react';
import { Link, Paragraph } from '@digdir/designsystemet-react';
import { Announcements } from '../types/organization';

interface Props {
  data: Announcements;
}

export const AnnouncementsInformation: React.FC<Props> = ({ data }) => {
  if (!data?.Url) {
    return <Paragraph>Ingen kunngjøringer funnet</Paragraph>;
  }

  return (
    <Link href={data.Url} target="_blank">
      Se kunngjøringer
    </Link>
  );
};
