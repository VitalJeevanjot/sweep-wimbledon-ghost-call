$(document).ready(function(){
  $('.materialboxed').materialbox();
  var git_post = "https://gist.githubusercontent.com/VitalJeevanjot/43647078efd970be3e083afe3470551a/raw/30fc8217c905280350c63067d258a54a331c0bab/uniblogpost.md"

  axios.get(git_post)
  .then(function (response) {
    document.getElementById('content').innerHTML = 
    marked.parse(response.data);
  })
  .catch(function (error) {
    console.log(error);
  })

  get_feedbacks()

});



function submit_comment() {
  console.log($("#comment_text").val())
  if($("#comment_text").val().length < 10) {M.toast({html: "must add atleast 10 characters"}); return}
  
  axios.post('http://localhost:3000/post_feedback', {
    user_name: "Jeevanjot Singh Vital",
    feedback_body: $("#comment_text").val(),
    feedback_ref: "null"
  })
  .then(function (response) {
    // handle success
    M.toast({html: response.data.saved})
    get_feedbacks()
    $("#comment_text").val('')
    console.log(response);
  }).catch((e) => {
    M.toast({html: e.message})
    console.log(e)
  })
}

setInterval(get_feedbacks,15000)

function get_feedbacks() {
  var feedbacks_url = "http://localhost:3000/get_feedbacks"
  axios.get(feedbacks_url)
  .then(function (response) {
    const posts = response.data.response
    var template = `
    
    {{#posts}}
    <div style="height: 100px; margin-top: -2vh">
      <div class="row">
        <div class="col" id="avatar">
            <img  src="assets/avataaars.png" alt="avataar1" class="circle"/>
        </div>
        <div class="col" style="margin-right: -1.2%;
        margin-left: -1.5%;
        transform: translate(0px, -5%);
        ">
          <p><b>{{user_posted_feedback}}</b></p>
        </div>
        <div class="col timing">
          <p><b>・</b>45 min ago </p>
        </div>
    </div>
    <div class="row" style="margin-left: 5vw;">
      <div class="col post-text">
        <p>{{the_feedback}}</p>
        <a id="links_comment" style="cursor: pointer;" onclick="add_upvote('{{feedback_id}}')">▲ Upvote({{feedback_upvotes}})</a>
        <a href="" id="links_comment" style="margin-left: 10px;"> Reply</a>
      </div>
    </div>
    {{/posts}}
    `;
    
    var rendered = Mustache.render(template, { posts: posts });
    document.getElementById('target').innerHTML = rendered;
    console.log(posts)

  })
  .catch(function (error) {
    console.log(error);
  })
}

function add_upvote(feedback_id) {
  axios.post('http://localhost:3000/add_upvote', {
    feedback_id: feedback_id
  })
  .then(function (response) {
    console.log(response)
    // handle success
    M.toast({html: response.data.status})
    get_feedbacks()
    console.log(response);
  }).catch((e) => {
    M.toast({html: e.message})
    console.log(e)
  })
}
