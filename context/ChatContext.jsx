import { createContext, useContext, useEffect, useState } from "react";
import { server } from "../src/main";
import axios from "axios";

const ChatContext = createContext()


export const ChatProvider = ({children}) =>{
    const [chat , setAllChats] = useState([])
    const [chatId , SetChatId] = useState(null)
    const [message , setMessage] = useState([])
    const [prompt , setPrompt] = useState("")
    const [loading , setLOading] = useState(false)

    // chat create 
    const chatCreate = async () =>{
        try {
            // get data 
            const {data} = await axios.post(`${server}/api/chat/new` , {} , {
                headers:{
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            // set all chats
            setAllChats((prev) => [data, ...prev])
            SetChatId(data._id)
            setMessage([])
        } catch (error) {
            console.log(error)
        }
    }

     // question send to backend 
     const sendMessage = async () =>{
        if (!prompt || !chatId) return 
        setLOading(true)

        try {
            const {data} = await axios.post(`${server}/api/chat/${chatId}` , {
                question: prompt
            },{
                headers:{
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            // question and ans set 
            console.log(data)
            setMessage((prev) =>[
                ...prev , {
                    question :data.conversation.question,
                    answer:data.conversation.answer
                }
            ])

            // message update
            setAllChats((prev) =>
      prev.map((c) =>
        c._id === chatId
          ? { ...c, latestMes: data.conversation.question }  
          : c
      )
    );
            setPrompt("")
        } catch (error) {
            console.log(error)
        }finally{
            setLOading(false)
    }
     }

     // fetch all chats
        const fetchAllChats = async () =>{
            try{
        const {data} = await axios.get(`${server}/api/chat/get_all_chat`, {
            headers:
            {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
        setAllChats(data)
     }catch(error){
        console.log(error)
     }
    }

     useEffect(()=>{
        fetchAllChats()
     } ,[])

     // load all the message 
     const messageLoader = async(id) =>{
        try {
            const {data} = await axios.get(`${server}/api/chat/${id}`,{
                headers:{
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            setMessage(data)


        } catch (error) {
            console.log(error)
        }
     }

     useEffect(()=>{
        if(chatId){
            messageLoader(chatId)
        }
     },[chatId])

      
       const chatDeleted = async (id) => {
    try {
      await axios.delete(`${server}/api/chat/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      // delte the chats 
      setAllChats((prev) => prev.filter((c) => c._id !== id));

      //  reset
      if (chatId === id) {
        SetChatId(null);
        setMessage([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

    return <ChatContext.Provider value= {{ chat,
      chatId,
      SetChatId,
      message,
      prompt,
      setPrompt,
      sendMessage,
      loading,
      chatCreate,
      chatDeleted}}>
        {children}
    </ChatContext.Provider>
}

export const ChatData  = () => useContext(ChatContext)