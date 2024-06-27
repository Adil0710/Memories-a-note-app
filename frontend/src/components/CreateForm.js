import React from 'react';
import notesStore from '../stores/notesStore';
import { Flex, Input, Button, ConfigProvider, theme } from 'antd';
import { useTheme } from '../context/ThemeProvider';


const {TextArea} = Input

function CreateForm({ closeModal }) {
    const store = notesStore();
    const {isDarkMode} = useTheme()

    if (store.updateForm._id) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        await store.createNote();
        closeModal();
    };

    return (
        <div className="mt-5">
            
            <form onSubmit={handleSubmit}>
            <ConfigProvider
            theme={{
                algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
            }}
            >
            <Flex vertical gap={32}>
                <Input showCount allowClear maxLength={50} placeholder="Enter Title"
                onChange={(e) => store.updateCreateFormField(e)}
                value={store.createForm.title}
                name="title"
                variant='filled'
                />
                <TextArea
                onChange={(e) => store.updateCreateFormField(e)}
                value={store.createForm.body}
                name="body"
                showCount
                allowClear
                variant='filled'
                placeholder="Enter Description"
                style={{
                    height: 200,
                    resize: 'none',
                }}
                />
                
                <Button type="primary" shape='round' htmlType='submit' >
                    Create note
                </Button>
            </Flex>
        </ConfigProvider>
            </form>
            
        </div>
    );
}

export default CreateForm;