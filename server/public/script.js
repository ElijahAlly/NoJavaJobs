const fetchData = () =>{
    var pathInput = document.getElementById('searchPath').value;
    var input = document.getElementById('searchInput').value;
    fetch(`http://localhost:5005/api/${pathInput}${input && input.length ? `search?query=${input}` : ''}`)
        .then(response => response.json())
        .then(data => {
            displayResults(data);
        })
        .catch(error => console.error('Error:', error));
}

const displayResults = (data) => {
    var resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = ''; // Clear previous results

    var table = document.createElement('table');
    table.classList.add('data')
    table.setAttribute('border', '1');

    // Create header row
    var header = table.createTHead();
    var headerRow = header.insertRow(0);
    var headers = ['Title', 'Company', 'Job Link', 'Location', 'Details', 'Skills', 'Description', 'Date Posted', 'Date Updated', 'Scraped At'];
    headers.forEach(headerText => {
        var cell = headerRow.insertCell();
        cell.textContent = headerText;
    });

    // Add data rows
    var tbody = table.createTBody();
    data.forEach(job => {
        var row = tbody.insertRow();
        row.insertCell().textContent = job.title;
        row.insertCell().innerHTML = `<a class="company-data" href="${job.company_link}">${job.company} <br/><br/> <img src="${job.company_logo}" height="70" width="auto" alt="no company logo"/></a>`;
        row.insertCell().innerHTML = `<a class="job-link" href="${job.job_link}">${job.job_link}</a>`;
        row.insertCell().textContent = job.location;
        row.insertCell().textContent = job.employment_details;
        row.insertCell().textContent = limitText(job.employment_skills);
        row.insertCell().textContent = limitText(job.description_list);
        row.insertCell().textContent = job.date_posted;
        row.insertCell().textContent = job.date_updated;
        row.insertCell().textContent = job.scraped_at;
    });

    resultsDiv.appendChild(table);
}

const limitText = (text) => {
    if (!text) return '';
    if (text.length < 100) return text;
    return text.slice(0, 100).trim() + '...';
}
