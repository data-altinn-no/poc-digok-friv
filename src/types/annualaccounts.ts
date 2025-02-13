// To parse this data:
//
//   import { Convert } from "./file";
//
//   const welcome = Convert.toWelcome(json);
export type AnnualAccounts = Array<AnnualAccountsItem>;
export interface AnnualAccountsItem {
    id:                       number;
    journalnr:                string;
    regnskapstype:            string;
    virksomhet:               Virksomhet;
    regnskapsperiode:         Regnskapsperiode;
    valuta:                   string;
    avviklingsregnskap:       boolean;
    oppstillingsplan:         string;
    revisjon:                 Revisjon;
    regnkapsprinsipper:       Regnkapsprinsipper;
    egenkapitalGjeld:         EgenkapitalGjeld;
    eiendeler:                Eiendeler;
    resultatregnskapResultat: ResultatregnskapResultat;
}

export interface EgenkapitalGjeld {
    sumEgenkapitalGjeld: number;
    egenkapital:         Egenkapital;
    gjeldOversikt:       GjeldOversikt;
}

export interface Egenkapital {
    sumEgenkapital:      number;
    opptjentEgenkapital: OpptjentEgenkapital;
    innskuttEgenkapital: InnskuttEgenkapital;
}

export interface InnskuttEgenkapital {
    sumInnskuttEgenkaptial: number;
}

export interface OpptjentEgenkapital {
    sumOpptjentEgenkapital: number;
}

export interface GjeldOversikt {
    sumGjeld:        number;
    kortsiktigGjeld: KortsiktigGjeld;
    langsiktigGjeld: LangsiktigGjeld;
}

export interface KortsiktigGjeld {
    sumKortsiktigGjeld: number;
}

export interface LangsiktigGjeld {
    sumLangsiktigGjeld: number;
}

export interface Eiendeler {
    sumVarer:                   number;
    sumFordringer:              number;
    sumBankinnskuddOgKontanter: number;
    sumEiendeler:               number;
    omloepsmidler:              Omloepsmidler;
    anleggsmidler:              Anleggsmidler;
}

export interface Anleggsmidler {
    sumAnleggsmidler: number;
}

export interface Omloepsmidler {
    sumOmloepsmidler: number;
}

export interface Regnkapsprinsipper {
    smaaForetak:     boolean;
    regnskapsregler: string;
}

export interface Regnskapsperiode {
    fraDato: Date;
    tilDato: Date;
}

export interface ResultatregnskapResultat {
    ordinaertResultatFoerSkattekostnad: number;
    aarsresultat:                       number;
    totalresultat:                      number;
    finansresultat:                     Finansresultat;
    driftsresultat:                     Driftsresultat;
}

export interface Driftsresultat {
    driftsresultat:  number;
    driftsinntekter: Driftsinntekter;
    driftskostnad:   Driftskostnad;
}

export interface Driftsinntekter {
    salgsinntekter:     number;
    sumDriftsinntekter: number;
}

export interface Driftskostnad {
    loennskostnad:    number;
    sumDriftskostnad: number;
}

export interface Finansresultat {
    nettoFinans:   number;
    finansinntekt: Finansinntekt;
    finanskostnad: Finanskostnad;
}

export interface Finansinntekt {
    sumFinansinntekter: number;
}

export interface Finanskostnad {
}

export interface Revisjon {
    ikkeRevidertAarsregnskap: boolean;
    fravalgRevisjon:          boolean;
}

export interface Virksomhet {
    organisasjonsnummer: string;
    organisasjonsform:   string;
    morselskap:          boolean;
}

// Converts JSON strings to/from your types
export class Convert {
    public static toAnnualAccounts(json: string): AnnualAccounts[] {
        return JSON.parse(json);
    }

    public static toJson(value: AnnualAccounts[]): string {
        return JSON.stringify(value);
    }
}
