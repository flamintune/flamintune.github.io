// sitemap.js

let pages = [];

// 加载路由信息
function loadRoutes() {
    fetch('/routes.json')
        .then(response => response.json())
        .then(routes => {
            console.log(routes)
            pages = routes;
            if (window.location.pathname === '/sitemap') {
                document.body.innerHTML = generateSitemapHTML();
            }
        })
        .catch(error => console.error('Error loading routes:', error));
}

// 生成sitemap HTML的函数
function generateSitemapHTML() {
    let html = '<h1>网站地图</h1><ul>';
    pages.forEach(page => {
        html += `<li><a href="${page.path}">${page.title}</a></li>`;
    });
    html += '</ul>';
    return html;
}

// 当页面加载完成时加载路由
window.addEventListener('load', loadRoutes);