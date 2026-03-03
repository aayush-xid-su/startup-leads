let currentPage = 1;
const itemsPerPage = 12;
let filteredCompanies = companies;

const container = document.getElementById("companyContainer");
const pageNumbers = document.getElementById("pageNumbers");

function renderCompanies() {
    container.innerHTML = "";
    const start = (currentPage - 1) * itemsPerPage;
    const paginatedItems = filteredCompanies.slice(start, start + itemsPerPage);

    paginatedItems.forEach(company => {
        const div = document.createElement("div");
        div.className = "card";
        div.innerHTML = `
            <h3>${company.name}</h3>
            <p>${company.tag}</p>
            <a href="${company.url}" target="_blank">Visit Website</a>
        `;
        container.appendChild(div);
    });

    renderPagination();
}

function renderPagination() {
    pageNumbers.innerHTML = "";
    const totalPages = Math.ceil(filteredCompanies.length / itemsPerPage);

    for (let i = 1; i <= Math.min(4, totalPages); i++) {
        const btn = document.createElement("button");
        btn.innerText = i;
        btn.onclick = () => {
            currentPage = i;
            renderCompanies();
        };
        pageNumbers.appendChild(btn);
    }
}

document.getElementById("prevBtn").onclick = () => {
    if (currentPage > 1) {
        currentPage--;
        renderCompanies();
    }
};

document.getElementById("nextBtn").onclick = () => {
    const totalPages = Math.ceil(filteredCompanies.length / itemsPerPage);
    if (currentPage < totalPages) {
        currentPage++;
        renderCompanies();
    }
};

document.getElementById("categoryFilter").onchange = (e) => {
    const value = e.target.value;
    filteredCompanies = value === "All" ? companies : companies.filter(c => c.tag === value);
    currentPage = 1;
    renderCompanies();
};

document.getElementById("exportCSV").onclick = () => {
    let csv = "Name,Category,URL\n";
    companies.forEach(c => {
        csv += `${c.name},${c.tag},${c.url}\n`;
    });
    const blob = new Blob([csv], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "companies.csv";
    link.click();
};

document.getElementById("darkModeBtn").onclick = () => {
    document.body.classList.toggle("dark");
};

document.getElementById("addCompanyBtn").onclick = () => {
    const name = document.getElementById("nameInput").value;
    const url = document.getElementById("urlInput").value;
    const tag = document.getElementById("tagInput").value;

    companies.push({ name, url, tag });
    filteredCompanies = companies;
    renderCompanies();
};

renderCompanies();