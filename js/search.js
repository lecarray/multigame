/**
 * 游戏搜索功能脚本
 * 
 * 这个脚本负责处理网站的游戏搜索功能
 */

// 游戏数据库 - 实际项目中可能从服务器端获取
const gamesDatabase = [
    {
        id: 1,
        name: "Monster Survivors",
        category: "action",
        description: "在这款动作生存游戏中对抗无尽的怪物浪潮，提升你的角色能力以生存更久。",
        url: "games/monster-survivors/index.html",
        image: "assets/images/monster-survivors.jpg",
        tags: ["动作", "生存", "角色扮演", "怪物"]
    },
    {
        id: 2,
        name: "智慧拼图",
        category: "puzzle",
        description: "挑战你的智力极限，解决各种复杂的拼图和谜题，提升你的逻辑思维能力。",
        url: "games/puzzle/puzzle-quest.html",
        image: "assets/images/puzzle-quest.jpg",
        tags: ["益智", "拼图", "逻辑"]
    },
    {
        id: 3,
        name: "塔防大师",
        category: "strategy",
        description: "策略性地放置防御塔，阻止敌人入侵你的领地，成为真正的塔防大师。",
        url: "games/strategy/tower-defense.html",
        image: "assets/images/tower-defense.jpg",
        tags: ["策略", "塔防", "防御"]
    },
    {
        id: 4,
        name: "忍者跑酷",
        category: "action",
        description: "控制你的忍者角色，跳跃、滑行，躲避障碍物。",
        url: "games/action/ninja-runner.html",
        image: "assets/images/ninja-runner.jpg",
        tags: ["动作", "跑酷", "忍者", "技巧"]
    },
    {
        id: 5,
        name: "太空射手",
        category: "action",
        description: "驾驶你的太空飞船，射击敌人，保卫地球。",
        url: "games/action/space-shooter.html",
        image: "assets/images/space-shooter.jpg",
        tags: ["动作", "射击", "太空", "飞船"]
    },
    {
        id: 6,
        name: "记忆配对",
        category: "puzzle",
        description: "测试你的记忆力，找出所有匹配的卡片对。",
        url: "games/puzzle/memory-match.html",
        image: "assets/images/memory-match.jpg",
        tags: ["益智", "记忆", "配对"]
    },
    {
        id: 7,
        name: "单词大师",
        category: "puzzle",
        description: "用给定的字母组合成尽可能多的单词。",
        url: "games/puzzle/word-master.html",
        image: "assets/images/word-master.jpg",
        tags: ["益智", "单词", "文字", "语言"]
    },
    {
        id: 8,
        name: "城市建设者",
        category: "strategy",
        description: "规划和建设你自己的城市，管理资源和人口。",
        url: "games/strategy/city-builder.html",
        image: "assets/images/city-builder.jpg",
        tags: ["策略", "模拟", "建设", "管理"]
    },
    {
        id: 9,
        name: "国际象棋大师",
        category: "strategy",
        description: "挑战电脑或其他玩家，提升你的国际象棋技巧。",
        url: "games/strategy/chess-master.html",
        image: "assets/images/chess-master.jpg",
        tags: ["策略", "棋类", "智力", "对战"]
    }
];

