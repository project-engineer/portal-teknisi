let data_part = [];

function getInputFilter(mode) {

    const filter = document.getElementById('filter').value.toLowerCase();
    const table = document.getElementById('sheet-table');
    const loading = document.getElementById('loading');
    const headerRow = document.getElementById('table-header');
    const body = document.getElementById('table-body');
    // const filter = capitalizeWords(_filter);

    let data_filtered = [];

    if (mode == 'filter') {
        for (let i = 1; i < data_part.length; i++) {

            if (data_part[i][1].toLowerCase().includes(filter)) {
                data_filtered.push(data_part[i]);
            }
            if (data_part[i][2].toLowerCase().includes(filter)) {
                data_filtered.push(data_part[i]);
            }
            if (data_part[i][3].toLowerCase().includes(filter)) {
                data_filtered.push(data_part[i]);
            }
            if (data_part[i][5].toLowerCase().includes(filter)) {
                data_filtered.push(data_part[i]);
            }
        }
    }

    if (mode == 'reset') {
        data_filtered = Array.from(data_part);
        data_filtered.shift();
    }


    while (body.hasChildNodes()) {
        body.removeChild(body.firstChild);
    }
    for (let i = 0; i < data_filtered.length; i++) {
        let tr = document.createElement('tr');
        for (let j = 0; j < data_filtered[0].length; j++) {
            let td = document.createElement('td');
            td.innerText = data_filtered[i][j];
            if (j > 0) {
                td.classList.add("text-center");
            }
            tr.appendChild(td);
        }
        body.appendChild(tr);
    }
}

function list_pmt(f) {
    fetch(f)
        .then(Response => Response.text())
        .then(data => { document.getElementById('konten').innerHTML = data; });

    const webAppUrl = 'https://script.google.com/macros/s/AKfycbxUyXdxUr32XQc4-jzjH3VsWljup9Kvzjyk9jfD0vj1nkizsDnSyfyMbrubxFvndMNY/exec';

    fetch(webAppUrl)
        .then(response => response.json())
        .then(Data => tampilkan(Data, 'list_pmt'));
}


function troubleshooting(f) {
    fetch(f)
        .then(Response => Response.text())
        .then(data => { document.getElementById('konten').innerHTML = data; });
}

function knowledge(f) {
    fetch(f)
        .then(Response => Response.text())
        .then(data => { document.getElementById('konten').innerHTML = data; });
}


function jadwal_pmt(f, m) {
    fetch(f)
        .then(Response => Response.text())
        .then(data => { document.getElementById('konten').innerHTML = data; });

    const webAppUrl = 'https://script.google.com/macros/s/AKfycbyusRx5WB5u3d8ONTuCrwN4WDWMSo50DrBv8oJZQ8MtiS1WzF1baJ4XPEAP25kyT6Wt/exec?nama_sheet=' + m;

    fetch(webAppUrl)
        .then(response => response.json())
        .then(Data => tampilkan(Data, 'pmt'));
}

function list_sparepart(f, m) {
    fetch(f)
        .then(Response => Response.text())
        .then(data => { document.getElementById('konten').innerHTML = data; });

    const webAppUrl = 'https://script.google.com/macros/s/AKfycbwx7yZSD4CIdiu4vELipeLY-QKJyELrF0bG5Hx-J26okvum6OyQEuxA8oMwAm0H2FsU/exec?nama_sheet=' + m;

    fetch(webAppUrl)
        .then(response => response.json())
        .then(Data => tampilkan(Data, 'list part'));
}

function inputSparePart() {
    fetch('pages/sparepart/input.html')
        .then(Response => Response.text())
        .then(data => { document.getElementById('konten').innerHTML = data; });
}

