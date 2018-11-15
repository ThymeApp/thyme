// @flow

export type ProjectRateCurrency = string;

export type ProjectWithRate = { rate?: number } & ProjectTreeType;

export type ProjectRatesSettings = {
  currency: string;
};

export type StoreShapeWithRates = {
  settings: {
    projectRates: ProjectRatesSettings;
  } & SettingsShape;
} & StateShape;

export type ProjectRatesReportProject = { rate?: number } & ProjectTreeWithTimeType;
