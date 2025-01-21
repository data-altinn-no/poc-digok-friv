import React from 'react';
import { Button, Textfield } from '@digdir/designsystemet-react';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  orgNumber: string;
  onOrgNumberChange: (value: string) => void;
  onSearch: () => void;
}

export const SearchForm: React.FC<Props> = ({ orgNumber, onOrgNumberChange, onSearch, style, ...rest }) => {
  const labelStyle = { color: 'white' };
  const label = <span style={labelStyle}>Organisasjonsnummer</span>;
  return (
    <div style={{ marginBottom: '2rem', ...style }} {...rest}>
      <Textfield
        label={label}
        value={orgNumber}
        onChange={(e) => onOrgNumberChange(e.target.value)}
        style={{ width: '200px' }}
      />
      <Button variant="secondary" onClick={onSearch} style={{ marginLeft: '1rem', marginTop: '2rem' }}>
        Søk
      </Button>
    </div>
  );
};
