const adminCode = "SATANDAGI";
let isAdmin = false;

function validateAdmin() {
    const code = document.getElementById('admin-code').value;
    if (code === adminCode) {
        isAdmin = true;
        document.getElementById('admin-access').classList.add('hidden');
        document.getElementById('post-area').classList.remove('hidden');
        loadTopics();
        loadPosts();
    } else {
        alert('Неверный код администратора!');
    }
}

function registerUser() {
    const username = document.getElementById('username').value;
    if (username) {
        localStorage.setItem('username', username);
        document.getElementById('user-registration').classList.add('hidden');
        document.getElementById('post-area').classList.remove('hidden');
        loadTopics();
        loadPosts();
    } else {
        alert('Введите имя пользователя!');
    }
}

function loadTopics() {
    const topics = JSON.parse(localStorage.getItem('topics')) || [];
    const topicSelect = document.getElementById('topic-select');
    topicSelect.innerHTML = '';

    topics.forEach(topic => {
        const option = document.createElement('option');
        option.value = topic;
        option.textContent = topic;
        topicSelect.appendChild(option);
    });
}

function addPost() {
    const postContent = document.getElementById('post-content').value;
    const topic = document.getElementById('topic-select').value;
    const username = localStorage.getItem('username');

    if (postContent && topic) {
        const posts = JSON.parse(localStorage.getItem('posts')) || [];
        posts.push({ content: postContent, topic, author: username });
        localStorage.setItem('posts', JSON.stringify(posts));
        
        document.getElementById('post-content').value = '';
        loadPosts();
    } else {
        alert('Введите содержимое поста и выберите тему!');
    }
}

function loadPosts() {
    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    const postsContainer = document.getElementById('posts-container');
    postsContainer.innerHTML = '';

    posts.forEach(post => {
        const postDiv = document.createElement('div');
        postDiv.textContent = `${post.content} (Автор: ${post.author})`;
        
        if (isAdmin) {
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Удалить пост';
            deleteButton.onclick = () => deletePost(post.content);
            postDiv.appendChild(deleteButton);
        }

        postsContainer.appendChild(postDiv);
    });
}

function deletePost(content) {
    let posts = JSON.parse(localStorage.getItem('posts')) || [];
    posts = posts.filter(post => post.content !== content);
    localStorage.setItem('posts', JSON.stringify(posts));
    
    loadPosts();
          }
