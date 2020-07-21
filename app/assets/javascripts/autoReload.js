$(function(){
  function buildHTML(message){
    if ( message.image ) {
      let html =
        `<div class="list" data-message-id=${message.id}>
          <div class="message-user-name">
            <div class="message-name">
              ${message.user_name}
            </div>
            <div class="posting-time">
              ${message.created_at}
            </div>
          </div>
          <div class="message-comment">
            <p class="Message__content">
              ${message.content}
            </p>
            <img class="Message__image" src="${message.image}">
          </div>
        </div>`
      return html;
    } else {
      let html =
      `<div class="list" data-message-id=${message.id}>
        <div class="message-user-name">
          <div class="message-name">
            ${message.user_name}
          </div>
          <div class="posting-time">
            ${message.created_at}
          </div>
        </div>
        <div class="message-comment">
          <p class="Message__content">
            ${message.content}
          </p>
        </div>
      </div>`
      return html;
    };
  }

  let reloadMessages = function() {
    let last_message_id = $('.list:last').data("message-id") || 0;
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0) {
        let insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        $('.message-list').append(insertHTML);
        $('.message-list').animate({ scrollTop: $('.message-list')[0].scrollHeight});
      }
    })
    .fail(function() {
      alert('error');
    });
  };
  setInterval(reloadMessages, 7000);
});