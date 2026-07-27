   let isAdmin = false;

   function checkAdminCode() {
       const code = document.getElementById('admin-code').value;
       if (code === 'SATANDAGI') {
           isAdmin = true;
           document.getElementById('admin-area').style.display = 'none';
           document.getElementById('admin-controls').style.display = 'block';
       } else {
           alert('Неверный код!');
       }
   }

   function createTopic() {
       const topicName = document.getElementById('topic-name').value;
       const topicList = document.getElementById('topic-list');
       const topicDiv = document.createElement('div');
       topicDiv.innerHTML = `<h4>${topicName}</h4><div class="posts"></div>`;
       topicList.appendChild(topicDiv);
       document.getElementById('topic-name').value = '';
   }

   function addPost() {
       const postContent = document.getElementById('post-content').value;
       const postsDiv = document.querySelector('.posts:last-child');
       if (postsDiv) {
           const postDiv = document.createElement('div');
           postDiv.textContent = postContent;
           postsDiv.appendChild(postDiv);
           document.getElementById('post-content').value = '';
       } else {
           alert('Сначала создайте тему!');
       }
   }
   
