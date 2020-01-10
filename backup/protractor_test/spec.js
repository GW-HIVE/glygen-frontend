// spec.js
/**
 * This contains the test cases for protractor js testing.
 * Documentation: https://www.dropbox.com/s/hank324yibhp4td/Set-up%20Protractor%20JS.docx?dl=0
 * Also check: https://github.com/GW-HIVE/glygen-frontend/wiki/Protractor-JS-testing
 * @author Gaurav Agarwal
 */

describe('Protein Search testing', function () {
  var website_url = 'https://tst.glygen.org/';  //end the URL with a '/'
  const numOfIterations = 100;

  beforeAll(function () {
    // browser.waitForAngularEnabled(false);
    browser.ignoreSynchronization = true;
    website_url = 'https://tst.glygen.org/';
  });

  //------------------------------------------------
  for (var i = 0; i < numOfIterations; i++) {
    it('should go to Protein Search page', function () {
      browser.get(website_url).then(() => {
        console.log("\nIteration starts--->");
        // browser.sleep(1000);  //wait for the page elements to load
        //click on the Glycan "explore" button
        element.all(by.css('.gg-card-explore')).get(1).click();
      });
      browser.sleep(1000);

      expect(browser.getTitle()).toEqual('Protein search - glygen');
      expect(browser.getCurrentUrl()).toEqual(website_url + 'protein_search.html');
    });
    //------------------------------------------------
    it('should go to Protein list page', function () {
      browser.sleep(1000);  //wait for the page elements to load
      var simpleSearchInput = element(by.id('simplifiedSearch')); // input field of simple search
      simpleSearchInput.clear().then(() => {
        simpleSearchInput.sendKeys('hsa:3082');
      });
      element.all(by.css('.btn-lg.btn-primary')).first().click();   // simple search button clicked
      browser.sleep(10000);  //wait for the ajax response and page transitions

      expect(browser.getTitle()).toEqual('Protein-list');
    });

    /** expected count of List page elements  */
    var totalListCount = 3;
    //------------------------------------------------
    it('number of results found', function () {
      browser.sleep(2000);  //wait for the ajax response and page transitions
      var result_count = element.all(by.css('.searchresult')).first().getText();
      browser.executeScript('window.scrollTo(0,400);').then(()=> {
        expect(result_count).toContain(totalListCount.toString());
      });
    });
    //------------------------------------------------
    var glycan_list_table = element(by.id('gen-table')).all(by.tagName('tr'));

    it('number of records displayed per page should match the selection', function () {
      browser.sleep(2000);
      glycan_list_table.count().then(function (count) {
        var rows = count - 1;   //ignoring the header row

        expect(rows).toEqual(totalListCount);
      });
    });
    //   //------------------------------------------------
    //   var glycan_ID = glycan_list_table.get(1).all(by.tagName('td')).get(1).element(by.tagName('a'));
    //   var glycan_ac = 'G00221CZ';

    //   it('The first glycan ID in the list should match our expectation', function () {
    //     expect(glycan_ID.getText()).toEqual(glycan_ac);
    //   });
    //   //------------------------------------------------
    //   it('detail-view should display properly on clicking +/- button', function () {
    //     //getting the second row from the glycan list table
    //     var list_detail_view = glycan_list_table.get(2).all(by.tagName('td')).get(0).element(by.tagName('a'));

    //     //clicking to expand "+" sign
    //     list_detail_view.click();
    //     expect(element(by.css('.detail-view')).isPresent()).toBe(true);

    //     //clicking to collapse "-" sign
    //     list_detail_view.click();
    //     expect(element(by.css('.detail-view')).isPresent()).toBe(false);
    //   });
    //   //------------------------------------------------
    //   it('should go to the respective glycan detail page', function () {
    //     glycan_ID.click();
    //     browser.sleep(1000);  //wait for the page elements to load
    //     var glycan_heading = element.all(by.css('.gg-panel-heading')).get(0).element(by.tagName('h4')).getText();

    //     expect(browser.getTitle()).toEqual('Details');
    //     expect(browser.getCurrentUrl()).toEqual(website_url + 'glycan_detail.html?glycan_ac=G00221CZ');
    //     expect(glycan_heading).toEqual(glycan_ac);
    //   });
  };
});
