import { expect } from 'cafeteria';
import { increment, INCREMENT } from '../counters';

describe('counters', ()=> {
  describe('increment', ()=> {
    it('should return INCREMENT as type', () => {
      expect(increment().type).to.equals(INCREMENT);
    });
  });
});
