function cambiarVista(donde) {
    document.querySelectorAll('.tab-content').forEach(s => s.classList.remove('active-view'));
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    document.getElementById('vista-' + donde).classList.add('active-view');
    document.getElementById('btn-nav-' + donde).classList.add('active');
    if(donde === 'mochila') renderInv();
    if(donde === 'heroe') renderEquipado();
}

function renderEquipado() {
    const slots = document.querySelectorAll('.slot');
    slots.forEach(s => {
        if(s.id !== 'slot-bolsa-1') {
            s.innerHTML = "";
            s.style.borderColor = "#475569";
            s.className = "slot";
        }
    });

    const s1 = document.getElementById('slot-bolsa-1');
    s1.innerHTML = `<img src="img/mochila.jpg" style="opacity:0.8">`;
    s1.style.borderColor = coloresRareza["Common"];

    for (const slotId in equipado) {
        const item = equipado[slotId];
        const target = document.getElementById(slotId);
        if (target && item) {
            target.innerHTML = `<img src="${getPath(item)}">`;
            target.style.borderColor = coloresRareza[item.Rareza] || "#475569";
            target.classList.add(item.Rareza.toLowerCase());
        }
    }
}

function renderInv() {
    const div = document.getElementById('lista-inv');
    const max = calcularCapacidadMax();
    div.innerHTML = `<p style="grid-column: 1/-1; color:#94a3b8; font-size:12px; margin-bottom:10px">Espacio: ${inventario.length} / ${max}</p>`;
    
    inventario.forEach((item, i) => {
        const color = coloresRareza[item.Rareza] || "#fff";
        div.innerHTML += `
            <div class="item-slot ${item.Rareza.toLowerCase()}" onclick="gestionarItem(${i})">
                <img src="${getPath(item)}">
                <span class="item-name" style="color:${color}">${item.n}</span>
            </div>`;
    });
}
