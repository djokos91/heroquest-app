let inventario = JSON.parse(localStorage.getItem('hq_inv')) || [];
let equipado = JSON.parse(localStorage.getItem('hq_equipo')) || {};

function equipar(index) {
    const itemANuevo = inventario[index];
    let slotId = "";

    // 1. DETERMINAR EL SLOT DESTINO
    if (itemANuevo.Slot === "bolsa") {
        // Buscar primer hueco libre en bolsas 2 a 5
        for (let i = 2; i <= 5; i++) {
            if (!equipado[`slot-bolsa-${i}`]) { 
                slotId = `slot-bolsa-${i}`; 
                break; 
            }
        }
        // Si todas están llenas, elegimos la primera para reemplazar (bolsa-2)
        if (!slotId) slotId = "slot-bolsa-2";

    } else if (itemANuevo.Slot === "anillo") {
        // Si el anillo 1 está libre, va ahí. Si no, al 2.
        slotId = !equipado["slot-anillo-1"] ? "slot-anillo-1" : "slot-anillo-2";
    } else {
        slotId = "slot-" + itemANuevo.Slot;
    }

    // 2. LÓGICA DE REEMPLAZO O EQUIPADO DIRECTO
    const objetoActual = equipado[slotId];

    if (objetoActual) {
        // Si la ranura está ocupada, preguntamos
        if (confirm(`La ranura ${itemANuevo.Slot} ya tiene [${objetoActual.n}]. ¿Quieres reemplazarlo por [${itemANuevo.n}]?`)) {
            // Intercambio: El viejo vuelve al inventario, el nuevo se equipa
            inventario[index] = { ...objetoActual }; // Reemplazamos el nuevo en la mochila por el viejo
            equipado[slotId] = { ...itemANuevo };
            
            alert(`Has equipado ${itemANuevo.n}. ${objetoActual.n} ha vuelto a tu mochila.`);
        } else {
            // Si cancela, no hacemos nada
            return;
        }
    } else {
        // Si estaba libre, equipamos normal y quitamos de la mochila
        equipado[slotId] = { ...itemANuevo };
        inventario.splice(index, 1);
    }

    // 3. GUARDAR Y RENDERIZAR
    localStorage.setItem('hq_equipo', JSON.stringify(equipado));
    localStorage.setItem('hq_inv', JSON.stringify(inventario));
    renderInv(); 
    renderEquipado();
}
