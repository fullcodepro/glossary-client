import React, { useContext, useEffect, useState } from 'react'
import '../css/chat.css';
import '../../ui/icons/whatsapp/css/fontello.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faMessage, faXmarkCircle } from '@fortawesome/free-solid-svg-icons';
import { SocketContext } from '../../hooks/SocketContext';
import { AuthContext } from '../../components/context/AuthContext';


export const ChatScreen = () => {
    const { user } = useContext(AuthContext);
    const { socket } = useContext(SocketContext);

    const [allMessages, setAllMessages] = useState([]);
    const [showChat, setShowChat] = useState(false);

    const [chat, setChat] = useState({
        message: '',
        user: user?.firstName
    });

    const { message } = chat;

    useEffect(() => {
        socket.on('current-message', arrMessages => {
            setAllMessages(arrMessages);
        })

        return () => socket.off('current-message');
    }, [socket])

    // ESCUCHA NUEVOS MENSAJES
    useEffect(() => {
        socket.on('new-message', message => {
            setAllMessages(message);
        })

        return () => socket.off('new-message');
    }, [socket])

    // ALMACENA EN EL ESTADO LOS VALORES INGRESADOS EN EL INPUT 
    const handleInputChange = ({ target }) => {
        setChat({
            ...chat,
            [target.name]: target.value
        });
    }

    // ENVIAR NUEVO MENSAJE
    const handleSendMessage = (e) => {
        e.preventDefault();
        if (chat.message.length < 1) return alert('No puede enviar mensajes vacíos!')
        socket.emit('new-message', chat)
        setChat({
            ...chat,
            message: ''
        })
    }

    // OCULTAR CHAT
    const handleHideChat = () => {
        if (!showChat) {
            setShowChat(!showChat);
            socket.emit('get-messages', messages => {
                setAllMessages(messages);
            })
        }
        setShowChat(!showChat);
    };

    return (
        <>
            {
                (showChat)
                    ?
                    (
                        <div className={(showChat) && 'chat animate__animated animate__slideInUp'
                        }>
                            <FontAwesomeIcon icon={faXmarkCircle}
                                onClick={handleHideChat}
                                className='text-dark h4'
                                style={{
                                    position: 'absolute',
                                    top: -22,
                                    right: -18,
                                    zIndex: 1,
                                    cursor: 'pointer',
                                    opacity: 0.6,
                                    hover: { fontSize: "150rem" }
                                }}
                            />
                            <div className='row'>
                                <div className='col-sm-12'>
                                    <div className='card mb-2 shadow'>
                                        <ul className='box-message border p-1 list-group'>
                                            {
                                                (allMessages?.length < 1)
                                                    ?
                                                    (
                                                        <li className='bg-primary text-center text-white border'>
                                                            <span className='p-0' style={{ fontWeight: 'bold' }}>Sin mensajes</span>
                                                        </li>
                                                    )
                                                    :
                                                    (
                                                        allMessages.map((msg) => (
                                                            <li
                                                                key={msg.id}
                                                                className={
                                                                    (msg.user === user.firstName)
                                                                        ? 'animate__animated fadeInDown mb-1 rounded pe-2 text-end text-dark fondo__chat__emisor custom__font'
                                                                        : 'animate__animated fadeInDown mb-1 rounded ps-2 text-dark fondo__chat__receptor custom__font'
                                                                }
                                                            >
                                                                <p
                                                                    className=''
                                                                    style={{ fontSize: '16px' }}
                                                                >
                                                                    <strong>
                                                                        {(msg?.user !== user.firstName) && msg.user + ": "}
                                                                    </strong>
                                                                    {msg?.message}
                                                                </p>
                                                            </li>
                                                        ))
                                                    )
                                            }
                                        </ul>
                                    </div>
                                    <div className='card shadow'>
                                        <div className='card-body'>
                                            <form
                                                onSubmit={handleSendMessage}
                                            >
                                                <div className="form-group">
                                                    <input
                                                        type="text"
                                                        placeholder="Escribe un mensaje..."
                                                        className='form-control'
                                                        autoComplete='off'
                                                        name="message"
                                                        value={message}
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <button
                                                        type='submit'
                                                        className='btn btn-sm btn-primary w-100'
                                                    >
                                                        <FontAwesomeIcon icon={faArrowRight} /> Enviar
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                    :
                    (
                        <FontAwesomeIcon
                            icon={faMessage}
                            onClick={handleHideChat}
                            className='btn__mostrar__chat'
                        />
                    )
            }


            <div className='chat-wsp'>
                <div className='row'>
                    <div className='col-sm-12'>
                        <ul className='navbar'>
                            <a
                                href={"https://api.whatsapp.com/send?phone=+543704714933"}
                                className="btn-wsp"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <i className='icon-whatsapp'></i>
                            </a>
                        </ul>
                    </div>
                </div>
            </div>


            {/* TOASTS */}
            {/* <div aria-live="polite" {...showToast} aria-atomic="true" className="bg-dark position-relative bd-example-toasts">
                <div className="toast-container position-absolute p-3" id="toastPlacement">
                    <div className="toast">
                        <div className="toast-header">
                            <img src="..." className="rounded me-2" alt="..." />
                            <strong className="me-auto">Bootstrap</strong>
                            <small>11 mins ago</small>
                        </div>
                        <div className="toast-body">
                            Hello, world! This is a toast message.
                        </div>
                    </div>
                </div>
            </div> */}
        </>
    )
}