// 在DOM加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 获取搜索相关元素
    const searchInput = document.querySelector('.search-input');
    const searchBtn = document.querySelector('.search-btn');
    
    // 创建搜索结果容器
    const searchResultsContainer = document.createElement('div');
    searchResultsContainer.className = 'search-results';
    searchResultsContainer.style.display = 'none';
    document.querySelector('.search-container').appendChild(searchResultsContainer);
    
    // 搜索按钮点击事件
    searchBtn.addEventListener('click', function() {
        performSearch();
    });
    
    // 输入框回车事件
    searchInput.addEventListener('keypress', function(e) {
        if(e.key === 'Enter') {
            performSearch();
        }
    });
    
    // 输入框内容变化事件（实时搜索）
    searchInput.addEventListener('input', function() {
        if (this.value.trim().length >= 2) {
            performSearch(true); // 传入true表示这是实时搜索
        } else {
            searchResultsContainer.style.display = 'none';
        }
    });
    
    // 点击页面其他地方关闭搜索结果
    document.addEventListener('click', function(e) {
        if (!searchResultsContainer.contains(e.target) && e.target !== searchInput && e.target !== searchBtn) {
            searchResultsContainer.style.display = 'none';
        }
    });
    
    // 执行搜索
    function performSearch(isLiveSearch = false) {
        const searchTerm = searchInput.value.trim().toLowerCase();
        
        if (!searchTerm) {
            searchResultsContainer.style.display = 'none';
            return;
        }
        
        // 执行搜索
        const results = searchGames(searchTerm);
        
        // 显示结果
        if (results.length > 0) {
            displaySearchResults(results, isLiveSearch);
        } else {
            searchResultsContainer.innerHTML = '<div class="no-results">没有找到匹配的游戏</div>';
            searchResultsContainer.style.display = 'block';
        }
    }
    
    // 在游戏数据库中搜索
    function searchGames(term) {
        return gamesDatabase.filter(game => {
            // 搜索游戏名称
            if (game.name.toLowerCase().includes(term)) return true;
            
            // 搜索游戏描述
            if (game.description.toLowerCase().includes(term)) return true;
            
            // 搜索游戏标签
            return game.tags.some(tag => tag.toLowerCase().includes(term));
        });
    }
    
    // 显示搜索结果
    function displaySearchResults(results, isLiveSearch) {
        searchResultsContainer.innerHTML = '';
        
        // 如果是实时搜索，最多显示5个结果
        const displayResults = isLiveSearch ? results.slice(0, 5) : results;
        
        displayResults.forEach(game => {
            const resultItem = document.createElement('div');
            resultItem.className = 'search-result-item';
            
            resultItem.innerHTML = `
                <img src="${game.image}" alt="${game.name}" class="result-img">
                <div class="result-info">
                    <h3 class="result-title">${game.name}</h3>
                    <p class="result-category">${getCategoryName(game.category)}</p>
                </div>
            `;
            
            // 点击搜索结果导航到游戏页面
            resultItem.addEventListener('click', function() {
                window.location.href = game.url;
            });
            
            searchResultsContainer.appendChild(resultItem);
        });
        
        // 添加"查看所有结果"链接（适用于实时搜索）
        if (isLiveSearch && results.length > 5) {
            const viewAllLink = document.createElement('div');
            viewAllLink.className = 'view-all-results';
            viewAllLink.textContent = `查看全部 ${results.length} 个结果`;
            
            viewAllLink.addEventListener('click', function() {
                // 这里可以链接到搜索结果页面
                // 或者直接展示所有结果
                displaySearchResults(results, false);
            });
            
            searchResultsContainer.appendChild(viewAllLink);
        }
        
        searchResultsContainer.style.display = 'block';
    }
    
    // 获取分类名称
    function getCategoryName(categoryCode) {
        const categories = {
            'action': '动作游戏',
            'puzzle': '益智游戏',
            'strategy': '策略游戏'
        };
        
        return categories[categoryCode] || categoryCode;
    }
});

// 添加搜索结果样式
const style = document.createElement('style');
style.innerHTML = `
    .search-results {
        position: absolute;
        top: 100%;
        right: 0;
        width: 300px;
        max-height: 400px;
        overflow-y: auto;
        background-color: #fff;
        border-radius: 5px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        z-index: 1000;
        margin-top: 5px;
    }
    
    .search-result-item {
        display: flex;
        padding: 10px;
        border-bottom: 1px solid #eee;
        cursor: pointer;
        transition: background-color 0.3s ease;
    }
    
    .search-result-item:hover {
        background-color: #f5f5f7;
    }
    
    .result-img {
        width: 50px;
        height: 50px;
        object-fit: cover;
        border-radius: 5px;
        margin-right: 10px;
    }
    
    .result-info {
        flex: 1;
    }
    
    .result-title {
        font-size: 0.9rem;
        margin: 0 0 5px;
        color: #1d1d1f;
    }
    
    .result-category {
        font-size: 0.8rem;
        color: #666;
        margin: 0;
    }
    
    .no-results {
        padding: 15px;
        text-align: center;
        color: #666;
    }
    
    .view-all-results {
        padding: 10px;
        text-align: center;
        background-color: #f5f5f7;
        color: #0071e3;
        font-weight: 500;
        cursor: pointer;
        transition: background-color 0.3s ease;
    }
    
    .view-all-results:hover {
        background-color: #e5e5e7;
    }
`;
document.head.appendChild(style); 