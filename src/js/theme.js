document.body.style.backgroundColor = sessionStorage.getItem('bg');
document.body.style.color = sessionStorage.getItem('cc');
const frame_fill = document.getElementsByClassName('frame_fill')
for (let i = 0; i < frame_fill.length; i++) {
    let item = frame_fill[i]
    item.style.backgroundColor = sessionStorage.getItem('bg')
}
function theme() {
    let isLight = true
    if (sessionStorage.getItem('bg') === 'rgb(255, 255, 255)') {
        isLight = false
        sessionStorage.setItem('bg', 'rgb(6, 23, 37)');
        sessionStorage.setItem('cc', '#777');
    }
    else if (sessionStorage.getItem('bg') == null || undefined) {
        isLight = false
        sessionStorage.setItem('bg', 'rgb(6, 23, 37)');
        sessionStorage.setItem('cc', '#777');
    }
    else if (sessionStorage.getItem('bg') === 'rgb(6, 23, 37)') {
        isLight = true
        sessionStorage.setItem('bg', 'rgb(255, 255, 255)');
        sessionStorage.setItem('cc', '#333');
    }
    // const dark = '#60c17d'
    // const light = '#d3d3d3'
    // const dark_bg = `linear-gradient(to right, ${dark} 1px, transparent 1px),
    // linear-gradient(to bottom, ${dark} 1px, transparent 1px)`
    // const light_bg = `linear-gradient(to right, ${light} 1px, transparent 1px),
    // linear-gradient(to bottom, ${light} 1px, transparent 1px)`
    // document.body.style.backgroundImage = dark;
    document.body.style.backgroundColor = sessionStorage.getItem('bg');
    document.body.style.color = sessionStorage.getItem('cc');
    console.log(frame_fill)
    for (let i = 0; i < frame_fill.length; i++) {
        let item = frame_fill[i]
        item.style.backgroundColor = sessionStorage.getItem('bg')
    }
}


// 获取一年中的总天数
const getDaysInYear = (year) => {
    const start = new Date(year, 0, 1);
    const end = new Date(year + 1, 0, 1);
    return (end - start) / (1000 * 60 * 60 * 24);
};

// 获取今天是这一年中的第几天
const getDayOfYear = () => {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now - start;
    const oneDay = 1000 * 60 * 60 * 24;
    const day = Math.floor(diff / oneDay);
    console.log(day)
    return day;
};

// 计算年度进度百分比
const calculateProgress = () => {
    const year = new Date().getFullYear();
    const daysInYear = getDaysInYear(year);
    const dayOfYear = getDayOfYear();

    return Math.floor((dayOfYear / daysInYear) * 100);
};

const year_progress_bar = document.querySelector('.frame_year_progress_bar')
console.log(year_progress_bar)
year_progress_bar.innerHTML = `2024 Year Progress: ${calculateProgress()}%`