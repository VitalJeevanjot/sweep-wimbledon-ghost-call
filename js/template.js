var template = `
    
    {{#posts}}
    <div style="height: 22vh;" id={{feedback_id}}>
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
          <a id="links_comment" style="cursor: pointer; margin-left: 10px;" onclick="reply_comment('{{feedback_id}}')"> Reply</a>
        </div>
      </div>
    </div>
    <!-- children posts -->
    {{#children}}
        <div style="height: 22vh; transform: translate(5vw, 0vh)" id={{feedback_id}}>
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
              <!-- <a id="links_comment" style="cursor: pointer; margin-left: 10px;" onclick="reply_comment({{feedback_id}})"> Reply</a> -->
            </div>
          </div>
        </div>
        {{/children}}
    {{/posts}}

    `;