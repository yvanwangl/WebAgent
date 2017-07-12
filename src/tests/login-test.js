/**
 * Created by hanlu on 2017/3/17.
 */
import expect from 'expect';
import login from '../models/login';

describe('login', ()=>{
    describe('reducer', ()=>{
        it('it should login', ()=>{
            expect(login.reducers['logintest']({}, {payload: {a:1}})).toEqual({a:1});
        });
        it('should return -1', function() {
            [1,2,3].indexOf(4).should.equal(-1);
        });
    })
});