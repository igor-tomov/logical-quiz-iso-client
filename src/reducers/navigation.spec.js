import {fromJS, Map, List} from 'immutable';
import {expect} from 'chai';
import {navigatePop, navigatePush} from './navigation';


describe( "Reducers", function () {

  describe( "navigation reducers", function () {

    describe( "navigatePop()", function () {

      it( 'Back to previous scene', function () {
        const state = fromJS({
          index: 2,
          routes: [
            { key: 'welcome' },
            { key: 'subjects' },
            { key: 'quiz' },
          ]
        });

        const nextState = navigatePop( state );

        expect( nextState ).to.equal(fromJS({
          index: 1,
          routes: [
            { key: 'welcome' },
            { key: 'subjects' },
          ]
        }));
      } );

      it( 'Ignore pop navigation in case of one item in scenes stack', function () {
        const state = fromJS({
          index: 0,
          routes: [
            { key: 'welcome' },
          ]
        });

        const nextState = navigatePop( state );

        expect( nextState ).to.equal(fromJS({
          index: 0,
          routes: [
            { key: 'welcome' },
          ]
        }));
      } );
    });

    describe( "navigatePush()", function (){

      it( "Push new route to navigation state", function () {
        const state = fromJS({
          index: 0,
          routes: [
            { key: 'subjects' },
          ]
        });

        const nextState = navigatePush( state, {
          route: { key: 'quiz' }
        });

        expect( nextState ).to.equal(fromJS({
          index: 1,
          routes: [
            { key: 'subjects' },
            { key: 'quiz' }
          ]
        }));
      });

      it( "Push new route with the same key as in last item of current route stack and it should be ignored", function () {
        const state = fromJS({
          index: 2,
          routes: [
            { key: 'subjects' },
          ]
        });

        const nextState = navigatePush( state, {
          route: { key: 'subjects' }
        });

        expect( nextState ).to.equal(fromJS({
          index: 2,
          routes: [
            { key: 'subjects' },
          ]
        }));
      });

    });
  });

});
