// Load data from local storage on page load
window.onload = function() {
    loadData();
    renderTemplate();
};

// Render selected template with user data
function renderTemplate() {
    const template = document.getElementById('template-select').value;
    const preview = document.getElementById('preview');
    preview.className = 'resume-preview ' + template;
    
    const name = document.getElementById('name').value || 'John Doe';
    const email = document.getElementById('email').value || 'john@example.com';
    const phone = document.getElementById('phone').value || '+123456789';
    const summary = document.getElementById('summary').value || 'A professional summary goes here.';
    const experience = document.getElementById('experience').value.split('\n').map(line => `<li>${line}</li>`).join('');
    const education = document.getElementById('education').value.split('\n').map(line => `<li>${line}</li>`).join('');
    const skills = document.getElementById('skills').value.split(',').map(skill => `<li>${skill.trim()}</li>`).join('');
    
    let html = `
        <h2>${name}</h2>
        <div class="contact">
            <p>Email: ${email}</p>
            <p>Phone: ${phone}</p>
        </div>
        <h3>Summary</h3>
        <p>${summary}</p>
        <h3>Experience</h3>
        <ul>${experience}</ul>
        <h3>Education</h3>
        <ul>${education}</ul>
        <h3>Skills</h3>
        <ul>${skills}</ul>
    `;
    
    // Customize per template (e.g., add icons for modern)
    if (template === 'modern') {
        html = html.replace('<div class="contact">', '<div class="contact"><p><i class="fas fa-envelope"></i>Email: ${email}</p><p><i class="fas fa-phone"></i>Phone: ${phone}</p>');
    } else if (template === 'creative') {
        html = `<div style="text-align: center;"><h2>${name}</h2></div>` + html;
    }
    
    preview.innerHTML = html;
}

// Save user data to local storage
function saveData() {
    const data = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        summary: document.getElementById('summary').value,
        experience: document.getElementById('experience').value,
        education: document.getElementById('education').value,
        skills: document.getElementById('skills').value
    };
    localStorage.setItem('resumeData', JSON.stringify(data));
    alert('Data saved locally!');
}

// Load user data from local storage
function loadData() {
    const data = JSON.parse(localStorage.getItem('resumeData'));
    if (data) {
        document.getElementById('name').value = data.name || '';
        document.getElementById('email').value = data.email || '';
        document.getElementById('phone').value = data.phone || '';
        document.getElementById('summary').value = data.summary || '';
        document.getElementById('experience').value = data.experience || '';
        document.getElementById('education').value = data.education || '';
        document.getElementById('skills').value = data.skills || '';
    }
}

// Export to HTML
function exportToHTML() {
    const preview = document.getElementById('preview').innerHTML;
    const blob = new Blob([`<!DOCTYPE html><html><body>${preview}</body></html>`], {type: 'text/html'});
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'resume.html';
    a.click();
}

// Export to PDF (using jsPDF)
function exportToPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    const preview = document.getElementById('preview');
    doc.html(preview, {
        callback: function (doc) {
            doc.save('resume.pdf');
        },
        x: 10,
        y: 10,
        html2canvas: { scale: 0.2 } // Adjust scale for better fit
    });
}

// TODO: Add feedback loop (e.g., edit button that updates suggestions via API)
// TODO: Integrate AI API for content generation (e.g., fetch suggestions based on job role)
// TODO: ATS check (e.g., warn if content has unsupported elements)
// TODO: Job description matching (parse input JD and suggest keywords)
