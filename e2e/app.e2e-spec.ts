import { CapstoneWebPage } from './app.po';

describe('capstone-web App', function() {
  let page: CapstoneWebPage;

  beforeEach(() => {
    page = new CapstoneWebPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
