$(function() {


  function buildMessage(message){
    var imagehtml = message.image == null ? "" : `<img class="contents__chat-main__messages__comment-form1__comment__image" src="${message.image}">`;
    var html = `<div class="contents__chat-main__messages__comment-form1">
                  <div class="contents__chat-main__messages__comment-form1__username-date">
                    <div class="contents__chat-main__messages__comment-form1__username-date__username">
                    ${message.user_name}
                    </div>
                    <div class="contents__chat-main__messages__comment-form1__username-date__date">
                    ${message.date}
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
      var html = buildMessage(data);
      $('.contents__chat-main__messages').append(html);
      $('.contents__chat-main__messages').animate({scrollTop: $('.contents__chat-main__messages')[0].scrollHeight}, 'fast');
      $('.new_message')[0].reset();
      $('.contents__chat-main__form__button').prop("disabled",false);
    })
    .fail(function(){
      alert('メッセージ送信に失敗しました');
    });
  });
});