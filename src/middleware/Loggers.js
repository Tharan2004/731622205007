const Logger = (message, data = null) => {
  const log = {
    timestamp: new Date().toISOString(),
    message,
    data
  };
  let logs = JSON.parse(localStorage.getItem("logs")) || [];
  logs.push(log);
  localStorage.setItem("logs", JSON.stringify(logs));
};

export default Logger;