import React, { useState } from 'react';
import { formatTimestamp } from '../utils/dateUtils';
import { EllipsisOutlined, DeleteOutlined, EditOutlined, CheckCircleOutlined, SmileOutlined, DownloadOutlined } from '@ant-design/icons';
import { Card, Tooltip, Button, Modal, Divider, Popconfirm, ConfigProvider, theme } from 'antd';
import notesStore from '../stores/notesStore';
import { useTheme } from '../context/ThemeProvider';

const { Meta } = Card;

function Note({ note }) {
    const { deleteNote, toggleUpdate } = notesStore();
    const [modalVisible, setModalVisible] = useState(false);
    const { isDarkMode } = useTheme(); // Use the theme context

    const handleEdit = () => {
        toggleUpdate(note); // Ensure note is defined and has necessary properties like _id, title, body
    };

    const showModal = () => {
        setModalVisible(true);
    };

    const hideModal = () => {
        setModalVisible(false);
    };

    const downloadNote = () => {
        // Construct text content for the file
        const content = `Title: ${note.title}\nDescription: ${note.body}`;

        // Create a Blob containing the text content
        const blob = new Blob([content], { type: 'text/plain' });

        // Create a temporary URL to download the file
        const url = URL.createObjectURL(blob);

        // Create a link element to trigger the download
        const link = document.createElement('a');
        link.href = url;
        link.download = `${note.title}.txt`; // File name

        // Append the link to the body
        document.body.appendChild(link);

        // Click the link to trigger the download
        link.click();

        // Clean up by removing the link and URL object
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    return (
        <ConfigProvider
            theme={{
                algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
            }}
        >
        <Card className='card card-hoverd card-hover'
            style={{ width: 300, margin: '5px' }}
            actions={[
                <Popconfirm
                    title="Delete the note"
                    description="Are you sure want to delete this note?"
                    onConfirm={() => deleteNote(note._id)}
                    okText="Yes"
                    cancelText="No"
                >
                    <Tooltip title="Delete Note">
                        <Button type="text" icon={<DeleteOutlined className=' text-rose-500' />} />
                    </Tooltip>
                </Popconfirm>,
                <Tooltip title="Edit Note">
                    <Button type="text" icon={<EditOutlined className=' text-blue-500' />} onClick={handleEdit} />
                </Tooltip>,
                <Tooltip title="Download Note">
                    <Button type="text" icon={<DownloadOutlined className='text-green-500' />} onClick={downloadNote} />
                </Tooltip>,
                <Tooltip title="More">
                    <Button type="text" icon={<EllipsisOutlined />} onClick={showModal} />
                </Tooltip>,
            ]}
        >
            <Meta
                title={note.title}
                description={
                    <div>
                        <p className='text-[11px]'><CheckCircleOutlined className=' text-green-500'/> {formatTimestamp(note.createdAt)}</p>
                        <p className='mt-3' style={{ maxHeight: '24px', overflow: 'hidden', textOverflow: 'ellipsis' }}>{note.body}</p>
                        <div className='flex items-center justify-between text-xs mt-12'>
                            <p><SmileOutlined className='  text-blue-500'/> Last updated {formatTimestamp(note.updatedAt)}</p>
                        </div>
                    </div>
                }
            />

            <Modal
                title={`Title: ${note.title}`}
                open={modalVisible}
                onCancel={hideModal}
                footer={[
                    <div className='flex items-center justify-between mt-2'>
                        <Button key="download" shape='round' type='primary' icon={<DownloadOutlined />} size='small' onClick={downloadNote}>
                            Download Note
                        </Button>
                        <Button key="close" size='small' shape='round' danger onClick={hideModal}>
                            Close
                        </Button>
                    </div>
                ]}
            >
                <p className='mt-5'><span className='font-semibold'>Description:</span> {note.body}</p>
                
                <div className='flex items-center justify-between text-xs mt-12'>
                    <p><CheckCircleOutlined className=' text-green-500'/> Created {formatTimestamp(note.createdAt)}</p>
                    <p><SmileOutlined className=' text-blue-500' /> Last updated {formatTimestamp(note.updatedAt)}</p>
                </div>
                <Divider />
            </Modal>
        </Card>
        </ConfigProvider>
    );
}

export default Note;
