let faves = [];
let getId = x => document.getElementById(x);

function showSaved() {
    let myObj = JSON.parse(localStorage.getItem('faves'))
    getId('tbody').innerHTML = ''
    for (let i = 0; i < myObj.length; i++) {
        let tr = document.createElement('tr');
        let td = document.createElement('td');
        td.innerHTML = '♥';
        tr.appendChild(td)
        let tdRid = document.createElement('td');
        tdRid.innerHTML = myObj[i].id
        tr.appendChild(tdRid)
        let tdOid = document.createElement('td');
        tdOid.innerHTML = myObj[i].owner.id
        tr.appendChild(tdOid)
        let tdUrl = document.createElement('td');
        tdUrl.innerHTML = myObj[i].url
        tr.appendChild(tdUrl)
        let tdBtn = document.createElement('td')
        tdBtn.innerHTML = 'Saved'
        tr.appendChild(tdBtn)
        getId('tbody').appendChild(tr)
    }
}

function render(data) {
    for (let i = 0; i < data.items.length; i++) {
        let tr = document.createElement('tr');
        let td = document.createElement('td');
        td.innerHTML = i + 1;
        tr.appendChild(td)
        let tdRid = document.createElement('td');
        tdRid.innerHTML = data.items[i].id
        tr.appendChild(tdRid)
        let tdOid = document.createElement('td');
        tdOid.innerHTML = data.items[i].owner.id
        tr.appendChild(tdOid)
        let tdUrl = document.createElement('td');
        tdUrl.innerHTML = data.items[i].url
        tr.appendChild(tdUrl)
        let tdBtn = document.createElement('td')
        let btn = document.createElement('button')
        btn.innerHTML = 'Save'
        btn.classList.add('btn', 'btn-danger')
        btn.addEventListener('click', (item) => {
            if (localStorage.length > 0) {
                faves = JSON.parse(localStorage.getItem('faves'))
            }
            item = data.items[i]
            faves.push(item)
            localStorage.setItem('faves', JSON.stringify(faves))
            btn.innerHTML = 'Saved'
        })
        tdBtn.appendChild(btn)
        tr.appendChild(tdBtn)
        getId('tbody').appendChild(tr)
    }
}

if(localStorage.length>0 && localStorage.key(0)=='faves'){
    showSaved()
}

function get() {
    $.ajax({
        url: `https://api.github.com/search/repositories?q=` + getId('search').value,
        method: 'GET',
        success: function (data) {
            render(data)
        },
        error: function (err) {
            console.error(err)
        }
    })
    getId('search').value = ''
}

let reload = () =>  document.location.reload()