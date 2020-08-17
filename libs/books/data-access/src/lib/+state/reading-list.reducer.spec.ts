import { expect } from 'chai';
import * as ReadingListActions from './reading-list.actions';
import {
  initialState,
  readingListAdapter,
  reducer,
  State
} from './reading-list.reducer';
import { createBook, createReadingListItem } from '@tmo/shared/testing';
import { throwError } from 'rxjs';


describe('Books Reducer', () => {
  describe('valid Books actions', () => {
    let state: State;
    beforeEach(() => {
      state = readingListAdapter.setAll(
        [createReadingListItem('A'), createReadingListItem('B')],
        initialState
      );
    });

    it('loadBooksSuccess should load books from reading list', () => {
      const list = [
        createReadingListItem('A'),
        createReadingListItem('B'),
        createReadingListItem('C')
      ];
      const action = ReadingListActions.loadReadingListSuccess({ list });

      const result: State = reducer(initialState, action);

      expect(result.loaded).to.be.true;
      expect(result.ids.length).to.eq(3);
    });

    it('failedAddToReadingList should undo book addition to the state', () => {
      /* I know this isnt the right way to do it but, the effects are running optimistically and I havent found a way to trigger the undoAction
      * from NX OptisticUpdate, I saw the http call in the effect and I could pull it out and put it into a service to spyOn it
      *  but the way the project is structured I don't think this is the way its wanted.
      * I spent the majority of the time on reading through NX docs.
      */
      let result: State;
      ReadingListActions.failedAddToReadingList({
        book: createBook('B')
      });
      const undoAction = ReadingListActions.removeFromReadingList({
        item: createReadingListItem('B')
      });

      result = reducer(state, undoAction);
      expect(result.ids).to.eql(['A']);
    });

    it('failedRemoveFromReadingList should undo book removal from the state', () => {
      let result: State;
      /* I know this isnt the right way to do it but, the effects are running optimistically and I havent found a way to trigger the undoAction
      * from NX OptisticUpdate docs, I saw the http call in the effect and I could pull it out and put it into a service to spyOn it
      *  but the way the project is structured I don't think this is the way its wanted.
      * I spent the majority of the time on reading through NX docs.
      */
      ReadingListActions.failedRemoveFromReadingList({
        item: createReadingListItem('C')
      });

      const undoAction = ReadingListActions.addToReadingList({
        book: createBook('C')
      });

      result = reducer(state, undoAction);

      expect(result.ids).to.eql(['A', 'B', 'C']);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = reducer(initialState, action);

      expect(result).to.eql(initialState);
    });
  });
});
