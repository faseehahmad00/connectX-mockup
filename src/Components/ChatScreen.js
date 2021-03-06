import { useParams } from "react-router-dom";
import './ChatScreen.css';
import { format } from 'date-fns';
import Message from './Message'
import { useEffect, useState } from "react";
import { IoIosSend} from "react-icons/io";
import { BsThreeDots} from "react-icons/bs";
import ContactData from '../Data/ContactData';

export default function ChatScreen({ messages, userid }) {
    const { id } = useParams();
    const name  = ContactData.filter(a => a.id === id)
    let [msgs, setmsgs] = useState([]);
    let [text, settext] = useState('');
    let [disabled,setDisabled] = useState(true);


    function updateScroll() {
        let element = document.getElementById("bodyid");
        if(element)
            element.scrollTop = element.scrollHeight;
    }


    useEffect(() => {
        setmsgs(messages);
    }, [messages]);

    useEffect(() => {
        updateScroll();
    },)

    let handleChange = (event) => {
        settext(event.target.value);
        if(event.target.value === ''){
            setDisabled(true);
        }
        if(event.target.value !== ''){
            setDisabled(false);
        }
    }

    let sendMessage = () => {
        if(text !== ''){
        let newMessages = [...msgs];
        newMessages.push({
            id: new Date().getMilliseconds().toString(),  //unique id 
            createdAt: new Date(),
            sender: '1',
            messagetext: `${text}`,
            status:'sending',
        });
        setmsgs(newMessages);
        settext('');
        updateScroll();  
        setDisabled(true);    
    }
}
    return (
        <div className="Chatscreen">
            <div className="header">
                <img className="headerimg" src="https://source.unsplash.com/random/200x202/" alt="." />
                <h3>{name[0].title}</h3>
                <button style={{flex:0.7}} onClick={()=>console.log(`menu open for user ${id}`)}>
                <BsThreeDots style={{color:'black',fontSize:'30px'}}/>
                </button>
            </div>
            <div className="body" id="bodyid">
                {msgs.map(m => {
                    let date = format(m.createdAt, "MMM-dd-yy  HH:mm");
                    return (
                        <Message 
                        key={m.id}
                        id={name[0].title} 
                        sender={m.sender}
                        userid={userid}
                        text={m.messagetext}
                        status={m.status}
                        date={date} />
                    );
                })
                }
            </div>
            <form className="form">
                <textarea
                    type="text"
                    required value={text} onChange={handleChange} placeholder='new message here' />
             {!disabled && <button onClick={() => { sendMessage() }} disabled={disabled}>
                    <IoIosSend style={{ height: '22px', width: '22px' }}/>
                </button>
                }
            </form>
        </div>


    );
}



