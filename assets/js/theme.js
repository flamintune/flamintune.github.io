document.body.style.backgroundColor = sessionStorage.getItem('bg');
document.body.style.color = sessionStorage.getItem('cc');
const frame_fill = document.getElementsByClassName('frame_fill')
for (let i = 0;i < frame_fill.length;i++){
    let item = frame_fill[i]
    item.style.backgroundColor = sessionStorage.getItem('bg')
}
function theme() {
    if (sessionStorage.getItem('bg') === 'rgb(255, 255, 255)') {
        sessionStorage.setItem('bg', 'rgb(6, 23, 37)');
        sessionStorage.setItem('cc', '#777');
    }
    else if (sessionStorage.getItem('bg') == null || undefined) {
        sessionStorage.setItem('bg', 'rgb(6, 23, 37)');
        sessionStorage.setItem('cc', '#777');
    }
    else if (sessionStorage.getItem('bg') === 'rgb(6, 23, 37)') {
        sessionStorage.setItem('bg', 'rgb(255, 255, 255)');
        sessionStorage.setItem('cc', '#333');
    }

    document.body.style.backgroundColor = sessionStorage.getItem('bg');
    document.body.style.color = sessionStorage.getItem('cc');
    for (let i = 0;i < frame_fill.length;i++){
        let item = frame_fill[i]
        item.style.backgroundColor = sessionStorage.getItem('bg')
    }
}


