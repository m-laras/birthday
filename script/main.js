document.addEventListener('contextmenu', function (e) {
    e.preventDefault();
});

document.addEventListener('keydown', function (e) {
    if ((e.ctrlKey || e.metaKey) && (e.key === 'c' || e.key === 'C')) {
        e.preventDefault();
    }
});

const messages = [
    "Tap dimana aja yaaa",
    "hey kamu",
    "iya kamu ivannn",
    "coba liat sekarang tanggal berapa?",
    "🫣🫣🫣",
    "ciee ada yang ulang tahun nichhh",
    "ih kamu tambah tua yaa~",
    "🤭🤭🤭",
    "jadi makin kyk om-om ihh~~",
    "🤭🤭🤭🤭🤭🤭",
    "HAHAHAHA",
    "bercanda bub",
    "😙🙏",
    "kesel yaa??",
    "jangan dong yaa",
    "masa kesel sama aku yg imut ini",
    "🥰🥰🥰",
    "yaudahhh",
    "aku ga bercanda lagi deh nihhh",
    "yaa intinya..",
    "SELAMAT ULANG TAHUN IVAN-!!",
    "🥳🫶",
    "doanya dilanjut disini yaaa",
];

let currentPage = 0;
let isLastPage = false;

function showMessage() {
    $('.message').text(messages[currentPage]);

    isLastPage = currentPage === messages.length - 1;

    if (isLastPage) {
        $('.next-button').show();
        $('.bg_heart').css('cursor', 'default');
    } else {
        $('.next-button').hide();
        $('.bg_heart').css('cursor', 'pointer');
    }
}

$('.bg_heart').on('click', function () {
    if (!isLastPage) {
        currentPage++;
        showMessage();
    }
});

// Replace hearts with images
var love = setInterval(function () {
    var r_size = Math.floor(Math.random() * 125) + 80; // Random size between 20px and 85px
    var r_left = Math.floor(Math.random() * 125) + 1; // Random horizontal position
    var r_time = Math.floor(Math.random() * 5) + 5; // Random animation duration (5s to 10s)

    // Create a new heart element with an image
    var heart = $("<div class='heart'><img src='./assets/blackLove.png' alt='heart'></div>");
    heart.css({
        width: r_size + "px",
        height: r_size + "px",
        left: r_left + "%",
        animation: `love ${r_time}s ease`,
    });

    $('.bg_heart').append(heart);

    // Remove hearts once they go off-screen
    $('.heart').each(function () {
        var top = parseFloat($(this).css("top"));
        if (top <= -100) {
            $(this).remove();
        }
    });
}, 500);

showMessage();

function clearMusicState() {
    localStorage.removeItem('musicPlaying');
    localStorage.removeItem('musicCurrentTime');
}

window.onload = function () {
    clearMusicState();
};

function setupMusic() {
    const music = document.getElementById('backgroundMusic');

    if (!localStorage.getItem('initialLoad')) {
        clearMusicState();
        localStorage.setItem('initialLoad', 'true');
        music.currentTime = 0;
    }

    const isMusicPlaying = localStorage.getItem('musicPlaying') === 'true';
    const musicCurrentTime = localStorage.getItem('musicCurrentTime') || 0;

    if (isMusicPlaying) {
        music.currentTime = parseFloat(musicCurrentTime);
        music.play().catch((error) => console.log('Playback failed', error));
    }

    music.addEventListener('play', () => {
        localStorage.setItem('musicPlaying', 'true');
    });

    music.addEventListener('pause', () => {
        localStorage.setItem('musicPlaying', 'false');
    });

    setInterval(() => {
        localStorage.setItem('musicCurrentTime', music.currentTime);
    }, 1000);

    document.addEventListener('click', function startMusic() {
        music.play().catch((error) => {
            console.log('Autoplay prevented', error);
        });
        document.removeEventListener('click', startMusic);
    });
}

document.addEventListener('DOMContentLoaded', setupMusic);
