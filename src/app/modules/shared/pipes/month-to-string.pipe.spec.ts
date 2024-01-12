import { MonthToStringPipe } from './month-to-string.pipe';

describe('MonthToStringPipe', () => {
  it('create an instance', () => {
    const pipe = new MonthToStringPipe();
    expect(pipe).toBeTruthy();
  });
});
