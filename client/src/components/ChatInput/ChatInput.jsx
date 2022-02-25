import React from "react";

import { Input, Button, message, Typography } from "antd";
import { SendOutlined } from "@ant-design/icons";

import { MessageService } from "services";
import { useChatState } from "store";
import styles from "./styles.module.scss";
import FileUploadPin from "components/FileUploadPin/FileUploadPin";

const FileCard = ({ file, index, handleFileRemove }) => {
  return (
    <div mx={3} onClick={() => handleFileRemove(index)}>
      <Typography.Text size="sm">{file.name}</Typography.Text>
    </div>
  );
};

function ChatInput({
  addMessages,
  handleFileRemove,
  handleFileChange,
  addAttachmets,
  files,
  setFiles,
}) {
  const currentChat = useChatState((state) => state.currentChat);
  const [text, setText] = React.useState("");

  function handleTextChange(event) {
    const currentText = event.target.value;
    setText(currentText);
  }

  const handleSubmit = async () => {
    if ((!text || text.match(/^ *$/) !== null) && !files) {
      message.error("Your message is missing text.");
      return;
    }

    const formData = new FormData();
    formData.append("text", text);
    formData.append("chat_id", currentChat?.id);

    // Check if there is a File
    if (files.length > 0) {
      files.forEach((file) => {
        formData.append("attachments", file);
      });
    }

    const response = await MessageService.post(formData);
    const messages = response.data;

    if (messages) {
      addMessages(messages);
      // Send Message to Socket Server
      // socket.emit('addMessage', message)
      // add files to currentChat
      // if (files.length > 0) {
      //   addAttachmets(files);
      // }
      let attachments = [];
      messages.forEach((m) => {
        if (m.attachment) {
          attachments.push(m.attachment);
        }
      });
      addAttachmets(attachments);
      // Reset the state
      setText("");
      setFiles([]);
    } else {
      message.error("We are experiencing issues. Please try again.");
    }
  };

  return (
    <>
      <div style={{ d: "flex", alignItems: "center" }}>
        {files &&
          files.map((f, i) => (
            <FileCard
              key={i}
              file={f}
              index={i}
              handleFileRemove={handleFileRemove}
            />
          ))}
      </div>
      <div className={styles.chatInputContainer}>
        <FileUploadPin handleFileChange={handleFileChange} />
        <Input
          style={{
            width: "calc(100% - 200px)",
            borderRadius: "8px",
            borderColor: "rgb(229 228 228)",
          }}
          placeholder="Send a message..."
          defaultValue=""
          value={text}
          onChange={handleTextChange}
        />

        <Button icon={<SendOutlined />} onClick={handleSubmit}>
          Send
        </Button>
      </div>
    </>
  );
}

export default ChatInput;
