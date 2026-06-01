/**
 * SKL Academy — единый скрипт для всех курсов.
 * Подключать: <script src="../courses.js"></script>
 * На <body> задать data-course="python" | "git" | "web" | "english" | "linux" | "windows" | "networks" | "ai" | "oge"
 */
(function() {
    const COURSE_ID = (document.body && document.body.getAttribute('data-course')) || 'default';

    // Переключение боковой панели (кнопка, свайп, затемнение)
    const menuToggle = document.getElementById('menuToggle');
    const sidebar = document.getElementById('sidebar');
    const content = document.getElementById('content');
    const MOBILE_SIDEBAR_BP = 991;
    const SWIPE_EDGE_PX = 28;
    const SWIPE_OPEN_PX = 56;
    const SWIPE_CLOSE_PX = 48;
    let sidebarBackdrop = null;
    let touchStartX = 0;
    let touchStartY = 0;
    let touchStartTime = 0;
    let isSidebarDragging = false;
    let dragStartedFromEdge = false;
    let dragStartedOpen = false;

    function isMobileSidebar() {
        return window.innerWidth <= MOBILE_SIDEBAR_BP;
    }

    function getSidebarWidth() {
        return sidebar ? sidebar.offsetWidth : 280;
    }

    function clearSidebarDragStyles() {
        if (!sidebar) return;
        sidebar.classList.remove('is-dragging');
        sidebar.style.transform = '';
        if (sidebarBackdrop) {
            sidebarBackdrop.classList.remove('is-dragging');
            sidebarBackdrop.style.opacity = '';
        }
    }

    function setMobileSidebarOpen(open) {
        document.body.classList.toggle('mobile-sidebar-open', open);
        document.body.style.overflow = open ? 'hidden' : '';
        if (sidebarBackdrop) {
            sidebarBackdrop.classList.toggle('active', open);
            sidebarBackdrop.setAttribute('aria-hidden', open ? 'false' : 'true');
        }
    }

    function setSidebarOpen(open) {
        if (!sidebar || !content) return;
        clearSidebarDragStyles();
        if (menuToggle) menuToggle.classList.toggle('active', open);
        sidebar.classList.toggle('active', open);
        if (isMobileSidebar()) {
            content.classList.remove('sidebar-active');
            setMobileSidebarOpen(open);
        } else {
            document.body.classList.remove('mobile-sidebar-open');
            document.body.style.overflow = '';
            if (sidebarBackdrop) sidebarBackdrop.classList.remove('active');
            content.classList.toggle('sidebar-active', open);
        }
    }

    function openSidebar() {
        setSidebarOpen(true);
    }

    function closeSidebar() {
        setSidebarOpen(false);
    }

    function toggleSidebar() {
        if (!sidebar) return;
        setSidebarOpen(!sidebar.classList.contains('active'));
    }

    function initSidebarState() {
        if (!sidebar || !content) return;
        if (!isMobileSidebar()) {
            setMobileSidebarOpen(false);
            sidebar.classList.add('active');
            content.classList.add('sidebar-active');
            if (menuToggle) menuToggle.classList.remove('active');
            return;
        }
        closeSidebar();
    }

    function ensureSidebarBackdrop() {
        if (!sidebar || sidebarBackdrop) return;
        var container = sidebar.parentElement;
        if (!container) return;
        sidebarBackdrop = document.createElement('div');
        sidebarBackdrop.className = 'sidebar-backdrop';
        sidebarBackdrop.setAttribute('aria-hidden', 'true');
        sidebarBackdrop.addEventListener('click', closeSidebar);
        container.insertBefore(sidebarBackdrop, sidebar.nextSibling);
    }

    function applySidebarDrag(offsetPx) {
        var width = getSidebarWidth();
        var openAmount = Math.max(0, Math.min(offsetPx, width));
        sidebar.classList.add('is-dragging');
        sidebar.classList.remove('active');
        sidebar.style.transform = 'translateX(' + (-width + openAmount) + 'px)';

        if (sidebarBackdrop) {
            sidebarBackdrop.classList.add('is-dragging');
            if (openAmount > 4) {
                sidebarBackdrop.classList.add('active');
                sidebarBackdrop.style.opacity = String(0.42 * (openAmount / width));
            } else {
                sidebarBackdrop.classList.remove('active');
                sidebarBackdrop.style.opacity = '0';
            }
        }

        if (menuToggle) {
            menuToggle.classList.toggle('active', openAmount > width * 0.45);
        }
        if (openAmount > 24) {
            document.body.style.overflow = 'hidden';
        }
    }

    function initSidebarSwipe() {
        document.addEventListener('touchstart', function(e) {
            if (!isMobileSidebar() || !sidebar || !e.touches.length) return;
            var touch = e.touches[0];
            touchStartX = touch.clientX;
            touchStartY = touch.clientY;
            touchStartTime = Date.now();
            isSidebarDragging = false;
            dragStartedFromEdge = touch.clientX <= SWIPE_EDGE_PX;
            dragStartedOpen = sidebar.classList.contains('active');
        }, { passive: true });

        document.addEventListener('touchmove', function(e) {
            if (!isMobileSidebar() || !sidebar || !e.touches.length) return;

            var touch = e.touches[0];
            var dx = touch.clientX - touchStartX;
            var dy = touch.clientY - touchStartY;

            if (!isSidebarDragging) {
                if (Math.abs(dx) < 10 || Math.abs(dx) < Math.abs(dy) * 1.15) return;
                if (!dragStartedOpen && !dragStartedFromEdge) return;
                isSidebarDragging = true;
            }

            if (!isSidebarDragging) return;

            e.preventDefault();
            var width = getSidebarWidth();
            var base = dragStartedOpen ? width : 0;
            applySidebarDrag(base + dx);
        }, { passive: false });

        function finishSidebarDrag(endX) {
            if (!isSidebarDragging) return;
            isSidebarDragging = false;

            var width = getSidebarWidth();
            var dx = endX - touchStartX;
            var openAmount = dragStartedOpen ? width + dx : dx;
            var shouldOpen = openAmount > width * 0.38;

            clearSidebarDragStyles();
            setSidebarOpen(shouldOpen);
        }

        document.addEventListener('touchend', function(e) {
            if (!isMobileSidebar() || !sidebar || !e.changedTouches.length) return;

            var touch = e.changedTouches[0];
            if (isSidebarDragging) {
                finishSidebarDrag(touch.clientX);
                return;
            }

            var dx = touch.clientX - touchStartX;
            var dy = touch.clientY - touchStartY;
            if (Math.abs(dx) < SWIPE_OPEN_PX || Math.abs(dx) < Math.abs(dy) * 1.2) return;

            if (!sidebar.classList.contains('active')) {
                if (touchStartX <= SWIPE_EDGE_PX && dx > SWIPE_OPEN_PX) openSidebar();
                return;
            }
            if (dx < -SWIPE_CLOSE_PX) closeSidebar();
        }, { passive: true });

        document.addEventListener('touchcancel', function() {
            if (!isSidebarDragging) return;
            isSidebarDragging = false;
            var open = sidebar.classList.contains('active');
            clearSidebarDragStyles();
            setSidebarOpen(open);
        }, { passive: true });
    }

    function wrapScrollableTables() {
        var root = document.getElementById('content');
        if (!root) return;
        root.querySelectorAll('table').forEach(function(table) {
            if (table.closest('.table-scroll, .spec-table-wrapper, .ref-table-wrapper, .operators-cheatsheet')) return;
            var wrap = document.createElement('div');
            wrap.className = 'table-scroll';
            wrap.setAttribute('role', 'region');
            wrap.setAttribute('aria-label', 'Таблица, прокрутите горизонтально');
            wrap.setAttribute('tabindex', '0');
            table.parentNode.insertBefore(wrap, table);
            wrap.appendChild(table);
        });
    }

    if (menuToggle && sidebar && content) {
        ensureSidebarBackdrop();
        initSidebarState();
        initSidebarSwipe();
        window.addEventListener('resize', initSidebarState);
        menuToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleSidebar();
        });
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && sidebar.classList.contains('active') && isMobileSidebar()) {
                closeSidebar();
            }
        });
    }

    document.addEventListener('DOMContentLoaded', function() {
        wrapScrollableTables();
    });

    // Раскрытие тем
    function initSidebarInteractions() {
        document.querySelectorAll('.topic-btn').forEach(function(btn) {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                this.classList.toggle('active');
                var subtopics = this.nextElementSibling;
                if (subtopics && subtopics.classList.contains('subtopics')) {
                    if (subtopics.style.maxHeight && subtopics.style.maxHeight !== '0px' && subtopics.style.maxHeight !== '') {
                        subtopics.style.maxHeight = null;
                    } else {
                        subtopics.style.maxHeight = subtopics.scrollHeight + 'px';
                    }
                }
            });
        });

        document.querySelectorAll('.subtopic').forEach(function(link) {
            link.addEventListener('click', function(e) {
                if ((this.getAttribute('href') || '').indexOf('#') !== 0) return;
                e.preventDefault();
                document.querySelectorAll('.subtopic').forEach(function(item) { item.classList.remove('active'); });
                this.classList.add('active');
                var targetId = this.getAttribute('href').slice(1);
                var targetSection = document.getElementById(targetId);
                if (targetSection) {
                    var header = document.querySelector('header');
                    var offset = (header ? header.offsetHeight : 0) + 20;
                    var scrollTarget = getScrollTargetForSection(targetSection);
                    smoothScrollToElement(scrollTarget, offset);
                }
                if (sidebar && sidebar.classList.contains('active') && isMobileSidebar()) {
                    closeSidebar();
                }
            });
        });
    }

    /** При переходе на первый блок модуля прокручиваем к заголовку части, чтобы было видно название модуля */
    function getScrollTargetForSection(section) {
        if (!section || !section.classList.contains('topic-section')) return section;
        var main = document.getElementById('content');
        if (!main) return section;
        var firstSection = main.querySelector('.topic-section');
        if (firstSection !== section) return section;
        var wrap = main.querySelector('.part-title-wrap');
        return wrap || section;
    }

    function smoothScrollToElement(element, offset) {
        if (!element) return;
        var targetPosition = element.getBoundingClientRect().top + window.pageYOffset - offset;
        var startPosition = window.pageYOffset;
        var distance = targetPosition - startPosition;
        var duration = 800;
        var startTime = null;
        function easeInOutCubic(t) {
            return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
        }
        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            var timeElapsed = currentTime - startTime;
            var progress = Math.min(timeElapsed / duration, 1);
            window.scrollTo(0, startPosition + distance * easeInOutCubic(progress));
            if (timeElapsed < duration) requestAnimationFrame(animation);
        }
        requestAnimationFrame(animation);
    }

    function setActiveSection() {
        var sections = document.querySelectorAll('.topic-section');
        var subtopics = document.querySelectorAll('.subtopic[href^="#"]');
        if (!sections.length || !subtopics.length) return;
        var header = document.querySelector('header');
        var headerHeight = header ? header.offsetHeight : 0;
        var scrollPosition = window.scrollY + headerHeight + 50;
        var currentActiveIndex = -1;
        sections.forEach(function(section, index) {
            var sectionTop = section.offsetTop;
            var sectionBottom = sectionTop + section.offsetHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) currentActiveIndex = index;
        });
        if (currentActiveIndex >= 0) {
            subtopics.forEach(function(link) { link.classList.remove('active'); });
            if (subtopics[currentActiveIndex]) subtopics[currentActiveIndex].classList.add('active');
        }
    }

    document.addEventListener('DOMContentLoaded', function() {
        setTimeout(function() {
            initSidebarInteractions();
            setActiveSection();
            // В курсе «Веб» на каждой странице раскрыты все модули (подпункты видны), как удобная навигация
            if (COURSE_ID === 'web' && sidebar) {
                sidebar.querySelectorAll('.subtopics').forEach(function(el) {
                    el.style.maxHeight = '9999px';
                });
            }
        }, 100);
    });

    window.addEventListener('scroll', setActiveSection);

    document.addEventListener('DOMContentLoaded', function() {
        if (window.location.hash) {
            window.scrollTo(0, 0);
            setTimeout(function() {
                var targetId = window.location.hash.slice(1);
                var targetElement = document.getElementById(targetId);
                if (targetElement) {
                    var header = document.querySelector('header');
                    var scrollTarget = getScrollTargetForSection(targetElement);
                    smoothScrollToElement(scrollTarget, (header ? header.offsetHeight : 0) + 20);
                    var relatedLink = document.querySelector('.subtopic[href="#' + targetId + '"]');
                    if (relatedLink) {
                        document.querySelectorAll('.subtopic').forEach(function(item) { item.classList.remove('active'); });
                        relatedLink.classList.add('active');
                        var parentTopic = relatedLink.closest('.subtopics');
                        if (parentTopic && !parentTopic.style.maxHeight) {
                            var topicBtn = parentTopic.previousElementSibling;
                            if (topicBtn && topicBtn.classList.contains('topic-btn')) topicBtn.click();
                        }
                    }
                }
            }, 100);
        }
    });

    // Подсветка синтаксиса
    document.addEventListener('DOMContentLoaded', function() {
        if (window.hljs) {
            document.querySelectorAll('pre code').forEach(function(block) {
                hljs.highlightBlock(block);
            });
        }
    });

    // Кнопка контакта (i)
    (function initContact() {
        function run() {
            var fab = document.getElementById('contactFab');
            var card = document.getElementById('contactCard');
            var frag = document.createDocumentFragment();
            if (!fab) {
                fab = document.createElement('a');
                fab.href = '#';
                fab.id = 'contactFab';
                fab.className = 'contact-fab';
                fab.title = 'Есть вопросы?';
                fab.setAttribute('aria-label', 'Открыть контакты');
                fab.textContent = 'i';
                frag.appendChild(fab);
            }
            if (!card) {
                card = document.createElement('div');
                card.id = 'contactCard';
                card.className = 'contact-card';
                card.setAttribute('aria-live', 'polite');
                card.setAttribute('aria-hidden', 'true');
                card.innerHTML = '<h4>Есть вопросы — пиши:</h4><div class="contact-links"><a href="https://t.me/tima_pelmeshka" target="_blank" rel="noopener">Telegram</a><a href="mailto:mr.tim.pumpkin@gmail.com">mr.tim.pumpkin@gmail.com</a></div>';
                frag.appendChild(card);
            }
            if (frag.childNodes.length) document.body.appendChild(frag);
            function toggle(force) {
                var willOpen = typeof force === 'boolean' ? force : !card.classList.contains('active');
                card.classList.toggle('active', willOpen);
                fab.classList.toggle('is-open', willOpen);
                card.setAttribute('aria-hidden', willOpen ? 'false' : 'true');
                fab.textContent = willOpen ? '×' : 'i';
                fab.setAttribute('aria-label', willOpen ? 'Закрыть контакты' : 'Открыть контакты');
                fab.setAttribute('title', willOpen ? 'Закрыть' : 'Есть вопросы?');
            }
            fab.addEventListener('click', function(e) { e.preventDefault(); e.stopPropagation(); toggle(); });
            document.addEventListener('click', function(e) {
                if (!card.classList.contains('active')) return;
                var el = e.target;
                if (el === card || el === fab || card.contains(el)) return;
                toggle(false);
            });
        }
        if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', run, { once: true });
        else run();
    })();

    // Прогресс-бар чтения и scrolled для header
    (function headerEnhancements() {
        var header = document.querySelector('header');
        if (!header) return;
        function update() {
            var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            var documentHeight = document.documentElement.scrollHeight;
            var windowHeight = window.innerHeight;
            var progress = (documentHeight - windowHeight) > 0 ? (scrollTop / (documentHeight - windowHeight)) * 100 : 0;
            header.style.setProperty('--scroll-progress', Math.min(progress, 100) + '%');
            header.classList.toggle('scrolled', scrollTop > 50);
        }
        update();
        window.addEventListener('scroll', update, { passive: true });
        window.addEventListener('resize', update);
    })();

    // Тема (светлая/тёмная). Цветовая схема — только фиолетовая (#4f46e5)
    var themeKey = 'skl-course-theme';
    var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    function toggleCourseTheme() {
        var body = document.body;
        var willBeDark = !body.classList.contains('dark-theme');

        function apply() {
            body.classList.toggle('dark-theme', willBeDark);
            localStorage.setItem(themeKey, willBeDark ? 'dark' : 'light');
        }

        if (!prefersReducedMotion.matches && typeof document.startViewTransition === 'function') {
            document.startViewTransition(apply);
            return;
        }

        body.classList.add('theme-switching');
        apply();
        window.setTimeout(function() {
            body.classList.remove('theme-switching');
        }, 340);
    }

    (function themeAndColorSwitcher() {
        var body = document.body;
        var themeToggle = document.getElementById('themeToggle');

        if (localStorage.getItem(themeKey) === 'dark') body.classList.add('dark-theme');
        body.setAttribute('data-color-scheme', 'purple');

        if (themeToggle) {
            themeToggle.addEventListener('click', toggleCourseTheme);
        }
    })();

    // Мобильное меню настроек
    (function mobileSettings() {
        var trigger = document.getElementById('mobileSettingsTrigger');
        var menu = document.getElementById('mobileSettingsMenu');
        var closeBtn = document.getElementById('mobileSettingsClose');
        var mobileTheme = document.getElementById('mobileThemeToggle');

        if (!trigger || !menu) return;

        function closeMenu() {
            menu.classList.remove('active');
            document.body.style.overflow = '';
        }
        trigger.addEventListener('click', function() {
            menu.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
        closeBtn.addEventListener('click', closeMenu);
        menu.addEventListener('click', function(e) { if (e.target === menu) closeMenu(); });
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && menu.classList.contains('active')) closeMenu();
        });

        function syncMobileTheme() {
            var label = mobileTheme && mobileTheme.querySelector('.theme-label');
            if (label) label.textContent = document.body.classList.contains('dark-theme') ? 'Тёмная' : 'Светлая';
        }
        if (mobileTheme) {
            mobileTheme.addEventListener('click', function() {
                toggleCourseTheme();
                setTimeout(syncMobileTheme, 100);
            });
        }

        syncMobileTheme();
        var obs = new MutationObserver(function() { syncMobileTheme(); });
        obs.observe(document.body, { attributes: true, attributeFilter: ['class'] });
    })();
})();
