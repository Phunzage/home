/**
 * Phunzage个人主页 - 主要功能脚本
 * 优化了代码结构，修复了微信模态框功能
 */

// 动画控制模块
var iUp = (function () {
    var time = 0,
        duration = 150,
        clean = function () {
            time = 0;
        },
        up = function (element) {
            setTimeout(function () {
                element.classList.add("up");
            }, time);
            time += duration;
        },
        down = function (element) {
            element.classList.remove("up");
        },
        toggle = function (element) {
            setTimeout(function () {
                element.classList.toggle("up");
            }, time);
            time += duration;
        };
    return {
        clean: clean,
        up: up,
        down: down,
        toggle: toggle
    };
})();

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function () {
    console.log('页面加载完成，初始化动画效果...');
    
    // 为所有需要动画的元素添加动画效果
    var iUpElements = document.querySelectorAll(".iUp");
    iUpElements.forEach(function (element) {
        iUp.up(element);
    });

    // 头像加载完成后的处理
    var avatarElement = document.querySelector(".js-avatar");
    if (avatarElement) {
        avatarElement.addEventListener('load', function () {
            avatarElement.classList.add("show");
            console.log('头像加载完成');
        });
        
        // 如果头像已经缓存，手动触发加载事件
        if (avatarElement.complete) {
            avatarElement.classList.add("show");
        }
    }
});

// 移动端菜单控制
var btnMobileMenu = document.querySelector('.btn-mobile-menu__icon');
var navigationWrapper = document.querySelector('.navigation-wrapper');

if (btnMobileMenu && navigationWrapper) {
    btnMobileMenu.addEventListener('click', function () {
        if (navigationWrapper.style.display === "block") {
            // 隐藏导航菜单
            navigationWrapper.classList.remove('bounceInDown');
            navigationWrapper.classList.add('bounceOutUp');
            
            navigationWrapper.addEventListener('animationend', function handler() {
                navigationWrapper.classList.remove('visible', 'animated', 'bounceOutUp');
                navigationWrapper.style.display = "none";
                navigationWrapper.removeEventListener('animationend', handler);
            });
        } else {
            // 显示导航菜单
            navigationWrapper.style.display = "block";
            navigationWrapper.classList.add('visible', 'animated', 'bounceInDown');
        }
        
        // 切换菜单图标
        btnMobileMenu.classList.toggle('ri-menu-line');
        btnMobileMenu.classList.toggle('ri-close-line');
    });
}

// 微信模态框功能
function showWeChatModal() {
    const modal = document.getElementById('wechatModal');
    if (modal) {
        modal.style.display = 'flex';
        setTimeout(() => {
            modal.classList.add('show');
        }, 10);
        document.body.style.overflow = 'hidden'; // 防止背景滚动
    }
}

function closeWeChatModal() {
    const modal = document.getElementById('wechatModal');
    if (modal) {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto'; // 恢复滚动
        }, 300);
    }
}

// 点击模态框外部关闭
document.addEventListener('click', function(event) {
    const modal = document.getElementById('wechatModal');
    if (modal && event.target === modal) {
        closeWeChatModal();
    }
});

// 键盘事件支持
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeWeChatModal();
    }
});

// 页面性能监控（可选）
window.addEventListener('load', function() {
    // 页面完全加载后的处理
    console.log('所有资源加载完成');
});

// 错误处理
window.addEventListener('error', function(e) {
    console.error('页面错误:', e.error);
});