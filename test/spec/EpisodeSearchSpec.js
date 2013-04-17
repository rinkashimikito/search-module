describe("Entering a string into a text box to search on", function() {
  var search;


  describe("Given I am on a Web Page", function() {

    beforeEach(function() {
      loadFixtures('form.html');
      search = new episodeSearch();
      search.init('search_episodes');
    });
    
    describe("When I type a Search String into a Text Box and Submit", function() {

      beforeEach(function() {
        // trigger a 'keyup event' on an input
        
        // trigger a 'submit' event on a submit button
        
      });
      
      
      it("I should be shown Results", function() {
        // TODO: check for results element
          var results = false;
          expect(results).toBeTruthy();
      });

      describe("and the Search String returns matches for brand name and there are available episodes for those brand names", function() {

        beforeEach(function() {
           // use a php enpoint with a fixture instead of live feed
        });
        
        it("episodes should be returned as results", function() {
          // check for right episodes url/titles - same as in the fixture feed
          var episodesList = false;
          expect(episodesList).toBeTruthy();
        });
      });
      describe("And the Search String returns no matches for brand name", function() {
        beforeEach(function() {
           // use a php enpoint with an epty results fixture instead of live feed
        });
        
        it("'no results' message should be displayed", function() {
          // TODO: check for no-results element
          var noResults = false;
          expect(noResults).toBeTruthy();
        
        });
      });
      
    });
    
    describe("When I begin typing a Search String into a Text Box and stop", function() {
    
     beforeEach(function() {
        // trigger a 'keyup event' on an input
            
      });
      
       describe("and there are brand names that contain the string I have typed", function() {

        beforeEach(function() {
           // use a php enpoint with a fixture instead of live feed
        });
        
        it(" a list of those brands should be dynamically shown", function() {
          // check for right episodes url/titles - same as in the fixture feed
          var episodesList = false;
          expect(episodesList).toBeTruthy();
        });
      });
      
    });
  });
});  