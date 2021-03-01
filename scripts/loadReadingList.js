//we only start performing actions when our page has loaded
$(document).ready(function() {
    // here we load our unordered list of saved items when this list has been loaded
    localContent.forEach(function(item) {
        //we populate our unordered list with the titles of the items that the user has saved
        $('#readingList').append(`<li type="button" class="list-group-item" data-toggle="modal" data-target="#${item.id}Modal">${item.title}</li>`);
        //we also populate our modal container div with the relevant content
        $('#modalContainer').append(
      `<div class="modal fade" id="${item.id}Modal" tabindex="-1" aria-labelledby="${item.id}ModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="${item.id}ModalLabel">${item.title}</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              ${item.content}
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="button" class="btn btn-danger" data-dismiss="modal" control-item="${item.id}" onclick="deleteReadingItem(this)">Delete</button>
            </div>
          </div>
        </div>
      </div>`);
    });
});