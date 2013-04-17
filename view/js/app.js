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
        searchFormInput = searchForm.find('#searchInput');
        
        searchForm.on('submit', function (e) {
            e.preventDefault();
        });
        
        searchFormInput.on('focus blur', function() {
            curObj.setInputValue(searchFormInput);
        });
        
        searchFormInput.on('keyup', function() {
            searchInputValue = $(this).val();
            
            if (searchInputValue != 'Search..' && searchInputValue != '') {
                curObj.submitSearchQuery(searchInputValue);
            }
        });
	};
	
	this.setInputValue = function (input) {
        var $this = $(input);
        
        if($this.val() == 'Search..') {
            $this.val('');
        } else if ($this.val() == ''){
            $this.val('Search..');
        };
	}
	
	this.submitSearchQuery = function (searchQuery) {
        var url = "http://" + window.location.host + window.location.pathname + "?search=true&q=" + searchQuery;
		$.ajax({
            url: url,
            type: 'GET',
            dataType: "json",
            success: function( data ) {
                if($('.results')) {
                    $('.results').remove();
                };
                if($('.no-results')) {
                    $('.no-results').remove();
                };
                
                var resultsByBrand = curObj.groupByBrand(data);
                
                if(resultsByBrand.length > 0 ) {
                    $('#search_wrapper').append('<ul class="results"></ul>');
                
                    $.each(resultsByBrand, function(index, element){
                        if (element !== undefined) {
                            $('.results').append($('<li>'+'<a href="' + data.blocklist[index].my_series_url + '">' + data.blocklist[index].brand_title + '</a></li>'));
                        }
                    });
                } else {
                    $('#search_wrapper').append($('<div class="no-results">Sorry, no results found.</div>'));
                };
            },
            error: function() {
                //response( [] );
                console.log('error');
            }
        });
    }
    
    this.groupByBrand = function (data) {
        var results = new Array();
        
        if (data.blocklist.length > 0 ) {
            $.each(data.blocklist, function(index,element){
                if (results.indexOf(element.my_series_url) < 0) {
                   results[index] = element.my_series_url;
                }   
            });                
        }
        return results;
    }
}

function submitSearchQuery () {

}

// initiate when window is loaded
window.onload = init;