// @flow

import { Component } from 'react';
import throttle from 'lodash/throttle';

type Breakpoint = 'mobile' | 'tablet' | 'desktop' | 'large' | 'wide';
type Breakpoints = { [breakpoint: Breakpoint]: number };
type isBreakpointsType = {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isLarge: boolean;
  isWide: boolean;
};

const BrowserBreakpoints: Breakpoints = {
  mobile: 0,
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
    isMobile: breakpoints.indexOf('mobile') > -1 && breakpoints.indexOf('tablet') === -1,
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
  children: (matched: boolean, breakpoints: isBreakpointsType) => any;
};

type ResponsiveState = {
  width: number | null;
};

class Responsive extends Component<ResponsiveProps, ResponsiveState> {
  state = {
    width: null,
  };

  componentDidMount() {
    window.addEventListener('resize', this.onWindowResize);
    this.onWindowResize();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onWindowResize);
  }

  onWindowResize = throttle(() => {
    this.setState({ width: window.innerWidth });
  }, 50);

  render() {
    const { width } = this.state;
    const { min, max, children } = this.props;

    if (typeof children !== 'function') {
      throw new Error('Pass render prop as children');
    }

    if (width === null) {
      return null;
    }

    const breakpoints = currentBreakpoints(width, BrowserBreakpoints);

    return children(matchesBreakpoint(breakpoints, { min, max }), isBreakpoints(breakpoints));
  }
}

export default Responsive;
