const socket = io();

document.getElementById("generate-password").addEventListener("click", () => {
  const password = generateRandomPassword(4); // 4-digit numeric password
  document.getElementById("password-display").textContent = password;
  socket.emit("new-password", password);
});

socket.on("light-sensor", (data) => {
  document.getElementById("light-sensor-display").textContent = "Light sensor value: " + data;
});

function generateRandomPassword(length) {
  let password = "";
  for (let i = 0; i < length; i++) {
    password += Math.floor(Math.random() * 10);
  }
  return password;
}
