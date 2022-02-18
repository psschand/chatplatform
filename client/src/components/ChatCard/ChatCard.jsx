import React from "react";

import { Typography, Avatar, Image } from "antd";
import { UserOutlined, UsergroupAddOutlined } from "@ant-design/icons";
import Moment from "react-moment";

import { useChatState } from "store";
import { useAuthState } from "store";
import styles from "./styles.module.scss";

const { Text } = Typography;

function ChatCard({ chat }) {
  const user = useAuthState((state) => state.user);
  const currentChatId = useChatState((state) => state.currentChatId);
  const activeChat = chat.id === currentChatId ? true : false;

  const [readByUser, setReadByUser] = React.useState(false);
  const [chatName, setChatName] = React.useState("");
  const [singleChatImage, setSingleChatImage] = React.useState("");

  React.useEffect(() => {
    if (chat?.type === "single") {
      let recipient = {};

      chat.users.forEach((u) => {
        if (u.id !== user.id) recipient = u;
      });

      // Set defaults for single chat
      setChatName(recipient.name);
      setSingleChatImage(recipient.profileImage);
    }
  }, []);

  console.log(chat);

  return (
    <div className={styles.container}>
      {chat ? (
        <>
          {chat.type === "group" && (
            <div
              className={styles.chatCard}
              style={activeChat ? { backgroundColor: "#F9FAFB" } : {}}
            >
              <div className={styles.chatCardLeft}>
                <Avatar
                  className={styles.avatar}
                  src={chat.backgroundImage}
                  icon={<UsergroupAddOutlined />}
                  shape="square"
                  size={42}
                />

                <div className={styles.chatCardLeftItems}>
                  {/* Chat Name */}
                  <Text
                    style={{
                      fontWeight: 500,
                      color: "#434343",
                      maxWidth: "150px",
                    }}
                    ellipsis
                  >
                    {chat.name}
                  </Text>
                  <div className={styles.chatCardLeftPreview}>
                    {chat.lastMessage ? (
                      <>
                        {/* Chat Preview */}
                        {chat.lastMessage.type === "text" && (
                          <div className={styles.messagePreview}>
                            <Text
                              ellipsis={true}
                              style={{
                                color: "#8c8c8c",
                                fontSize: "12px",
                                maxWidth: "150px",
                              }}
                            >
                              {chat.lastMessage.user.name}:{" "}
                              {chat.lastMessage.text}
                            </Text>
                          </div>
                        )}
                        {chat.lastMessage.type === "attachment" && (
                          <div className={styles.messagePreview}>
                            <Text
                              ellipsis={true}
                              style={{
                                color: "#8c8c8c",
                                fontSize: "12px",
                                maxWidth: "150px",
                              }}
                            >
                              {chat.lastMessage.user.name} Attached a file
                            </Text>
                          </div>
                        )}
                      </>
                    ) : (
                      <Text
                        ellipsis={true}
                        style={{
                          color: "#40a9ff",
                          fontSize: "12px",
                          maxWidth: "150px",
                        }}
                      >
                        New Chat
                      </Text>
                    )}
                  </div>
                </div>
              </div>
              {/* Use Moment */}
              {chat.lastMessage?.createdAt ? (
                <Text style={{ color: "#8c8c8c", fontSize: "12px" }}>
                  <Moment fromNow ago>
                    {chat.lastMessage.createdAt}
                  </Moment>
                </Text>
              ) : (
                <Text style={{ color: "#8c8c8c", fontSize: "12px" }}>
                  <Moment fromNow ago>
                    {chat.createdAt}
                  </Moment>
                </Text>
              )}
            </div>
          )}

          {chat.type === "single" && (
            <div
              className={styles.chatCard}
              style={activeChat ? { backgroundColor: "#F9FAFB" } : {}}
            >
              <div className={styles.chatCardLeft}>
                <Avatar
                  className={styles.avatar}
                  src={singleChatImage}
                  shape="square"
                  size={42}
                  icon={<UserOutlined />}
                >
                  {chatName}
                </Avatar>

                <div className={styles.chatCardLeftItems}>
                  {/* Chat Name */}
                  <Text
                    style={{
                      fontWeight: 500,
                      color: "#434343",
                      maxWidth: "150px",
                    }}
                    ellipsis
                  >
                    {chatName}
                  </Text>
                  <div className={styles.chatCardLeftPreview}>
                    {chat.lastMessage ? (
                      <>
                        {/* Chat Preview */}
                        {chat.lastMessage.type === "text" && (
                          <div className={styles.messagePreview}>
                            <Text
                              ellipsis={true}
                              style={{
                                color: "#8c8c8c",
                                fontSize: "12px",
                                maxWidth: "150px",
                              }}
                            >
                              {chat.lastMessage.user.name}:{" "}
                              {chat.lastMessage.text}
                            </Text>
                          </div>
                        )}
                        {chat.lastMessage.type === "attachment" && (
                          <div className={styles.messagePreview}>
                            <Text
                              ellipsis={true}
                              style={{
                                color: "#8c8c8c",
                                fontSize: "12px",
                                maxWidth: "150px",
                              }}
                            >
                              {chat.lastMessage.user.name} Attached a file
                            </Text>
                          </div>
                        )}
                      </>
                    ) : (
                      <Text
                        ellipsis={true}
                        style={{
                          color: "#40a9ff",
                          fontSize: "12px",
                          maxWidth: "150px",
                        }}
                      >
                        New Chat
                      </Text>
                    )}
                  </div>
                </div>
              </div>
              {/* Use Moment */}
              <div style={{ height: "100%" }}>
                {chat.lastMessage?.createdAt ? (
                  <Text style={{ color: "#8c8c8c", fontSize: "12px" }}>
                    <Moment fromNow ago>
                      {chat.lastMessage.createdAt}
                    </Moment>
                  </Text>
                ) : (
                  <Text style={{ color: "#8c8c8c", fontSize: "12px" }}>
                    <Moment fromNow ago>
                      {chat.createdAt}
                    </Moment>
                  </Text>
                )}
              </div>
            </div>
          )}
        </>
      ) : (
        ""
      )}
    </div>
  );
}

export default ChatCard;
