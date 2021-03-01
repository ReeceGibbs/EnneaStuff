//we initialize our empty list of saveable content
let localContent = [];
//initialize list of liked items
let likedItems = [];
//initialize list of comments
let comments = [];
//initialize a variable that references our like button
let likeButton = $('#likeButton');
//initialize a variable that stores our enneagram logo orientation for the animation
let logoOrientation = 0;

//below is the constructor for our local content objects
function localItem(id, title, content) {
    this.id = id;
    this.title = title;
    this.content = content;
}

//below is the constructor for our comment objects 
function comment(name, rating, content) {
    this.name = name;
    this.rating = Number(rating);
    this.content = content;
}

// we start off by checking to see if our dom has loaded before we attempt to handle any events or run any functions
$(document).ready(function() {
    //we hide the side nav if our screen is too small. if so we hide the side nav
    // this is mainly for mobile use
    if (checkSmallWindow($(window))) {
        hideSideBar();
    }

    //we also want to show/hide the side nav on a window resize
    $(window).resize(function() {
        //if window gets smaller than 640 pixels then hide the sidebar
        if (checkSmallWindow($(window))) {
            hideSideBar();
        } else {
            showSideBar(true);
        }
    });

    //when we click on the enneagram logo it spins https://www.tutorialstuff.com/tutorials/jquery-rotate-image-animation-exampleexample
    //nice little easter egg that serves as our jquery animation requirement
    $('.logo').click(function(){
        //reference our logo
        let logo = $('.logo');
        //set our logo orientation to change by 90 degrees because we've clicked it
        logoOrientation = logoOrientation + 90;
        //animate the rotation
        $({degrees: logoOrientation - 90}).animate({degrees: logoOrientation}, {
            duration: 2000,
            step: function(now) {
            logo.css({
                transform: 'rotate(' + now + 'deg)'
            });
        }
      });
    });

    //double click/tap anywhere to show or hide the side bar
    $('.main').dblclick(function() {
        //check to see if the sidebar is hidden
        if ($('#side-bar').css('display') == 'none') {
            //if sidebar hidden, we check to see if our display is small
            if (checkSmallWindow($(window))) {
                //if window is small, we want to show the side bar but overlay it over the main area
                showSideBar(false);
            } else {
                showSideBar(true);
            }
        } else {
            //if the sidebar is currently shown we want to hide it
            hideSideBar();
        }
    });

    //when the page is loaded we load our data from localStorage
    loadLocalStorage();

    //check to see if current page is liked using our function
    //we set the class of our like button
    (checkLiked($('.likeable').attr('id'))) ? likeButton.addClass('liked') : likeButton.removeClass('liked');

    //we change our reading list info sub heading based on the number of items in our localContent list
    $('#readingListInfo').text((localContent.length) == 0 ? 
        'There are currently no items in your reading list. Hit the Save for Later button at the top of any of our saveable articles to add them to the list.' 
        : 'Click on any one of the list items below to view your saved content.');

    // here we load the number for our badge that indicates how many items we have saved in localStorage
    $('#savedItemsCount').text(localContent.length);

    // here we handle the instance where our user would like to like an item
    likeButton.click(function() {
        //initialize like item id for later
        let likeItemId = $('.likeable').attr('id');
        //check to see if the item is liked or not
        if (checkLiked(likeItemId)) {
            // if it is already liked remove
            likedItems.splice(likedItems.indexOf(likeItemId), 1);
        } else {
            // if it isn't liked add
            likedItems.push(likeItemId);
        }
        //save our changes in local storage
        localStorage.setItem('likedItems', JSON.stringify(likedItems));
        //toggle the liked class for styling
        likeButton.toggleClass('liked');
    });

    //here we handle the click event of our saveForLater button to save our articles locally on the client-side
    $('#saveForLater').click(function() {
        //initialize current saveable object title which we will use to search our list of objects
        let currSaveableId = $('.saveable').attr('id');
        //initialize the title our our saveable object
        let currSaveableTitle = $('.saveable').attr('title');
        //we create a new localItem using our constructor. we check to see if the item has already been saved and if it has we don't create a new one
        //if we can't find the item we want to save in local storage then we want to save it
        if (localContent.find((item) => item.id == currSaveableId) == undefined) {
            //initialize a new localItem using our constructor. we reference the item we want to save to get its contained html
            let newLocalItem = new localItem(currSaveableId, currSaveableTitle, $(`#${currSaveableId}`).html());
            // add our new item to our list
            localContent.push(newLocalItem);
            // set our localContent list to localStorage
            localStorage.setItem('localContent', JSON.stringify(localContent));
            // alert the user as to the success of their save
            alert('Save successful.\nYou can view your local content at any time by navigating to the Reading List tab.');
            //reload our page so that everything refreshes nicely
            location.reload();
        } else {
            alert('You have already saved this content in your local folder.\nYou can view your local content at any time by navigating to the Reading List tab.');
        }
    });
});

