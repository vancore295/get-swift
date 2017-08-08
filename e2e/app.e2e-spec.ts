import { GetSwiftPage } from './app.po';

describe('get-swift App', () => {
  let page: GetSwiftPage;

  beforeEach(() => {
    page = new GetSwiftPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
