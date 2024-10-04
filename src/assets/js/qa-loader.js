document.addEventListener('DOMContentLoaded', function() {
    fetch('/qa_content.json')
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById('qa-container');
            data.forEach(item => {
                const details = document.createElement('details');
                const summary = document.createElement('summary');
                const p = document.createElement('p');

                summary.textContent = item.question;
                p.innerHTML = item.answer;

                details.appendChild(summary);
                details.appendChild(p);
                container.appendChild(details);
            });
        })
        .catch(error => console.error('Error loading QA content:', error));
});