let data_part = [];
let keranjang = [];
let part_count_pengambilan = 0;
let part_count_penambahan = 0;
let _person = "";

function updateCountPengambilan() {
    document.getElementById('part-count-pengambilan').innerText = part_count_pengambilan;
}

function updateCountPenambahan() {
    document.getElementById('part-count-pennambahan').innerText = part_count_penambahan;
}

function getInputFilter(mode) {

    const filter = document.getElementById('filter').value.toLowerCase();
    const table = document.getElementById('sheet-table');
    const loading = document.getElementById('loading');
    const headerRow = document.getElementById('table-header');
    const body = document.getElementById('table-body');
    // const filter = capitalizeWords(_filter);
    console.log(filter);
    let data_filtered = [];

    if (mode == 'filter') {
        for (let i = 1; i < data_part.length; i++) {

            if (data_part[i][2].toLowerCase().includes(filter)) {
                data_filtered.push(data_part[i]);
            }
            if (data_part[i][3].toLowerCase().includes(filter)) {
                data_filtered.push(data_part[i]);
            }
            if (data_part[i][4].toLowerCase().includes(filter)) {
                data_filtered.push(data_part[i]);
            }
            // if (data_part[i][5].toLowerCase().includes(filter)) {
            //     data_filtered.push(data_part[i]);
            // }
        }
    }
    console.log(data_filtered);
    if (mode == 'reset') {
        document.getElementById('filter').value = "";
        data_filtered = Array.from(data_part);
        data_filtered.shift();
    }

    while (body.hasChildNodes()) {
        body.removeChild(body.firstChild);
    }

    for (let i = 0; i < data_filtered.length; i++) {
        let tr = document.createElement('tr');
        for (let j = 1; j < data_filtered[0].length; j++) {
            let td = document.createElement('td');
            td.innerText = data_filtered[i][j];
            if (j > 0) {
                td.classList.add("text-center");
            }
            if (j == 8) {
                td.innerHTML = data_filtered[i][j];
            } else {
                td.innerText = data_filtered[i][j];
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

function ambilPart() {
    fetch('pages/sparepart/ambil.html')
        .then(Response => Response.text())
        .then(data => { document.getElementById('konten').innerHTML = data; });


    setTimeout(() => { tampilkan(keranjang, 'ambil part'); }, 1000);
}

function tampilkan(data, page) {
    // console.log(data);


    const table = document.getElementById('sheet-table');
    const loading = document.getElementById('loading');
    const headerRow = document.getElementById('table-header');
    const body = document.getElementById('table-body');
    // let data = {};




    if (page == 'pmt') {
        loading.classList.add('d-none');
        table.classList.remove('d-none');
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
        loading.classList.add('d-none');
        table.classList.remove('d-none');
        updateCountPengambilan();
        data_part = data;
        data_part[0].push('Ambil/Tambah');

        console.log(data_part);

        for (let i = 1; i < data_part.length; i++) {
            const text = '<p><span class="anchor btn btn-secondary btn-sm" onclick="masukanKeranjang(\'' + data_part[i][1] + '\')">Ambil</span> - <span class="anchor btn btn-secondary btn-sm" onclick="masukanGudang(\'' + data_part[i][1] + '\')">Tambah</span></p>';
            data_part[i].push(text);
        }

        for (let i = 1; i < 9; i++) {
            let th = document.createElement('th');
            th.innerText = data_part[0][i];
            // console.log(th);
            headerRow.appendChild(th);
        }
        for (let i = 1; i < data_part.length; i++) {
            let tr = document.createElement('tr');
            for (let j = 1; j < data_part[0].length; j++) {
                let td = document.createElement('td');
                if (j == 8) {
                    td.innerHTML = data_part[i][j];
                } else {
                    td.innerText = data_part[i][j];
                }
                if (j > 0) {
                    td.classList.add("text-center");
                }
                tr.appendChild(td);
            }
            body.appendChild(tr);
        }
    }

    if (page == 'list_pmt') {
        loading.classList.add('d-none');
        table.classList.remove('d-none');
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

    if (page == 'ambil part') {
        for (let x = 0; x < data.length; x++) {
            let tr = document.createElement('tr');
            for (let y = 1; y < data[0].length; y++) {
                let td = document.createElement('td');
                if (y != 1) {
                    td.classList.add('text-center');
                }

                if (y == 5) {
                    td.innerHTML = data[x][y];
                } else {
                    td.innerText = data[x][y];
                }

                tr.appendChild(td);
                // console.log(tr);
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
    item.person = _person;
    item.mode = 'simpan baru';
    item.nama = document.getElementById('inputNamaItem').value;
    item.type = document.getElementById('inputTypePart').value;
    item.mesin = document.getElementById('inputMesin').value;
    item.jumlah = document.getElementById('inputJumlah').value;
    item.serial = document.getElementById('inputSerialNumber').value;
    item.lokasi = document.getElementById('inputLokasi').value;
    item.unique = document.getElementById('inputUniqueID').value;


    const url = 'https://script.google.com/macros/s/AKfycbwx7yZSD4CIdiu4vELipeLY-QKJyELrF0bG5Hx-J26okvum6OyQEuxA8oMwAm0H2FsU/exec'; // Ganti dengan URL Anda

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'text/plain;charset=utf-8'
        },
        body: JSON.stringify(item)
    })
        .then(response => response.json())
        .then(data => feedback(data['status']))
        .catch(error => console.error('Error:', error));
}

function feedback(m) {
    if (m == 'sukses menyimpan') {
        document.getElementById('inputNamaItem').value = "";
        document.getElementById('inputTypePart').value = "";
        document.getElementById('inputMesin').value = "";
        document.getElementById('inputJumlah').value = "";
        document.getElementById('inputSerialNumber').value = "";
        document.getElementById('inputLokasi').value = "";
        document.getElementById('inputInisial').value = "";
        document.getElementById('inputUniqueID').value = "";
        alert('Berhasil Menyimpan');
    } else if (m == 'sukses mengambil') {
        alert('Berhasil Mengambil Stock');
    } else if (m == 'sukses menambahkan') {
        alert('Berhasil restock item');

    } else {
        alert('Gagal');
    }
}

function masukanKeranjang(id) {
    const isexist = keranjang.some(row => row.includes(id));

    if (isexist == true) {
        alert('PART SUDAH ADA DI LIST PENGAMBILAN');
    } else {
        const item = new Array(id);
        for (let i = 1; i < data_part.length; i++) {
            if (data_part[i][1] == id) {
                // item.push(data_part.indexOf(id));
                item.push(data_part[i][2]);
                item.push(data_part[i][3]);
                item.push(prompt('Quantity:'));
                item.push('<span class="anchor text-danger" onclick="hapusItemKeranjang(\'' + id + '\')">Hapus</span>');
                item.unshift(data_part[i][0]);
            }
        }
        keranjang.push(item);
        part_count_pengambilan++;
        updateCountPengambilan();
        alert('PART BERHASIL DITAMBAHKAN KE LIST PENGAMBILAN');
    }
    console.log(keranjang);
}

function masukanGudang(id) {
    const qty = prompt('Berapa quantity yang masuk?');
    const item = {};
    item.mode = 'tambah';
    for (let i = 1; i < data_part.length; i++) {
        if (data_part[i][1] == id) {
            item.row = data_part[i][0];
            item.qty = qty;
            item.person = _person;
            item.nama = data_part[i][1];
            item.type = data_part[i][3];
            data_part[i][5] = Number(data_part[i][5]) + Number(qty);
            console.log(data_part[i][5]);
            break;
        }
    }
    // console.log(item);
    if (qty == null || qty == 0) {
        alert('Penambahan dibatalkan');
    } else {
        const body = document.getElementById('table-body');
        while (body.hasChildNodes()) {
            body.removeChild(body.firstChild);
        }

        for (let i = 1; i < data_part.length; i++) {
            let tr = document.createElement('tr');
            for (let j = 1; j < data_part[0].length; j++) {
                let td = document.createElement('td');
                if (j == 8) {
                    td.innerHTML = data_part[i][j];
                } else {
                    td.innerText = data_part[i][j];
                }
                if (j > 0) {
                    td.classList.add("text-center");
                }
                tr.appendChild(td);
            }
            body.appendChild(tr);
        }
        const url = 'https://script.google.com/macros/s/AKfycbwx7yZSD4CIdiu4vELipeLY-QKJyELrF0bG5Hx-J26okvum6OyQEuxA8oMwAm0H2FsU/exec'; // Ganti dengan URL Anda

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'text/plain;charset=utf-8'
            },
            body: JSON.stringify(item)
        })
            .then(response => response.json())
            .then(data => feedback(data['status']))
            .catch(error => console.error('Error:', error));



    }
}

function hapusItemKeranjang(id) {
    for (let i = 0; i < keranjang.length; i++) {
        const transit = Array.from(keranjang[i]);
        const checking = transit.includes(id);
        if (checking == true) {
            keranjang.splice([i], 1);
            part_count_pengambilan--;
        }
    }
    const body = document.getElementById('table-body');
    while (body.hasChildNodes()) {
        body.removeChild(body.firstChild);
    }

    tampilkan(keranjang, 'ambil part');
}

function submitPengambilan() {
    let items = {};
    items.mode = 'ambil';
    items.row = [];
    items.nama = [];
    items.type = [];
    items.jumlah = [];
    items.person = _person;

    for (let i = 0; i < keranjang.length; i++) {

        items['row'].push(keranjang[i][0]);
        items['nama'].push(keranjang[i][2]);
        items['type'].push(keranjang[i][3]);
        items['jumlah'].push(keranjang[i][4]);
    }

    const body = document.getElementById('table-body');

    while (keranjang.length != 0) {
        keranjang.pop();
    }
    part_count_pengambilan = 0;
    while (body.hasChildNodes()) {
        body.removeChild(body.firstChild);
    }
    tampilkan(keranjang, 'ambil part');

    const url = 'https://script.google.com/macros/s/AKfycbwx7yZSD4CIdiu4vELipeLY-QKJyELrF0bG5Hx-J26okvum6OyQEuxA8oMwAm0H2FsU/exec'; // Ganti dengan URL Anda

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'text/plain;charset=utf-8'
        },
        body: JSON.stringify(items)
    })
        .then(response => response.json())
        .then(data => feedback(data['status']))
        .catch(error => console.error('Error:', error));

}

window.addEventListener("load", function () {
    _person = prompt("Siapa nama anda?");
});