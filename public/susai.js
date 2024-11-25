$(document).ready(function () {
  const chatDisplay = $("#chat"); // Updated to match the 'message-area' ID
  const chatInput = $("#chat_msg"); // Matches input ID
  const sendButton = $("#submit-btn"); // Matches button ID

  // Function to append messages to the chat area
  function appendMessage(message, isUser) {
    const messageDiv = $("<div>").addClass(
      isUser ? "flex justify-end" : "flex justify-start"
    );
    const messageBubble = $("<div>")
      .addClass(
        isUser
          ? "user-message px-4 py-2 rounded-xl shadow-md text-base max-w-sm"
          : "ai-message px-4 py-2 rounded-xl shadow-md text-base max-w-sm"
      )
      .text(message);

    messageDiv.append(messageBubble);
    chatDisplay.append(messageDiv);

    // Scroll to the latest message
    chatDisplay.scrollTop(chatDisplay[0].scrollHeight);
  }

  // Function to handle message sending
  function sendMessage(e) {
    e.preventDefault(); // Prevent form submission
    const message = chatInput.val().trim();

    if (!message) return; // Ignore empty input

    // Append user message
    appendMessage(message, true);
    chatInput.val(""); // Clear input

    // Send the message to the server
    $.ajax({
      url: "/chatwithai", // Replace with your server endpoint
      method: "POST",
      contentType: "application/json",
      data: JSON.stringify({ chat: message }),
      success: function (response) {
        // Append AI's response
        appendMessage(response.response, false);
      },
      error: function (xhr, status, error) {
        appendMessage(
          "Sorry, an error occurred while processing your request.",
          false
        );
        console.error("Error:", error);
      },
    });
  }

  // Event listeners for message submission
  $("form").on("submit", sendMessage); // Form submission
  sendButton.on("click", sendMessage); // Button click
});
