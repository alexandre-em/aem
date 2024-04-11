type LocaleParamsType = {
  params: {
    locale: 'en' | 'fr' | 'jp';
  };
};

type IdParamsType = {
  params: {
    id: string;
  };
  searchParams?: Record<string | string[] | undefined>;
};

type WithClassNameComponentType = {
  className: string;
};

type FirebaseDateType = {
  seconds: number;
  nanoseconds: number;
};
