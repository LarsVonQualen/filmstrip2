import { Filmstrip2Page } from './app.po';

describe('filmstrip2 App', function() {
  let page: Filmstrip2Page;

  beforeEach(() => {
    page = new Filmstrip2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
