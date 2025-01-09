async function renderTemplate(contentPath, options = {}) {
    try {
        // Use relative path based on the root option
        const templateResponse = await fetch(`${options.root || ''}components/template.html`);
        let template = await templateResponse.text();
        
        // Load content
        const contentResponse = await fetch(contentPath);
        const content = await contentResponse.text();
        
        // Replace placeholders
        template = template.replace('{{title}}', options.title || 'Jacknight&');
        template = template.replace(/\{\{root\}\}/g, options.root || ''); // Use global replace for root
        template = template.replace('{{content}}', content);
        
        // Update the document
        document.documentElement.innerHTML = template;
        
        // Load theme.js again and execute its initialization
        const themeScript = document.createElement('script');
        themeScript.src = `${options.root || ''}js/theme.js`;
        themeScript.onload = function() {
            // Initialize theme and add event listeners after theme.js is loaded
            if (typeof initializeTheme === 'function') {
                initializeTheme();
            }
            const themeToggle = document.getElementById('themeToggle');
            if (themeToggle) {
                themeToggle.addEventListener('click', toggleTheme);
            }
        };
        document.body.appendChild(themeScript);
        
    } catch (error) {
        console.error('Error loading template:', error);
    }
} 