function calcularCapacidadMax() {
    let total = 16;
    for (let i = 2; i <= 5; i++) {
        const itemB = equipado[`slot-bolsa-${i}`];
        if (itemB && itemB.espacios) total += itemB.espacios;
    }
    return total;
}

function equipar(index) {
    const item = inventario[index];
    let slotId = "";

    if (item.Slot === "bolsa") {
        for (let i = 2; i <= 5; i++) {
            if (!equipado[`slot-bolsa-${i}`]) { slotId = `slot-bolsa-${i}`; break; }
        }
    } else if (item.Slot === "anillo") {
        slotId = !equipado["slot-anillo-1"] ? "slot-anillo-1" : "slot-anillo-2";
    } else {
        slotId = "slot-" + item.Slot;
    }

    if (slotId && !equipado[slotId]) {
        equipado[slotId] = item;
        localStorage.setItem('hq_equipo', JSON.stringify(equipado));
        inventario.splice(index, 1);
        localStorage.setItem('hq_inv', JSON.stringify(inventario));
        renderInv(); renderEquipado();
    } else alert("Espacio ocupado o inválido.");
}

function borrarTodo() { 
    if (confirm("¿Vaciar mochila?")) { 
        inventario = []; 
        localStorage.removeItem('hq_inv'); 
        renderInv(); 
    } 
}
