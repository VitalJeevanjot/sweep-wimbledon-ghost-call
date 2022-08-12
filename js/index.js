  $(document).ready(function(){
    $('.materialboxed').materialbox();
    var git_post = "https://gist.githubusercontent.com/VitalJeevanjot/43647078efd970be3e083afe3470551a/raw/db3422ed851c3da08eb0a1a67dec8a9305c4ecbf/uniblogpost.md"
    axios.get(git_post)
    .then(function (response) {
      document.getElementById('content').innerHTML = 
      marked.parse(response.data);
    })
    .catch(function (error) {
      console.log(error);
    })
  });
