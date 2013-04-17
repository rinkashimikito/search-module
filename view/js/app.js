function init() {
    var search = new episodeSearch();
    // initiate search
    search.init('search_episodes');
}		

// episode search object
function episodeSearch() {
	var curObj = this,
        searchForm,
        searchInputValue;
	
	// initiate search events
	this.init = function (searchFormId) {
        searchForm = $('#' + searchFormId),
        searchFormInput = searchForm.find('#searchInput');
        
        // disable submit
        searchForm.on('submit', function (e) {
            e.preventDefault();
        });
        
        // set input placeholder value
        searchFormInput.on('focus blur', function() {
            curObj.setInputValue(searchFormInput);
        });
        
        // search after keyup
        searchFormInput.on('keyup', function() {
        	clearTimeout($(this).data('timer')); // remove timeout
        	
            var delay = 2000; // 2 seconds delay after last input            
        	var searchInputValue = $(this).val(); // get input value
            
            $(this).data('timer', setTimeout(function(){
            	$(this).removeData('timer');
            	searchFormInput.addClass('in-progress');
                
                // Submit query after 2 seconds of last user input
                if (searchInputValue != 'Search..' && searchInputValue != '') {
                    curObj.submitSearchQuery(searchInputValue);
                }
            }, delay));
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
            	// clear previous results and in-progress class
            	searchFormInput.removeClass('in-progress');
                
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
            	// clear previous results and in-progress class
            	searchFormInput.removeClass('in-progress');
                
            	if($('.results')) {
                    $('.results').remove();
                };
                if($('.no-results')) {
                    $('.no-results').remove();
                };
                // add error message
            	$('#search_wrapper').append($('<div class="no-results error">Please try again later.</div>'));
            }
        });
    }
    
    this.groupByBrand = function (data) {
        var results = new Array();
        
        if (data.blocklist.length > 0 ) {
            $.each(data.blocklist, function(index,element){
            	// group by series URL, only currently available episodes
                if (results.indexOf(element.my_series_url) < 0 && element.availability == 'CURRENT') {
                   results[index] = element.my_series_url;
                }   
            });                
        }
        return results;
    }
}

// initiate when window is loaded
window.onload = init;