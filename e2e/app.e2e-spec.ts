import { UploadFilesPage } from './app.po';

describe('upload-files App', function() {
  let page: UploadFilesPage;

  beforeEach(() => {
    page = new UploadFilesPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
