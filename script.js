/* ==========================================================================
   南国市 土曜市 ホームページ 動的インタラクティブ機能スクリプト (script.js)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function() {

    // --------------------------------------------------------------------------
    // 1. 毎週自動調整される「次回の土曜市」カウントダウンタイマー（土佐弁対応版）
    // --------------------------------------------------------------------------
    function updateCountdown() {
        const now = new Date();
        const nextSaturday = new Date();
        
        const dayOfWeek = now.getDay();
        let daysUntilSaturday = 6 - dayOfWeek;
        
        if (daysUntilSaturday < 0) {
            daysUntilSaturday = 6; 
        }
        
        nextSaturday.setDate(now.getDate() + daysUntilSaturday);
        nextSaturday.setHours(6, 0, 0, 0); 
        
        const countdownStatus = document.getElementById('countdown-status');
        const liveStatusMessage = document.getElementById('live-status-message');
        const countdownCard = document.querySelector('.countdown-card-wrapper');
        
        if (dayOfWeek === 6) {
            const currentHour = now.getHours();
            // 朝6時から昼12時までの開催中
            if (currentHour >= 6 && currentHour < 12) {
                countdownStatus.innerHTML = "<span class='emoji'>✨</span> 只今元気に開催中！ <span class='emoji'>✨</span>";
                liveStatusMessage.innerText = "✨ いま開催中ぜよ！すぐ遊びに来てね！ 🍊";
                liveStatusMessage.classList.add('live-active');
                
                document.getElementById('days').innerText = "00";
                document.getElementById('hours').innerText = "00";
                document.getElementById('minutes').innerText = "00";
                document.getElementById('seconds').innerText = "00";
                return;
            } 
            // 土曜日の12時以降（来週の土曜をセット）
            else if (currentHour >= 12) {
                nextSaturday.setDate(now.getDate() + 7);
                countdownStatus.innerHTML = "<span class='emoji'>⏰</span> 次回の土曜市まで";
                liveStatusMessage.innerText = "今週の土曜市は終了しました。また来週きてね！";
                liveStatusMessage.classList.remove('live-active');
            }
        } else {
            // 平日の通常カウントダウン表示
            countdownStatus.innerHTML = "<span class='emoji'>⏰</span> 次回の土曜市まで";
            liveStatusMessage.innerText = "土曜日が待ち遠しいねぇ 🌸";
            liveStatusMessage.classList.remove('live-active');
        }

        const diffTime = nextSaturday - now;
        
        const d = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        const h = Math.floor((diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((diffTime % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((diffTime % (1000 * 60 * 60)) % (1000 * 60) / 1000);
        
        // 常に2桁で綺麗に表示する処理
        document.getElementById('days').innerText = d < 10 ? '0' + d : d;
        document.getElementById('hours').innerText = h < 10 ? '0' + h : h;
        document.getElementById('minutes').innerText = m < 10 ? '0' + m : m;
        document.getElementById('seconds').innerText = s < 10 ? '0' + s : s;
    }
    
    setInterval(updateCountdown, 1000);
    updateCountdown(); 


    // --------------------------------------------------------------------------
    // 2. おしゃべり店主のお店紹介インタラクティブ機能
    // --------------------------------------------------------------------------
    const shopButtons = document.querySelectorAll('.shop-btn');
    const shopMessage = document.getElementById('shop-message');
    const ownerShopName = document.getElementById('owner-shop-name');
    const ownerName = document.getElementById('owner-name');
    const ownerAvatar = document.getElementById('owner-avatar');

    shopButtons.forEach(button => {
        button.addEventListener('click', function() {
            shopButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const message = this.getAttribute('data-msg');
            const shop = this.getAttribute('data-owner');
            const name = this.getAttribute('data-name');
            const iconClass = this.getAttribute('data-icon');
            
            shopMessage.innerText = message;
            ownerShopName.innerText = shop;
            ownerName.innerText = name;
            ownerAvatar.innerHTML = `<i class="fa-solid ${iconClass}"></i>`;
        });
    });


    // --------------------------------------------------------------------------
    // 3. バーチャル土曜市スタンプラリーゲーム機能
    // --------------------------------------------------------------------------
    let currentStampCount = 0;
    const btnGetStamp = document.getElementById('btn-get-stamp');
    const rallyStatusText = document.getElementById('rally-status-text');
    const couponDisplay = document.getElementById('coupon-display');

    btnGetStamp.addEventListener('click', function() {
        if (currentStampCount < 3) {
            currentStampCount++;
            
            const currentSlotIcon = document.querySelector(`#slot-${currentStampCount} i`);
            currentSlotIcon.classList.remove('unchecked');
            currentSlotIcon.classList.add('checked');
            
            if (currentStampCount === 1) {
                rallyStatusText.innerText = "1つ目のスタンプGET！あと2つ！";
            } else if (currentStampCount === 2) {
                rallyStatusText.innerText = "2つ目のスタンプGET！あと1つで完成！";
            } else if (currentStampCount === 3) {
                rallyStatusText.innerText = "🎉 おめでとうございます！スタンプがすべて揃いました！";
                rallyStatusText.style.color = "#27ae60";
                
                btnGetStamp.disabled = true;
                btnGetStamp.style.backgroundColor = "#95a5a6";
                btnGetStamp.style.cursor = "not-allowed";
                btnGetStamp.innerText = "スタンプ達成済み";
                
                couponDisplay.classList.remove('hidden');
            }
        }
    });


    // --------------------------------------------------------------------------
    // 4. みんなの応援掲示板 簡易動的投稿
    // --------------------------------------------------------------------------
    const bbsForm = document.getElementById('bbs-form');
    const bbsList = document.getElementById('bbs-list');

    bbsForm.addEventListener('submit', function(e) {
        e.preventDefault(); 
        
        const nameInput = document.getElementById('bbs-name');
        const commentInput = document.getElementById('bbs-comment');
        
        if (nameInput.value.trim() === '' || commentInput.value.trim() === '') return;

        const newItem = document.createElement('div');
        newItem.classList.add('bbs-item');
        
        newItem.innerHTML = `
            <div class="bbs-meta"><strong>${escapeHTML(nameInput.value)}</strong> <span>たった今</span></div>
            <p>${escapeHTML(commentInput.value)}</p>
        `;
        
        bbsList.insertBefore(newItem, bbsList.firstChild);
        
        nameInput.value = '';
        commentInput.value = '';
        
        alert('温かいメッセージをありがとうございます！応援メッセージが掲載されました。');
    });

    function escapeHTML(str) {
        return str.replace(/[&<>"']/g, function(match) {
            const escape = {
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                '"': '&quot;',
                "'": '&#x27;'
            };
            return escape[match];
        });
    }


    // --------------------------------------------------------------------------
    // 5. 出店お問合せフォームの開閉
    // --------------------------------------------------------------------------
    const btnRecruitOpen = document.getElementById('btn-recruit-open');
    const recruitFormWrapper = document.getElementById('recruit-form-wrapper');
    const recruitForm = document.getElementById('recruit-form');

    btnRecruitOpen.addEventListener('click', function() {
        recruitFormWrapper.classList.toggle('hidden');
    });

    recruitForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('出店のご相談ありがとうございます！送信シミュレーションが完了しました。');
        recruitForm.reset();
        recruitFormWrapper.classList.add('hidden');
    });
});