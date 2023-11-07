import { ContainValidBearerTokenGuard } from './contain-valid-bearer-token.guard';

describe('ContainValidBearerTokenGuard', () => {
  it('should be defined', () => {
    expect(new ContainValidBearerTokenGuard()).toBeDefined();
  });
});
