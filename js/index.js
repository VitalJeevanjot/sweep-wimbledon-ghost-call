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
  
  axios.post('https://backend-contribution-genievot.cloud.okteto.net/post_feedback', {
    user_name: "Jeevanjot Singh Vital",
    feedback_body: $("#comment_text").val(),
    feedback_ref: "nulli"
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

function reply_comment(f_id) {
  console.log($("#comment_text").val())
  if($("#comment_text").val().length < 10) {M.toast({html: "must add atleast 10 characters"}); return}
  
  axios.post('https://backend-contribution-genievot.cloud.okteto.net/post_feedback', {
    user_name: "Jeevanjot Singh Vital",
    feedback_body: $("#comment_text").val(),
    feedback_ref: f_id
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
  var feedbacks_url = "https://backend-contribution-genievot.cloud.okteto.net/get_feedbacks"
  axios.get(feedbacks_url)
  .then(function (response) {
    const _posts = response.data.response

    let posts = []
    for (let index = 0; index < _posts.length; index++) {
      // making sure that each parent get its child :)
      const _children_posts = _posts.filter(x => x.feedback_ref == _posts[index].feedback_id)

      _posts[index].children = _children_posts

      if(_posts[index].feedback_ref == "nulli") {
        posts.push(_posts[index])
      }

    }

    // console.log(children)

    
    var rendered = Mustache.render(template, { posts: posts });
    document.getElementById('target').innerHTML = rendered;
    console.log(_posts)

  })
  .catch(function (error) {
    console.log(error);
  })
}

function add_upvote(feedback_id) {
  axios.post('https://backend-contribution-genievot.cloud.okteto.net/add_upvote', {
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
