document.addEventListener('DOMContentLoaded', function () {
  const container = document.querySelector('.chatbot-container');
  if (!container) return;

  const toggleBtn = container.querySelector('.chatbot-toggle');
  const chatWindow = container.querySelector('.chatbot-window');
  const messagesContainer = container.querySelector('.chatbot-messages-container');
  const form = container.querySelector('.chatbot-input-form');
  const input = container.querySelector('.chatbot-input');
  const sendBtn = container.querySelector('.chatbot-send-button');
  const refreshBtn = container.querySelector('.chatbot-refresh');
  const unreadBadge = container.querySelector('.unread-badge');

  let unreadCount = 0;

 
  const botResponses = [
    {
      keywords: ['about', 'who are you', 'info', 'developer'],
      response: "I'm the AI assistant for Fahim Ahmad, a passionate Full Stack Web Developer with over 3 years of experience. He specializes in creating custom, responsive web applications with a keen eye for UI/UX design and SEO optimization."
    },
    {
      keywords: ['skill', 'tech', 'stack', 'language', 'tool', 'html', 'css', 'react', 'node'],
      response: "Fahim's core skills include: \nFrontend: HTML5, CSS3, JavaScript, React.js, and Tailwind CSS. \nBackend: Node.js. \nDatabases: MySQL and MongoDB. \nHe's also proficient with Git/GitHub, Figma, and Python/TensorFlow for AI projects."
    },
    {
      keywords: ['project', 'work', 'portfolio', 'job', 'app'],
      response: "Fahim has developed several key projects, including an AI-powered Web App, a secure Banking Website template, and an AI-driven Chatbot. He is proud of enhancing UI/UX to increase user retention and delivering projects with a 100% client satisfaction rate."
    },
    {
      keywords: ['experience', 'history', 'freelance'],
      response: "Since 2022, Fahim has worked as an Independent Developer, Founder, and Freelancer. A major achievement was boosting organic traffic by 20-30% for clients by implementing SEO best practices."
    },
    {
      keywords: ['education', 'degree', 'college', 'szabist'],
      response: "Fahim is currently pursuing a Bachelor of Science in Computer Science at SZABIST Karachi Campus (2022-2026). He previously specialized in Computer Science at Cadet College Jhang."
    },
    {
      keywords: ['contact', 'email', 'get in touch', 'hire'],
      response: "You can reach Fahim directly by email at moonhunzai83@gmail.com. You can also find his portfolio link and GitHub on the main page. He's ready to contribute his expertise to innovative web solutions!"
    },
    {
      keywords: ['hobbies', 'interests', 'football'],
      response: "Outside of coding, Fahim's interests include AI Research & Development, tech community involvement, football, and creative problem-solving."
    },
    {
      keywords: ['hello', 'hi', 'hey', 'greetings'],
      response: "Hello there! I'm Fahim's AI assistant. How can I help you today? You can ask about his skills, projects, or how to get in touch."
    }
  ];
  const fallbackResponse = "I'm not sure how to answer that, but I'm still learning. You could try asking about Fahim's skills, experience, projects, or contact information.";
  const greetingPrompts = ["Tell me about his skills", "What projects has he built?", "How can I contact him?"];


  toggleBtn.addEventListener('click', toggleChatWindow);
  form.addEventListener('submit', handleFormSubmit);
  refreshBtn.addEventListener('click', handleRefresh);
  messagesContainer.addEventListener('click', handleMessageEvents);

 
  function toggleChatWindow() {
    container.classList.toggle('is-open');
    if (container.classList.contains('is-open')) {
      input.focus();
      if (messagesContainer.children.length === 0) {
        greetUser();
      }
      unreadCount = 0;
      updateUnreadBadge();
    }
  }

  function greetUser() {
    addMessage("Hello! I'm Fahim Ahmad's virtual assistant. 👋", 'bot');
    setTimeout(() => addQuickPrompts(greetingPrompts), 600);
  }

  function handleRefresh() {
    messagesContainer.innerHTML = '';
    greetUser();
    input.value = '';
    sendBtn.disabled = false;
  }

  function handleMessageEvents(e) {
    if (e.target.closest('.copy-btn')) {
      handleCopyClick(e.target.closest('.copy-btn'));
    }
    if (e.target.closest('.prompt-button')) {
      handlePromptClick(e.target.closest('.prompt-button'));
    }
  }

  function handleCopyClick(copyBtn) {
    const bubbleText = copyBtn.closest('.message-content').querySelector('.chatbot-bubble').textContent;
    navigator.clipboard.writeText(bubbleText).then(() => {
      copyBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
      setTimeout(() => {
        copyBtn.innerHTML = '<i class="fa-solid fa-copy"></i>';
      }, 1500);
    });
  }

  function handlePromptClick(promptBtn) {
    input.value = promptBtn.textContent.trim();
    form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
  }

  function handleFormSubmit(e) {
    e.preventDefault();
    const userMessage = input.value.trim();
    if (!userMessage) return;

    addMessage(userMessage, 'user');
    input.value = '';

    const quickPrompts = messagesContainer.querySelector('.chatbot-quick-prompts');
    if (quickPrompts) quickPrompts.remove();

    showTypingIndicator();

    setTimeout(() => {
      const botReply = getBotReply(userMessage);
      hideTypingIndicator();
      addMessage(botReply, 'bot');

      if (!container.classList.contains('is-open')) {
        unreadCount++;
        updateUnreadBadge();
      }
    }, 1200 + Math.random() * 500); 
  }

  function addMessage(text, sender) {
    const messageWrapper = document.createElement('div');
    messageWrapper.className = `chatbot-message ${sender}`;

    const messageContent = document.createElement('div');
    messageContent.className = 'message-content';

    const bubbleDiv = document.createElement('div');
    bubbleDiv.className = 'chatbot-bubble';
    bubbleDiv.textContent = text;

    const metaDiv = document.createElement('div');
    metaDiv.className = 'message-meta';

    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    metaDiv.innerHTML = `<span class="message-timestamp">${timestamp}</span>`;
    if (sender === 'bot') {
      metaDiv.innerHTML += `<button class="copy-btn" aria-label="Copy message"><i class="fa-solid fa-copy"></i></button>`;
    }

    messageContent.appendChild(bubbleDiv);
    messageContent.appendChild(metaDiv);
    messageWrapper.appendChild(messageContent);
    messagesContainer.appendChild(messageWrapper);
    scrollToBottom();
  }

  function addQuickPrompts(prompts) {
    const promptsContainer = document.createElement('div');
    promptsContainer.className = 'chatbot-quick-prompts';
    prompts.forEach(promptText => {
      const button = document.createElement('button');
      button.className = 'prompt-button';
      button.innerHTML = `<i class="fa-solid fa-bolt"></i> ${promptText}`;
      promptsContainer.appendChild(button);
    });
    messagesContainer.appendChild(promptsContainer);
    scrollToBottom();
  }

  function updateUnreadBadge() {
    unreadBadge.textContent = unreadCount;
    unreadBadge.classList.toggle('visible', unreadCount > 0);
  }

  function getBotReply(userInput) {
    const lowerCaseInput = userInput.toLowerCase();
    for (const item of botResponses) {
      if (item.keywords.some(keyword => lowerCaseInput.includes(keyword))) {
        return item.response;
      }
    }
    return fallbackResponse;
  }

  function showTypingIndicator() {
    sendBtn.disabled = true;
    const typingDiv = document.createElement('div');
    typingDiv.className = 'chatbot-message bot';
    typingDiv.innerHTML = `
            <div class="message-content">
                <div class="chatbot-bubble typing-indicator">
                    <div class="dot"></div><div class="dot"></div><div class="dot"></div>
                </div>
            </div>`;
    typingDiv.id = 'typing-indicator';
    messagesContainer.appendChild(typingDiv);
    scrollToBottom();
  }

  function hideTypingIndicator() {
    const typingIndicator = messagesContainer.querySelector('#typing-indicator');
    if (typingIndicator) typingIndicator.remove();
    sendBtn.disabled = false;
    input.focus();
  }

  function scrollToBottom() {
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }
});