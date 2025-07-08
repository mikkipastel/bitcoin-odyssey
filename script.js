document.addEventListener('DOMContentLoaded', function() {
    const textContent = {
        th: {
            main_title: 'ไทม์ไลน์ประวัติศาสตร์ Bitcoin',
            main_subtitle: 'สำรวจการเดินทางของนวัตกรรมทางการเงินที่ปฏิวัติโลก ตั้งแต่ Whitepaper จนถึงการเป็นสินทรัพย์ระดับโลก',
            ath_chart_title: 'การเติบโตของราคาสูงสุดตลอดกาล (All-Time High)',
            ath_chart_subtitle: 'กราฟแสดงการพุ่งขึ้นของราคา Bitcoin สู่จุดสูงสุดใหม่ตลอดหลายปีที่ผ่านมา',
            timeline_title: 'เหตุการณ์สำคัญบนเส้นทางของ Bitcoin',
            timeline_subtitle: 'คลิกฟิลเตอร์เพื่อสำรวจเหตุการณ์ประเภทต่างๆ ที่หล่อหลอมประวัติศาสตร์ของ Bitcoin',
            halving_chart_title: 'Bitcoin Halving: กลไกแห่งความหายาก',
            halving_chart_subtitle: 'ทุกๆ 4 ปี รางวัลสำหรับการขุดบล็อกใหม่จะลดลงครึ่งหนึ่ง ทำให้อุปทานของ Bitcoin มีจำกัดและหายากขึ้นเรื่อยๆ',
            footer_text: 'สร้างขึ้นโดยใช้ข้อมูลจากรายงานประวัติศาสตร์ Bitcoin',
            all_filter: 'ทั้งหมด',
            milestone_filter: 'เหตุการณ์สำคัญ',
            halving_filter: 'Halving',
            ath_filter: 'ราคาสูงสุด',
            crisis_filter: 'วิกฤต',
            adoption_filter: 'การยอมรับ',
            fork_filter: 'Fork',
            upgrade_filter: 'อัปเกรด',
            price_label: 'ราคา (USD)',
            block_reward_label: 'รางวัลบล็อก (BTC)',
            banner_image: 'images/banner_th.png' // เพิ่ม path รูปภาพแบนเนอร์ภาษาไทย
        },
        en: {
            main_title: 'The History of Bitcoin: A Timeline',
            main_subtitle: 'Explore the journey of a revolutionary financial innovation, from its whitepaper to becoming a global asset.',
            ath_chart_title: 'The Rise of All-Time Highs',
            ath_chart_subtitle: 'A visualization of Bitcoin\'s price surges to new peaks over the years.',
            timeline_title: 'Key Events on the Bitcoin Journey',
            timeline_subtitle: 'Click the filters to explore the different types of events that have shaped Bitcoin\'s history.',
            halving_chart_title: 'Bitcoin Halving: The Scarcity Engine',
            halving_chart_subtitle: 'Approximately every 4 years, the reward for mining new blocks is cut in half, making Bitcoin\'s supply increasingly scarce.',
            footer_text: 'Built using data from the Bitcoin History Report.',
            all_filter: 'All',
            milestone_filter: 'Milestones',
            halving_filter: 'Halvings',
            ath_filter: 'ATHs',
            crisis_filter: 'Crises',
            adoption_filter: 'Adoption',
            fork_filter: 'Forks',
            upgrade_filter: 'Upgrades',
            price_label: 'Price (USD)',
            block_reward_label: 'Block Reward (BTC)',
            banner_image: 'images/banner_en.png' // เพิ่ม path รูปภาพแบนเนอร์ภาษาอังกฤษ
        }
    };

    const timelineData = [
        {
            date: '2008-10-31', type: 'milestone',
            title: { th: 'เผยแพร่ Bitcoin Whitepaper', en: 'Bitcoin Whitepaper Published' },
            description: { th: 'บุคคลลึกลับนาม Satoshi Nakamoto เผยแพร่เอกสาร "Bitcoin: A Peer-to-Peer Electronic Cash System" ซึ่งเป็นพิมพ์เขียวของสกุลเงินดิจิทัลแบบกระจายอำนาจ', en: 'The mysterious Satoshi Nakamoto publishes "Bitcoin: A Peer-to-Peer Electronic Cash System," the blueprint for a decentralized digital currency.' }
        },
        {
            date: '2009-01-03', type: 'milestone',
            title: { th: 'Genesis Block ถูกสร้างขึ้น', en: 'The Genesis Block is Mined' },
            description: { th: 'Satoshi ขุดบล็อกแรกของ Bitcoin พร้อมฝังข้อความ "The Times 03/Jan/2009 Chancellor on brink of second bailout for banks" เป็นการเปิดตัวเครือข่ายอย่างเป็นทางการ', en: 'Satoshi mines the first block, embedding the text "The Times 03/Jan/2009 Chancellor on brink of second bailout for banks," officially launching the network.' }
        },
        {
            date: '2009-01-12', type: 'milestone',
            title: { th: 'ธุรกรรม Bitcoin ครั้งแรก', en: 'First Bitcoin Transaction' },
            description: { th: 'Satoshi Nakamoto ส่ง 10 BTC ให้กับ Hal Finney ซึ่งเป็นการพิสูจน์ว่าเครือข่ายสามารถใช้งานได้จริงในการโอนมูลค่าระหว่างบุคคล', en: 'Satoshi Nakamoto sends 10 BTC to Hal Finney, proving the concept of a peer-to-peer digital cash transfer.' }
        },
        {
            date: '2010-05-22', type: 'adoption',
            title: { th: 'วัน Bitcoin Pizza Day', en: 'Bitcoin Pizza Day' },
            description: { th: 'Laszlo Hanyecz จ่าย 10,000 BTC เพื่อซื้อพิซซ่าสองถาด ถือเป็นการใช้ Bitcoin ซื้อสินค้าในโลกจริงครั้งแรกที่ได้รับการบันทึกไว้', en: 'Laszlo Hanyecz pays 10,000 BTC for two pizzas, marking the first documented real-world commercial transaction using Bitcoin.' }
        },
        {
            date: '2011-04-01', type: 'ath',
            title: { th: 'ราคาเท่ากับดอลลาร์สหรัฐ', en: 'Parity with the US Dollar' },
            description: { th: 'เป็นครั้งแรกที่ราคาของ 1 BTC มีมูลค่าเท่ากับ 1 ดอลลาร์สหรัฐ ซึ่งเป็นก้าวสำคัญแรกในการยอมรับมูลค่า', en: 'For the first time, the price of 1 BTC reaches parity with $1 USD, a major early milestone in value recognition.' },
            price: 1
        },
        {
            date: '2012-11-28', type: 'halving',
            title: { th: 'Bitcoin Halving ครั้งที่ 1', en: 'First Bitcoin Halving' },
            description: { th: 'รางวัลบล็อกลดลงจาก 50 BTC เหลือ 25 BTC เป็นการเริ่มต้นกลไกการลดอุปทานที่ตั้งโปรแกรมไว้ ซึ่งเกิดขึ้นทุกๆ 210,000 บล็อก', en: 'The block reward is reduced from 50 BTC to 25 BTC, initiating the programmed supply reduction mechanism that occurs every 210,000 blocks.' }
        },
        {
            date: '2013-11-29', type: 'ath',
            title: { th: 'ราคาพุ่งทะลุ $1,000', en: 'Price Surpasses $1,000' },
            description: { th: 'Bitcoin ได้รับความสนใจในวงกว้างเป็นครั้งแรก ทำให้ราคาพุ่งสูงขึ้นอย่างรวดเร็วและทะลุหลักพันดอลลาร์เป็นครั้งแรก', en: 'Bitcoin captures mainstream attention, leading to a massive price surge that crosses the $1,000 mark for the first time.' },
            price: 1000
        },
        {
            date: '2014-02-28', type: 'crisis',
            title: { th: 'การล่มสลายของ Mt. Gox', en: 'The Collapse of Mt. Gox' },
            description: { th: 'ตลาดแลกเปลี่ยนที่ใหญ่ที่สุดในขณะนั้นประกาศล้มละลายหลังจากการแฮ็กครั้งใหญ่ ทำให้ผู้ใช้สูญเสีย Bitcoin หลายแสนเหรียญและราคาตกต่ำครั้งใหญ่', en: 'The world\'s largest Bitcoin exchange at the time files for bankruptcy after a massive hack, resulting in huge user losses and a major price crash.' }
        },
        {
            date: '2016-07-09', type: 'halving',
            title: { th: 'Bitcoin Halving ครั้งที่ 2', en: 'Second Bitcoin Halving' },
            description: { th: 'รางวัลบล็อกลดลงอีกครั้งจาก 25 BTC เหลือ 12.5 BTC ซึ่งช่วยเสริมความหายากของสินทรัพย์และเป็นรากฐานสำหรับตลาดกระทิงรอบถัดไป', en: 'The block reward is again reduced, from 25 BTC to 12.5 BTC, further tightening the asset\'s scarcity and setting the stage for the next bull market.' }
        },
        {
            date: '2017-08-01', type: 'fork',
            title: { th: 'Hard Fork ของ Bitcoin Cash (BCH)', en: 'Bitcoin Cash (BCH) Hard Fork' },
            description: { th: 'ความขัดแย้งเรื่องการปรับขนาด (Scaling) นำไปสู่การ Hard Fork สร้าง Bitcoin Cash (BCH) ซึ่งมีขนาดบล็อกที่ใหญ่กว่า', en: 'Disagreements over how to scale the network lead to a hard fork, creating Bitcoin Cash (BCH) with a larger block size.' }
        },
        {
            date: '2017-12-17', type: 'ath',
            title: { th: 'ตลาดกระทิงปี 2017 - เกือบ $20,000', en: 'The 2017 Bull Run - Nearly $20,000' },
            description: { th: 'Bitcoin เข้าสู่กระแสหลักอย่างเต็มตัวด้วยราคาที่พุ่งสูงขึ้นเกือบถึง 20,000 ดอลลาร์สหรัฐ ดึงดูดนักลงทุนรายย่อยจำนวนมหาศาล', en: 'Bitcoin explodes into the mainstream consciousness with a parabolic price run to nearly $20,000, attracting a massive wave of retail investors.' },
            price: 20000
        },
         {
            date: '2018-12-15', type: 'crisis',
            title: { th: 'Crypto Winter', en: 'Crypto Winter' },
            description: { th: 'หลังจากจุดสูงสุดในปี 2017 ตลาดได้เข้าสู่ช่วงตลาดหมีที่ยาวนาน โดยราคา Bitcoin ลดลงกว่า 80% จากจุดสูงสุด', en: 'Following the 2017 peak, the market enters a prolonged bear market, with the price of Bitcoin falling over 80% from its all-time high.' }
        },
        {
            date: '2020-05-11', type: 'halving',
            title: { th: 'Bitcoin Halving ครั้งที่ 3', en: 'Third Bitcoin Halving' },
            description: { th: 'รางวัลบล็อกลดลงจาก 12.5 BTC เหลือ 6.25 BTC ซึ่งเกิดขึ้นท่ามกลางการยอมรับจากสถาบันการเงินที่เพิ่มขึ้น', en: 'The block reward is reduced from 12.5 BTC to 6.25 BTC, occurring amidst growing institutional interest and adoption.' }
        },
         {
            date: '2021-06-09', type: 'adoption',
            title: { th: 'เอลซัลวาดอร์ยอมรับ Bitcoin', en: 'El Salvador Adopts Bitcoin' },
            description: { th: 'เอลซัลวาดอร์กลายเป็นประเทศแรกในโลกที่ยอมรับ Bitcoin เป็นเงินที่ถูกกฎหมาย ถือเป็นก้าวสำคัญของการยอมรับในระดับประเทศ', en: 'El Salvador becomes the first country in the world to adopt Bitcoin as legal tender, a landmark moment for nation-state adoption.' }
        },
        {
            date: '2021-11-10', type: 'ath',
            title: { th: 'All-Time High ที่ $69,000', en: 'All-Time High at $69,000' },
            description: { th: 'ในช่วงที่ตลาดคึกคักและการยอมรับจากสถาบันยังคงดำเนินต่อไป Bitcoin ได้สร้างราคาสูงสุดตลอดกาลใหม่ที่ประมาณ 69,000 ดอลลาร์สหรัฐ', en: 'Amidst a buzzing market and continued institutional adoption, Bitcoin sets a new all-time high of approximately $69,000.' },
            price: 69000
        },
        {
            date: '2021-11-14', type: 'upgrade',
            title: { th: 'การอัปเกรด Taproot', en: 'Taproot Upgrade Activated' },
            description: { th: 'การอัปเกรดที่สำคัญซึ่งช่วยเพิ่มความเป็นส่วนตัว ประสิทธิภาพ และความสามารถด้านสัญญาอัจฉริยะให้กับเครือข่าย Bitcoin', en: 'A major upgrade is activated, enhancing privacy, efficiency, and smart contract capabilities on the Bitcoin network.' }
        },
        {
            date: '2024-01-10', type: 'adoption',
            title: { th: 'อนุมัติ Bitcoin Spot ETF ในสหรัฐฯ', en: 'US Spot Bitcoin ETFs Approved' },
            description: { th: 'ก.ล.ต. สหรัฐฯ อนุมัติกองทุน Bitcoin spot ETF หลายกองทุน ซึ่งเปิดประตูให้นักลงทุนสถาบันและรายย่อยเข้าถึง Bitcoin ได้ง่ายขึ้นผ่านตลาดแบบดั้งเดิม', en: 'The U.S. SEC approves multiple spot Bitcoin ETFs, opening the floodgates for institutional and retail investors to gain exposure through traditional markets.' }
        },
        {
            date: '2024-04-20', type: 'halving',
            title: { th: 'Bitcoin Halving ครั้งที่ 4', en: 'Fourth Bitcoin Halving' },
            description: { th: 'รางวัลบล็อกลดลงเหลือ 3.125 BTC ทำให้อัตราเงินเฟ้อของ Bitcoin ต่ำกว่าทองคำ และตอกย้ำสถานะในฐานะสินทรัพย์ที่หายากอย่างยิ่ง', en: 'The block reward drops to 3.125 BTC, pushing Bitcoin\'s inflation rate below that of gold and solidifying its status as an ultra-scarce asset.' }
        },
         {
            date: '2025-03-14', type: 'ath',
            title: { th: 'All-Time High ที่ $73,750 (ข้อมูลสมมติ)', en: 'All-Time High at $73,750 (Hypothetical)' },
            description: { th: 'จากแรงหนุนของกระแส ETF และหลังเหตุการณ์ Halving, Bitcoin ได้สร้างจุดสูงสุดใหม่ในปี 2025 ซึ่งแสดงให้เห็นถึงความเชื่อมั่นของตลาดที่แข็งแกร่ง (ข้อมูลนี้เป็นข้อมูลสมมติจากแนวโน้มในอดีต)', en: 'Driven by ETF inflows and post-halving momentum, Bitcoin establishes a new peak in 2025, demonstrating strong market confidence. (Note: Data is hypothetical based on historical trends)' },
            price: 73750
        }
    ];

    let currentLang = 'th';
    let activeFilter = 'all';
    let athChart, halvingChart;

    const langToggle = document.getElementById('lang-toggle');
    const timelineContainer = document.getElementById('timeline-container');
    const timelineFiltersContainer = document.getElementById('timeline-filters');
    const bannerImage = document.getElementById('banner');

    function updateTextContent() {
        document.querySelectorAll('[data-key]').forEach(el => {
            const key = el.getAttribute('data-key');
            if (textContent[currentLang][key]) {
                el.textContent = textContent[currentLang][key];
                el.classList.toggle('font-th', currentLang === 'th');
                el.classList.toggle('font-en', currentLang === 'en');
            }
        });
        document.documentElement.lang = currentLang;
        langToggle.textContent = currentLang === 'th' ? 'English' : 'ภาษาไทย';
        document.title = currentLang === 'th' ? 'ไทม์ไลน์ประวัติศาสตร์ Bitcoin' : 'Bitcoin History Timeline';
        
        if (bannerImage) {
            bannerImage.src = textContent[currentLang].banner_image;
        }
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
        const athData = timelineData
            .filter(item => item.type === 'ath')
            .sort((a,b) => new Date(a.date) - new Date(b.date))
            .map(item => ({
                x: item.date,
                y: item.price
            }));

        const data = {
            labels: athData.map(d => new Date(d.x).getFullYear()),
            datasets: [{
                label: textContent[currentLang].price_label,
                data: athData,
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
                            label: function(context) {
                                let label = context.dataset.label || '';
                                if (label) {
                                    label += ': ';
                                }
                                if (context.parsed.y !== null) {
                                    label += '$' + context.parsed.y.toLocaleString();
                                }
                                return label;
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
         const halvingData = [
            { year: 'Genesis (2009)', reward: 50 },
            { year: '1st Halving (2012)', reward: 25 },
            { year: '2nd Halving (2016)', reward: 12.5 },
            { year: '3rd Halving (2020)', reward: 6.25 },
            { year: '4th Halving (2024)', reward: 3.125 }
         ];

         const data = {
            labels: halvingData.map(d => d.year),
            datasets: [{
                label: textContent[currentLang].block_reward_label,
                data: halvingData.map(d => d.reward),
                backgroundColor: [
                    'rgba(229, 149, 0, 0.2)',
                    'rgba(229, 149, 0, 0.4)',
                    'rgba(229, 149, 0, 0.6)',
                    'rgba(229, 149, 0, 0.8)',
                    'rgba(229, 149, 0, 1.0)',
                ],
                borderColor: [
                    'rgb(229, 149, 0)',
                    'rgb(229, 149, 0)',
                    'rgb(229, 149, 0)',
                    'rgb(229, 149, 0)',
                    'rgb(229, 149, 0)',
                ],
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
    }

    langToggle.addEventListener('click', () => {
        currentLang = currentLang === 'th' ? 'en' : 'th';
        initializeApp();
    });

    initializeApp();
});