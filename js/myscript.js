function bestpack() {
    document.getElementById("konten").innerHTML = '<div class="ratio" style="--bs-aspect-ratio: 300%;"><iframe src="https://docs.google.com/forms/d/e/1FAIpQLSdnFbQkifXrnRKuHdyI2yRY6JiiV8qyrKQjiufsuPBOvNqooA/viewform?embedded=true" width="640" height="3739" frameborder="0" marginheight="0" marginwidth="0">Loading…</iframe></div>'
}

function powerpack() {
    document.getElementById("konten").innerHTML = '<div class="ratio" style="--bs-aspect-ratio: 300%;"><iframe src="https://docs.google.com/forms/d/e/1FAIpQLSck3oHzqQvuBHo3Gusrr4sME6oiY0tHSlugV1_eRQPluZmZtw/viewform?embedded=true" width="640" height="3991" frameborder="0" marginheight="0" marginwidth="0">Loading…</iframe></div>'
}

function jadwal_pmt(f, m) {
    fetch(f)
        .then(Response => Response.text())
        .then(data => { document.getElementById('konten').innerHTML = data; });

    const webAppUrl = 'https://script.google.com/macros/s/AKfycbyusRx5WB5u3d8ONTuCrwN4WDWMSo50DrBv8oJZQ8MtiS1WzF1baJ4XPEAP25kyT6Wt/exec?nama_sheet=' + m;

    fetch(webAppUrl)
        .then(response => response.json())
        .then(Data => tampilkan(Data));
}

function tampilkan(data) {
    // const table = document.getElementById('sheet-table');
    // const loading = document.getElementById('loading');
    const headerRow = document.getElementById('table-header');
    const body = document.getElementById('table-body');
    // let data = {};

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

    // headerRow.innerHTML = '';
    // body.innerHTML = '';
    // console.log(data);
    // if (data.length > 0) {
    //     // 1. Buat Header secara dinamis
    //     Object.keys(data[0]).forEach(key => {
    //         let th = document.createElement('th');
    //         th.innerText = key;
    //         headerRow.appendChild(th);
    //     });

    //     // 2. Isi Baris Data
    //     data.forEach(item => {
    //         let tr = document.createElement('tr');
    //         Object.values(item).forEach(val => {
    //             let td = document.createElement('td');
    //             td.innerText = val;
    //             tr.appendChild(td);
    //         });
    //         body.appendChild(tr);
    //     });


    // }

}
