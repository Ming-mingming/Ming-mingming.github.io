const shopNames = [
    "阿婆蔬菜", "新鮮肉舖", "海鮮大王", "美味素食", "手工水餃",
    "古早味紅茶", "快樂水果", "有機豆腐", "南北雜貨", "香脆炸雞",
    "傳統豆花", "客家麻糬", "燒臘便當", "現磨咖啡", "進口零食",
    "生活五金", "流行服飾", "修改衣服", "美甲沙龍", "手機配件",
    "寵物用品", "鮮花坊", "二手書店", "玩具反斗", "文具小舖",
    "修鞋鋪", "鑰匙刻印", "彩券行", "算命攤", "推拿按摩",
    "牛肉麵", "陽春麵", "滷肉飯", "蚵仔煎", "臭豆腐",
    "珍珠奶茶", "木瓜牛奶", "紅豆餅", "地瓜球", "鹹酥雞",
    "烤香腸", "大腸包小腸", "潤餅捲", "刈包", "四神湯",
    "排骨酥", "米粉湯", "肉圓", "碗粿", "筒仔米糕",
    "日式拉麵", "韓式炸雞", "泰式奶茶", "越南河粉", "印度咖哩",
    "義大利麵", "美式漢堡", "法式甜點", "德式豬腳", "西班牙燉飯"
];

// Refined Configuration based on visual estimation
const sections = [
    {
        id: 'section-left',
        top: 46,      // % from top
        left: 6.5,    // % from left
        width: 38.5,  // % width
        height: 11,   // % height
        cols: 16      // Estimated columns
    },
    {
        id: 'section-middle',
        top: 46,
        left: 46.5,
        width: 23.5,
        height: 11,
        cols: 10
    },
    {
        id: 'section-right',
        top: 46,
        left: 71.5,
        width: 19,
        height: 11,
        cols: 8
    }
];

const overlay = document.getElementById('shopsOverlay');
const tooltip = document.getElementById('tooltip');
const toggleBtn = document.getElementById('toggleDebug');
const modalBackdrop = document.getElementById('modalBackdrop');
const modalClose = document.getElementById('modalClose');
const modalTitle = document.getElementById('modalTitle');
let isDebug = true;

function init() {
    sections.forEach(section => {
        createSection(section);
    });

    updateDebugMode();

    toggleBtn.addEventListener('click', () => {
        isDebug = !isDebug;
        updateDebugMode();
    });

    // Modal Event Listeners
    modalClose.addEventListener('click', closeModal);
    modalBackdrop.addEventListener('click', (e) => {
        if (e.target === modalBackdrop) {
            closeModal();
        }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
}

function createSection(config) {
    const el = document.createElement('div');
    el.className = 'shop-section';
    el.style.top = config.top + '%';
    el.style.left = config.left + '%';
    el.style.width = config.width + '%';
    el.style.height = config.height + '%';
    el.style.gridTemplateColumns = `repeat(${config.cols}, 1fr)`;

    // Create shops for this section (2 rows * cols)
    const totalShops = config.cols * 2;

    for (let i = 0; i < totalShops; i++) {
        const shop = document.createElement('div');
        shop.className = 'shop-unit';

        // Random name
        const name = shopNames[Math.floor(Math.random() * shopNames.length)];
        shop.dataset.name = name;

        // Add event listeners
        shop.addEventListener('mouseenter', (e) => showTooltip(e, name));
        shop.addEventListener('mouseleave', hideTooltip);
        shop.addEventListener('mousemove', moveTooltip);
        shop.addEventListener('click', () => openModal(name));

        el.appendChild(shop);
    }

    overlay.appendChild(el);
}

function updateDebugMode() {
    const shops = document.querySelectorAll('.shop-unit');
    shops.forEach(shop => {
        if (isDebug) {
            shop.classList.add('debug');
        } else {
            shop.classList.remove('debug');
        }
    });
    toggleBtn.textContent = isDebug ? "關閉輔助線 (Hide Debug)" : "顯示輔助線 (Show Debug)";
}

function showTooltip(e, text) {
    tooltip.textContent = text;
    tooltip.style.opacity = '1';
    moveTooltip(e);
}

function hideTooltip() {
    tooltip.style.opacity = '0';
}

function moveTooltip(e) {
    // Position tooltip above the cursor
    const x = e.clientX;
    const y = e.clientY;

    tooltip.style.left = x + 'px';
    tooltip.style.top = (y - 15) + 'px';
}

function openModal(name) {
    modalTitle.textContent = name;
    modalBackdrop.classList.add('active');
}

function closeModal() {
    modalBackdrop.classList.remove('active');
}

// Initialize
window.addEventListener('load', init);
