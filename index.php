<?php
/**
 * index.php
 * 
 * This file displays search module
 * 
 * @author Marcin Kononiuk
 * @version 1.0
 * @package Search
 */
 
 require 'controller/SearchController.php';
 
 // load configuration
 $configFile = 'conf/config.ini';
 $config = parse_ini_file($configFile, true);
 
 // check config
 if ($config) {
	try {
	    //start SearchController
        $search = new SearchController($config);
        if (!empty($_GET['search'])) {
            $search->resultsAction();
        } else {
			$search->indexAction();
		}
	} catch (Exception $e) {
	    // in case of exception: render error view
		include 'view/error.html';
	}
 } else {
    // if no config: render error view
	include 'view/error.html';
 }
?>