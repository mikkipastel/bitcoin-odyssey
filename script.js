document.addEventListener('DOMContentLoaded', async function() {
    // Load data from JSON files
    const [textContent, timelineData, halvingSchedule, halvingEventsForChart, yearlyPriceData] = await Promise.all([
        fetch('data/textContent.json').then(r => r.json()),
        fetch('data/timelineData.json').then(r => r.json()),
        fetch('data/halvingSchedule.json').then(r => r.json()),
        fetch('data/halvingEvents.json').then(r => r.json()),
        fetch('data/yearlyPriceData.json').then(r => r.json())
    ]);

    let currentLang = 'th';
    let activeFilter = 'all';
    let athChart, halvingChart;
    let countdownInterval;

    // ประมาณการวันที่ Halving ครั้งถัดไป (ครั้งที่ 5)
    // โดยประมาณ 4 ปีหลังจาก Halving ครั้งที่ 4
    const nextHalvingDate = new Date('2028-04-20T00:00:00Z'); // ใช้เวลา UTC เพื่อความแม่นยำ

    const langThBtn = document.getElementById('lang-th');
    const langEnBtn = document.getElementById('lang-en');
    const timelineContainer = document.getElementById('timeline-container');
    const timelineFiltersContainer = document.getElementById('timeline-filters');
    const bannerImage = document.getElementById('banner'); // อ้างอิงถึง element รูปภาพแบนเนอร์

    const currentRewardEl = document.getElementById('current-reward');
    const nextHalvingNumberEl = document.getElementById('next-halving-number');
    const nextRewardEl = document.getElementById('next-reward');
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');
    const halvingSummaryEl = document.getElementById('halving-summary'); // New element for summary

    function updateTextContent() {
        document.querySelectorAll('[data-key]').forEach(el => {
            const key = el.getAttribute('data-key');
            if (textContent[currentLang][key]) {
                el.innerHTML = el.dataset.key === 'halving_chart_title' ? `<span class="mr-2">&#x2692;</span>${textContent[currentLang][key]}` : textContent[currentLang][key];
                el.classList.toggle('font-th', currentLang === 'th');
                el.classList.toggle('font-en', currentLang === 'en');
            }
        });
        document.documentElement.lang = currentLang;
        document.title = currentLang === 'th' ? 'Bitcoin และการเดินทาง | ไทม์ไลน์ประวัติศาสตร์ Bitcoin' : 'Bitcoin Odyssey | Bitcoin History Timeline';

        // อัปเดต src ของรูปภาพแบนเนอร์ตามภาษา
        if (bannerImage) {
            bannerImage.src = textContent[currentLang].banner_image;
        }

        // อัปเดตข้อความสำหรับ Halving Countdown
        updateHalvingInfo();
        updateHalvingSummary(); // Call new function to update summary
    }

    function updateHalvingInfo() {
        const latestHalving = halvingSchedule[halvingSchedule.length - 1];
        const currentReward = latestHalving.reward;
        const nextHalvingNum = latestHalving.number + 1;
        const nextReward = currentReward / 2;

        if (currentRewardEl) currentRewardEl.textContent = `${currentReward} BTC`;
        if (nextHalvingNumberEl) nextHalvingNumberEl.textContent = `${nextHalvingNum}`;
        if (nextRewardEl) nextRewardEl.textContent = `${nextReward} BTC`;
    }

    function updateHalvingSummary() {
        if (!halvingSummaryEl) return;
        let summaryHtml = `<p class="text-lg font-semibold mb-2">${textContent[currentLang].halving_summary_title}</p>`;
        summaryHtml += `<p class="mb-2">${textContent[currentLang].halving_summary_total}</p>`;
        summaryHtml += `<p class="mb-1">${textContent[currentLang].halving_summary_details_prefix}</p>`;
        summaryHtml += `<ul class="list-disc list-inside ml-4">`;
        // Clone halvingEventsForChart and add the next halving (5th) for summary
        const halvingEvents = [...halvingEventsForChart];
        const latestHalving = halvingSchedule[halvingSchedule.length - 1];
        const nextHalvingNum = latestHalving.number + 1;
        const nextReward = latestHalving.reward / 2;
        halvingEvents.push({
            label: `${nextHalvingNum}${nextHalvingNum === 1 ? 'st' : nextHalvingNum === 2 ? 'nd' : nextHalvingNum === 3 ? 'rd' : 'th'} Halving (${nextHalvingDate.getFullYear()}) (คาดการณ์)`,
            reward: nextReward
        });
        halvingEvents.forEach(event => {
            summaryHtml += `<li class="text-sm md:text-base">${event.label}: ${event.reward} BTC</li>`;
        });
        summaryHtml += `</ul>`;
        halvingSummaryEl.innerHTML = summaryHtml;
    }

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = nextHalvingDate.getTime() - now;

        if (distance < 0) {
            clearInterval(countdownInterval);
            if (daysEl) daysEl.textContent = '00';
            if (hoursEl) hoursEl.textContent = '00';
            if (minutesEl) minutesEl.textContent = '00';
            if (secondsEl) secondsEl.textContent = '00';
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
        if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
        if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, '0');
        if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, '0');
    }

    function createTimeline() {
        timelineContainer.innerHTML = '<div class="timeline-line"></div>'; // Reset
        timelineData.sort((a,b) => new Date(a.date) - new Date(b.date)).forEach((item, index) => {
            const isLeft = index % 2 === 0;
            const itemDiv = document.createElement('div');
            itemDiv.className = `timeline-item mb-8 flex justify-between items-center w-full ${isLeft ? 'flex-row-reverse left-timeline' : 'right-timeline'}`;
            itemDiv.dataset.type = item.type;
            const contentClass = `w-5/12 p-4 md:p-6 bg-white rounded-xl shadow-md border border-gray-100 transition-transform transform hover:scale-105`;
            itemDiv.innerHTML = `
                <div class="order-1 ${contentClass}">
                    <p class="mb-2 text-sm font-bold ${currentLang === 'th' ? 'font-th' : 'font-en'}" style="color: #E59500;">${new Date(item.date).toLocaleDateString(currentLang === 'th' ? 'th-TH' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    <h3 class="mb-2 font-bold text-lg md:text-xl text-gray-800 ${currentLang === 'th' ? 'font-th' : 'font-en'}">${item.title[currentLang]}</h3>
                    <p class="text-sm md:text-base text-gray-600 ${currentLang === 'th' ? 'font-th' : 'font-en'}">${item.description[currentLang]}</p>
                </div>
                <div class="order-1 w-1/12 flex justify-center">
                   <div class="timeline-point w-4 h-4 rounded-full"></div>
                </div>
                 <div class="order-1 w-5/12"></div>
            `;
            timelineContainer.appendChild(itemDiv);
        });
        applyFilter();
    }

    function createFilters() {
        const filters = {
            all: { th: 'ทั้งหมด', en: 'All' },
            milestone: { th: 'เหตุการณ์สำคัญ', en: 'Milestones' },
            halving: { th: 'Halving', en: 'Halvings' },
            ath: { th: 'ราคาสูงสุด', en: 'ATHs' },
            crisis: { th: 'วิกฤต', en: 'Crises' },
            adoption: { th: 'การยอมรับ', en: 'Adoption' },
            fork: { th: 'Fork', en: 'Forks' },
            upgrade: { th: 'อัปเกรด', en: 'Upgrades' }
        };

        timelineFiltersContainer.innerHTML = '';
        Object.keys(filters).forEach(key => {
            const button = document.createElement('button');
            button.dataset.filter = key;
            button.textContent = filters[key][currentLang];
            button.className = `btn-filter px-4 py-2 rounded-full text-sm md:text-base font-semibold transition-all duration-300 shadow-sm ${currentLang === 'th' ? 'font-th' : 'font-en'} ${activeFilter === key ? 'active' : 'bg-white text-gray-600 hover:bg-gray-100'}`;
            button.addEventListener('click', () => {
                activeFilter = key;
                document.querySelectorAll('.btn-filter').forEach(btn => {
                    btn.classList.remove('active');
                    btn.classList.add('bg-white', 'text-gray-600', 'hover:bg-gray-100');
                });
                button.classList.add('active');
                button.classList.remove('bg-white', 'text-gray-600', 'hover:bg-gray-100');
                applyFilter();
            });
            timelineFiltersContainer.appendChild(button);
        });
    }

    function applyFilter() {
        document.querySelectorAll('.timeline-item').forEach(item => {
            if (activeFilter === 'all' || item.dataset.type === activeFilter) {
                item.classList.remove('filtered-out');
            } else {
                item.classList.add('filtered-out');
            }
        });
    }

    function createAthChart() {
        const ctx = document.getElementById('athChart').getContext('2d');
        const chartData = yearlyPriceData;

        const data = {
            labels: chartData.map(d => d.year), // Show year on x-axis
            datasets: [{
                label: textContent[currentLang].price_label,
                data: chartData.map(d => d.price), // Use price data
                borderColor: '#E59500',
                backgroundColor: 'rgba(229, 149, 0, 0.1)',
                fill: true,
                tension: 0.4,
                pointBackgroundColor: '#E59500',
                pointBorderColor: '#fff',
                pointHoverRadius: 7,
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: '#E59500',
                pointRadius: 5
            }]
        };

        const config = {
            type: 'line',
            data: data,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: false,
                        type: 'logarithmic',
                        ticks: {
                            callback: function(value, index, values) {
                                return '$' + value.toLocaleString();
                            },
                            font: { family: "'Inter', sans-serif" }
                        },
                        grid: {
                            color: 'rgba(0, 0, 0, 0.05)'
                        }
                    },
                    x: {
                        display: true,
                        ticks: {
                            font: { family: "'Inter', sans-serif" }
                        },
                        grid: {
                            display: false
                        }
                    }
                },
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        callbacks: {
                            title: function(context) {
                                // Show the year as the title of the tooltip
                                return textContent[currentLang].year_label + ': ' + context[0].label;
                            },
                            label: function(context) {
                                const dataPoint = yearlyPriceData[context.dataIndex];
                                let labels = [];
                                labels.push(`${context.dataset.label}: $${context.parsed.y.toLocaleString()}`);
                                if (dataPoint.key_price_description && dataPoint.key_price_description[currentLang]) {
                                    labels.push(`${textContent[currentLang].key_price_label}: ${dataPoint.key_price_description[currentLang]}`);
                                }
                                return labels;
                            }
                        },
                        titleFont: { family: "'Inter', sans-serif" },
                        bodyFont: { family: "'Inter', sans-serif" },
                        backgroundColor: '#3D3D3D',
                        titleMarginBottom: 10,
                        padding: 15,
                        cornerRadius: 8
                    }
                }
            }
        };

        if (athChart) athChart.destroy();
        athChart = new Chart(ctx, config);
    }

    function createHalvingChart() {
        const ctx = document.getElementById('halvingChart').getContext('2d');
        const now = new Date(); // Get current date for comparison

        // Clone halvingEventsForChart and add the next halving (5th)
        const halvingEvents = [...halvingEventsForChart];
        const latestHalving = halvingSchedule[halvingSchedule.length - 1];
        const nextHalvingNum = latestHalving.number + 1;
        const nextReward = latestHalving.reward / 2;
        halvingEvents.push({
            label: `${nextHalvingNum}${nextHalvingNum === 1 ? 'st' : nextHalvingNum === 2 ? 'nd' : nextHalvingNum === 3 ? 'rd' : 'th'} Halving (${nextHalvingDate.getFullYear()})`,
            reward: nextReward,
            date: nextHalvingDate.toISOString()
        });

        const backgroundColors = halvingEvents.map(d => {
            return new Date(d.date) <= now ? 'rgba(229, 149, 0, 0.8)' : 'rgba(150, 150, 150, 0.5)';
        });
        const borderColors = halvingEvents.map(d => {
            return new Date(d.date) <= now ? 'rgb(229, 149, 0)' : 'rgb(150, 150, 150)';
        });

        const data = {
            labels: halvingEvents.map(d => d.label),
            datasets: [{
                label: textContent[currentLang].block_reward_label,
                data: halvingEvents.map(d => d.reward),
                backgroundColor: backgroundColors,
                borderColor: borderColors,
                borderWidth: 2,
                borderRadius: 8,
                hoverBorderWidth: 3,
            }]
        };

        const config = {
            type: 'bar',
            data: data,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: textContent[currentLang].block_reward_label,
                            font: { family: "'Inter', sans-serif", size: 14 }
                        },
                        ticks: { font: { family: "'Inter', sans-serif" } },
                        grid: { color: 'rgba(0, 0, 0, 0.05)' }
                    },
                    x: {
                        ticks: { font: { family: "'Inter', sans-serif" } },
                        grid: { display: false }
                    }
                },
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return `${context.dataset.label}: ${context.parsed.y} BTC`;
                            }
                        },
                        titleFont: { family: "'Inter', sans-serif" },
                        bodyFont: { family: "'Inter', sans-serif" },
                        backgroundColor: '#3D3D3D',
                        titleMarginBottom: 10,
                        padding: 15,
                        cornerRadius: 8
                    }
                }
            }
        };
        if(halvingChart) halvingChart.destroy();
        halvingChart = new Chart(ctx, config);
    }

    function initializeApp() {
        updateTextContent();
        createTimeline();
        createFilters();
        createAthChart();
        createHalvingChart();

        // Clear any existing interval before setting a new one
        if (countdownInterval) {
            clearInterval(countdownInterval);
        }
        updateCountdown(); // Call once immediately to avoid delay
        countdownInterval = setInterval(updateCountdown, 1000); // Update every second
    }

    // Move language switcher to the right and update color logic
    const langSwitcher = document.querySelector('nav .flex.items-center');
    if (langSwitcher) {
        langSwitcher.classList.add('justify-end', 'w-full');
        langSwitcher.classList.remove('space-x-2');
    }
    // Initial color set
    function updateLangBtnColor() {
        // Always reset both buttons first
        langThBtn.classList.remove('text-[#E59500]', 'text-gray-400');
        langEnBtn.classList.remove('text-[#E59500]', 'text-gray-400');
        if (currentLang === 'th') {
            langThBtn.classList.add('text-[#E59500]');
            langEnBtn.classList.add('text-gray-400');
        } else {
            langEnBtn.classList.add('text-[#E59500]');
            langThBtn.classList.add('text-gray-400');
        }
    }
    // Add new language switch events
    langThBtn.addEventListener('click', () => {
        currentLang = 'th';
        initializeApp();
        updateLangBtnColor();
    });
    langEnBtn.addEventListener('click', () => {
        currentLang = 'en';
        initializeApp();
        updateLangBtnColor();
    });
    // Set initial color on load
    updateLangBtnColor();

    initializeApp();
});