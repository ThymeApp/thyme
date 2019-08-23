// @flow

export default function isNewer(compare: string, version: string) {
  if (compare === version) {
    return false;
  }

  const numbersCompare = compare.split('.').map((num) => parseInt(num, 10));
  const numbersVersion = version.split('.').map((num) => parseInt(num, 10));

  for (let i = 0; i < numbersCompare.length; i += 1) {
    if (!numbersVersion[i] || numbersCompare[i] > numbersVersion[i]) {
      return true;
    }

    if (numbersCompare[i] < numbersVersion[i]) {
      return false;
    }
  }

  return false;
}
