**Book Search Component**
- 
- The Store Select could be implemented in a pipaable fashion for further refinement.
- The Subscription is long lived and could cause a memory leak.
- Could opt to use a async pipe in the template since the `books` property is only used once. This would also unsubscribe itself.
- Format Date method returns undefined, and theres no null checks in the template and will cause ungraceful error.
- `searchBooks()` method could be converted to a simpler ternary expression.
- Would make `book-search` a module for reusability

**Reading List Component**
- 
- `readingList$` should have a type of `Observable<ReadingListItem[]>`
- Type errors for utility class `Omit`, could be a workspace mismatch of TS lib.

**Total Count Component**
- 
-
**Accessibility** 
-
- `button.mat-focus-indicator.mat-icon-button` is missing an aria label since its content is an icon.
-  The "Reading List" button fails ADA Guidelines because its background is not visible to contrast it enough to be a button visually.
- `p` element in the `.empty` class selector is does not contrast enough against its background.
