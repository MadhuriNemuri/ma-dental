import './index.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const WHATSAPP_NUMBER = '917799234108';

const quickReplies = [
  { label: 'Book an appointment', reply: 'I can help you get started. Share your preferred day and our care coordinator will confirm the next available slot.', whatsapp: 'I would like to book an appointment.' },
  { label: 'View treatments', reply: 'We offer smile design, implants, aligners, root canal care, gum care, and family dentistry.', whatsapp: 'I would like to know about your treatments.' },
  { label: 'Clinic hours', reply: 'We are open Monday to Saturday, 9:00 AM to 9:00 PM. Sunday visits are available by request.', whatsapp: 'I would like to confirm clinic hours.' },
  { label: 'Find the clinic', reply: 'You can find Ma Dental at Kotapalli Circle, Tirupati Road, Pileru, Andhra Pradesh.', whatsapp: 'I need directions to Ma Dental.' }
];

function DentalChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hi, I am the Ma Dental concierge. How can I help today?' }
  ]);
  const [input, setInput] = useState('');
  const navigate = useNavigate();

  const openWhatsApp = (message) => {
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const chooseReply = (option) => {
    if (option.label === 'Book an appointment') {
      setIsOpen(false);
      navigate('/book-appointment');
      return;
    }

    setMessages((current) => [
      ...current,
      { sender: 'user', text: option.label },
      { sender: 'bot', text: option.reply }
    ]);
  };

  const sendMessage = (event) => {
    event.preventDefault();
    const trimmedInput = input.trim();
    if (!trimmedInput) return;

    setMessages((current) => [
      ...current,
      { sender: 'user', text: trimmedInput },
      { sender: 'bot', text: 'Thanks for your message. I can connect you with our care coordinator on WhatsApp for a personal reply.' }
    ]);
    setInput('');
  };

  return (
    <div className={`dental-chatbot${isOpen ? ' is-open' : ''}`}>
      {isOpen && (
        <section className="chat-panel" aria-label="Ma Dental concierge chat">
          <header className="chat-header">
            <div className="chat-avatar" aria-hidden="true">
              <img
                src={`${process.env.PUBLIC_URL || ''}/Assets/chatboticon.png`}
                alt="Ma Dental Concierge"
                className="chat-avatar-icon"
              />
            </div>
            <div>
              <strong>Ma Dental Concierge</strong>
              <span><i /> Usually replies instantly</span>
            </div>
            <button type="button" className="chat-close" onClick={() => setIsOpen(false)} aria-label="Close chat">&times;</button>
          </header>

          <div className="chat-messages" aria-live="polite">
            <div className="chat-welcome">Today at Ma Dental</div>
            {messages.map((message, index) => (
              <div className={`chat-message ${message.sender}`} key={`${message.sender}-${index}`}>
                {message.text}
              </div>
            ))}
          </div>

          <div className="chat-options">
            {quickReplies.map((option) => (
              <button type="button" key={option.label} onClick={() => chooseReply(option)}>{option.label}</button>
            ))}
          </div>

          <form className="chat-input-row" onSubmit={sendMessage}>
            <input value={input} onChange={(event) => setInput(event.target.value)} placeholder="Write a message..." aria-label="Write a message" />
            <button type="submit" aria-label="Send message">&rarr;</button>
          </form>

          <button type="button" className="chat-whatsapp" onClick={() => openWhatsApp('Hello Ma Dental, I would like help with my dental care.')}>Continue on WhatsApp <span aria-hidden="true">&rarr;</span></button>
        </section>
      )}

      <button
        type="button"
        className={`chat-launcher${isOpen ? ' is-open' : ''}`}
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
        aria-label={isOpen ? 'Close dental concierge' : 'Open dental concierge'}
      >
        <img
          src={`${process.env.PUBLIC_URL || ''}/Assets/chatboticon.png`}
          alt="Ma Dental Chatbot"
          className="chat-rotating-icon"
        />
        {isOpen && <span className="launcher-close-badge" aria-hidden="true">&times;</span>}
      </button>
    </div>
  );
}

export default DentalChatbot;
