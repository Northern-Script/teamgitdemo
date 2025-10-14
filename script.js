// 猫テーマのWebサイト用JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // ページロード時のアニメーション
    animatePageLoad();
    
    // ナビゲーションのアクティブ状態を設定
    setActiveNavigation();
    
    // スムーススクロール
    setupSmoothScroll();
    
    // 猫の鳴き声機能
    setupCatSounds();
    
    // GitHub関連のデモ機能
    setupGitHubDemo();
});

// ページロード時のアニメーション
function animatePageLoad() {
    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        
        setTimeout(() => {
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 200 * (index + 1));
    });
}

// ナビゲーションのアクティブ状態
function setActiveNavigation() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.style.background = 'rgba(255,255,255,0.2)';
        }
    });
}

// スムーススクロール
function setupSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// 猫の鳴き声機能（クリックで猫の絵文字にインタラクション）
function setupCatSounds() {
    const catEmojis = document.querySelectorAll('.cat-emoji, .card-icon');
    const meowSounds = ['にゃー！', 'ミャオ〜', 'ニャン♪', 'ゴロゴロ...', 'ニャーン'];
    
    catEmojis.forEach(emoji => {
        emoji.style.cursor = 'pointer';
        emoji.addEventListener('click', function() {
            // 鳴き声をランダムに選択
            const randomMeow = meowSounds[Math.floor(Math.random() * meowSounds.length)];
            
            // アニメーション効果
            this.style.transform = 'scale(1.2)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 200);
            
            // 鳴き声を表示
            showCatMessage(randomMeow);
        });
    });
}

// 猫のメッセージを表示
function showCatMessage(message) {
    const messageDiv = document.createElement('div');
    messageDiv.textContent = message;
    messageDiv.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(45deg, #667eea, #764ba2);
        color: white;
        padding: 20px 30px;
        border-radius: 25px;
        font-size: 1.5rem;
        font-weight: bold;
        z-index: 1000;
        animation: fadeInOut 2s ease-in-out;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
    `;
    
    // CSS アニメーションを動的に追加
    if (!document.querySelector('#catMessageStyle')) {
        const style = document.createElement('style');
        style.id = 'catMessageStyle';
        style.textContent = `
            @keyframes fadeInOut {
                0% { opacity: 0; transform: translate(-50%, -50%) scale(0.5); }
                20% { opacity: 1; transform: translate(-50%, -50%) scale(1.1); }
                80% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
                100% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(messageDiv);
    
    setTimeout(() => {
        document.body.removeChild(messageDiv);
    }, 2000);
}

// GitHubデモ機能
function setupGitHubDemo() {
    // GitHubのコマンド例を表示する機能
    const gitCommands = [
        'git init',
        'git add .',
        'git commit -m "Initial commit"',
        'git branch feature/new-feature',
        'git checkout feature/new-feature',
        'git merge main',
        'git push origin main'
    ];
    
    // デモボタンがあれば機能を追加
    const demoButtons = document.querySelectorAll('.demo-btn');
    demoButtons.forEach(button => {
        button.addEventListener('click', function() {
            const randomCommand = gitCommands[Math.floor(Math.random() * gitCommands.length)];
            showGitCommand(randomCommand);
        });
    });
}

// Gitコマンドを表示
function showGitCommand(command) {
    const commandDiv = document.createElement('div');
    commandDiv.innerHTML = `
        <strong>GitHub Command Demo:</strong><br>
        <code style="background: #f4f4f4; padding: 5px 10px; border-radius: 5px; font-family: monospace;">
            ${command}
        </code>
    `;
    commandDiv.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: white;
        padding: 20px;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        z-index: 1000;
        max-width: 300px;
        border-left: 4px solid #667eea;
    `;
    
    document.body.appendChild(commandDiv);
    
    setTimeout(() => {
        document.body.removeChild(commandDiv);
    }, 3000);
}

// ページ間の遷移エフェクト
function setupPageTransitions() {
    const links = document.querySelectorAll('a[href$=".html"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            
            // フェードアウト効果
            document.body.style.transition = 'opacity 0.3s ease';
            document.body.style.opacity = '0';
            
            setTimeout(() => {
                window.location.href = href;
            }, 300);
        });
    });
}

// ダークモード切り替え（オプション機能）
function setupDarkMode() {
    const darkModeToggle = document.querySelector('#darkModeToggle');
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-mode');
            localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
        });
        
        // 保存された設定を読み込み
        if (localStorage.getItem('darkMode') === 'true') {
            document.body.classList.add('dark-mode');
        }
    }
}