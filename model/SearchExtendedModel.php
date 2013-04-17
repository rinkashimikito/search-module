<?php

class SearchExtendedModel {

	private $_searchUrl;
	
	private $_searchParams = array(
		'q' => null,
		'category' => null,
		'coming_soon_within' => null,
		'local_radio' => 'exclude',
		'masterbrand' => null,
		'max_tleos' => 0,
		'media_set' => null,
		'page' => 1,
		'perpage' => 10,
		'search_availability' => 'iplayer',
		'service_type' => 'radio',
		'signed' => 0,
		'format' => 'json'
	);
	
	
	public function getResults($queryParams = array()) {
		if ($this->validateQuery($queryParams)) {
			$this->_searchParams = array_merge($this->_searchParams, $queryParams);
            $queryStringParams = array_filter($this->_searchParams, 'strlen');
			$queryString = $this->_searchUrl . '/';
			//$queryString = 'http://localhost/search2/test/fixtures/feedsample.json';
            
			foreach ($queryStringParams as $k => $v) {
			 $queryString .= $k . '/' . $v . '/';
			}

			$jsonResult = $this->_getJson($queryString);
			return $jsonResult; 
		}
		return false;
	}
	
	
	public function validateQuery($queryParams = array()) {
		$validParamsKeys = array_keys($this->_searchParams);
		
		foreach ($queryParams as $k => $v) {
			if (!in_array($k, $validParamsKeys)) {
				return false;
			}
			if ($k === 'q' && empty($v)) {
				return false;
			}
		}
		return true;
		
	}
	
	
	private function _getJson($url) {
		$json = file_get_contents($url); 
		return $json;
	}
	
	public function setSearchUrl($url) {
		$this->_searchUrl = $url;
	}
	
	public function getSearchUrl() {
		return $this->_searchUrl;
	}
	
}