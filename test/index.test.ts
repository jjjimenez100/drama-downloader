import { expect } from 'chai';
import 'mocha';
import { test } from '../src/index';
import DummyEntity from '../src/DummyEntity';

describe('this is a sample test', () => {
   it('index should return 1', () => {
       const result = test();
       expect(result).to.equal(1);
   });

   it('dummy entity should return 2', () => {
     const dummyEntity = new DummyEntity();
     expect(dummyEntity.getDummyValue()).to.equal(2);
   });
});