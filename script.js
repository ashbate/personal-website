// Email deobfuscation and click handler
document.addEventListener('DOMContentLoaded', function() {
  // Handle obfuscated emails
  const emailElements = document.querySelectorAll('.email[data-email]');
  emailElements.forEach(function(element) {
    const email = element.getAttribute('data-email');
    element.addEventListener('click', function() {
      navigator.clipboard.writeText(email).then(function() {
        const originalText = element.textContent;
        element.textContent = 'copied!';
        setTimeout(function() {
          element.textContent = originalText;
        }, 1500);
      }).catch(function() {
        // Fallback: show real email
        element.textContent = email;
        element.style.userSelect = 'all';
      });
    });
    
    // Make it clickable
    element.style.cursor = 'pointer';
    element.title = 'Click to copy email address';
  });

  // Simple analytics for internal navigation
  document.addEventListener('click', function(e) {
    const link = e.target.closest('a');
    if (link && link.href && typeof gtag !== 'undefined') {
      if (link.hostname !== window.location.hostname) {
        // External link
        gtag('event', 'click', {
          event_category: 'outbound',
          event_label: link.href,
          transport_type: 'beacon'
        });
      }
    }
  });

  // Performance optimization: preload critical resources on hover
  document.addEventListener('mouseover', function(e) {
    const link = e.target.closest('a');
    if (link && link.hostname === window.location.hostname) {
      const prefetchLink = document.createElement('link');
      prefetchLink.rel = 'prefetch';
      prefetchLink.href = link.href;
      document.head.appendChild(prefetchLink);
    }
  }, { once: true });
});

// Simple service worker registration for caching
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/sw.js').then(function(registration) {
      console.log('SW registered: ', registration);
    }).catch(function(registrationError) {
      console.log('SW registration failed: ', registrationError);
    });
  });
}