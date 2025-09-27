import { expect } from 'chai';
import { gini } from '../src/utils.js';

describe('gini', () => {
  it('returns 0 for equal distribution', () => {
    expect(gini([10,10,10,10])).to.equal(0);
  });
  it('returns >0 for unequal distribution', () => {
    expect(gini([0,0,100])).to.be.greaterThan(0);
  });
});
