import { $, $$, browser, ExpectedConditions } from 'protractor';
import { expect } from 'chai';
import { BookSearchComponent } from '../../../../libs/books/feature/src/lib/book-search/book-search.component';
import { TestBed, tick } from '@angular/core/testing';
import { SinonSpy } from 'sinon';

describe('When: Use the search feature', () => {
  it('Then: I should be able to search books by title', async () => {
    await browser.get('/');
    await browser.wait(
      ExpectedConditions.textToBePresentInElement($('tmo-root'), 'okreads')
    );

    const form = await $('form');
    const input = await $('input[type="search"]');
    await input.sendKeys('javascript');
    await form.submit();

    const items = await $$('[data-testing="book-item"]');
    expect(items.length).to.be.greaterThan(1, 'At least one book');
  });

  it('Then: I should see search results as I am typing', async () => {

    await browser.get('/');
    await browser.wait(
      ExpectedConditions.textToBePresentInElement($('tmo-root'), 'okreads')
    );
    // TODO: Implement this test!
    const fixture = TestBed.createComponent(BookSearchComponent);
    fixture.detectChanges();
    const grid = await $('book-grid');
    const gridItems = await $$('[data-testing="book-item"]');
    expect(grid).to.be.empty;
    const input = await $('input[type="search"]');
    await input.sendKeys('javascript');
    tick(500);
    expect(gridItems.length).to.be.greaterThan(1, 'There are books');
  });
});
