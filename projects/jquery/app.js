const URLs = { baseURL: "https://jsonplaceholder.typicode.com/" },
  POSTS_PER_PAGE = 20;

let counter = 0, postLength, newComments = [], v = 0, num = 1,
  // An object to hold temporary data.
  dataObj = {};

if (localStorage.users && localStorage.posts && localStorage.comments) {
  $("#getPosts").hide();
  setEnv();
  render();
  postTemplate();
}

function setEnv() {
  ['posts', 'users', 'comments'].map(function (data) {
    dataObj[data] = JSON.parse(localStorage[data]);
  });

  $(window).on("scroll", function () {
    if ($(window).height() - $(window).scrollTop() < ($("#app").height() / 9)) {
      if (dataObj.posts.length - (num * POSTS_PER_PAGE) >= 0) {
        num++ && render();
      }
    }
  });
}

function initAPIReq(url, type) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: url,
      type: type,
      async: true,
      success: (data) => {
        resolve(JSON.stringify(data));
      },
      error: (jqXHR, textStatus, errorThrown) => {
        reject(alert("Error retrieving data" + errorThrown));
      },
    });
  });
}

async function getPosts() {
  const promises = [
    // GET POSTS
    postsPromise = initAPIReq(URLs.baseURL + "posts", "GET"),
    // GET COMMENTS
    commentsPromise = initAPIReq(URLs.baseURL + "comments", "GET"),
    // GET USERS
    usersPromise = initAPIReq(URLs.baseURL + "users", "GET")
  ];

  let [posts, comments, users] = await Promise.all(promises)
    .then(console.log("Data received"));

  [localStorage.posts, localStorage.comments, localStorage.users] =
    [posts, comments, users];

  setEnv();
  render();
  $("#getPosts").hide();
  postTemplate();
}


function postTemplate() {
  let html = `
    <div class="btn-group" role="group" aria-label="Basic example">
      <input type="button"
        class="btn btn-lg btn-primary" name="postTemplate" value="Create Post"
        onclick="$('#newForm').toggle();"/>
    </div>
    <br/><br/>
    <div id="newForm" class="form-group" style="display:none">
      <div class="jumbotron">
        <label> CREATE NEW POST </label>
        <br/><br/>
         <label> User Email </label>
        <input class="form-control" id ="newPostUserEmail" name="email"
          type="email" placeholder="Email ..." required/>
        <br/>
         <label> Post Title </label>
        <input class="form-control" id ="newPostTitle" name="title"
          type="text" placeholder="Title ..." required/>
        <br>
         <label> Post Body </label>
        <textarea class="form-control" id ="newPostBody" name="body"
          type="text" placeholder="Post Body ..." required> </textarea>
        <br>
        <button class = "btn btn-success" onclick="addPost()"> New Post </button>
      </div>
    </div>
    `;

  $('#header').append(html);
}


function addPost() {
  if ($("#newPostBody").val() != ""
    && $("#newPostTitle").val() != ""
    && $("#newPostUserEmail").val() != "") {

    let
      newId = dataObj.posts.length + 1,
      user =
        dataObj.users.find(user => {
          return user.email.toLowerCase() == $("#newPostUserEmail").val().toLowerCase();
        });

    if (!user) {
      user = {
        'name': $("#newPostUserEmail").val().split('@')[0],
        'id': dataObj.users.length + 1,
        'username': $("#newPostUserEmail").val().split('@')[0],
        'email': $("#newPostUserEmail").val()
      };

      dataObj.users.push(user);
      localStorage.users = JSON.stringify(dataObj.users);
    }


    let post = {
      'id': newId,
      'userId': user.id,
      'title': $("#newPostTitle").val(),
      'body': $("#newPostBody").val()
    };

    dataObj.posts.push(post);
    localStorage.posts = JSON.stringify(dataObj.posts);
    if ((num * (POSTS_PER_PAGE - 1)) < (newId - 1) &&
      (newId - 1) < (num * POSTS_PER_PAGE)) { displayPost(newId - 1); }

    alert("Post added successfully");
  }
  else {
    alert("Please fill the form");
  }
}


function removePost(i) {
  for (var k = 0; k < dataObj.posts.length; k++) {
    if (k == i) {
      dataObj.posts.splice(k, 1);
      $("#postContainer" + k).remove();
    }
  }
  localStorage.posts = JSON.stringify(dataObj.posts);
}


