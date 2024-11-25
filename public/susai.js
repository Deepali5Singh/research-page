$(document).ready(function () {
  const chatDisplay = $("#chat");
  const chatInput = $("#chat_msg");
  const sendButton = $("#submit-btn");

  // Function to append messages to the chat
  function appendMessage(message, isUser) {
    const messageDiv = $("<div>").addClass(
      isUser ? "flex justify-end mb-4" : "flex justify-start mb-4"
    );
    const messageContent = $("<div>")
      .addClass(
        isUser
          ? "bg-blue-500 text-white max-w-lg rounded-xl px-4 py-2.5 text-base shadow-md"
          : "bg-zinc-200 dark:bg-zinc-700 text-zinc-800 dark:text-white max-w-lg rounded-xl px-4 py-2.5 text-base shadow-md"
      )
      .text(message);

    messageDiv.append(messageContent);
    chatDisplay.append(messageDiv);
    chatDisplay.scrollTop(chatDisplay[0].scrollHeight); // Scroll to bottom
  }

  // Function to send a message
  function sendMessage(e) {
    e.preventDefault();
    const message = chatInput.val().trim();

    if (!message) return; // Exit if no input

    // Append user message
    appendMessage(message, true);
    chatInput.val(""); // Clear input field

    // Send the message to the server
    $.ajax({
      url: "/chatwithai", // Update to your server endpoint
      method: "POST",
      contentType: "application/json",
      data: JSON.stringify({ chat: message }),
      success: function (response) {
        // Append AI's response
        appendMessage(response.response, false);
      },
      error: function (xhr, status, error) {
        appendMessage(
          "Sorry, there was an error processing your request.",
          false
        );
        console.error("Error:", error);
      },
    });
  }

  // Event listeners for form submission and button click
  $("form").on("submit", sendMessage);
  sendButton.on("click", sendMessage);
});
