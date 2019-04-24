// @flow

import { useState, useEffect, useCallback } from 'react';
import throttle from 'lodash/throttle';

type Breakpoint = 'mobile' | 'miniTablet' | 'tablet' | 'desktop' | 'large' | 'wide';
type Breakpoints = { [breakpoint: Breakpoint]: number };
type isBreakpointsType = {
  isMobile: boolean;
  isMiniTablet: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isLarge: boolean;
  isWide: boolean;
};

const BrowserBreakpoints: Breakpoints = {
  mobile: 0,
  miniTablet: 520,
  tablet: 768,
  desktop: 992,
  large: 1200,
  wide: 1920,
};

export function currentBreakpoints(width: number, breakpoints: Breakpoints): Breakpoint[] {
  return Object.keys(breakpoints)
    .filter((breakpoint: Breakpoint) => width >= breakpoints[breakpoint]);
}

export function isBreakpoints(breakpoints: Breakpoint[]): isBreakpointsType {
  return {
    isMobile: breakpoints.indexOf('mobile') > -1 && breakpoints.indexOf('miniTablet') === -1,
    isMiniTablet: breakpoints.indexOf('miniTablet') > -1 && breakpoints.indexOf('tablet') === -1,
    isTablet: breakpoints.indexOf('tablet') > -1 && breakpoints.indexOf('desktop') === -1,
    isDesktop: breakpoints.indexOf('desktop') > -1 && breakpoints.indexOf('large') === -1,
    isLarge: breakpoints.indexOf('large') > -1 && breakpoints.indexOf('wide') === -1,
    isWide: breakpoints.indexOf('wide') > -1,
  };
}

export function matchesBreakpoint(
  breakpoints: Breakpoint[],
  conditions?: {
    min?: Breakpoint,
    max?: Breakpoint,
  },
): boolean {
  if (
    // max breakpoint is found, match will fail
    (conditions && conditions.max && breakpoints.indexOf(conditions.max) > -1)
    // min breakpoint not found, match will fail
    || (conditions && conditions.min && breakpoints.indexOf(conditions.min) === -1)
  ) {
    return false;
  }

  return true;
}

type ResponsiveProps = {
  min?: Breakpoint;
  max?: Breakpoint;
  element?: HTMLElement | null;
};

function useResponsive({ min, max, element }: ResponsiveProps): [boolean, isBreakpointsType] {
  const [width, setWidth] = useState(null);

  const onWindowResize = useCallback(
    throttle(() => setWidth(element ? element.offsetWidth : window.innerWidth), 50),
    [element],
  );

  useEffect(() => {
    // subscribe to changes
    window.addEventListener('resize', onWindowResize);

    // call once
    onWindowResize();

    return () => {
      // unsubscribe
      window.removeEventListener('resize', onWindowResize);
    };
  }, [element, onWindowResize]);

  if (width === null) {
    return [false, {}];
  }

  const breakpoints = currentBreakpoints(width, BrowserBreakpoints);

  return [matchesBreakpoint(breakpoints, { min, max }), isBreakpoints(breakpoints)];
}

export { useResponsive };
