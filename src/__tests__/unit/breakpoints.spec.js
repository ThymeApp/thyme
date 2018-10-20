import { currentBreakpoints } from '../../components/Responsive';

describe('currentBreakpoints', () => {
  it('Lists current breakpoints based on given breakpoints', () => {
    const breakpoints = {
      mobile: 0,
      tablet: 600,
      desktop: 900,
    };

    expect(currentBreakpoints(600, breakpoints)).toEqual(['mobile', 'tablet']);
    expect(currentBreakpoints(599, breakpoints)).toEqual(['mobile']);
  });
});
