import {fromJS} from 'immutable';
import {expect} from 'chai';
import {setSubjectList} from './subjects';



describe( "Reducers", function () {

  describe( "Quiz Subjects reducers", function () {

    describe("setSubjectList()", function () {

      it( "Fill empty subject list with new items. All item properties which are not provided, filled by default values", function () {
        const state = fromJS({
          items: []
        });


        const nextState = setSubjectList( state, {
          subjects: [
            {
              id: "5728926cc4b03ef75a29397d",
              title: "Geography",
              desc: "Try to determine logical realation among geographic entities(coutries, cities, rivers, .etc)",
            },
            {
              id: "5728926cc5768ef75a293b4a",
              title: "Physics",
            },
            {
              title: "Programming",
            }
          ]
        });

        expect( nextState ).to.equal(fromJS({
          items: [
            {
              id: "5728926cc4b03ef75a29397d",
              title: "Geography",
              desc: "Try to determine logical realation among geographic entities(coutries, cities, rivers, .etc)",
              thumbnail: ""
            },
            {
              id: "5728926cc5768ef75a293b4a",
              title: "Physics",
              desc: "",
              thumbnail: "",
            },
            {
              id: null,
              title: "Programming",
              desc: "",
              thumbnail: "",
            }
          ]
        }));

      });



      it( "Fill subject list with new items. Previous items must be removed", function () {
        const state = fromJS({
          items: [
            {
              id: "5728926cc4b03ef75a29397d",
              title: "Geography",
              desc: "Try to determine logical realation among geographic entities(coutries, cities, rivers, .etc)",
              thumbnail: ""
            },
            {
              id: "5728926cc5768ef75a293b4a",
              title: "Physics",
              desc: "",
              thumbnail: "",
            },
          ]
        });

        const nextState = setSubjectList( state, {
          subjects: [
            {
              title: "Programming",
            },
            {
              id: "5728926cc5768ef75a293b4a",
              title: "Physics",
            },
          ]
        });

        expect( nextState ).to.equal(fromJS({
          items: [
            {
              id: null,
              title: "Programming",
              desc: "",
              thumbnail: "",
            },
            {
              id: "5728926cc5768ef75a293b4a",
              title: "Physics",
              desc: "",
              thumbnail: "",
            },
          ]
        }));

      });

    });
  });
});
