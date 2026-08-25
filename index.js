<script>
    (function() {
        // ----- ACORDEÓN: tocar para abrir/cerrar nodos -----
        const nodes = document.querySelectorAll('.tissue-node');
        nodes.forEach(node => {
            node.addEventListener('click', function(e) {
                // Evita que el clic en botones o enlaces cierre el nodo
                if (e.target.closest('.btn-schema') || e.target.closest('.modal-overlay')) {
                    return;
                }
                this.classList.toggle('active');
            });
        });

        // ----- MODAL: abrir al hacer clic en "Ver esquema" -----
        const modalOverlay = document.getElementById('modalOverlay');
        const modalImage = document.getElementById('modalImage');
        const modalCloseBtn = document.getElementById('modalCloseBtn');

        // Asignar evento a todos los botones "Ver esquema"
        const schemaButtons = document.querySelectorAll('.btn-schema');
        schemaButtons.forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.stopPropagation(); // Evita que el nodo se cierre
                const schemaKey = this.getAttribute('data-schema');
                // Construir ruta de la imagen (ajusta según tus archivos)
                // Ejemplo: si las imágenes están en ./img/ usa `img/${schemaKey}.png`
                const imagePath = `${schemaKey}.png`; // Misma carpeta
                modalImage.src = imagePath;
                modalImage.alt = `Esquema ${schemaKey}`;
                modalOverlay.classList.add('active');
                document.body.style.overflow = 'hidden'; // Evita scroll detrás
            });
        });

        // Cerrar modal con el botón
        modalCloseBtn.addEventListener('click', function() {
            closeModal();
        });

        // Cerrar modal al hacer clic en el fondo (overlay)
        modalOverlay.addEventListener('click', function(e) {
            if (e.target === modalOverlay) {
                closeModal();
            }
        });

        // Cerrar con tecla ESC
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
                closeModal();
            }
        });

        function closeModal() {
            modalOverlay.classList.remove('active');
            document.body.style.overflow = '';
            // Opcional: limpiar src para liberar memoria
            // modalImage.src = '';
        }

        // ----- BOTÓN SALIR -----
        const exitBtn = document.getElementById('exitBtn');
        if (exitBtn) {
            exitBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                if (confirm('¿Estás seguro de que quieres salir de esta página?')) {
                    try {
                        window.close();
                    } catch (err) {
                        if (window.history.length > 1) {
                            window.history.back();
                        } else {
                            window.location.href = 'about:blank';
                        }
                    }
                }
            });
        }
    })();
</script>