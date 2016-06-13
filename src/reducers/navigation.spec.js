import {fromJS, Map, List} from 'immutable';
import {expect} from 'chai';
import {navigatePush} from './navigation';


describe( "Reducers", function () {

  describe( "navigation reducers", function () {

    describe( "navigatePush()", function () {

      it( 'Back to previous scene', function () {
        const state = fromJS({
          index: 2,
          children: [
            { key: 'welcome' },
            { key: 'subjects' },
            { key: 'quiz' },
          ]
        });

        const nextState = navigatePush( state );

        expect( nextState ).to.equal(fromJS({
          index: 1,
          children: [
            { key: 'welcome' },
            { key: 'subjects' },
          ]
        }));
      } );

      it( 'Ignore pop navigation in case of one item in scenes stack', function () {
        const state = fromJS({
          index: 0,
          children: [
            { key: 'welcome' },
          ]
        });

        const nextState = navigatePush( state );

        expect( nextState ).to.equal(fromJS({
          index: 0,
          children: [
            { key: 'welcome' },
          ]
        }));
      } );
    });

  });

});
