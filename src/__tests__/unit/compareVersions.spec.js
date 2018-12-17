import isNewer from '../../core/compareVersions';

describe('isNewer', () => {
  it('Checks for same version', () => {
    expect(isNewer('1.1.0', '1.1.0')).toBe(false);
  });

  it('Checks major versions correctly', () => {
    expect(isNewer('1.0.0', '0.0.0')).toBe(true);
    expect(isNewer('1.0.0', '0.0.1')).toBe(true);
    expect(isNewer('1.0.0', '0.1.0')).toBe(true);

    expect(isNewer('1.0.1', '2.0.0')).toBe(false);
  });

  it('Checks minor versions correctly', () => {
    expect(isNewer('1.1.0', '1.0.0')).toBe(true);
    expect(isNewer('1.1.0', '1.0.1')).toBe(true);

    expect(isNewer('1.1.1', '1.2.0')).toBe(false);
  });

  it('Checks bugfix versions correctly', () => {
    expect(isNewer('1.0.1', '1.0.0')).toBe(true);

    expect(isNewer('1.1.1', '1.1.2')).toBe(false);
  });

  it('Other formats', () => {
    expect(isNewer('2', '1')).toBe(true);
    expect(isNewer('1', '2')).toBe(false);

    expect(isNewer('3.2.1', '2')).toBe(true);
    expect(isNewer('1.2.3', '2')).toBe(false);
  });
});
