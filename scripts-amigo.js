const dados =
{
    "insurances": [{
        "id": 3322,
        "name": "Amil"
    }, {
        "id": 3293,
        "name": "Bradesco"
    }, {
        "id": 99231,
        "name": "Hapvida"
    }, {
        "id": 1322,
        "name": "CASSI"
    }, {
        "id": 23111,
        "name": "Sulamérica"
    }],
    "guides": [{
        "number": "3210998321",
        "start_date": "2021-04-23T19:18:47.210Z",
        "patient": {
            "id": 9321123,
            "name": "Augusto Ferreira",
            "thumb_url": "https://imgsapp2.correiobraziliense.com.br/app/noticia_127983242361/2019/10/04/794834/20191004154953157610i.jpg"
        },
        "insurane_id": 1322,
        "health_insurance": {
            "id": 1322,
            "name": "CASSI",
            "is_deleted": false
        },
        "price": 5567.2
    }, {
        "number": "287312832",
        "start_date": "2021-04-23T19:18:47.210Z",
        "patient": {
            "id": 93229123,
            "name": "Caio Carneiro",
            "thumb_url": "http://3.bp.blogspot.com/-XG5bGlqGnJw/T9lIcssnybI/AAAAAAAADTA/B23ezXOkx8Y/s1600/Aang.jpg"
        },
        "insurane_id": 1322,
        "health_insurance": {
            "id": 1322,
            "name": "CASSI",
            "is_deleted": false
        },
        "price": 213.3
    }, {
        "number": "283718273",
        "start_date": "2021-04-22T19:18:47.210Z",
        "patient": {
            "id": 213122388,
            "name": "Luciano José",
            "thumb_url": "https://i.ytimg.com/vi/yUXd-enstO8/maxresdefault.jpg"
        },
        "insurane_id": 3293,
        "health_insurance": {
            "id": 3293,
            "name": "Bradesco",
            "is_deleted": true
        },
        "price": 88.99
    }, {
        "number": "009090321938",
        "start_date": "2021-04-20T19:18:47.210Z",
        "patient": {
            "id": 3367263,
            "name": "Felício Santos",
            "thumb_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPSxlYabmRlKk43uvsBMIqjA7Rw_YCwK4TyA&usqp=CAU"
        },
        "insurane_id": 3293,
        "health_insurance": {
            "id": 3293,
            "name": "Bradesco",
            "is_deleted": true
        },
        "price": 828.99
    }, {
        "number": "8787128731",
        "start_date": "2021-04-01T19:18:47.210Z",
        "patient": {
            "id": 777882,
            "name": "Fernando Raposo"
        },
        "insurane_id": 3322,
        "health_insurance": {
            "id": 3322,
            "name": "Amil",
            "is_deleted": false
        },
        "price": 772
    }, {
        "number": "12929321",
        "start_date": "2021-04-02T19:18:47.210Z",
        "patient": {
            "id": 221,
            "name": "Paciente com nome grante pra colocar text ellipsis testando nome com paciente grande"
        },
        "insurane_id": 3322,
        "health_insurance": {
            "id": 3322,
            "name": "Amil",
            "is_deleted": false
        },
        "price": 221
    }]
};
// Formatando data
const formatter = new Intl.DateTimeFormat("pt-BR", {
    // dataStyle: "short"
});
// Formatando numero
const formatter2 = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
});
// Tabela dinamica
const tableRender = lista => {
    const table = document.getElementById('table-list')
    table.innerHTML = '';
    lista.forEach(valor => {
        const novaTr = document.createElement('tr');
        novaTr.insertCell(0).innerHTML = formatter.format(new Date(valor.start_date));
        novaTr.insertCell(1).innerHTML = valor.number;
        novaTr.insertCell(2).innerHTML = `<img src="${valor.patient.thumb_url || "https://via.placeholder.com/150x150.jpg"}" class="rounded-circle" style= "width:25px; height:25px; margin-right:5px"  >  ${valor.patient.name}`;
        novaTr.insertCell(3).innerHTML = valor.health_insurance.name;
        novaTr.insertCell(4).innerHTML = formatter2.format(valor.price);
        table.appendChild(novaTr);
    });
    if (!lista.length) {
        table.innerHTML = `
        <tr>
            <td class="cliente-nao" colspan="5">Nenhum resultado encontrado</td>
        </tr> `
    };
};
tableRender(dados.guides);
// menu select
dados.insurances.forEach(item => {
    const novoOption = document.createElement('option');
    novoOption.text = item.name;
    novoOption.value = item.id;
    document.getElementById('meu-select').appendChild(novoOption);
});
// Filtro de Busca
const filtro = () => {
    const inputPesquisar = document.getElementById('input-perquisar').value;
    const PesquisarSelect = document.getElementById('meu-select').value;
    console.log(PesquisarSelect)
    const filtrados = dados.guides.filter(value => {
        const regexInput = new RegExp(inputPesquisar.toLowerCase());
        const regexSelect = new RegExp(PesquisarSelect);
        return (
            regexInput.test(value.patient.name.toLowerCase())
            || regexInput.test(value.number)
        ) && regexSelect.test(value.health_insurance.id)
    });
    tableRender(filtrados)
};