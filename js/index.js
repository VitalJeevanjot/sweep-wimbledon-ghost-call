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
  });
