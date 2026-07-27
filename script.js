let isAdmin = false;
let currentUser = null;
let topics = [];

function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    document.body.classList.toggle('light-theme');
}

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

function registerUser() {
    const username = document.getElementById('username').value;
    if (username) {
        currentUser = username;
        document.getElementById('registration-area').style.display = 'none';
        alert(`Пользователь ${username} зарегистрирован!`);
    } else {
        alert('Введите имя пользователя!');
    }
}

function createTopic() {
    const topicName = document.getElementById('topic-name').value;
    if (topicName) {
        const topic = { name: topicName, posts: [] };
        topics.push(topic);
        renderTopics();
        document.getElementById('topic-name').value = '';
    } else {
        alert('Введите имя темы!');
    }
}

function renderTopics() {
    const topicList = document.getElementById('topic-list');
    topicList.innerHTML = '';
    topics.forEach((topic, index) => {
        const topicDiv = document.createElement('div');
        topicDiv.innerHTML = `<h4>${topic.name}</h4><div class="posts"></div>`;
        
        const postButton = document.createElement('button');
        postButton.textContent = 'Добавить пост';
        postButton.onclick = () => addPostToTopic(index);
        
        topicDiv.appendChild(postButton);
        
        topic.posts.forEach(post => {
            const postDiv = document.createElement('div');
            postDiv.textContent = post.content;

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Удалить пост';
            deleteButton.onclick = () => deletePost(index, post);
            
            postDiv.appendChild(deleteButton);
            topicDiv.querySelector('.posts').appendChild(postDiv);
        });

        topicList.appendChild(topicDiv);
    });
}

function addPostToTopic(topicIndex) {
    const postContent = document.getElementById('post-content').value;
    if (postContent) {
        topics[topicIndex].posts.push({ content: postContent, author: currentUser });
        renderTopics();
        document.getElementById('post-content').value = '';
    } else {
        alert('Введите содержимое поста!');
    }
}

function deletePost(topicIndex, post) {
    if (isAdmin || post.author === currentUser) {
        topics[topicIndex].posts = topics[topicIndex].posts.filter(p => p !== post);
        renderTopics();
    } else {
        alert('У вас нет прав для удаления этого поста!');
    }
                                }
