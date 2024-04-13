import React, { useState } from "react";
import { Modal, Form, Input, Select, DatePicker, message } from "antd";
import moment from "moment";
import axios from "axios";

const { TextArea } = Input;
const { Option } = Select;

const TaskModal = ({ open, onCancel, task, onUpdate }) => {
  const [form] = Form.useForm();

  const [priority, setPriority] = useState(task.priority);
  const [finishedAt, setFinishedAt] = useState(task.finishedAt);

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        form.resetFields();
        updateTask({ ...task, ...values, priority, finishedAt });
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  const handlePriorityChange = (value) => {
    setPriority(value);
  };

  const handleFinishedAtChange = (date) => {
    setFinishedAt(date);
  };

  const updateTask = async (updatedTask) => {
    try {
      const response = await axios.put(
        `http://localhost:4000/api/tasks/${task.id}`,
        updatedTask
      );
      message.success("Task updated successfully");
      console.log(response);
      onUpdate(response.data);
      onCancel(); 
    } catch (error) {
      console.error(error);
      message.error("Error updating task");
    }
  };

  return (
    <Modal
      open={open}
      title="Edit Task"
      okText="Save"
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
          initialValue={task.title}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
          initialValue={task.description}
        >
          <TextArea rows={2} />
        </Form.Item>
        <Form.Item name="priority" label="Priority" initialValue={priority}>
          <Select onChange={handlePriorityChange}>
            <Option value="high">High</Option>
            <Option value="medium">Medium</Option>
            <Option value="low">Low</Option>
          </Select>
        </Form.Item>
        <Form.Item name="status" label="Status" initialValue={task.status}>
          <Select>
            <Option value="toDo">To Do</Option>
            <Option value="inProgress">In Progress</Option>
            <Option value="done">Done</Option>
            <Option value="cancelled">Cancelled</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="creator_id"
          label="Creator ID"
          initialValue={task.creator_id}
        >
          <Input disabled />
        </Form.Item>
        <Form.Item
          name="responsible_id"
          label="Responsible ID"
          initialValue={task.responsible_id}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="finishedAt"
          label="Finished At"
          initialValue={moment(finishedAt)}
        >
          <DatePicker
            showTime
            format="DD-MM-YYYY"
            onChange={handleFinishedAtChange}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default TaskModal;
