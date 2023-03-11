type FunctionProps = FunctionSuggestion[];

export interface FunctionSuggestion {
    name: string; // or Ticker Name
    long_name: string;
    type: 'function';
    redirect: string;
}

export type SecuritiesProps = SecuritiesSuggestion[];

export interface SecuritiesSuggestion { }

export interface SearchSuggestions {
    securities: SecuritiesProps;
    functions: FunctionProps;
}
