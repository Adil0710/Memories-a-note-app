import React, { useEffect, useState } from 'react';
import Notes from '../components/Notes';
import UpdateForm from '../components/UpdateForm';
import CreateForm from '../components/CreateForm';
import notesStore from '../stores/notesStore';
import { Button, Modal, Tooltip, ConfigProvider, theme } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { TinyColor } from '@ctrl/tinycolor';
import { useTheme } from '../context/ThemeProvider';
import Footer from '../components/Footer';


const colors1 = ['#6253E1', '#04BEFE'];

const getHoverColors = (colors) =>
  colors.map((color) => new TinyColor(color).lighten(5).toString());

const getActiveColors = (colors) =>
  colors.map((color) => new TinyColor(color).darken(5).toString());

function NotesPage() {
    const {isDarkMode} = useTheme()
    const store = notesStore();
    const [createFormVisible, setCreateFormVisible] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            await store.fetchNotes();
        };
        fetchData();
    }, []); // Empty dependency array to run only once on component mount

    const handleToggleCreateForm = () => {
        setCreateFormVisible(!createFormVisible);
    };

    const handleCloseCreateForm = () => {
        setCreateFormVisible(false);
    };

    return (
        
        <div>

            <Notes />
            <ConfigProvider
            theme={{
                algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
            }}
        >

            {/* Modal for updating a note */}
            <Modal
                title="Update Note"
                open={store.updateForm._id !== null}
                onCancel={() => store.toggleUpdate({ _id: null })}
                footer={null} // Optional: Remove footer if not needed
            >
                <UpdateForm />
            </Modal>

            {/* Modal for creating a note */}
            <Modal
                title="Create Note"
                open={createFormVisible}
                onCancel={() => setCreateFormVisible(false)}
                footer={null} // Optional: Remove footer if not needed
            >
                <CreateForm closeModal={handleCloseCreateForm} />
            </Modal>
            </ConfigProvider>

            {/* Button to open create note modal */}
            {store.notes && store.notes.length > 0 && (
                <ConfigProvider
                theme={{
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
                <Tooltip title="Create a note">
                    <Button type='primary' size='large' className='fixed bottom-9 right-9' icon={<PlusOutlined />} shape='circle' onClick={handleToggleCreateForm}/>
                    
                </Tooltip>
            </ConfigProvider>
            )}

                <Footer/>
             </div>
             
    );
}

export default NotesPage;
