let message = '';
let isChatOpened = false;
let botloaded = false;
let botreplied = false;
let messageSentCount = 0;

document.getElementById("AfFacadeChatInput").addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        message = e.target.value;
        if(message){
            doCallAgentforce();
            e.target.value = '';
        }
    }
});

function pushPrechatFields() {
    try {
      if (window.embeddedservice_bootstrap?.prechatAPI?.setHiddenPrechatFields) {
       
        const preChatFields = {"url": window.location.href}
         console.log("📨 Prechat fields sent:", preChatFields);
        embeddedservice_bootstrap.prechatAPI.setHiddenPrechatFields(preChatFields);
      }
    } catch (e) {
      console.warn("Prechat push failed:", e);
    }
}


function initEmbeddedMessaging() {
    try {
		// Close button
			document.getElementById("closeModal").onclick = function() {
			document.getElementById("schedulerModal").style.display = "none";
			document.getElementById("schedulerFrame").src = ""; // optional reset
		};

		// Close if user clicks outside modal
		window.onclick = function(event) {
			const modal = document.getElementById("schedulerModal");
			if (event.target === modal) {
				modal.style.display = "none";
				document.getElementById("schedulerFrame").src = "";
			}
		};
        embeddedservice_bootstrap.settings.language = 'en_US'; // For example, enter 'en' or 'en-US'
        embeddedservice_bootstrap.init(
				'00DKj00000UY7YZ',
				'agentforcefacade',
				'https://tr1755503902062.my.site.com/ESWagentforcefacade1771516498152',
				{
					scrt2URL: 'https://tr1755503902062.my.salesforce-scrt.com'
				}
			);
        window.addEventListener('onEmbeddedMessageSent', function (event) {
            console.log("✅ onEmbeddedMessageSent",event);
            messageSentCount++;
			if ( event && event.detail && event.detail.conversationEntry && event.detail.conversationEntry.entryPayload &&
			   event.detail.conversationEntry.senderDisplayName !='Guest'){
				var v = JSON.parse(event.detail.conversationEntry.entryPayload);
				var messageHtml = v.abstractMessage.staticContent.text;
 					if (messageHtml.includes("https://scheduler.zoom.us")) {
					

						// Match Zoom scheduler link inside markdown
						const match = messageHtml.match(
							/https:\/\/scheduler\.zoom\.us\/[^\s)]+/
						);
						
						if (match) {
							const fullUrl = match[0];
							const modal = document.getElementById("schedulerModal");
							modal.style.display = "block";

							document.getElementById("schedulerFrame").src=fullUrl;
 							console.log("Extracted Zoom URL:", fullUrl);
						}
						
						
					}
				}
			
            if(messageSentCount>=1){
               botreplied = true;
             
            }
        });
          window.addEventListener('onEmbeddedMessagingConversationParticipantChanged', function (event) {
            console.log("✅ onEmbeddedMessagingConversationParticipantChanged");
              botloaded =true;
             
        });
        window.addEventListener("onEmbeddedMessagingReady", () => {
            console.log("✅ onEmbeddedMessagingReady");
            setTimeout(() => {
                if(!isChatOpened){
                    const chatBubble = document.querySelector('[data-id="AfFacadeAIChatBubble"]');
                    chatBubble.classList.add("unhideContainer");
                    chatBubble.classList.remove("hideContainer");
                }
            }, 1500);
            pushPrechatFields();
        });
        window.addEventListener('onEmbeddedMessagingConversationStarted', function (event) {
            console.log("✅ onEmbeddedMessagingConversationStarted");
           // const chatWindow = document.querySelector('[data-id="AfFacadeAIChatWindow"]');
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
               const chatWindow = document.querySelector('[data-id="AfFacadeAIChatWindow"]');
                chatWindow.classList.add("hideContainer");
                chatWindow.classList.remove("unhideContainer");
            //const chatBubble = document.querySelector('[data-id="AfFacadeAIChatBubble"]');
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

		 window.addEventListener('onEmbeddedMessageLinkClicked', function (event) {
                        console.log("✅onEmbeddedMessageLinkClicked",event);
        });
		

    } catch (err) {
        console.error('Error loading Embedded Messaging: ', err);
    }
	
};
function doOpenAfFacadeAIChatWindow() {
    const chatBubble = document.querySelector('[data-id="AfFacadeAIChatBubble"]');
    chatBubble.classList.add("hideContainer");
    chatBubble.classList.remove("unhideContainer");
    const chatWindow = document.querySelector('[data-id="AfFacadeAIChatWindow"]');
    chatWindow.classList.add("unhideContainer");
    chatWindow.classList.remove("hideContainer");
}
function doMinimizeAfFacadeAIChatWindow() {
    const chatBubble = document.querySelector('[data-id="AfFacadeAIChatBubble"]');
    chatBubble.classList.add("unhideContainer");
    chatBubble.classList.remove("hideContainer");
    const chatWindow = document.querySelector('[data-id="AfFacadeAIChatWindow"]');
    chatWindow.classList.add("hideContainer");
    chatWindow.classList.remove("unhideContainer");
}
function onTalkToSales(){
    message = 'Talk to sales';
    doCallAgentforce();
}
function onShowMeAAfFacadeDemo(){
    message = 'Show me a demo';
    doCallAgentforce();
}
function onHowCanAfFacadeHelpMyBusiness(){
    message = 'Continue last chat';
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
