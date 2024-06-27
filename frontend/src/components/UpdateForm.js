// UpdateForm.js
import React from 'react';
import notesStore from '../stores/notesStore';
import { Flex, Input, Button, ConfigProvider, theme } from 'antd';
import { useTheme } from '../context/ThemeProvider';

const {TextArea} = Input

function UpdateForm() {
    const store = notesStore();
    const {isDarkMode} = useTheme()

    if (!store.updateForm._id) return null;

    const handleUpdate = (e) => {
        e.preventDefault(); // Ensure e is defined before accessing preventDefault
        store.updateNote(); // Call updateNote method from store
    };

    return (
        <div className="mt-5">
    
            <form onSubmit={handleUpdate}>
            <ConfigProvider
            theme={{
                algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
            }}
            >
            <Flex vertical gap={32}>
            <Input showCount allowClear maxLength={50} placeholder="Enter Title"
                onChange={store.handleUpdateFieldChange}
                value={store.updateForm.title}
                name="title"
                variant='filled'
                required= "true"
                message= 'Please enter your message!'

                />
                
                <TextArea
                onChange={store.handleUpdateFieldChange}
                value={store.updateForm.body}
                name="body"
                showCount
                allowClear
                variant='filled'
                placeholder="Enter Description"
                required= "true"
                style={{
                    height: 200,
                    resize: 'none',
                }}
                />
                
                <Button type="primary" shape='round' htmlType='submit' >
                    Update note
                </Button>
            </Flex>
        </ConfigProvider>
            </form>
        </div>
    );
}

export default UpdateForm;
