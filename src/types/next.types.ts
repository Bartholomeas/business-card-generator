export type UrlSearchParamsRecord<
  S extends Record<string, string | undefined | string[]> = Record<string, string | string[]>,
> = S;

type NextPageParams<
  P extends Record<string, string | string[]> = Record<string, string | string[]>,
> = P;

export interface NextPageParamsProp<
  P extends Record<string, string | string[]> = Record<string, string | string[]>,
> {
  params: NextPageParams<P>;
}

export interface NextPageSearchParamsProp<
  S extends Record<string, string | undefined | string[]> = Record<
    string,
    string | undefined | string[]
  >,
> {
  searchParams: UrlSearchParamsRecord<S>;
}

export interface NextPageProps<
  P extends Record<string, string | string[]> = Record<string, string | string[]>,
  S extends Record<string, string | string[]> = Record<string, string | string[]>,
> {
  params: NextPageParams<P>;
  searchParams: UrlSearchParamsRecord<S>;
}