// SpeechRecognition.js
import React, { useState, useEffect } from 'react';
import {Button } from 'antd';

const SpeechRecognition = ({ store, onUpdate }) => {
    const [recognition, setRecognition] = useState(null);
    const [isListening, setIsListening] = useState(false);
    const [finalTranscript, setFinalTranscript] = useState('');

    useEffect(() => {
        if ('webkitSpeechRecognition' in window) {
            const speechRecognition = new window.webkitSpeechRecognition();
            speechRecognition.continuous = true;
            speechRecognition.interimResults = true;
            speechRecognition.lang = 'en-IN';
    
            speechRecognition.onresult = (event) => {
                let interimTranscript = '';
                
                for (let i = event.resultIndex; i < event.results.length; ++i) {
                    if (event.results[i].isFinal) {
                        setFinalTranscript(prevFinalTranscript => {
                            const newFinalTranscript = prevFinalTranscript + event.results[i][0].transcript;
                            store.updateCreateFormField({ target: { name: 'body', value: newFinalTranscript } });
                            return newFinalTranscript;
                        });
                    } else {
                        interimTranscript += event.results[i][0].transcript;
                    }
                }
    
                store.updateCreateFormField({ target: { name: 'body', value: finalTranscript + interimTranscript } });
            };
    
            speechRecognition.onerror = (event) => {
                console.error('Speech recognition error', event);
                setIsListening(false);
                if (event.error === 'no-speech') {
                    recognition.stop();
                    recognition.start();
                }
            };
    
            speechRecognition.onend = () => {
                if (isListening) {
                    speechRecognition.start(); // Restart recognition if it stops while listening
                } else {
                    setIsListening(false);
                }
                setIsListening(false);
            };
    
            setRecognition(speechRecognition);
        } else {
            console.error('Speech recognition not supported in this browser');
        }
    }, [store]);
    

    const handleSpeech = () => {
        if (recognition) {
            if (isListening) {
                recognition.stop();
                setIsListening(false);
            } else {
                recognition.start();
                setIsListening(true);
            }
            setIsListening(!isListening);
        }
    };
    return (
        <Button
        type='primary'
        shape='circle'
        onClick={handleSpeech}
        style={{
            position: 'absolute',
            right: '5px',
            bottom: '5px',
            zIndex: 1,
        }}
    >
        {isListening ? <i className="ri-mic-off-fill"></i> : <i class="ri-mic-fill"></i>}
    </Button>
    );
};

export default SpeechRecognition;
