function init() {
    var search = new episodeSearch();
    // initiate search
    search.init('search_episodes');

    // #TODO hide JS-disabled error message
}		

function episodeSearch() {
	var curObj = this,
        searchForm,
        searchInputValue;
	
	this.init = function (searchFormId) {
        searchForm = $('#' + searchFormId),
        searchFormInput = searchForm.find('#searchInput'),
        searchInputValue = searchFormInput.val();
        
        searchForm.on('submit', function (e) {
            e.preventDefault();
            if (searchInputValue != 'Search..') {
                curObj.submitSearchQuery(searchInputValue);
            }
        });
        
        searchFormInput.on('focus blur', function() {
            curObj.setInputValue(searchFormInput);
        });
	};
	
	this.setInputValue = function (input) {
        var $this = $(input);
        
        if($this.val() == 'Search..') {
            $this.val('');
        } else {
            $this.val('Search..');
        };
	}
	
	this.submitSearchQuery = function (searchQuery) {
        var url = "http://localhost/search2/?search=true&q=" + searchQuery;
		$.ajax({
            url: url,
            type: 'GET',
            dataType: "json",
            success: function( data ) {
                if($('.results')) {
                    $('.results').remove();
                };
                $('#search_wrapper').append('<ul class="results"></ul>');
                
                if(data.blocklist.length > 0 ) {
                    $.each(data.blocklist, function(index,element){
                        $('.results').append($('<li>'+'<a href="' + element.my_series_url + '">' + element.complete_title + '</a></li>'));
                    });
                } else {
                    $('.results').append($('<li>Sorry, no results found.</li>'));
                };
            },
            error: function() {
                //response( [] );
                console.log('error');
            }
        });
    }
}

function submitSearchQuery () {

}

// initiate when window is loaded
window.onload = init;