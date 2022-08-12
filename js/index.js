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
          <p><b>Rovv</b></p>
        </div>
        <div class="col timing">
          <p><b>・</b>45 min ago </p>
        </div>
    </div>
    <div class="row" style="margin-left: 5vw;">
      <div class="col post-text">
        <p>{{the_feedback}}</p>
        <a href="" id="links_comment">▲ Upvote</a>
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
