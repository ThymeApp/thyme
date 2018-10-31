// @flow

export type ProjectRateCurrency = string;

export type ProjectWithRate = { rate?: number } & projectType;

export type ProjectRatesSettings = {
  currency: string;
};

export type StoreShapeWithRates = {
  settings: {
    projectRates: ProjectRatesSettings;
  } & settingsShape;
} & storeShape;
