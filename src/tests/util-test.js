/**
 * Created by hanlu on 2017/3/17.
 */
import expect from 'expect';
import util from '../utils/util';

describe('util', ()=>{
    describe('dateFormat', ()=>{
        it('should be 2017-03-17', ()=>{
            util.dateFormat(new Date()).should.equal('2017-03-17');
        })
    })
})