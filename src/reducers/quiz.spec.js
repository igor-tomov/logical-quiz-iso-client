import {Map} from 'immutable';
import {expect} from 'chai';
import {updateTimer} from './quiz';


describe( "Reducers", function () {

  describe( "Quiz reducers", function () {

    describe( "updateTimer()", function () {

      it( "Update timer once", function () {
        const state = Map({ timerValue: 10 });
        const nextState = updateTimer( state );

        expect( nextState ).to.equal(Map({ timerValue: 9 }));
      });

      it( "Update timer multiple times", function () {
        const state = Map({ timerValue: 10 });

        let nextState = updateTimer( state );

        nextState = updateTimer( nextState );
        nextState = updateTimer( nextState );
        nextState = updateTimer( nextState );

        expect( nextState ).to.equal(Map({ timerValue: 6 }));
      });

      it( "Update timer with zero value", function () {
        const state = Map({ timerValue: 0 });
        const nextState = updateTimer( state );

        expect( nextState ).to.equal(Map({ timerValue: 0 }));
      });
    });

  });

});
