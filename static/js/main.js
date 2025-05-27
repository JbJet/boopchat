const chat_box = $('.chat-box');
const bt_show_popup = $('#new-chat');
const pop_up = $('#pop-up');
const bt_close_popup = pop_up.closest('a');
const box = $('#messages');
let pollingInterval = null;
let currentChat = null;

chat_box.on("click", function() {
    const choosed_chat = $(this).closest('.chat-box');
    const dest_name = choosed_chat.find('.name-chat').text();
    
    if (pollingInterval) {
        clearInterval(pollingInterval);
    }
    
    currentChat = dest_name;
    box.empty();
    
    $.ajax({
        url: "/chat",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify({'d_username': dest_name}),
        success: function (response) {
            $("#chat-profile").find("h1").text(dest_name);
            adicionar_mensagens(response);
            
            pollingInterval = setInterval(function() {
                if (currentChat === dest_name) {
                    $.ajax({
                        url: "/chat",
                        type: "POST",
                        contentType: "application/json",
                        data: JSON.stringify({'d_username': dest_name}),
                        success: function (newResponse) {
                            if (newResponse.length !== response.length) {
                                box.empty();
                                adicionar_mensagens(newResponse);
                                response = newResponse;
                            }
                        },
                        error: function () {
                            clearInterval(pollingInterval);
                            pollingInterval = null;
                        }
                    });
                }
            }, 5000);
        }
    });
});

bt_show_popup.on('click', function() {
    pop_up.fadeIn("fast");
});

bt_close_popup.on('click', function() {
    pop_up.fadeOut("fast");
});

pop_up.on('click', function() {
    pop_up.fadeOut("fast");
});

$("#pop-up-box").on('click', function(e) {
    e.stopPropagation();
});

function adicionar_mensagens(response) {
    for(let i = 0; i < response.length; i++) {  
        box.append( `
            <div class="sent-message">
                <span class="username">${response[i]["remetente"]}</span>
                <p>${response[i]["mensagem"]}</p>
                <span class="date">${response[i]["data"]}</span>
            </div>
        `);
    }
}