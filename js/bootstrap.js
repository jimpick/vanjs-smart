system.use("com.joyent.Sammy");
system.use("com.joyent.Resource");

GET("/", function() {
  return template("index.html");
});

