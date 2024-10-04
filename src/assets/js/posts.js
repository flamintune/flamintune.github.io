// assets/js/posts.js

document.addEventListener('DOMContentLoaded', () => {
    const postList = document.getElementById('post-list');
    console.log("??")    
    fetch('list.json')
        .then(response => response.json())
        .then(routes => {
            const posts = routes.filter(route => route.type === 'post');
            const postListHTML = posts.map(post => `
                <div class="post-preview">
                    <h3><a href="/posts/view.html?post=${encodeURIComponent(post.file)}">${post.title}</a></h3>
                    <p class="post-meta">发布日期: ${post.date || '未知'}</p>
                    <p>${post.summary || '无摘要'}</p>
                </div>
            `).join('');

            postList.innerHTML = postListHTML || '暂无文章';
        })
        .catch(error => {
            console.error('Error loading posts:', error);
            postList.innerHTML = '加载文章列表失败，请稍后再试。';
        });
});