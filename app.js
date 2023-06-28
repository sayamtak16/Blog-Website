//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const posts=[];

const homeStartingContent = "Welcome to our vibrant and dynamic blog website, where ideas come alive and inspiration knows no bounds.\r\n \r\nHere, you will embark on a captivating journey through the realms of knowledge, creativity, and exploration. Step into a world where curiosity thrives and imagination takes flight. Our home page is a gateway to a treasure trove of thought-provoking articles, captivating stories, and engaging multimedia content. From the latest breakthroughs in science and  technology to insightful perspectives on art, culture, and beyond, there's something to captivate every mind.Unleash your intellectual curiosity as you immerse yourself in our carefully curated selection of articles. Delve into the depths of scientific discoveries, unravel the mysteries of history, and gain a fresh perspective on the complexities of the human experience. With each click, you'll find yourself immersed in a wealth of knowledge, ready to expand your horizons.But our blog is more than just a repository of information—it's a platform that sparks conversations and fosters connections. Engage with our vibrant community of readers through comments, sharing your thoughts, and connecting with like-minded individuals. Here, ideas converge, opinions are valued, and dialogues flourish, creating an enriching and inclusive space for all.";

const aboutContent = "Introducing our innovative and engaging blog website, where knowledge, inspiration, and entertainment converge.. At our blog, we strive to provide a unique and enriching online experience for our readers. Whether you're a passionate learner, a curious explorer, or an avid enthusiast, our platform caters to a wide range of interests and topics Discover a vast array Of thought-provoking articles, meticulously crafted to offer valuable insights and perspectives. Our team Of expert writers, researchers, and contributors diligently curate content that is both informative and engaging. From the latest trends and developments In technology, science, and business to insightful discussions on culture, arts, and society, we cover it all. Navigate through our intuitive interface, designed to make your reading experience seamless and enjoyable. Our user-friendly layout ensures easy access to a diverse range Of categories, allowing you to delve into your preferred topics effortlessly. Browse through our extensive archives to explore a wealth Of knowledge, or stay up to date with the freshest content delivered straight to your inbox through our newsletter.";

const contactContent = "Name: Sayam Tak   E-Mail: sayamtak16@gmail.com";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/",function(req,res){
  res.render("home",{homeStartingContent:homeStartingContent, posts:posts});
});

app.get("/posts/:choice",function(req,res){
  var check = _.lowerCase(req.params.choice);
  for(var i=0;i<posts.length;i++){
    const storedTitle=_.lowerCase(posts[i].title);
    if(storedTitle===check)
    {
      res.render("post",{title:posts[i].title, content:posts[i].content});
    }
  }
});

app.get("/about",function(req,res){
  res.render("about",{aboutContent:aboutContent});
});

app.get("/contact",function(req,res){
  res.render("contact",{contactContent:contactContent});
});

app.get("/compose",function(req,res){
  res.render("compose");
});




app.post("/compose",function(req,res){
  var post ={
    title:req.body.titleContent,
    content:req.body.textArea
  }
  posts.push(post);
  res.redirect("/");
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
