 import { useRef, useState, useEffect } from "react";
import { ChatData } from "../../context/ChatContext";
import { UserData } from "../../context/UserContext";
 

const Home = () => {
  const chatEndRef = useRef(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
 

  const {
    chatId,
    chat,
    SetChatId,
    message,
    prompt,
    setPrompt,
    sendMessage,
    loading,
    chatCreate,
    chatDeleted,
  } = ChatData();

  const { handleLogout } = UserData();

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

   

  return (
    <div className="h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white flex flex-col">
      {/* top bar */}
      <div className="h-16 md:h-20 bg-gray-700 flex items-center justify-between px-4 md:px-8">
        <div className="font-semibold text-lg">My Chat App</div>
        <div className="flex items-center gap-2">
          
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden px-3 py-1 bg-blue-600 rounded-lg hover:bg-blue-500 transition"
          >
            ☰
          </button>
          <button
            onClick={handleLogout}
            className="px-3 py-1 bg-red-600 rounded-lg hover:bg-red-500 transition text-sm md:text-base"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main Layout */}
      <div className="flex flex-1 overflow-hidden relative">
        {/* Sidebar */}
        <div
          className={`fixed top-16 left-0 h-full w-64 bg-gray-850 border-r border-gray-700 p-4 transform transition-transform z-50
            ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:relative md:translate-x-0 md:flex flex-col`}
        >
          <button
            onClick={() => {
              chatCreate();
              setSidebarOpen(false);
            }}
            className="mb-4 py-2 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 transition font-semibold w-full"
          >
            + New Chat
          </button>

          <div className="flex-1 overflow-y-auto space-y-3">
            {chat.map((item) => (
              <div
                key={item._id}
                className="flex justify-between items-center p-3 rounded-lg cursor-pointer transition hover:bg-gray-600"
              >
                <div
                  onClick={() => {
                    SetChatId(item._id);
                    setSidebarOpen(false);
                  }}
                  className={`flex-1 ${
                    chatId === item._id ? "bg-blue-600 p-2 rounded-lg" : ""
                  }`}
                >
                  {item.latestMes || "New Chat"}
                </div>
                <button
                  onClick={() => chatDeleted(item._id)}
                  className="text-red-500 hover:text-red-400 ml-2"
                >
                  🗑
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col p-4 md:ml-64 w-full">
          <div className="flex-1 overflow-y-auto space-y-4 mb-10">
            {message.length === 0 && (
              <div className="text-gray-400 text-center mt-6 md:mt-20">
                Start a conversation ✨
              </div>
            )}

            {message.map((msg, index) => (
              <div key={index} className="space-y-2">
                <div className="ml-auto max-w-xs md:max-w-md bg-blue-600 p-3 rounded-2xl rounded-br-none break-words">
                  {msg.question}
                </div>
                <div className="max-w-xs md:max-w-md bg-gray-700 p-3 rounded-2xl rounded-bl-none break-words">
                  {msg.answer}
                </div>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          {/* Input Area full width till sidebar */}
          <div className="flex w-full md:w-auto items-center gap-3 bg-gray-800 p-3 rounded-2xl ml-6">
            <input
              type="text"
              placeholder="Ask something..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="flex-1 bg-transparent outline-none text-white placeholder-gray-400 w-full"
            />
            <button
              onClick={sendMessage}
              disabled={!chatId || loading}
              className="px-5 py-2 bg-blue-600 rounded-xl hover:bg-blue-500 transition disabled:opacity-50"
            >
              {loading ? "..." : "Send"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
