system.use("com.joyent.Sammy");
system.use("com.joyent.Resource");

GET("/", function() {
  return template("index.html");
});

var Name = new Resource('name');

GET("/demo", function() {
  var savedNames = Name.search({key: "demo"});
  if (savedNames.length == 0) {  
    this.savedName = { name: "no name" };
  } else {
    this.savedName = savedNames[0];
  }
  return <form method="post">
    Hello, <input type="text" name="name" value={this.savedName.name} />. 
    <input type="submit" />
  </form>;
});

POST("/demo", function() {
  var savedNames = Name.search({key: "demo"});
  if (savedNames.length == 0) {  
    this.savedName = new Name();
  } else {
    this.savedName = savedNames[0];
  }
  this.savedName.key = "demo";
  this.savedName.name = this.request.body.name;
  this.savedName.save();
  this.response.code = 201;
  return redirect('/demo');
});


