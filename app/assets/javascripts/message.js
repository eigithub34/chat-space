$(function() {


  function buildHTML(message){
    var imagehtml = message.image == null ? "" : `<img class="contents__chat-main__messages__comment-form1__comment__image" src="${message.image}">`;
    var html = `<div class="contents__chat-main__messages__comment-form1" data-messageid="${message.id}">
                  <div class="contents__chat-main__messages__comment-form1__username-date">
                    <div class="contents__chat-main__messages__comment-form1__username-date__username">
                    ${message.user_name}
                    </div>
                    <div class="contents__chat-main__messages__comment-form1__username-date__date">
                    ${message.created_at}
                    </div>
                  </div>
                  <div class="contents__chat-main__messages__comment-form1__comment">
                    <p class="contents__chat-main__messages__comment-form1__comment__content">
                    ${message.content}
                    </p>
                    ${imagehtml}
                  </div>
                </div>`
    return html;
  }

  $('#new_message').on('submit', function(e) {
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.contents__chat-main__messages').append(html);
      $('.contents__chat-main__messages').animate({scrollTop: $('.contents__chat-main__messages')[0].scrollHeight}, 'fast');
      $('.new_message')[0].reset();
    })
    .fail(function(){
      alert('メッセージ送信に失敗しました');
    })
    .always(function(){
      $('.contents__chat-main__form__button').prop("disabled",false);
    })
  });

  function reloadMessages() {
    if (window.location.href.match(/\/groups\/\d+\/messages/)) {
      var last_message_id = $('.contents__chat-main__messages__comment-form1:last').data('messageid');
      $.ajax({
        url: 'api/messages',
        type: 'get',
        dataType: 'json',
        data: {id: last_message_id}
      })
      .done(function(messages) {
        var insertHTML = '';
        messages.forEach(function(message) {
          if (message.id > last_message_id) {
            insertHTML = buildHTML(message);
            $('.contents__chat-main__messages').append(insertHTML);
            $('.contents__chat-main__messages').animate({scrollTop: $('.contents__chat-main__messages')[0].scrollHeight}, 'fast');
          };
        });
      })
      .fail(function() {
        alert('メッセージの取得に失敗');
      });
    };
  };
  setInterval(reloadMessages, 5000);
});