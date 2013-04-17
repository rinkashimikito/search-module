<?php 
require 'model/SearchExtendedModel.php';
/**
 * 
 */
class SearchController {

    // @var array internal module configuration
    private $_config;
    
    private $_searchExtended;
    
    private $_results = array();
    
    public function __construct($config = array()) {
		$this->_config = $config;
    }
    
	public function indexAction() {
		include 'view/searchIndex.php';
	}
	
    public function resultsAction($params = array()) { 
		$se = $this->_getSearchExtended();
		
		$queryParams = array('q' => $_GET['q']);
		$this->_results = $se->getResults($queryParams); 
	
	    include 'view/searchResults.php';
    }
    
    public function getResults() {
        return $this->_results;
    }
    
    private function _getSearchExtended() {
		if (isset($this->_searchExtended)) {
		    return $this->_searchExtended;
		}
		
		$this->_setSearchExtended();
		return $this->_searchExtended;
    }
    
    private function _setSearchExtended() {
		$this->_searchExtended = new SearchExtendedModel();
		if (isset($this->_config['search']['base_url'])) {
			$this->_searchExtended->setSearchUrl($this->_config['search']['base_url']);
		}
    }
}