//function to load our content from localStorage
function loadLocalStorage() {
    //upon load, we populate our list of local content
    if (JSON.parse(localStorage.getItem('localContent')) == null) {
        //if our localStorage is empty we set it to our localContent list
        localStorage.setItem('localContent', JSON.stringify(localContent));
    } else {
        //if it's not empty, we set our localContent list to the one in our localStorage
        localContent = JSON.parse(localStorage.getItem('localContent'));
    }

    //upon load, we populate our list of liked items
    if (JSON.parse(localStorage.getItem('likedItems')) == null) {
        //if our localStorage is empty we set it to our likedItems list
        localStorage.setItem('likedItems', JSON.stringify(likedItems));
    } else {
        //if it's not empty, we set our likedItems list to the one in our localStorages
        likedItems = JSON.parse(localStorage.getItem('likedItems'));
    }

    //upon load, we populate our list comments
    if (JSON.parse(localStorage.getItem('comments')) == null) {
        //if our localStorage is empty we set it to our comment list
        localStorage.setItem('comments', JSON.stringify(comments));
    } else {
        //if it's not empty, we set our comments list to the one in our localStorages
        comments = JSON.parse(localStorage.getItem('comments'));
    }
}

//function that handles reading item deletes
function deleteReadingItem(readingItem) {
    //we get the item that the delete button controls and remove it from our list of items
    localContent.splice(localContent.findIndex((item) => item.id == $(readingItem).attr('control-item')), 1);
    //we not need to set our localStorage localContent item to the updated list
    localStorage.setItem('localContent', JSON.stringify(localContent));
    //we then reload the page so everything refreshes nicely
    location.reload();
}

//function to check our liked items 
function checkLiked(likeable) {
    //we check to see if our current item is a liked item
    if(likedItems.includes(likeable)) {
        return true;
    } else {
        return false;
    }
}

// our function to allow users to leave a comment
function leaveComment() {
    //we add a new comment to our comments list using our constructor
    comments.push(new comment(
        // if our user doesn't enter a name then we call them anonymous
        (document.commentForm.name.value.trim() == '') ? 'anonymous' : document.commentForm.name.value,
        document.commentForm.reviewRange.value,
        //if the user wants to leave an empty comment we let them
        document.commentForm.commentTextArea.value
    ));

    //we save our updates to localStorage
    localStorage.setItem('comments', JSON.stringify(comments));
}

//function to show side bar
function showSideBar(setMargin) {
    //we only change the margin of our main area back if we are resizing a window
    if (setMargin) {
        $('.main').css('margin-left', '320px');
    }
    //show the side-bar
    $('#side-bar').show();
}
function hideSideBar() {
    //set main area to full screen
    $('.main').css('margin-left', '0px');
    //hide the sidebar
    $('#side-bar').hide();
}

//function to check window width
function checkSmallWindow(window) {
    if(window.width() < 640){
        return true;
    } else {
        return false;
    }
}