import Lottie from "lottie-react";
import chatBot from "../assets/chatbot.json";
import chatBotClose from "../assets/closeIcon.json";
import send from "../assets/sendIcon.json";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { getCurrentUser } from "../features/store/auth/authSlice";
import { useEffect, useRef, useState } from "react";
import {
  useChatbotResponseMutation,
  useChatsQuery,
} from "../features/Apislices/ChatApiSlice";
import defaultProfile from "../assets/profile.webp";
const ChatBot = () => {
  const currentUser = useSelector(getCurrentUser);
  const [userMessage, setUserMessage] = useState("");
  const ChatbotRef = useRef<HTMLDivElement>(null);
  const ChatboxRef = useRef<HTMLDivElement>(null);
  const ChatbotToggler = useRef<HTMLButtonElement>(null);
  const messageInputRef = useRef<HTMLTextAreaElement>(null);

  const {
    data: previousChats,
    isLoading,
    refetch,
  } = useChatsQuery({
    email: currentUser?.email,
  });
  useEffect(() => {
    refetch();
  }, [previousChats]);
  const [chatResponse, { isLoading: gettingResponse }] =
    useChatbotResponseMutation();
  const [chats, setChats] = useState<any>([
    [
      "incoming",
      {
        message: `Hi there 👋🏽,
How can I help you today?`,
        videos: [],
      },
    ],
  ]);

  useEffect(() => {
    if (!isLoading && previousChats?.length) {
      setChats(previousChats);
    }
  }, [previousChats]);
  const handleChat = async () => {
    if (!userMessage) return;
    setChats((prev: any) => [
      ...prev,
      ["outgoing", { message: userMessage, videos: [] }],
    ]);
    ChatboxRef.current?.scrollTo(0, ChatboxRef.current.scrollHeight + 40);
    setUserMessage("");
    if (messageInputRef.current) {
      messageInputRef.current.style.height = "55px";
    }
    try {
      const response = await chatResponse({
        email: currentUser?.email,
        message: userMessage.trim(),
      }).unwrap();
      setChats((prev: any) => [...prev, ["incoming", response]]);
    } catch (err) {
      setChats((prev: any) => [
        ...prev,
        [
          "incoming",
          {
            message:
              "I’m sorry, but I can’t assist with that request. If you have any educational questions or need help with learning something new, feel free to ask!😊 or Check your internet connection.",
            videos: [],
          },
        ],
      ]);
    }
  };
  useEffect(() => {
    if (ChatboxRef.current) {
      ChatboxRef.current?.scrollTo(0, ChatboxRef.current.scrollHeight);
    }
  }, [chats]);
  const handleBtnToggle = () => {
    ChatbotToggler.current?.classList.toggle("big");
    ChatbotRef.current?.classList.toggle("show-chatbot");
    messageInputRef.current?.focus();
  };
  return (
    <div ref={ChatbotRef} className={"z-50"}>
      <button
        ref={ChatbotToggler}
        className="chatbot-toggler big"
        onClick={handleBtnToggle}
      >
        <Lottie className="chatbot-icon" animationData={chatBot} loop={true} />
        <Lottie
          className="chatbot-close-icon"
          animationData={chatBotClose}
          loop={false}
        />
      </button>
      <div className="chatbot">
        <div className="header">
          <h2>AI-Powered Study Assistant</h2>
          <button onClick={handleBtnToggle}>
            <Lottie
              className="chatbot-close-icon"
              animationData={chatBotClose}
              loop={false}
              style={{ width: "32px", height: "32px" }}
            />
          </button>
        </div>

        <div ref={ChatboxRef} className="chatbox">
          {chats.map((chat: any, index: number) =>
            chat[0] === "incoming" ? (
              <div key={index}>
                <div className={`chat incoming`}>
                  <span>
                    <Lottie animationData={chatBot} loop={true} />
                  </span>
                  <p className="">{chat[1].message}</p>
                </div>
                {chat[1].videos.length ? (
                  <div className="mt-2">
                    <p className="text-textcolor font-semibold text-sm">
                      recommended videos
                    </p>
                    <div className="flex gap-2 w-full overflow-x-auto">
                      {chat[1]?.videos.map((video: any, index: number) => (
                        <iframe
                          key={index}
                          src={`https://youtube.com/embed/${video.id}`}
                          title={video.title}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; web-share; gyroscope; picture-in-picture"
                          referrerPolicy="strict-origin-when-cross-origin"
                          allowFullScreen
                        ></iframe>
                      ))}
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>
            ) : (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <div className="chat outgoing">
                  <p>{chat[1].message}</p>
                  <span>
                    {currentUser?.photoURL ? (
                      <img src={currentUser?.photoURL} alt={"user image"} />
                    ) : (
                      <img src={defaultProfile} alt={"user image"} />
                    )}
                  </span>
                </div>
              </motion.div>
            )
          )}
          {gettingResponse && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
            >
              <div className={`chat incoming`}>
                <span>
                  <Lottie animationData={chatBot} loop={true} />
                </span>
                <p className="">Thinking...</p>
              </div>
            </motion.div>
          )}
        </div>
        <div className="chat-input">
          <textarea
            ref={messageInputRef}
            value={userMessage}
            onChange={(e) => {
              e.currentTarget.style.height = `55px`;
              e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`;
              setUserMessage(e.target.value);
            }}
            placeholder="Enter a message..."
            required
          />
          <button className="" onClick={handleChat}>
            <Lottie
              animationData={send}
              loop={false}
              style={{ width: "55px" }}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
