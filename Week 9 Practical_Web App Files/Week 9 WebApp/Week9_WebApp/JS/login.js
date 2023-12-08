$(document).ready(function () {
  $("#loginBtn").click(function () {
    // Dummy login validation
    var username = $("#username").val()
    var password = $("#password").val()

    // Check if username and password match the dummy data
    if (username === "Zoe" && password === "!Tr1x1e123!") {
      // If successful, redirect to the main page
      window.location.href = "file:///D:/UU%20Final%20year/Com682/Week%209%20Practical_Web%20App%20Files/Week%206%20-%20WebApp/Week6_WebApp/ImageShare.html"
    } else {
      // If login fails, show an alert (you can customize this part)
      alert("Invalid username or password. Please try again.")
    }
    
  })
})
