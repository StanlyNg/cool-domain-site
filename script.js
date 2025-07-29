document.addEventListener('DOMContentLoaded', function() {
    // 域名搜索功能
    const domainSearchForm = document.getElementById('domainSearchForm');
    const domainInput = document.getElementById('domainInput');
    const searchResults = document.getElementById('searchResults');
    
    domainSearchForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const domain = domainInput.value.trim();
        
        if (!domain) {
            alert('请输入要搜索的域名');
            return;
        }
        
        // 确保域名以.cool结尾
        const domainToCheck = domain.endsWith('.cool') ? domain : `${domain}.cool`;
        
        // 模拟API调用
        searchDomain(domainToCheck);
    });
    
    function searchDomain(domain) {
        // 在实际应用中，这里应该是真实的API调用
        // 这里我们模拟API响应
        searchResults.innerHTML = '<p>正在搜索... <i class="fas fa-spinner fa-spin"></i></p>';
        
        // 模拟网络延迟
        setTimeout(() => {
            // 随机决定域名是否可用
            const isAvailable = Math.random() > 0.5;
            const price = 25.99;
            
            displaySearchResult(domain, isAvailable, price);
        }, 1000);
    }
    
    function displaySearchResult(domain, isAvailable, price) {
        searchResults.innerHTML = '';
        
        const resultDiv = document.createElement('div');
        resultDiv.className = 'domain-result';
        
        const domainInfo = document.createElement('div');
        domainInfo.innerHTML = `<strong>${domain}</strong> - 
                              <span class="${isAvailable ? 'domain-available' : 'domain-taken'}">
                              ${isAvailable ? '可用' : '已注册'}
                              </span>`;
        
        resultDiv.appendChild(domainInfo);
        
        if (isAvailable) {
            const priceInfo = document.createElement('div');
            priceInfo.innerHTML = `<span class="domain-price">$${price.toFixed(2)}/年</span>`;
            resultDiv.appendChild(priceInfo);
            
            const checkoutBtn = document.createElement('button');
            checkoutBtn.className = 'btn-checkout';
            checkoutBtn.textContent = '立即注册';
            checkoutBtn.addEventListener('click', function() {
                openRegistrationModal(domain, 1);
            });
            resultDiv.appendChild(checkoutBtn);
        }
        
        searchResults.appendChild(resultDiv);
    }
    
    // 注册按钮点击事件
    const registerButtons = document.querySelectorAll('.btn-register');
    registerButtons.forEach(button => {
        button.addEventListener('click', function() {
            const domain = prompt('请输入要注册的域名 (例如: example.cool):');
            if (domain && domain.trim()) {
                const years = parseInt(this.getAttribute('data-years'));
                openRegistrationModal(domain.trim(), years);
            }
        });
    });
    
    // 注册模态框功能
    const modal = document.getElementById('registrationModal');
    const modalDomainName = document.getElementById('modalDomainName');
    const selectedDomain = document.getElementById('selectedDomain');
    const selectedYears = document.getElementById('selectedYears');
    const closeModal = document.querySelector('.close-modal');
    const registrationForm = document.getElementById('registrationForm');
    
    function openRegistrationModal(domain, years) {
        modalDomainName.textContent = domain;
        selectedDomain.value = domain;
        selectedYears.value = years;
        modal.style.display = 'block';
    }
    
    closeModal.addEventListener('click', function() {
        modal.style.display = 'none';
    });
    
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    registrationForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const domain = selectedDomain.value;
        const years = selectedYears.value;
        const fullName = document.getElementById('fullName').value;
        const email = document.getElementById('email').value;
        const address = document.getElementById('address').value;
        const payment = document.getElementById('payment').value;
        
        // 在实际应用中，这里应该是真实的API调用
        // 这里我们模拟注册过程
        alert(`注册成功！\n域名: ${domain}\n年限: ${years}年\n我们将发送确认邮件至: ${email}`);
        
        // 重置表单并关闭模态框
        registrationForm.reset();
        modal.style.display = 'none';
    });
    
    // 平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});