let inventario = JSON.parse(localStorage.getItem('hq_inv')) || [];
let equipado = JSON.parse(localStorage.getItem('hq_equipo')) || {};

function equipar(index) {
    const itemANuevo = inventario[index];
    if (!itemANuevo) return;

    let slotId = "";

    // 1. LÓGICA DE SELECCIÓN DE SLOT (Igual a la original para no romper nada)
    if (itemANuevo.Slot === "bolsa") {
        for (let i = 2; i <= 5; i++) {
            if (!equipado[`slot-bolsa-${i}`]) { 
                slotId = `slot-bolsa-${i}`; 
                break; 
            }
        }
        if (!slotId) slotId = "slot-bolsa-2"; // Si todas llenas, sugerir la 2

    } else if (itemANuevo.Slot === "anillo") {
        slotId = !equipado["slot-anillo-1"] ? "slot-anillo-1" : "slot-anillo-2";
    } else {
        slotId = "slot-" + itemANuevo.Slot;
    }

    // 2. COMPROBAR SI ESTÁ OCUPADO Y REEMPLAZAR
    const objetoPrevio = equipado[slotId];

    if (objetoPrevio) {
        const confirmar = confirm(`La ranura ya tiene [${objetoPrevio.n}]. ¿Quieres cambiarlo por [${itemANuevo.n}]?`);
        
        if (confirmar) {
            // INTERCAMBIO SEGURO:
            // Ponemos el objeto que teníamos puesto en el lugar donde estaba el nuevo en la mochila
            inventario[index] = { ...objetoPrevio }; 
            // Ponemos el nuevo objeto en el slot del héroe
            equipado[slotId] = { ...itemANuevo };
            
            alert(`Cambiado: ${objetoPrevio.n} ha vuelto a tu mochila.`);
        } else {
            return; // El usuario canceló, no hacemos nada y la app sigue viva
        }
    } else {
        // SI ESTÁ VACÍO: Equipado normal
        equipado[slotId] = { ...itemANuevo };
        inventario.splice(index, 1);
    }

    // 3. ACTUALIZAR TODO
    localStorage.setItem('hq_equipo', JSON.stringify(equipado));
    localStorage.setItem('hq_inv', JSON.stringify(inventario));
    
    // Llamamos a las funciones de renderizado que están en js/ui.js
    if (typeof renderInv === "function") renderInv();
    if (typeof renderEquipado === "function") renderEquipado();
}
