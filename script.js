let message = '';
let isChatOpened = false;
let botloaded = false;
let botreplied = false;
let messageSentCount = 0;

document.getElementById("convivaChatInput").addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        message = e.target.value;
        if(message){
            doCallAgentforce();
            e.target.value = '';
        }
    }
});
function initEmbeddedMessaging() {
    try {
        embeddedservice_bootstrap.settings.language = 'en_US'; // For example, enter 'en' or 'en-US'
        embeddedservice_bootstrap.init(
            '00DVA000008Fuc9',
            'ConvivaSandeepDemo',
            'https://convivareimagined--partialsb.sandbox.my.site.com/ESWConvivaSandeepDemo1766433506241',
            {
                scrt2URL: 'https://convivareimagined--partialsb.sandbox.my.salesforce-scrt.com'
            }
        );
        window.addEventListener('onEmbeddedMessageSent', function (event) {
            console.log("✅ onEmbeddedMessageSent");
            messageSentCount++;
            if(messageSentCount>=2){
               botreplied = true;
           
            }
        });
          window.addEventListener('onEmbeddedMessagingConversationParticipantChanged', function (event) {
            console.log("✅ onEmbeddedMessagingConversationParticipantChanged");
              botloaded =true;
               const chatWindow = document.querySelector('[data-id="convivaAIChatWindow"]');
            chatWindow.classList.add("hideContainer");
            chatWindow.classList.remove("unhideContainer");
        });
        window.addEventListener("onEmbeddedMessagingReady", () => {
            console.log("✅ onEmbeddedMessagingReady");
            setTimeout(() => {
                if(!isChatOpened){
                    //const chatBubble = document.querySelector('[data-id="convivaAIChatBubble"]');
                    //chatBubble.classList.add("unhideContainer");
                    //chatBubble.classList.remove("hideContainer");
                }
            }, 1500);
        });
        window.addEventListener('onEmbeddedMessagingConversationStarted', function (event) {
            console.log("✅ onEmbeddedMessagingConversationStarted");
           // const chatWindow = document.querySelector('[data-id="convivaAIChatWindow"]');
           // chatWindow.classList.add("hideContainer");
            //chatWindow.classList.remove("unhideContainer");
        });
        window.addEventListener('onEmbeddedMessagingFirstBotMessageSent', function (event) {
            console.log("✅ onEmbeddedMessagingFirstBotMessageSent");
            console.log(message);
            embeddedservice_bootstrap.utilAPI.sendTextMessage(message);
        });
        window.addEventListener('onEmbeddedMessagingConversationOpened', function (event) {
            console.log("✅ onEmbeddedMessagingConversationOpened");
            isChatOpened = true;
            //const chatBubble = document.querySelector('[data-id="convivaAIChatBubble"]');
            //chatBubble.classList.add("hideContainer");
            //chatBubble.classList.remove("unhideContainer");
        });
        window.addEventListener('onEmbeddedMessagingWindowClosed', function (event) {
            isChatOpened = false;
            botloaded = false;
            botreplied = false;
            messageSentCount = 0;
             const quickChatContainer = document.querySelector('[data-id="quickChatContainer"]');
            quickChatContainer.classList.remove("hideQuickContainer");
            const quickChatLoadContainer = document.querySelector('[data-id="quickChatLoadContainer"]');
            quickChatLoadContainer.classList.add("hideQuickContainer");
            
        });
    } catch (err) {
        console.error('Error loading Embedded Messaging: ', err);
    }
};
function doOpenConvivaAIChatWindow() {
    const chatBubble = document.querySelector('[data-id="convivaAIChatBubble"]');
    chatBubble.classList.add("hideContainer");
    chatBubble.classList.remove("unhideContainer");
    const chatWindow = document.querySelector('[data-id="convivaAIChatWindow"]');
    chatWindow.classList.add("unhideContainer");
    chatWindow.classList.remove("hideContainer");
}
function doMinimizeConvivaAIChatWindow() {
    const chatBubble = document.querySelector('[data-id="convivaAIChatBubble"]');
    chatBubble.classList.add("unhideContainer");
    chatBubble.classList.remove("hideContainer");
    const chatWindow = document.querySelector('[data-id="convivaAIChatWindow"]');
    chatWindow.classList.add("hideContainer");
    chatWindow.classList.remove("unhideContainer");
}
function onTalkToSales(){
    message = 'Talk to sales';
    doCallAgentforce();
}
function onShowMeAConvivaDemo(){
    message = 'Show me a Conviva demo';
    doCallAgentforce();
}
function onHowCanConvivaHelpMyBusiness(){
    message = 'How can Conviva help my business';
    doCallAgentforce();
}
function onINeedTechnicalSupport(){
    message = 'I need technical support';
    doCallAgentforce();
}
function doCallAgentforce() {
            const quickChatContainer = document.querySelector('[data-id="quickChatContainer"]');
            quickChatContainer.classList.add("hideQuickContainer");
            const quickChatLoadContainer = document.querySelector('[data-id="quickChatLoadContainer"]');
            quickChatLoadContainer.classList.remove("hideQuickContainer");

    
    embeddedservice_bootstrap.utilAPI.launchChat();
}
