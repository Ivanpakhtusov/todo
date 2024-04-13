import React from "react";
import { Modal, Form, Input, Select, DatePicker } from "antd";

const { TextArea } = Input;
const { Option } = Select;

const CreateTaskForm = ({ open, onCreate, onCancel, creatorId }) => {
  const [form] = Form.useForm();

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        form.resetFields();
        onCreate({ ...values, creator_id: creatorId, finishedAt: values.finishedAt ? values.finishedAt.startOf('day').toDate() : null });
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  return (
    <Modal
      open={open}
      title="Create Task"
      okText="Create"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={handleOk}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="title"
          label="Title"
          rules={[
            { required: true, message: "Please input the title of task!" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="description" label="Description">
          <TextArea rows={2} />
        </Form.Item>
        <Form.Item name="priority" label="Priority">
          <Select>
            <Option value="high">High</Option>
            <Option value="medium">Medium</Option>
            <Option value="low">Low</Option>
          </Select>
        </Form.Item>
        <Form.Item name="status" label="Status">
          <Select>
            <Option value="toDo">To Do</Option>
            <Option value="inProgress">In Progress</Option>
            <Option value="done">Done</Option>
            <Option value="cancelled">Cancelled</Option>
          </Select>
        </Form.Item>
        <Form.Item name="responsible_id" label="Responsible ID">
          <Input />
        </Form.Item>
        <Form.Item name="finishedAt" label="Finished At">
          <DatePicker format="YYYY-MM-DD" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateTaskForm;

