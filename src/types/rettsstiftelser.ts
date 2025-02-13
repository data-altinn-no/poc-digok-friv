export interface Rettsstiftelser {
    sokeparameter:         string;
    antallRettsstiftelser: number;
    oppslagstidspunkt:     Date;
    rettsstiftelse:        Rettsstiftelse[];
}

export interface Rettsstiftelse {
    dokumentnummer:    string;
    type:              string;
    typeBeskrivelse:   string;
    status:            string;
    statusBeskrivelse: string;
    innkomsttidspunkt: Date;
    paategning:        any[];
    rolle:             Rolle[];
    formuesgode:       Formuesgode[];
    prioritetsvikelse: any[];
    krav:              Krav;
}

export interface Formuesgode {
    identifiseringsmate:                 string;
    type:                                string;
    typeBeskrivelse:                     string;
    eierandel:                           Eierandel;
    avgrensingTingsinnbegrep:            string;
    avgrensingTingsinnbegrepBeskrivelse: string;
}

export interface Eierandel {
}

export interface Krav {
    belop: Belop[];
}

export interface Belop {
    belop:  number;
    valuta: string;
}

export interface Rolle {
    rolletype:                  string;
    rolletypeBeskrivelse:       string;
    rollegruppetype:            string;
    rollegruppetypeBeskrivelse: string;
    rolleinnehaver:             Rolleinnehaver;
}

export interface Rolleinnehaver {
    aktorType:           string;
    navn?:               string;
    organisasjonsnummer: string;
    adresse?:            Adresse;
}

export interface Adresse {
    adresseType:   string;
    brukskategori: string;
    adresselinje1: string;
    poststed:      Poststed;
    kommune:       Kommune;
}

export interface Kommune {
    kommunenummer: string;
    kommunenavn:   string;
}

export interface Poststed {
    navn:       string;
    postnummer: string;
}
