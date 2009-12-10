system.use("com.joyent.Sammy");
system.use("com.joyent.Resource");

GET("/", function() {
  return template("index.html");
});

var Name = new Resource('name');

GET("/demo", function() {
  var saved_names = Name.search({key: "demo"});
  if (saved_names.length == 0) {  
    this.saved_name = { name: "no name" };
  } else {
    this.saved_name = saved_names[0];
  }
  return <form method="post">
    Hello, <input type="text" name="name" value={this.saved_name.name} />. 
    <input type="submit" />
  </form>;
});

POST("/demo", function() {
  var saved_names = Name.search({key: "demo"});
  if (saved_names.length == 0) {  
    this.saved_name = new Name();
  } else {
    this.saved_name = saved_names[0];
  }
  this.saved_name.key = "demo";
  this.saved_name.name = this.request.body.name;
  this.saved_name.save();
  this.response.code = 201;
  return redirect('/demo');
});


