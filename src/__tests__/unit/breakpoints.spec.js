import { currentBreakpoints, isBreakpoints } from '../../components/Responsive';

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

describe('isBreakpoints', () => {
  it('Should create a breakpoints state object', () => {
    const breakpoints = ['mobile', 'tablet'];

    const output = {
      isMobile: false,
      isTablet: true,
      isDesktop: false,
      isLarge: false,
      isWide: false,
      minMobile: true,
      minTablet: true,
      minDesktop: false,
      minLarge: false,
      minWide: false,
    };

    expect(isBreakpoints(breakpoints)).toEqual(output);
  });

  it('Should create correct breakpoints state object when is wide', () => {
    const breakpoints = ['mobile', 'tablet', 'desktop', 'large', 'wide'];

    const output = {
      isMobile: false,
      isTablet: false,
      isDesktop: false,
      isLarge: false,
      isWide: true,
      minMobile: true,
      minTablet: true,
      minDesktop: true,
      minLarge: true,
      minWide: true,
    };

    expect(isBreakpoints(breakpoints)).toEqual(output);
  });

  it('Should create correct breakpoints state object when is mobile', () => {
    const breakpoints = ['mobile'];

    const output = {
      isMobile: true,
      isTablet: false,
      isDesktop: false,
      isLarge: false,
      isWide: false,
      minMobile: true,
      minTablet: false,
      minDesktop: false,
      minLarge: false,
      minWide: false,
    };

    expect(isBreakpoints(breakpoints)).toEqual(output);
  });
});
