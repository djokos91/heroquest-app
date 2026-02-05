// Variables globales de datos
let enemigos = [];
let itemsDB = {};
const coloresRareza = { "Poor": "#9d9d9d", "Common": "#ffffff", "Uncommon": "#1eff00", "Rare": "#0070dd", "Epic": "#a335ee", "Legendary": "#ff8000" };
const jerarquiaRareza = { "Poor": 0, "Common": 1, "Uncommon": 2, "Rare": 3, "Epic": 4, "Legendary": 5 };

// Función central para rutas de imágenes
function getPath(item) {
    if (!item || !item.f) return "img/error.jpg";
    if (item.f.includes('/')) return `img/${item.f}`;
    return `img/${item.subfolder}/${item.f}`;
}

async function cargarDatos() {
    try {
        const v = Date.now();
        const [resEn, resEq, resCo, resBa] = await Promise.all([
            fetch(`enemigos.json?v=${v}`).then(r => r.json()),
            fetch(`equipacion.json?v=${v}`).then(r => r.json()),
            fetch(`consumibles.json?v=${v}`).then(r => r.json()),
            fetch(`basura.json?v=${v}`).then(r => r.json())
        ]);

        Object.values(resEq).forEach(it => it.subfolder = "equipacion");
        Object.values(resCo).forEach(it => it.subfolder = "consumibles");
        Object.values(resBa).forEach(it => it.subfolder = "basura");
        
        enemigos = Object.values(resEn);
        enemigos.forEach(en => en.subfolder = "enemigos");

        itemsDB = { ...resEq, ...resCo, ...resBa };
        
        document.getElementById('btn-explorar').disabled = false;
        renderEquipado(); // Llamada inicial
    } catch (err) { console.error("Error cargando JSON:", err); }
}
