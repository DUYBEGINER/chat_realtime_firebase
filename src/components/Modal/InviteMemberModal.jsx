import React from "react";
import { AppContext } from "../../context/AppProvider";
import { Modal, Form, Input, Select, Avatar, Spin } from "antd";
import { addDocument } from "../../services/firestoreService";
import { AuthContext } from "../../context/AuthProvider";
import { debounce } from "lodash";
import { doc, setDoc, getDocs, serverTimestamp,onSnapshot, collection, query, where, orderBy, limit } from "firebase/firestore";
import {db} from '../../firebase/config'; // 🔹 Import db from config

function DebounceSelect({ fetchOptions, debounceTimeout = 300, ...props }) {
  const [fetching, setFetching] = React.useState(false);
  const [options, setOptions] = React.useState([]);

  const debounceFetcher = React.useMemo(() => {
    const loadOptions = (value) => {
      setFetching(true);
      setOptions([]);

      fetchOptions(value).then((newOptions) => {
        setOptions(newOptions);
        setFetching(false);
      });
    };

    return debounce(loadOptions, debounceTimeout);
  }, [debounceTimeout, fetchOptions]);

  return (
    <Select
      labelInValue
      onSearch={debounceFetcher}
      filterOption={false}
      notFoundContent={fetching ? <Spin size="small" /> : null}
      options={options.map((opt) => ({
      label: (
          <>
            <Avatar size="small" src={opt.photoURL}>
              {opt.photoURL ? "" : opt.label?.charAt(0)?.toUpperCase()}
            </Avatar>
            {` ${opt.label}`}
          </>
        ),
        value: opt.value,
      }))}
      {...props}
    />
  );
}

async function fetchUserList(search) {
   const q = query(
    collection(db, "accounts"),
    where("keywords", "array-contains", search),
    orderBy("displayName"),
    limit(20)
  );

  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map((doc) => ({
    label: doc.data().displayName,
    value: doc.data().uid,
    photoURL: doc.data().photoURL,
  }));
}

function InviteMemberModal(props) {
  const { isInviteMemberVisible, setIsInviteMemberVisible } =
    React.useContext(AppContext);
  const {
    user: { uid },
  } = React.useContext(AuthContext);

  const [form] = Form.useForm();
  const [value, setValue] = React.useState([]);
  const handleOk = () => {
    // console.log("addRoom", { formData: form.getFieldsValue() });
    // addDocument("rooms", { ...form.getFieldsValue(), members: [uid] });

    //reset form value
    form.resetFields();

    setIsInviteMemberVisible(false);
  };

  const handleCancel = () => {
    //reset form value
    form.resetFields();
    setIsInviteMemberVisible(false);
  };

  console.log("Values:", value);

  return (
    <div>
      <Modal
        title="Mời thành viên"
        open={isInviteMemberVisible}
        onCancel={handleCancel}
        onOk={handleOk}
      >
        <Form form={form} layout="vertical">
          <DebounceSelect
            mode="multiple"
            label="Tên các thành viên"
            placeholder="Nhập tên thành viên"
            fetchOptions={fetchUserList}
            onChange={(newValue) => setValue(newValue)}
            value={value}
            className="w-full"
          />
        </Form>
      </Modal>
    </div>
  );
}

export default InviteMemberModal;
