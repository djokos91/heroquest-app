// js/player.js

function equipar(index) {
    // Seguridad 1: Verificar si el dato existe
    if (typeof inventario === 'undefined' || !inventario[index]) {
        console.error("Error: El inventario no está listo.");
        return;
    }

    const itemANuevo = inventario[index];
    let slotId = "";

    // Lógica de slots
    if (itemANuevo.Slot === "bolsa") {
        for (let i = 2; i <= 5; i++) {
            if (!equipado[`slot-bolsa-${i}`]) { slotId = `slot-bolsa-${i}`; break; }
        }
        if (!slotId) slotId = "slot-bolsa-2";
    } else if (itemANuevo.Slot === "anillo") {
        slotId = !equipado["slot-anillo-1"] ? "slot-anillo-1" : "slot-anillo-2";
    } else {
        slotId = "slot-" + itemANuevo.Slot;
    }

    const objetoPrevio = equipado[slotId];

    // LÓGICA DE REEMPLAZO
    if (objetoPrevio) {
        if (confirm(`¿Cambiar ${objetoPrevio.n} por ${itemANuevo.n}?`)) {
            // Hacemos el cambio en los datos (la "fuente de verdad")
            inventario[index] = { ...objetoPrevio };
            equipado[slotId] = { ...itemANuevo };
        } else {
            return; // Salida limpia si el usuario cancela
        }
    } else {
        equipado[slotId] = { ...itemANuevo };
        inventario.splice(index, 1);
    }

    // Seguridad 2: Guardar datos antes de intentar dibujar nada
    localStorage.setItem('hq_equipo', JSON.stringify(equipado));
    localStorage.setItem('hq_inv', JSON.stringify(inventario));

    // Seguridad 3: Solo intentar redibujar si las funciones de UI existen
    // Esto evita que la app se rompa si ui.js tiene un error
    if (window.renderInv) renderInv();
    if (window.renderEquipado) renderEquipado();
    
    console.log("Sistema: Equipado con éxito.");
}
