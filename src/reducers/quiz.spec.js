import {fromJS, Map, List} from 'immutable';
import {expect} from 'chai';
import {selectQuestionOption, updateTimer} from './quiz';


describe( "Reducers", function () {

  describe( "Quiz reducers", function () {

    describe( "selectQuestionOption()", function () {

      it( "Passed invalid option", function () {
        const state = fromJS({
          passedQuestions: [],
          questionIndex: 0,
          questions: [{
            id: "572892d4c4b03ef75a293996",
            level: 1,
            target: "572892d4c4b03ef75a293994",
            options: [
              { id: "572892d4c4b03ef75a293996" },
              { id: "572892d4c4b03ef75a293992" },
              { id: "572892d4c4b03ef75a293994" },
              { id: "572892d4c4b03ef75a293995" },
            ]
          }],
        });

        const nextState = selectQuestionOption( state, { optionId: "572892d4c4b03ef75a293992" } );

        expect( nextState.get( "passedQuestions" ).size ).to.equal( 0 );
      });



      it( "Passed valid option", function () {
        const state = fromJS({
          passedQuestions: [],
          questionIndex: 0,
          questions: [{
            id: "572892d4c4b03ef75a293996",
            level: 1,
            target: "572892d4c4b03ef75a293994",
            options: [
              { id: "572892d4c4b03ef75a293996" },
              { id: "572892d4c4b03ef75a293992" },
              { id: "572892d4c4b03ef75a293994" },
              { id: "572892d4c4b03ef75a293995" },
            ]
          }],
        });

        const nextState = selectQuestionOption( state, { optionId: "572892d4c4b03ef75a293994" } );

        expect( nextState.get( "passedQuestions" ) ).to.equal( List.of( "572892d4c4b03ef75a293996" ) );
      });



      it( "Passed valid options twice and the last one isn't pushed into passedQuestions", function () {
        const state = fromJS({
          passedQuestions: [],
          questionIndex: 0,
          questions: [{
            id: "572892d4c4b03ef75a293996",
            level: 1,
            target: "572892d4c4b03ef75a293994",
            options: [
              { id: "572892d4c4b03ef75a293996" },
              { id: "572892d4c4b03ef75a293992" },
              { id: "572892d4c4b03ef75a293994" },
              { id: "572892d4c4b03ef75a293995" },
            ]
          }],
        });

        let nextState = selectQuestionOption( state, { optionId: "572892d4c4b03ef75a293994" } );

        nextState = selectQuestionOption( nextState, { optionId: "572892d4c4b03ef75a293995" } );
        nextState = selectQuestionOption( nextState, { optionId: "572892d4c4b03ef75a293994" } );

        expect( nextState.get( "passedQuestions" ) ).to.equal( List.of( "572892d4c4b03ef75a293996" ) );
      });
    });



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
