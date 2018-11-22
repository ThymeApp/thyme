// @flow

export default function registerPlugin({ pluginInit }: {pluginInit: (name: string) => void}) {
  pluginInit('Insights');
}
