import config from "@/config/config.json";

const NotificationBar = () => {
  const { notification_bar } = config;
  return (
    <>
      {notification_bar.enable && (
        <div className="py-3.5 px-5 text-sm bg-light text-center font-medium text-text-dark">
          <p>{notification_bar.text}</p>
        </div>
      )}
    </>
  );
};

export default NotificationBar;