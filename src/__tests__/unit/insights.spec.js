import { hoursAndDivisions } from '../../plugins/Insights/helpers';

describe('Calculate hours and divisions for insights', () => {
  it('Should calculate correct hours', () => {
    expect(hoursAndDivisions(1)).toEqual([1, 1]);
    expect(hoursAndDivisions(2)).toEqual([2, 2]);
    expect(hoursAndDivisions(3)).toEqual([3, 3]);
    expect(hoursAndDivisions(4)).toEqual([4, 4]);
    expect(hoursAndDivisions(5)).toEqual([6, 3]);
    expect(hoursAndDivisions(6)).toEqual([6, 3]);
    expect(hoursAndDivisions(7)).toEqual([8, 4]);
    expect(hoursAndDivisions(8)).toEqual([8, 4]);
    expect(hoursAndDivisions(9)).toEqual([9, 3]);
    expect(hoursAndDivisions(10)).toEqual([10, 2]);
    expect(hoursAndDivisions(11)).toEqual([12, 4]);
    expect(hoursAndDivisions(12)).toEqual([12, 4]);
  });

  it('Should handle fractions', () => {
    expect(hoursAndDivisions(0.5)).toEqual([1, 1]);
    expect(hoursAndDivisions(7.1)).toEqual([8, 4]);
  });

  it('Should throw on too small input', () => {
    expect(() => hoursAndDivisions(0)).toThrow();
    expect(() => hoursAndDivisions(-1)).toThrow();
  });
});
