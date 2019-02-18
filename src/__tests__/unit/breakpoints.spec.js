import { currentBreakpoints, isBreakpoints, matchesBreakpoint } from '../../components/Responsive';

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
    const breakpoints = ['mobile', 'miniTablet', 'tablet'];

    const output = {
      isMobile: false,
      isMiniTablet: false,
      isTablet: true,
      isDesktop: false,
      isLarge: false,
      isWide: false,
    };

    expect(isBreakpoints(breakpoints)).toEqual(output);
  });

  it('Should create correct breakpoints state object when is wide', () => {
    const breakpoints = ['mobile', 'miniTablet', 'tablet', 'desktop', 'large', 'wide'];

    const output = {
      isMobile: false,
      isMiniTablet: false,
      isTablet: false,
      isDesktop: false,
      isLarge: false,
      isWide: true,
    };

    expect(isBreakpoints(breakpoints)).toEqual(output);
  });

  it('Should create correct breakpoints state object when is mobile', () => {
    const breakpoints = ['mobile'];

    const output = {
      isMobile: true,
      isMiniTablet: false,
      isTablet: false,
      isDesktop: false,
      isLarge: false,
      isWide: false,
    };

    expect(isBreakpoints(breakpoints)).toEqual(output);
  });
});

describe('matchesBreakpoint', () => {
  it('Should find if current breakpoints match given min and max', () => {
    const breakpoints = ['mobile', 'tablet', 'desktop'];

    expect(matchesBreakpoint(breakpoints, { min: 'tablet', max: 'large' })).toBe(true);
    expect(matchesBreakpoint(breakpoints, { min: 'tablet', max: 'wide' })).toBe(true);
    expect(matchesBreakpoint(breakpoints, { min: 'mobile', max: 'desktop' })).toBe(false);
    expect(matchesBreakpoint(breakpoints, { min: 'large', max: 'wide' })).toBe(false);
    expect(matchesBreakpoint(breakpoints, { min: 'desktop' })).toBe(true);
    expect(matchesBreakpoint(breakpoints, { max: 'desktop' })).toBe(false);
    expect(matchesBreakpoint(breakpoints, { min: 'large' })).toBe(false);
    expect(matchesBreakpoint(breakpoints, { max: 'large' })).toBe(true);
  });
});
