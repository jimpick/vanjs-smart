system.use("com.joyent.Sammy");
system.use("com.joyent.Resource");

GET("/", function() {
  return template("index.html");
});

var Name = new Resource('name');

GET("/demo", function() {
  /* try {
    this.savedName = Name.search({key: "demo"})[0];
  } catch(e) { */
    this.savedName = { name: "no name" };
  // }
  return <form method="post">
    Hello, <input type="text" name="name" value={this.savedName.name} />. 
    <input type="submit" />
  </form>;
});

POST("/demo", function() {
  try {
    this.savedName = Name.search({key: "demo"})[0];
  } catch(e) {
    this.savedName = new Name();
  }
  this.savedName.key = "demo";
  this.savedName.name = this.request.body.name;
  this.savedName.save();
  this.response.code = 201;
  return redirect('/demo');
});


