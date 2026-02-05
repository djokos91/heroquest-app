let actualEnemigo = null;

function generarEncuentro() {
    actualEnemigo = enemigos[Math.floor(Math.random() * enemigos.length)];
    document.getElementById('pantalla-enemigo').style.display = 'block';
    document.getElementById('enemigo-nombre').innerText = actualEnemigo.n;
    document.getElementById('enemigo-hp').innerText = actualEnemigo.hp;
    document.getElementById('enemigo-img').src = getPath(actualEnemigo);
    document.getElementById('btn-derrota').style.display = 'inline-block';
    document.getElementById('botin-texto').innerHTML = "";
}

function derrotar() {
    const max = calcularCapacidadMax();
    if (inventario.length >= max) { alert("¡Mochila llena!"); return; }
    
    const nivelMax = jerarquiaRareza[actualEnemigo.LootTable] || 0;
    const posibles = Object.values(itemsDB).filter(it => (jerarquiaRareza[it.Rareza] || 0) <= nivelMax);
    
    if (posibles.length > 0) {
        const itemObtenido = { ...posibles[Math.floor(Math.random() * posibles.length)] };
        inventario.push(itemObtenido);
        localStorage.setItem('hq_inv', JSON.stringify(inventario));
        
        const color = coloresRareza[itemObtenido.Rareza] || "#fff";
        document.getElementById('botin-texto').innerHTML = `
            <div style="display:flex; flex-direction:column; align-items:center; gap:5px">
                ¡BOTÍN!<br>
                <img src="${getPath(itemObtenido)}" style="width:45px; border:2px solid ${color}; border-radius:5px">
                <span style="color:${color}">${itemObtenido.n}</span>
            </div>`;
        document.getElementById('btn-derrota').style.display = 'none';
    }
}
