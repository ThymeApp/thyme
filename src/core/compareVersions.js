// @flow

export default function isNewer(compare: string, version: string) {
  const numbersCompare = compare.split('.').map(num => parseInt(num, 10));
  const numbersVersion = version.split('.').map(num => parseInt(num, 10));

  return numbersCompare.every((num, index) => {
    if (!numbersVersion[index]) {
      return true;
    }

    return num >= numbersVersion[index];
  });
}
