// @flow

export type ProjectRateCurrency = string;

export type ProjectWithRate = { rate?: number } & projectTreeType;

export type ProjectRatesSettings = {
  currency: string;
};

export type StoreShapeWithRates = {
  settings: {
    projectRates: ProjectRatesSettings;
  } & settingsShape;
} & storeShape;

export type ProjectRatesReportProject = { rate?: number } & projectTreeWithTimeType;
