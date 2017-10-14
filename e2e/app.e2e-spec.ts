import { MacallanPage } from './app.po';

describe('macallan App', () => {
  let page: MacallanPage;

  beforeEach(() => {
    page = new MacallanPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
