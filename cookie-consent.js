// Cookie consent functionality
document.addEventListener('DOMContentLoaded', function() {
    const cookieConsent = document.getElementById('cookieConsent');
    const acceptButton = document.getElementById('acceptCookies');
    const rejectButton = document.getElementById('rejectCookies');

    // Zkontrolujeme, zda uživatel již dal souhlas
    if (!localStorage.getItem('cookieConsent')) {
        cookieConsent.classList.remove('hidden');
    }

    // Funkce pro uložení volby uživatele
    function setCookieConsent(accepted) {
        localStorage.setItem('cookieConsent', accepted);
        cookieConsent.classList.add('hidden');
        
        if (accepted) {
            // Povolíme Google Analytics
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-VL76XQV64S');
        }
    }

    // Event listeners pro tlačítka
    acceptButton.addEventListener('click', () => setCookieConsent(true));
    rejectButton.addEventListener('click', () => setCookieConsent(false));
}); 