// Listen for form submit
document.getElementById('myForm').addEventListener('submit', saveBookmark);

// Save Bookmark Function
function saveBookmark(e){
	
	// Get form values
	var siteName = document.getElementById('siteName').value;
	var siteUrl = document.getElementById('siteUrl').value;
	
	// validate form
	if(!validateForm(siteName, siteUrl)){
		return false;
	}

	// create an array of Object to save submitted data to local storage
	var bookmark = {
		name: siteName,
		url: siteUrl
	};

	/* 
		//Local Storage Test - save test data to local storage
		localStorage.setItem('test', 'Hello World!');
		// get test data from local storage and display in console
		console.log(localStorage.getItem('test'));
		// remove test data from local storage
		localStorage.removeItem('test');
		console.log(localStorage.getItem('test'));
	*/

	// if bookmarks is empty...
	if(localStorage.getItem('bookmarks') === null) {
		// init JSON array
		var bookmarks = [];
		// add to array
		bookmarks.push(bookmark);
		// set JSON array to local storage as a String
		localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
	} else {
		// get bookmarks from local storage as a JSON object
		var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
		// add bookmark to JSON array
		bookmarks.push(bookmark);
		// re-set bookmarks back to local storage
		localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
	}

	// clear form
	document.getElementById('myForm').reset();

	// re-fetch bookmarks to refresh markup
	fetchBookmarks();

	// Prevent form submitting
	e.preventDefault();
}

// Delete bookmark function
function deleteBookmark(url){
	// get bookmarks from local storage as a JSON object
	var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

	// iterate thro' bookmarks
	for(var i = 0; i < bookmarks.length; i++) {
		// if current bookmark url equals param url
		if(bookmarks[i].url == url){
			// remove current bookmark from bookmarks
			bookmarks.splice(i, 1);
		}
	}
	// re-set bookmarks back to local storage
	localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

	// re-fetch bookmarks to refresh markup
	fetchBookmarks();
}

// Fetch bookmarks function
function fetchBookmarks(){
	// get bookmarks from local storage as a JSON object
	var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

	// get output id
	var bookmarksResults = document.getElementById('bookmarksResults');

	// build output
	bookmarksResults.innerHTML = '';

	// iterate thro' bookmarks
	for(var i = 0; i < bookmarks.length; i++) {
		// get name
		var name = bookmarks[i].name;
		// get URL
		var url = bookmarks[i].url;

		// build output
		bookmarksResults.innerHTML += '<div class="well">'+
																	 '<h3>'+name+
																	 ' <a class="btn btn-default" target="_blank" href="'+url+'">Visit</a>'+
																	 ' <a onClick="deleteBookmark(\''+url+'\')" class="btn btn-danger" href="#">Delete</a>'+
																	 '</h3>'+
																	 '</div>';
	}
}

/* Input Validation Function */
function validateForm(siteName, siteUrl){

	// if siteName or siteUrl has not been entered
	if(!siteName || !siteUrl){
		alert('Please fill in the form');
		return false;
	}

	// regular expression to format a URL
	var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
	var regex = new RegExp(expression);
	// if URL doesn't match regex
	if(!siteUrl.match(regex)){
		alert('Please use a valid URL');
		return false;
	}

	return true;
}