function tampilkan(data, page) {
    // console.log(data);
    data_part = data;
    const table = document.getElementById('sheet-table');
    const loading = document.getElementById('loading');
    const headerRow = document.getElementById('table-header');
    const body = document.getElementById('table-body');
    // let data = {};

    loading.classList.add('d-none');
    table.classList.remove('d-none');


    if (page == 'pmt') {
        for (let i = 0; i < 5; i++) {
            let th = document.createElement('th');
            th.innerText = data[0][i];
            // console.log(th);
            headerRow.appendChild(th);
        }
        for (let i = 1; i < data.length; i++) {
            let tr = document.createElement('tr');
            for (let j = 0; j < data[0].length; j++) {
                let td = document.createElement('td');
                if (j == 2) {
                    let waktu = data[i][j];
                    let tanggal = waktu.slice(0, 10);
                    td.innerText = tanggal;
                } else {
                    td.innerText = data[i][j];
                }

                if (j > 0) {
                    td.classList.add("text-center");
                }
                tr.appendChild(td);
            }
            body.appendChild(tr);
        }
    }
    if (page == 'list part') {
        for (let i = 0; i < 7; i++) {
            let th = document.createElement('th');
            th.innerText = data[0][i];
            // console.log(th);
            headerRow.appendChild(th);
        }
        for (let i = 1; i < data.length; i++) {
            let tr = document.createElement('tr');
            for (let j = 0; j < data[0].length; j++) {
                let td = document.createElement('td');
                td.innerText = data[i][j];
                if (j > 0) {
                    td.classList.add("text-center");
                }
                tr.appendChild(td);
            }
            body.appendChild(tr);
        }
    }

    if (page == 'list_pmt') {
        for (let i = 0; i < 2; i++) {
            let th = document.createElement('th');
            th.innerText = data[0][i];
            // console.log(th);
            headerRow.appendChild(th);
        }
        for (let i = 1; i < data.length; i++) {
            let tr = document.createElement('tr');
            for (let j = 0; j < data[0].length; j++) {
                let td = document.createElement('td');
                if (j == 0) {
                    td.innerText = data[i][j];
                }
                if (j == 1) {
                    td.innerHTML = '<a href="' + data[i][j] + '" target="_blank">Klik Disini</a>';
                }
                if (j > 0) {
                    td.classList.add("text-center");
                }
                tr.appendChild(td);
            }
            body.appendChild(tr);
        }
    }

}


function autoGenerate() {
    const inisial = document.getElementById('inputInisial').value;
    const fieldId = document.getElementById('inputUniqueID');

    if (inisial == "") {
        fieldId.value = "Inisial harus diisi";
    } else {
        const stringAcak = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
        let uniqueID = "";
        uniqueID += inisial;
        uniqueID += "-";
        uniqueID += stringAcak;
        // console.log(uniqueID);
        // const fieldId = document.getElementById('inputUniqueID');
        // fieldId.setAttribute('value', uniqueID);
        fieldId.value = uniqueID;

        const tombol_simpan = document.getElementById('tombol_simpan');
        tombol_simpan.classList.remove('disabled');
    }
}

function simpanItem() {
    const item = {};
    item.nama = document.getElementById('inputNamaItem').value;
    item.type = document.getElementById('inputTypePart').value;
    item.mesin = document.getElementById('inputMesin').value;
    item.jumlah = document.getElementById('inputJumlah').value;
    item.serial = document.getElementById('inputSerialNumber').value;
    item.lokasi = document.getElementById('inputLokasi').value;
    item.unique = document.getElementById('inputUniqueID').value;

    document.getElementById('inputNamaItem').value = "";
    document.getElementById('inputTypePart').value = "";
    document.getElementById('inputMesin').value = "";
    document.getElementById('inputJumlah').value = "";
    document.getElementById('inputSerialNumber').value = "";
    document.getElementById('inputLokasi').value = "";
    document.getElementById('inputInisial').value = "";
    document.getElementById('inputUniqueID').value = "";


    const url = 'https://script.google.com/macros/s/AKfycbwx7yZSD4CIdiu4vELipeLY-QKJyELrF0bG5Hx-J26okvum6OyQEuxA8oMwAm0H2FsU/exec'; // Ganti dengan URL Anda

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'text/plain;charset=utf-8'
        },
        body: JSON.stringify(item)
    })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error('Error:', error));
}
