import React, { useState, useEffect } from 'react';
import { Button, Empty, Typography, Modal, Tooltip, ConfigProvider, Input, theme } from 'antd';
import { LoadingOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import Note from './Note';
import notesStore from '../stores/notesStore';
import CreateForm from '../components/CreateForm';
import { TinyColor } from '@ctrl/tinycolor';
import { useTheme } from '../context/ThemeProvider';

const colors1 = ['#6253E1', '#04BEFE'];

const getHoverColors = (colors) =>
  colors.map((color) => new TinyColor(color).lighten(5).toString());

const getActiveColors = (colors) =>
  colors.map((color) => new TinyColor(color).darken(5).toString());

function Notes() {
    const { notes } = notesStore.getState();
    const [createFormVisible, setCreateFormVisible] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredNotes, setFilteredNotes] = useState([]);
    const {isDarkMode} = useTheme()

    useEffect(() => {
        if (notes) {
            // Filter notes based on search query
            const filtered = notes.filter(note =>
                note.title.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredNotes(filtered);
        }
    }, [notes, searchQuery]);

    const handleToggleCreateForm = () => {
        setCreateFormVisible(!createFormVisible);
    };

    if (!notes) {
        return (
            <div className='min-h-screen dark:bg-[#0b0b0b] w-full flex items-center justify-center'>
                
                <LoadingOutlined className='text-4xl text-blue-500' />
            </div>
        );
    }

    if (notes.length === 0) {
        return (
           
            <div className='min-h-screen dark:bg-[#0b0b0b] w-full flex justify-center items-center'>
                 <ConfigProvider
            theme={{
                algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
                components: {
                    Button: {
                        colorPrimary: `linear-gradient(135deg, ${colors1.join(', ')})`,
                        colorPrimaryHover: `linear-gradient(135deg, ${getHoverColors(colors1).join(', ')})`,
                        colorPrimaryActive: `linear-gradient(135deg, ${getActiveColors(colors1).join(', ')})`,
                        lineWidth: 0,
                    },
                },
            }}
        >
                <Empty
                    className='flex flex-col justify-center items-center'
                    image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                    imageStyle={{ height: 60 }}
                    description={
                        <Typography.Text>
                            <p className='text-base'>No notes found. Click below to create one!</p>
                        </Typography.Text>
                    }
                >
                        <Tooltip title="Create a note">
                            <Button type="primary" size='large' icon={<PlusOutlined/>} shape='circle' onClick={handleToggleCreateForm}></Button>
                        </Tooltip>

                </Empty>
                

                {/* Modal for creating a note */}
                <Modal
                    title="Create Note"
                    open={createFormVisible}
                    onCancel={() => setCreateFormVisible(false)}
                    footer={null} // Optional: Remove footer if not needed
                >
                    <CreateForm closeModal={() => setCreateFormVisible(false)} />
                </Modal>
                </ConfigProvider>
                
            </div>
            
        );
    }

    return (
        <div className="flex flex-col items-center justify-center bg-gray-50 dark:bg-[#0b0b0b] min-h-screen pt-28 pb-20">
            <div className="w-full max-w-2xl px-4 mb-4">
            <ConfigProvider
                theme={{
                    algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
                }}
            >
                <Input
                    placeholder="Search notes..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    prefix={<SearchOutlined />}
                />
                </ConfigProvider>
            </div>
            
            {filteredNotes.length === 0 ? (
                <div className='w-full min-h-[70vh] flex justify-center items-center'>
                    <ConfigProvider
                        theme={{
                            algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
                        }}
                    >
                    <Empty />
                    </ConfigProvider>
                </div>
            ) : (
                <div className="flex flex-wrap gap-3 items-center justify-center w-full min-h-[70vh] px-5">
                    {filteredNotes.map((note) => (
                        <Note key={note._id} note={note} />
                    ))}
                </div>
            )}

            {/* Modal for creating a note */}
            <Modal
                title="Create Note"
                open={createFormVisible}
                onCancel={() => setCreateFormVisible(false)}
                footer={null} // Optional: Remove footer if not needed
            >
                <CreateForm closeModal={() => setCreateFormVisible(false)} />
            </Modal>

           
        </div>
    );
}

export default Notes;
