//we only start performing actions when our page has loaded
$(document).ready(function() {
    // here we load our unordered list of comments when this list has been loaded
    comments.forEach(function(item) {
        $('#commentsList').append(`<li class="list-group-item"><h6 class="commentHeading">Rating: ${item.rating + '/5'}</h6>${item.content} <b><i>- ${item.name}</i></b>`);
    });
});