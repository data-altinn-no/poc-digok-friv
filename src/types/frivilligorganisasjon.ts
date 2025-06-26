type FrivilligOrganisasjon = {
    organisasjonsnummer: string;
    frivilligOrganisasjonsstatus: string;
    kontonummer: string;
    innfoertDato: string; // ISO 8601-datoformat, f.eks. "2001-01-01"
    foersteGangInnfoert: string;
    grasrotandel: {
      deltarI: boolean;
      utestengelsesperiode: {
        fraDato: string;
        tilDato: string;
      };
    };
    regnskapsrapportering: {
      harPaatattSegRapporteringsplikt: boolean;
      avslutningsdatoForRegnskapsperiode: string; // f.eks. "24.12"
      sistInnsendteAarsregnskap: {
        regnskapsaar: number;
        registreringsdato: string;
      };
    };
    vedtekter: {
      frivilligRegistrerteVedtekter: boolean;
      sistOppdaterteVedtekter: string;
    };
    icnpoKategorier: Array<{
      kategori: string;
      icnpoNummer: string;
      navn: string;
      rekkefoelge: number;
    }>;
    paategninger: Array<{
      identifikatorInformasjonstype: string;
      paategning: string;
    }>;
    _links: {
      [key: string]: {
        href: string;
      };
    };
  };