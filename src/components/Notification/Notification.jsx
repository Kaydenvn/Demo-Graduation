import { notification, Button } from "antd";
export const showNotification = (content, type = "info") => {
  const capitalizedType = type.charAt(0).toUpperCase() + type.slice(1);

  const copyToClipboard = async (text, key) => {
    try {
      await navigator.clipboard.writeText(text);
      notification.destroy(key);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const btn = (
    <Button
      type="link"
      size="small"
      onClick={() => copyToClipboard(content, key)}
    >
      Copy
    </Button>
  );

  switch (type) {
    case "success":
      notification.success({
        message: capitalizedType,
        description: content,
        placement: "topRight",
        btn,
      });
      break;
    case "info":
      notification.info({
        message: capitalizedType,
        description: content,
        placement: "topRight",
        btn,
      });
      break;
    case "warning":
      notification.warning({
        message: capitalizedType,
        description: content,
        placement: "topRight",
        btn,
      });
      break;
    case "error":
      notification.error({
        message: capitalizedType,
        description: content,
        placement: "topRight",
        btn,
      });
      break;
    default:
      notification.info({
        message: capitalizedType,
        description: content,
        placement: "topRight",
        btn,
      });
      break;
  }
};
