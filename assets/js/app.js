// Gráfico 1: Barras comparativas
new Chart(document.getElementById('chartComparacion'), {
  type: 'bar',
  data: {
    labels: ['Total XML', 'Páginas con\nequivalente', 'Solo en Código', 'Solo en BD (nuevas)'],
    datasets: [
      {
        label: 'Código Fuente (theme_somos)',
        data: [64, 23, 30, 0],
        backgroundColor: '#4678C8',
        borderRadius: 6
      },
      {
        label: 'Base de Datos Producción',
        data: [40, 23, 0, 14],
        backgroundColor: '#f39c12',
        borderRadius: 6
      }
    ]
  },
  options: {
    responsive: true,
    plugins: { legend: { position: 'bottom' } },
    scales: {
      y: { beginAtZero: true, grid: { color: '#eee' } },
      x: { grid: { display: false } }
    }
  }
});

// Gráfico 2: Donut distribución
new Chart(document.getElementById('chartDistribucion'), {
  type: 'doughnut',
  data: {
    labels: [
      'Renombradas/Modificadas (en ambos)',
      'Solo en Código (backend/admin)',
      'Nuevas en BD (sin backup código)',
      'Iguales / Sin cambios'
    ],
    datasets: [{
      data: [23, 30, 14, 1],
      backgroundColor: ['#8e44ad', '#4678C8', '#e74c3c', '#95a5a6'],
      borderWidth: 2,
      borderColor: '#fff'
    }]
  },
  options: {
    responsive: true,
    cutout: '62%',
    plugins: {
      legend: { position: 'bottom', labels: { font: { size: 11 }, boxWidth: 14 } }
    }
  }
});

// Gráfico 3: Líneas de código - barras horizontales
const paginasLabels = [
  'transacciones', 'update_user', 'signup/somos_signup', 'home/page_home',
  'credi_somos', 'remember_password', 'vive_somos', 'register_final',
  'ofertas_credi_somos', 'home-transacciones', 'aliados', 'mis_datos',
  'aliados_agil', 'aliados_eco', 'signin'
];
const lineasCodigo = [1963, 1238, 1124, 1084, 942, 430, 401, 232, 225, 212, 166, 160, 159, 159, 151];
const lineasBD = [1661, 980, 911, 983, 893, 332, 329, 194, 194, 188, 130, 144, 124, 124, 123];

new Chart(document.getElementById('chartLineas'), {
  type: 'bar',
  data: {
    labels: paginasLabels,
    datasets: [
      { label: 'Código Fuente (líneas)', data: lineasCodigo, backgroundColor: '#4678C8', borderRadius: 4 },
      { label: 'Base de Datos (líneas)',  data: lineasBD,     backgroundColor: '#f39c12', borderRadius: 4 }
    ]
  },
  options: {
    indexAxis: 'y',
    responsive: true,
    plugins: { legend: { position: 'bottom' } },
    scales: {
      x: { beginAtZero: true, grid: { color: '#eee' } },
      y: { grid: { display: false }, ticks: { font: { size: 10 } } }
    }
  }
});

// Gráfico 4: Módulos en export_views
new Chart(document.getElementById('chartModulos'), {
  type: 'bar',
  data: {
    labels: ['sin_modulo', 'website', 'theme_somos', 'web', 'portal', 'mail', 'web_editor',
             'base', 'http_routing', 'auth_signup', 'digest', 'otros'],
    datasets: [{
      label: 'Archivos XML',
      data: [440, 188, 40, 33, 26, 13, 10, 7, 7, 5, 5, 13],
      backgroundColor: [
        '#95a5a6','#3498db','#4678C8','#2ecc71','#9b59b6','#e67e22',
        '#1abc9c','#e74c3c','#f39c12','#16a085','#8e44ad','#bdc3c7'
      ],
      borderRadius: 5
    }]
  },
  options: {
    responsive: true,
    plugins: { legend: { display: false } },
    scales: {
      y: { beginAtZero: true, grid: { color: '#eee' } },
      x: { grid: { display: false }, ticks: { font: { size: 10 } } }
    }
  }
});

/* ══════════════════════════════════════════════════════
   VANTA
══════════════════════════════════════════════════════ */
VANTA.WAVES({
  el: "#vanta-bg",
  mouseControls: true,
  touchControls: true,
  gyroControls: false,
  minHeight: 200.00,
  minWidth: 20.00,
  scale: 1.00,
  scaleMobile: 1.00
})