function displayPost(i) {
  let html = "";

  html += `
    <div id = "postContainer${i}" class="form-group">
    <table id = "table${i}">
      <tbody>
        <tr><td>Name:</td></tr>
        <br>
        <tr><td><p><h4>${dataObj.users[dataObj.posts[i].userId] ? dataObj.users[dataObj.posts[i].userId].name : "No Name"}</h4></p></td></tr>
        <tr><td>Title:</td></tr>
        <br>
        <tr><td><p><h4>${dataObj.posts[i].title}</h4></p></td></tr>
        <br>
        <tr><td>Description:</td><br>
        <tr><td><h5 id="post${i}">${dataObj.posts[i].body}</h5></td><br></tr>
        <tr>
          <td>
            <input type="button"  class="btn btn-info"
            name="comments" onclick="$('#commentsContainer' + ${i}).toggle();"
            value="Comments" id="commentshow${i}"/>

            <input type="button"  class="btn btn-danger"
            name="deletepost" value="Delete Post"
            onclick="removePost(${i})"/>
          </td>
        </tr>
        <tr>
          <td>
            <br><br>
            <textarea class="form-control" id="addComment${i}"
            rows="1" cols="100" placeholder="Write a comment..."></textarea>
            <br>
            <input type="button"  class="btn btn-primary" name="commentButton"
            value="Add comment" onclick="addComment(${i}, ${dataObj.posts[i].id} )"/>
            <br>
          </td>
        </tr>
      </tbody>
    </table>
    <div id = "commentsContainer${i}" style="display: none;">`

  for (var j = 0; j < dataObj.comments.length; j++) {
    if (dataObj.comments[j].postId == dataObj.posts[i].id) {
      html += `
          <table>
            <tr>
              <td>
                  <h4> ${dataObj.comments[j] ? dataObj.comments[j].name : "No Name"} </h4>
                  <h5 name="comment" class ="textInput${j}"
                  id='textInput${j}'>${dataObj.comments[j].body}</h5>

                  <input type="button" name="Delete comment"
                  class="btn btn-warning" id="deleteCommentId${j}"
                  class="deleteCommentClass${j}" value="Delete Comment"
                  onclick="deleteComment(${dataObj.comments[j].id})"/>

                  <span class="icon${j}" id="iconId${j}">
                    <i onclick='like(this)' class='fa fa-thumbs-up'></i>
                  </span>
                  <br>
              </td>
            </tr>
          </table>`;
    }
  }

  html += `
      </div>
      <tr><td><hr></td></tr>
      </tbody>
    </table>
  </div>`;

  $('#app').append(html);
}

function render() {
  for (let i = (num - 1) * POSTS_PER_PAGE;
    (i < num * POSTS_PER_PAGE) && (i < dataObj.posts.length); i++) {
    displayPost(i);
  }
}


function addComment(id, postId) {
  if ($("#addComment" + id).val() != "") {

    let
      commentBox = $("#addComment" + id),
      commentsList = $("#commentsContainer" + id),
      newComment = {
        'postId': postId,
        'id': dataObj.comments[dataObj.comments.length - 1].id + 1,
        'name': `Comment ${dataObj.comments.length + 1}`,
        'email': 'xyz@gmail.com',
        'body': commentBox.val()
      };

    commentsList.append(
      `
      <table>
        <tr>
          <td>
          <h4> Comment ${Date.now()} </h4>
          <h5 id='comment${id}'> ${commentBox.val()} </h5>
          <br>
          <input type = 'button' name = 'Delete Comment'
            class= 'btn btn-warning' id = 'del' class= '' value = 'Delete Comment'
            onclick="deleteComment(${dataObj.comments[dataObj.comments.length - 1].id + 1})"/>
              <span class='' id=''><i onclick='like(this)' class='fa fa-thumbs-up'></span></i>
          <br>
          </td>
        </tr>
     </table>`);


    dataObj.comments.push(newComment);
    localStorage.comments = JSON.stringify(dataObj.comments);
    commentBox.value = "";
  }
}


function deleteComment(commentId) {
  for (var k = 0; k < dataObj.comments.length; k++) {
    if (dataObj.comments[k].id == commentId) {
      dataObj.comments.splice(k, 1);
      $(event.target).parents('table').remove();
    }
  }

  localStorage.comments = JSON.stringify(dataObj.comments);
}

$(function () {

  // Initially hide the text box
  $("#text").hide();
  $("#driver").click(function () {
    $("#text").toggle();
    return false;
  });

});


function like(elem) {
  elem.classList.toggle("fa-thumbs-down");
}
