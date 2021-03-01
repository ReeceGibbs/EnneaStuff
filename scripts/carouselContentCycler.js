//function to dynamically change page content based on what carousel page we are on
// this function will server as our solution to the chained effects requirement
function setPageContent(direction, setPos) {
    //we only need to check if we're going left or right if we click the arrows
    if (setPos == null) {
        //get the current page of the carousel
        let currentPage = $('div.carousel-item.active').index() + 1;

        /*get and remove 'current' class from ennea-body that currently has it
        check to see if we are at either end of the carousel first
        https://www.w3schools.com/jquery/html_removeclass.asp*/
        if ((currentPage != 1 && direction == 'left') || (currentPage != 9 && direction == 'right')) { $('.ennea-body.current').removeClass('current').removeClass('saveable').removeClass('likeable'); }

        //check direction, so we know whether to go up or down
        if (direction == 'right') {
            //add 'current' class to enneabody based on the current carousel page
            $(`#type-${currentPage + 1}`).addClass('current').addClass('saveable').addClass('likeable');
        } else {
            //add 'current' class to enneabody based on the current carousel page
            $(`#type-${currentPage - 1}`).addClass('current').addClass('saveable').addClass('likeable');
        }
    }
    else {
        $('.ennea-body.current').removeClass('current').removeClass('saveable').removeClass('likeable');
        $(`#type-${setPos}`).addClass('current').addClass('saveable').addClass('likeable');
    }

    //check to see if current page is liked using our function
    //we set the class of our like button
    (checkLiked($('.likeable').attr('id'))) ? likeButton.addClass('liked') : likeButton.removeClass('liked');
}