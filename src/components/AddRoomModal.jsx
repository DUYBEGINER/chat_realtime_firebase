import React from 'react';
import { AppContext } from '../context/AppProvider';
import { Modal, Form, Input} from 'antd';
import { addDocument } from '../services/firestoreService';
import { AuthContext } from '../context/AuthProvider';

function AddRoomModal(props) {
    const {isAddRoomVisible, setIsAddRoomVisible} = React.useContext(AppContext);
    const { user: { uid } } = React.useContext(AuthContext);

    const [form] = Form.useForm();


    const handleOk = () => {
        console.log("addRoom",{formData : form.getFieldsValue()})
        addDocument("rooms", {...form.getFieldsValue(), members: [uid]})

        //reset form value
        form.resetFields();

        setIsAddRoomVisible(false);
    };

    const handleCancel = () => {
        //reset form value
        form.resetFields();

        setIsAddRoomVisible(false);
    };

  




    return (
        <div>
            <Modal
                title="Tạo phòng mới"
                open={isAddRoomVisible}
                onCancel={handleCancel}
                onOk={handleOk}
            >
                <Form form={form} layout='vertical'>
                    <Form.Item label="Tên phòng" name="name">
                        <Input placeholder="Nhập tên phòng" />
                    </Form.Item>
                    <Form.Item label="Mô tả" name="description">
                        <Input.TextArea placeholder="Nhập mô tả" />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}

export default AddRoomModal;