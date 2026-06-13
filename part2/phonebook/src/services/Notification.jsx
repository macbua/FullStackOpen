import { useEffect } from 'react';

const Notification = ({ message, type, setEror }) => {
  if (!message) {
    return null;
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setEror({});
    }, 5000);

    return () => clearTimeout(timer);
  }, [message, setEror]);

  return (
    <div className={type}>
      {message}
    </div>
  );
};

export default Notification;