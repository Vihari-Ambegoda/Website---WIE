// Function to include HTML components
async function includeHTML() {
    console.log('includeHTML function called');
    const elements = document.querySelectorAll('[w3-include-html]');
    
    for (let element of elements) {
        const file = element.getAttribute("w3-include-html");
        const baseUrl = element.getAttribute("data-base-url") || "./";
        const activePage = element.getAttribute("data-active-page") || "";
        
        if (file) {
            console.log('Loading file:', file);
            try {
                const response = await fetch(file);
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                let text = await response.text();
                
                // Replace placeholders with actual values
                let modifiedText = text
                    .replace(/{{baseUrl}}/g, baseUrl)
                    .replace(/{{homeActive}}/g, activePage === "home" ? "active" : "")
                    .replace(/{{aboutActive}}/g, activePage === "about" ? "active" : "")
                    .replace(/{{workActive}}/g, activePage === "work" ? "active" : "")
                    .replace(/{{teamActive}}/g, activePage === "team" ? "active" : "")
                    .replace(/{{contactActive}}/g, activePage === "contact" ? "active" : "");

                element.innerHTML = modifiedText;
                element.removeAttribute("w3-include-html");
                console.log('Successfully loaded and replaced content for:', file);
            } catch (error) {
                console.error(`Error loading ${file}:`, error);
            }
        }
    }
}

// Execute when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    includeHTML().then(() => {
        console.log('HTML components loaded, initializing navigation');
        // Initialize navigation toggle after components are loaded
        const navToggle = document.querySelector('.nav-toggle');
        const mainNav = document.querySelector('.main-nav');
        
        if (navToggle && mainNav) {
            navToggle.addEventListener('click', () => {
                mainNav.classList.toggle('active');
                navToggle.setAttribute('aria-expanded', 
                    mainNav.classList.contains('active').toString());
            });
        }
    });
});
